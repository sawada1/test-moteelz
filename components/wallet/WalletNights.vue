<template>
  <div
    class="sm:px-4 py-8 p-0 rounded-lg flex flex-col sm:flex-row gap-4 w-full shadow-none md:shadow-customShadow"
  >
    <WalletImage :image="walletStore.walletDetails.wallet_image" :isInCard="true" />
    <div class="flex flex-col gap-4 w-full">
      <div class="flex justify-between items-center w-full">
        <h4 class="font-bold text-lg md:text-2xl text-primary">
          {{ walletStore.walletDetails?.name }}
        </h4>
      </div>
      <!-- Fixed quarter options using the restored loop logic -->
      <div>
        <div class="mb-4">{{ $t("content.night_counts") }} :</div>
        <div class="flex flex-wrap gap-4">
          <span
            v-for="n in walletStore.walletDetails?.numbers_of_days"
            :key="n"
            :class="[
              'py-2 px-4 rounded-md text-sm cursor-pointer',
              selectedNights === n
                ? 'bg-primary text-white'
                : 'bg-borderLightColor',
            ]"
            @click="selectNights(n)"
          >
            {{ n }} {{ n <= 10 ? $t("labels.nights") : $t("labels.night") }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import WalletImage from "@/components/wallet/WalletImage";
import { useWalletStore } from "@/stores/wallet";

const walletStore = useWalletStore();

const selectedNights = ref(0);

const props = defineProps({
  isInCard: {
    type: Boolean,
  },
});

const emits = defineEmits(["updateSelectedNight"]);

// Handle selection of nights from fixed options (quarters)
const selectNights = (nights) => {
  selectedNights.value = nights;
  emits("updateSelectedNight", nights);
};

watch(
  () => walletStore.walletDetails,
  (newDetails) => {
    if (walletStore?.walletDetails?.numbers_of_days.length) {
      selectNights(walletStore.walletDetails.numbers_of_days[0]);
    }
  },
  { immediate: true }
);
</script>
