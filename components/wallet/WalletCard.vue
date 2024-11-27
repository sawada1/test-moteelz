<template>
  <div class="w-full h-full custom-shadow rounded-lg">
    <div class="bg-white flex flex-col rounded-lg p-4 h-full">
      <WalletImage :image="walletData.wallet_image" />

      <div class="flex flex-col gap-4 mt-4 h-full">
        <div class="flex flex-col gap-2 h-full">
          <div class="items-center justify-between flex-wrap flex gap-2">
            <div class="flex items-center gap-1">
              <span class="text-textLightGray text-sm"
                >{{ $t("content.night_counts") }} :</span
              >
              <span
                class="flex items-center gap-1 font-bold text-primary_dark text-sm"
                ><span>{{
                  getNightLabel(walletData?.numbers_of_days[0], $t)
                }}</span></span
              >
            </div>

            <span class="flex items-center gap-2">
              <span class="text-textLightGray text-sm"
                >{{ $t("content.price") }} :</span
              >
              <div
                class="flex items-center gap-1 font-bold text-primary text-sm"
              >
                <span>{{
                  new Intl.NumberFormat().format(
                    walletData?.price * +walletData?.numbers_of_days[0]
                  )
                }}</span>
                <span>{{ $t("fillter.currency") }}</span>
              </div>
            </span>
          </div>

          <div
            v-if="walletData?.features_favorites.length > 0"
            class="flex flex-col gap-2 mt-2"
          >
            <div
              v-for="feature in walletData?.features_favorites"
              :key="feature.id"
            >
              <div class="flex items-start gap-2 w-full">
                <span><IconConfirmed /></span
                ><span class="text-xs">{{ feature?.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <span
            class="bg-primary cursor-pointer text-sm text-white px-6 py-2 rounded-lg font-semibold w-full text-center"
            @click="
              navigateTo(localPath(`/wallet/wallet-details/${walletData?.id}`))
            "
          >
            {{ $t("content.buy_now") }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import WalletImage from "./WalletImage.vue";
import IconConfirmed from "../../components/icon/IconConfirmed.vue";
import { defineProps } from "vue";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { navigateTo } from "nuxt/app";

const localPath = useLocalePath();

// Define props
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  walletData: {
    type: Object,
    required: true,
  },
});

function getNightLabel(nightCount, $t) {
  // Check if night count is 1 to return label without the number
  if (nightCount === 1) {
    return $t("labels.night");
  }

  // For counts other than 1, include the count with the label
  const label = nightCount <= 10 ? $t("labels.nights") : $t("labels.night");
  return `${nightCount} ${label}`;
}
</script>

<style scoped>
.swiper-slide {
  height: auto !important;
}
</style>
