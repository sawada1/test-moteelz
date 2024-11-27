<template>
  <div>
    <div class="flex flex-col gap-8 p-2">
      <h3
        :class="[
          'font-bold text-lg md:text-2xl',
          isDarkTitle ? 'text-primary_dark' : 'text-primary',
        ]"
      >
        {{ $t("content.payment_details") }}
      </h3>
      <div class="flex items-center gap-4 cursor-pointer">
        <div class="flex items-center gap-1">
          <div class="custom-radio">
            <input
              type="radio"
              id="payment"
              name="payment_method"
              value="payment"
              checked
            />
            <label for="payment" class="checkmark"></label>
          </div>
          <label for="payment" class="md:text-base text-sm text-textColor">{{
            $t("content.paymentDataTitle")
          }}</label>
        </div>
        <div>
          <img src="../../assets/images/Frame 912.svg" alt="payment_methods" />
        </div>
      </div>
      <form class="w-full space-y-4">
        <!-- Cardholder's Name -->

        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel class="font-bold text-textColor"
              >{{ $t("labels.card_name") }}
              <span class="text-error">*</span></FormLabel
            >
            <FormControl>
              <Input
                type="text"
                :placeholder="$t('labels.card_name_placeholder')"
                v-bind="componentField"
                class="border border-bg_lightgray focus:border-primary focus-visible:ring-0"
              />
            </FormControl>
            <FormMessage class="text-error" />
          </FormItem>
        </FormField>
        <!-- Card Number -->
        <FormField v-slot="{ componentField }" name="cardNumber">
          <FormItem>
            <FormLabel class="font-bold text-textColor"
              >{{ $t("content.card_number") }}
              <span class="text-error">*</span></FormLabel
            >
            <FormControl>
              <Input
                type="text"
                placeholder="1234 1234 1234 1234"
                v-bind="componentField"
                class="border border-bg_lightgray focus:border-primary focus-visible:ring-0"
              />
            </FormControl>
            <FormMessage class="text-error" />
          </FormItem>
        </FormField>

        <div class="flex flex-col gap-2">
          <div class="font-bold text-sm text-textColor">
            {{ $t("labels.expiry") }} <span class="text-error">*</span>
          </div>
          <div class="flex items-center gap-2 w-full">
            <FormField v-slot="{ componentField }" name="month">
              <FormItem class="w-full">
                <FormControl>
                  <!-- Dropdown for Month -->
                  <Select v-bind="componentField">
                    <SelectTrigger>
                      <SelectValue
                        class="w-full text-end px-2"
                        :placeholder="$t('content.month')"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="month in months"
                          :key="month.value"
                          :value="month.value"
                        >
                          <SelectLabel>{{ month.label }}</SelectLabel>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage class="text-error" />
              </FormItem>
            </FormField>

            <span class="text-xl">/</span>

            <FormField v-slot="{ componentField }" name="year">
              <FormItem class="w-full">
                <FormControl>
                  <!-- Dropdown for Month -->
                  <Select name="year" v-bind="componentField">
                    <SelectTrigger>
                      <SelectValue
                        class="w-full text-end px-2"
                        :placeholder="$t('content.year')"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="year in years"
                          :key="year"
                          :value="year.toString()"
                        >
                          <SelectLabel>{{ year }}</SelectLabel>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage class="text-error" />
              </FormItem>
            </FormField>
          </div>
        </div>

        <!-- CVV -->
        <FormField v-slot="{ componentField }" name="cvv">
          <FormItem>
            <FormLabel class="font-bold text-textColor"
              >{{ $t("content.enter_otp") }}
              <span class="text-error">*</span>
            </FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="***"
                v-bind="componentField"
                class="border border-bg_lightgray focus:border-primary focus-visible:ring-0"
              />
            </FormControl>
            <FormMessage class="text-error" />
          </FormItem>
        </FormField>

        <!-- Submit Button -->
        <Button
          class="w-full text-white font-bold flex items-center justify-center"
          v-if="!isAuthenticated"
          @click.prevent="openModalAuth"
        >
          {{ $t("content.pay_now") }}
        </Button>
        <Button
          v-else
          @click.prevent="onSubmit"
          class="w-full text-white font-bold flex items-center justify-center"
          :disabled="paymentStore?.loading"
        >
          <template v-if="paymentStore?.loading">
            <Loader2 class="w-4 h-4 mx-2 animate-spin" />
            {{ $t("content.waiting") }}
          </template>
          <template v-else>
            {{ $t("content.pay_now") }}
          </template>
        </Button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { defineProps, computed, ref } from "vue";
import { useForm } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useAuthStore } from "@/stores/auth";
import { usePaymentStore } from "@/stores/payment";
import { useWalletStore } from "@/stores/wallet";
// import { useCheckout } from "@/stores/checkout";

import { useI18n } from "vue-i18n";
import { Loader2 } from "lucide-vue-next";
import { boolean } from "zod";

const { t } = useI18n();
const authStore = useAuthStore();
const paymentStore = usePaymentStore();
const walletStore = useWalletStore();
const checkOutStore = useCheckout();

const isAuthenticated = computed(() => authStore.isAuthenticated);

const props = defineProps({
  nightCount: {
    type: Number,
    default: 0,
  },
  isDarkTitle: {
    type: boolean,
    default: false,
  },
  booking: {
    type: boolean,
    default: false,
  },
});

const months = ref([
  { value: "01", label: "01" },
  { value: "02", label: "02" },
  { value: "03", label: "03" },
  { value: "04", label: "04" },
  { value: "05", label: "05" },
  { value: "06", label: "06" },
  { value: "07", label: "07" },
  { value: "08", label: "08" },
  { value: "09", label: "09" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
]);

const years = ref(
  Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i)
);

// Validation schema using Zod
const formSchema = toTypedSchema(
  z.object({
    name: z
    .string({
    required_error: t("errors.required"),
    invalid_type_error: t("content.cardNameError"),
  })
  .nonempty({ message: t("content.cardNameError") })
  .min(3, { message: t("content.cardNameError") })
  .refine(
    (value) => !/[\u0600-\u06FF]/.test(value),
    { message: t("content.noArabicAllowedError") }
  ),

    cardNumber: z
      .string({
        required_error: t("errors.required"),
        invalid_type_error: t("content.cardNumberError"),
      })
      .nonempty({ message: t("content.cardNumberError") })
      .regex(/^[0-9]{16}$/, { message: t("content.cardNumberError") }),

    month: z
      .string({
        required_error: t("errors.required"),
      })
      .nonempty({ message: t("errors.required") }),

    year: z
      .string({
        required_error: t("errors.required"),
      })
      .nonempty({ message: t("errors.required") }),

    cvv: z
      .string({
        required_error: t("errors.required"),
        invalid_type_error: t("content.cvvError"),
      })
      .nonempty({ message: t("content.cvvError") })
      .regex(/^[0-9]{3,4}$/, { message: t("content.cvvError") }),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
});

const openModalAuth = () => {
  authStore.showModal = true;
};
// Submit handler
const onSubmit = handleSubmit(async (values) => {
  if (props.booking) {
    await paymentStore.initiatePaymentBooking(checkOutStore.bookData, values);
  } else {
    await paymentStore.fetchWalletPurchase({
      wallet_id: walletStore?.walletDetails.id,
      days: props.nightCount,
      platform: "web",
    });
    await paymentStore.initiatePayment(paymentStore.paymentData, values);
  }
});
</script>

<style scoped>
/* Keep your custom styles */
</style>
