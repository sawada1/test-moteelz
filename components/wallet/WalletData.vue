<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-6 rounded-lg p-2 custom_shadow">
      <h3 class="font-bold text-lg md:text-2xl text-primary">
        {{ isOrderWallet ? $t("content.Features") : $t("content.overview") }}
      </h3>
      <div
        class="flex md:items-center gap-4 md:flex-row md:flex-wrap flex-col items-start"
      >
        <div
          class="flex gap-2 items-start w-full flex-col md:flex-row"
        >
          <span class="flex-none mt-2"
            >{{ $t("content.availableCountries") }}:</span
          >
          <div class="flex flex-wrap gap-2 items-center">
            <span
              v-for="country in walletStore.walletDetails?.countries"
              :key="country.apiId"
              class="py-2 px-4 rounded-md text-sm cursor-pointer bg-borderLightColor"
              >{{ country.name }}</span
            >
          </div>
        </div>

        <div
          class="flex gap-4 items-start w-full flex-col md:flex-row"
        >
          <span class="flex-none mt-2">{{ $t("content.availableCity") }}:</span>
          <div class="flex flex-wrap gap-2 items-center">
            <span
              v-for="city in walletStore.walletDetails?.cities"
              :key="city.apiId"
              class="py-2 px-4 text-primary rounded-md text-sm cursor-pointer bg-borderLightColor"
              >{{ city.name }}</span
            >
          </div>
        </div>

        <div class="flex gap-4 items-start w-full">
          <span class="flex-none mt-2">{{ $t("content.Validity") }} :</span>
          <span
            class="py-2 px-4 rounded-md text-sm cursor-pointer bg-borderLightColor"
            >{{ walletStore.walletDetails?.periodInMonth }}
            {{ $t("content.Months") }}</span
          >
        </div>

        <div class="flex gap-4 items-start w-full">
          <span class="flex-none mt-2">{{ $t("content.expiry_date") }} :</span>
          <span
            class="py-2 px-4 text-burgundy rounded-md text-sm cursor-pointer bg-borderLightColor"
            >{{ formatDateInArabic(walletStore.walletDetails?.expiry_date) }}</span
          >
        </div>

      </div>
      <div
        class="flex items-center flex-wrap gap-4"
      >
        <div
          v-for="feature in walletStore.walletDetails?.Wallet_features"
          :key="feature.id"
          class="flex items-center gap-2"
        >
          <span><IconConfirmed /></span
          ><span class="text-sm">{{ feature.name }}</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6 p-2 rounded-lg custom_shadow">
      <h3 class="font-bold text-lg md:text-2xl text-primary">
        {{ $t("content.walletData") }}
      </h3>
      <p class="leading-normal">
        {{ walletStore.walletDetails?.description }}
      </p>
    </div>

    <div
      class="flex flex-col gap-6 mb-6 rounded-lg p-2 custom_shadow"
    >
      <h3 class="font-bold text-lg md:text-2xl text-primary">
        {{ $t("content.policies_and_rules") }}
      </h3>
      <div class="flex flex-col gap-2">
        <p v-for="police in walletStore.walletDetails?.Wallet_policies" :key="police.id">
          {{ police.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconConfirmed from "@/components/icon/IconConfirmed";
import { useWalletStore } from "@/stores/wallet";
import {formatDateInArabic} from '@/lib/utils'

const walletStore = useWalletStore();

// Define props
const props = defineProps({
  isOrderWallet: {
    type: Boolean,
    default: false,
  },
});
</script>
