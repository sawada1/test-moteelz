import { defineStore } from "pinia";
import { useApiAxios } from "@/composables/axios";
import { hotelDetails } from "@/stores/hotels/hotelDetails";


interface checkoutState {
  coupon: string | null;
  error: string | null;
  hotelDetails: object | null;
  preBookDetails: object | null;
  guestDetails: GuestDetails[];
  bookData: object | null;
  loadingBookRoom: boolean;
}

interface GuestDetails {
  firstName: string;
  lastName: string;
  guestMail?: string; // optional
  title: string;
  packageRoomToken: string;
  reference: number;
  type: string;
  lead: boolean;
}

export const useCheckout = defineStore("checkout", {
  state: (): checkoutState => ({
    coupon: null,
    error: null,
    hotelDetails: null,
    preBookDetails: null,
    guestDetails: null,
    bookData: null,
    loadingBookRoom: false,
  }),

  actions: {
    async handleAddCoupon(couponCode: string) {
      this.error = null;

      if (!couponCode) {
        this.error = "Coupon code cannot be empty.";
        return;
      }

      try {
        const isValidCoupon = true;

        if (isValidCoupon) {
          this.coupon = couponCode;
        } else {
          this.error = "Invalid coupon code.";
        }
      } catch (error) {
        this.error = "Failed to validate the coupon code.";
      }
    },
    async getHotelDetails(hotelId: number) {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApiAxios<any>(
          "get",
          `/api/v1/hotels/${hotelId}/details`
        );

        if (response.data) {
          this.hotelDetails = response.data;
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
    async getPreBookDetails(payload: any) {
const hotelDetailsStore = hotelDetails();
      try {
        this.loading = true;
        this.error = null;
        const preBookURL =
          hotelDetailsStore?.hotelRatePlans.offers[0].prebookUrl.split(".com");
        const response = await useApiAxios<any>(
          "post",
          preBookURL[1],
          payload
        );

        if (response.data) {
          this.preBookDetails = response.data;
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
    async fetchBookingRoom(payload: any) {
      try {
        this.loadingBookRoom = true;
        this.error = null;
        const BookURL = this.preBookDetails.bookUrl.split(".com");
        const response = await useApiAxios<any>("post", BookURL[1], payload);

        if (response.data) {
          this.bookData = response.data;
          return true;
        }

        return false;
      } catch (error) {
        this.error = "An unexpected error occurred";
        return false;
      } finally {
        this.loadingBookRoom = false;
      }
    },
    // Method to set or update guest details
    setGuestDetails(data: GuestDetails) {
      this.guestDetails = data;
    },
  },
});
