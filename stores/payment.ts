import { defineStore } from "pinia";
import { Method, useApi } from "@/composables/api";
import { useRuntimeConfig } from "nuxt/app";


interface PaymentState {
  loading: boolean;
  error: string | null;
  paymentData: PaymentDataResponse | null;
  redirectPage: string | null;
}

interface WalletPurchaseRequest {
  wallet_id: string;
  days: number;
  platform: string;
}

interface PaymentDataResponse {
  data: {
    id: number;
    user_id: string;
    payment_id: string | null;
    wallet_id: number;
    paid_at: string | null;
    platform: "web" | "mobile" | string;
    days: number;
    total_price: number;
    price_day: number;
    tax_percent: number;
    currency: string;
  };
  callback_url: string;
}

export const usePaymentStore = defineStore("payment", {
  state: (): PaymentState => ({
    loading: false,
    error: null,
    paymentData: null,
    redirectPage: '',
  }),

  actions: {
    async fetchWalletPurchase(requestData: WalletPurchaseRequest) {
      try {
        this.loading = true;
        this.error = null;

        const response = await useApi<PaymentDataResponse>(
          "/api/v1/wallet/purchase",
          Method.POST,
          requestData
        );

        if (response) {
          this.paymentData = response.data;
          return Promise.resolve(response);
        }
        return false;
      } catch (error) {
        this.error = "An unexpected error occurred";
        return Promise.resolve(error);
      } finally {
        this.loading = false;
      }
    },

    async initiatePayment(
      paymentData: any,
      values: {
        year: any;
        month: any;
        name: any;
        cardNumber: any;
        cvv: any;
      }
    ) {
      const config = useRuntimeConfig();

      const apiKey = config.public.MOYASSAR_API_KEY as string;
      try {
        // Ensure callback_url is available from the paymentData

        // Prepare the payment payload for Moyasar API
        this.loading = true;
        this.error = null;

        const paymentPayload = {
          amount: paymentData.data.total_price
            ? paymentData.data.total_price * 100
            : paymentData.amount,
          currency: paymentData.data.currency
            ? paymentData.data.currency
            : paymentData.currency,
          description: paymentData.description
            ? paymentData.description
            : "Payment for order #",
          callback_url: paymentData.callback_url, // Pass the callback URL to the API
          source: {
            type: "creditcard",
            name: values.name,
            number: values.cardNumber,
            cvc: values.cvv,
            month: values.month,
            year: values.year,
          },
          publishable_api_key: apiKey,
        };

        const response = await useApi(
          "https://api.moyasar.com/v1/payments",
          Method.POST,
          paymentPayload
        );

        if (response) {
          if (process.client) {
            window.location.href = response.data.source.transaction_url;
            this.redirectPage = 'wallet'
          }
        } else {
          return false;
        }
      } catch (error) {
        return false;
      } finally {
        this.loading = false;
      }
    },

    async initiatePaymentBooking(
      paymentData: any,
      values: {
        year: any;
        month: any;
        name: any;
        cardNumber: any;
        cvv: any;
      }
    ) {
      const config = useRuntimeConfig();

      const apiKey = config.public.MOYASSAR_API_KEY as string;
      try {
        // Ensure callback_url is available from the paymentData

        // Prepare the payment payload for Moyasar API
        this.loading = true;
        this.error = null;

        const paymentPayload = {
          amount: paymentData.amount,
          currency: paymentData.currency,
          description: paymentData.description,
          callback_url: paymentData.callback_url,
          source: {
            type: "creditcard",
            name: values.name,
            number: values.cardNumber,
            cvc: values.cvv,
            month: values.month,
            year: values.year,
          },
          publishable_api_key: apiKey,
        };

        const response = await useApi(
          "https://api.moyasar.com/v1/payments",
          Method.POST,
          paymentPayload
        );

        if (response) {
          if (process.client) {
            window.location.href = response.data.source.transaction_url;
            this.redirectPage = 'booking'
          }
        } else {
          return false;
        }
      } catch (error) {
        return false;
      } finally {
        this.loading = false;
      }
    },

  },
});
