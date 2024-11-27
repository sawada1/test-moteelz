import { defineStore } from "pinia";
import { User, SignUpPayload, AuthResponse } from "@/types/auth";
import { Method, useApi } from "@/composables/api";
import { useRouter } from 'vue-router';
import { date } from "zod";


interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  countryCodes: { code: string; name: string }[] | null;
  token: string | null;
  on_boarding: string | null; 
  lang : string;
  showModal: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    loading: false,
    token: null,
    error: null,
    countryCodes: null,
    on_boarding: null,
    showModal:false,
    lang: "en",
  }),

  getters: {
    isAuthenticated: (state) => !!state.user && state.on_boarding === "complete",
    currentUser: (state) => state.user,
  },

 
    actions: {
      setLanguage(lang: string) {
        this.lang = lang;
        localStorage.setItem("lang", lang); 
      },
      initializeAuth() {
        if (process.client) {
          const savedToken = localStorage.getItem("token");
          if (savedToken) {
            this.token = savedToken;
            this.loadUserProfile(); // Load the user's profile using the saved token
          }
        }
      },
      
    async signUp(payload: SignUpPayload) {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApi<AuthResponse>("/api/auth/signup", Method.POST, payload);

        if (response.status?.statusCode >= 400) {
          this.error = response.status?.message || "Sign up failed";
          return false;
        }

        if (response.value?.data) {
          const { user, token } = response.value.data;
          this.user = user;

          if (process.client) {
            localStorage.setItem("token", token);
          }
          return true;
        }
        return false;
      } catch (error) {
        this.error = "An unexpected error occurred";
        return false;
      } finally {
        this.loading = false;
      }
    },
    async completeOnboarding(payload: { first_name: string; second_name: string; last_name: string; gender: string; email: string; on_boarding: string; date_of_birth: string }) {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApi<{ message: string; data?: User }>("/api/v1/account/complete-registration", Method.POST, payload, {Authorization: `Bearer ${this.token}`,});

        if (response.data) {
          this.user = response.data;
          this.on_boarding = 'complete';
          return true;
        } else {
          this.error = response.error || "Onboarding failed";
          return false;
        }
      } catch (error) {
        this.error = `An unexpected error occurred: ${error.message || "Unknown error"}`;
        return false;
      } finally {
        this.loading = false;
      }
    },
    async signIn(payload: { email: string; password: string }) {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApi<AuthResponse>("/api/auth/login", Method.POST, payload);

        if (response.statusCode >= 400) {
          this.error = response.error || "Login failed";
          return false;
        }

        if (response.data) {
          const { user, token } = response.data;
          this.user = user;

          if (process.client) {
            localStorage.setItem("token", token);
          }
          return true;
        }
        return false;
      } catch (error) {
        this.error = "An unexpected error occurred";
        return false;
      } finally {
        this.loading = false;
      }
    },
    async verifyOtp(phone: string, otpCode: string) {
      try {
        console.log("Sending OTP verification request with:", { phone, otp_code: otpCode });

        const response = await useApi<{ message: string; token?: string; on_boarding?: string }>(
          "/api/v1/auth/verify-otp",
          Method.POST,
          { phone, otp_code: otpCode }
        );

        if (response.data.message === "OTP verified successfully" && response.data.token) {
          // Store the token received from the server
          this.token = response.data.token;
          console.log("Token received from verifyOtp:", this.token);

          // Check and set the onboarding status
          this.on_boarding = response.data.on_boarding ?? null;
          console.log("Verify OTP Success - Onboarding Status Set to:", this.on_boarding);

          // Store the token in localStorage to persist it across sessions
          if (process.client) {
            localStorage.setItem("token", this.token);
          }

          return true;
        } else {
          this.error = response.data?.message || "OTP verification failed";
          console.error("Verification response error:", response);
          return false;
        }
      } catch (error) {
        this.error = `An unexpected error occurred: ${error.message || "Unknown error"}`;
        console.error("Unexpected error in verifyOtp:", error);
        return false;
      }
    },

    async loadUserProfile() {
      try {
        let token = this.token;
    
        if (process.client) {
          token = token || localStorage.getItem("token");
        }
    
        if (!token) {
          console.warn("No token available, cannot load profile.");
          return;
        }
    
        const response = await useApi<User>("/api/v1/account/show", Method.GET, undefined, {
          Authorization: `Bearer ${token}`,  // Pass Authorization in headers
        });
    
        if (response.data.data) {
          const userData = response.data.data;
          this.user = {
            id: userData.id,
            firstName: userData.first_name,
            secondName: userData.second_name,
            lastName: userData.last_name,
            email: userData.email,
            phone: userData.phone,
            gender: userData.gender,
            profileImage: userData.profile_picture_url,
            dateOfBirth: userData.date_of_birth,
          };
          this.on_boarding = userData.on_boarding;
    
          console.log("User profile loaded successfully:", this.user);
        }
      } catch (error) {
        this.error = "Failed to load user profile";
        console.error("Error loading user profile:", error);
      }
    },    
    
    async updateAccount(payload: { first_name: string; second_name: string; last_name: string; email: string }) {
      try {
        this.loading = true;
        const token = this.token || localStorage.getItem("token");

        if (!token) {
          this.error = "User is not authenticated";
          return false;
        }

        const response = await useApi<User>("/api/v1/account/update", Method.PUT, payload, {
          Authorization: `Bearer ${token}`,
        });

        if (response.data) {
          this.user = { ...this.user, ...payload }; // Update local user data with new values
          return true;
        } else {
          this.error = response.error || "Failed to update account";
          return false;
        }
      } catch (error) {
        this.error = "An unexpected error occurred";
        return false;
      } finally {
        this.loading = false;
      }
    },

    async getCountryCodes() {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApi<{ data: { name_en: string; code: string; phone_key: string }[] }>("/api/v1/auth/country-codes", Method.GET);

        if (response.statusCode >= 400) {
          this.error = response.error || "Failed to load country codes";
          return false;
        }

        if (response.data.data) {
          this.countryCodes = response.data.data;
          return true;
        } else {
          this.error = "No data received";
          return false;
        }
      } catch (error) {
        this.error = "An unexpected error occurred while loading country codes";
        return false;
      } finally {
        this.loading = false;
      }
    },
    async sendOtp(phoneData: { phone: string }) {
      try {
        this.loading = true;
        this.error = null;
    
        console.log("Sending OTP request with payload:", phoneData);
    
        const response = await useApi<{ message: string; otp?: string; errors?: { [key: string]: string[] } }>("/api/v1/auth/send-otp", Method.POST, phoneData);
    
        if (response.statusCode === 200 && response.data?.message === "OTP sent successfully") {
          console.log("OTP sent successfully");
          this.error = null; // Clear any previous error messages
          return true;
        } else {
          // If there's an error, set the `error` property
          this.error = response.error || "Failed to send OTP";
          console.error("Error sending OTP:", this.error);
          return false;
        }
      } catch (error) {
        this.error = error?.message || "An unexpected error occurred";
        console.error("Unexpected error during OTP sending:", error);
        return false;
      } finally {
        this.loading = false;
      }
    },

    signOut() {
      this.user = null;
      this.token = null;
      this.on_boarding = null;
      localStorage.removeItem("token"); // Clear token from localStorage
      console.log("User signed out successfully." + this.token);
   
  
    }
  },
});
