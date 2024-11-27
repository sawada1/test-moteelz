import { defineStore } from "pinia";
import {
  WalletCategoryResponse,
  SliderResponse,
  WalletResponse,
  WalletData,
} from "@/types/wallet";
import { Method, useApi } from "@/composables/api";
import { useApiAxios } from "~/composables/axios";

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface GiftRequest {
  wallet_id: number;
  days: number;
  phone: string;
  name: string;
}

interface WalletDetails {
  [key: string]: any;
}

interface WalletState {
  loading: boolean;
  noDataFound: boolean;
  error: string | null;
  walletCategories: Category[] | null;
  categories: WalletCategoryResponse[] | null;
  sliders: SliderResponse | null;
  walletDetails: WalletDetails;
  searchResult: WalletData[] | null;
  userWallets: WalletData[] | null;
  userWalletDetails: WalletData[] | null;
  walletByCategory: Category | null;
  userGiftDetails: giftDetails | null;
  giftData: giftDetails | null;
  loadingGift: boolean;
  loadingAcceptGift: boolean;
  loadingRejectGift: boolean;
}

interface UserInfo {
  name: string;
  email: string;
  mobile: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  mobile: number;
  avatar: Record<string, unknown>;
}

interface giftDetails {
  data: {
    id: number;
    days: number;
    name: string;
    img: string;
    status: number;
    mobile: number;
    to_date: string;
    wallet_name: string;
    features: unknown | null;
  };
  success: boolean;
}

export const useWalletStore = defineStore("wallet", {
  state: (): WalletState => ({
    loading: false,
    error: null,
    categories: null,
    walletCategories: null,
    sliders: null,
    walletDetails: null,
    searchResult: null,
    noDataFound: false,
    userWallets: null,
    userWalletDetails: null,
    walletByCategory: null,
    userGiftDetails: null,
    loadingGift: true,
    loadingAcceptGift: false,
    loadingRejectGift: false,
    giftData: null,
  }),

  actions: {
    async getWalletsCategories() {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApiAxios<WalletCategoryResponse>(
          "get",
          "/api/v1/wallets-categories"
        );

        if (response.data) {
          this.categories = response.data;
          return Promise.resolve(response.data);
        }
        return false;
      } catch (error) {
        this.error = "An unexpected error occurred";
        return Promise.resolve(error);
      } finally {
        this.loading = false;
      }
    },

    async getCategories() {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApiAxios<{ data: Category[] }>(
          "get",
          "/api/v1/wallets/categories"
        );

        if (response.data) {
          this.walletCategories = response.data;
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

    async getSliders() {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApiAxios<SliderResponse>(
          "get",
          "/api/v1/wallets/sliders"
        );

        if (response.data) {
          this.sliders = response.data;
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

    async getWalletDetails(walletId: number) {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApiAxios<WalletResponse>(
          "get",
          `/api/v1/wallet/details/${walletId}`
        );

        if (response.data) {
          console.log(response.data)
          this.walletDetails = response.data;
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

    async getWalletByCategory(category_id: number) {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApiAxios<{ data: Category[] }>(
          "get",
          `/api/v1/category/${category_id}/wallets`
        );

        if (response.data) {
          this.walletByCategory = response.data;
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

    async fetchWalletSearch(searchValue: string) {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApi<{ data: WalletData[] }>(
          `/api/v1/wallets-categories?search=${searchValue}`,
          Method.GET
        );

        if (response.data) {
          if (response.data.data.length < 1) {
            this.noDataFound = true;
          } else {
            this.noDataFound = false;
            this.categories = response.data.data;
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

    async fetchUserWallets() {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApiAxios<{ data: WalletData[] }>(
          "get",
          "/api/v1/account/user-wallets"
        );

        if (response.data) {
          this.userWallets = response.data;
          return true;
        }

        return false;
      } catch (error) {
        console.log("error", error.response.data.message);
        this.error = error.response.data.message;
        return false;
      } finally {
        this.loading = false;
      }
    },

    async getUserWalletDetails(walletId: number) {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApiAxios<WalletResponse>(
          "get",
          `/api/v1/account/user-wallets/${walletId}`
        );

        if (response.data) {
          this.userWalletDetails = response.data;
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

    async getUserWalletLogs(walletId: number) {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApiAxios<WalletResponse>(
          "get",
          `/api/v1/account/user-wallets/${walletId}/logs`
        );

        if (response) {
          this.userWalletLogs = response.data;
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

    async fetchSendGift(requestData: GiftRequest) {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApi<giftDetails>(
          `/api/v1/send-gift`,
          Method.POST,
          requestData
        );

        if (response) {
          this.giftData = response.data.data
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

    async fetchAcceptGift(giftId: number) {
      try {
        this.loadingAcceptGift = true;
        this.error = null;

        const response = await useApi<giftDetails>(
          `/api/v1/accept-gift`,
          Method.POST,
          { id: giftId }
        );

        if (response) {
          return true;
        }

        return false;
      } catch (error) {
        this.error = "An unexpected error occurred";
        return false;
      } finally {
        this.loadingAcceptGift = false;
      }
    },

    async fetchRejectGift(giftId: number) {
      try {
        this.loadingRejectGift = true;
        this.error = null;

        const response = await useApi<giftDetails>(
          `/api/v1/reject-gift`,
          Method.POST,
          { id: giftId }
        );

        if (response) {
          return true;
        }

        return false;
      } catch (error) {
        this.error = "An unexpected error occurred";
        return false;
      } finally {
        this.loadingRejectGift = false;
      }
    },

    async getUserGiftDetails(giftId: string) {
      this.loadingGift = true;
      this.error = null;
      try {
        const response = await useApiAxios<giftDetails>(
          "get",
          `/api/v1/gift/${giftId}`
        );
        if (response) {
          this.userGiftDetails = response.data;
          return true;
        }

        return false;
      } catch (error) {
        this.error = "An unexpected error occurred";
        return false;
      } finally {
        this.loadingGift = false;
      }
    },
  },
});
