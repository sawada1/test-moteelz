<template>
  <div class="pb-20 xl:pb-0">
    <div
      v-if="walletStore?.loading"
      class="grid place-items-center"
      :style="{ height: 'calc(100vh - 362px)' }"
    >
      <pending />
    </div>
    <div v-else class="flex flex-col gap-4">
      <div class="w-full bg-primary h-32 flex items-center">
        <div class="container">
          <h3 class="text-white font-bold text-2xl">
            {{ walletStore?.walletByCategory?.name }}
          </h3>
        </div>
      </div>
      <div class="flex items-center gap-2 container">
        <span class="w-6 h-6 flex-none">
          <img
            class="w-full h-full flex-none"
            :src="walletStore?.walletByCategory?.icon"
            alt="icon_image"
          />
        </span>
        <h3 class="text-primary font-bold text-2xl">
          {{ walletStore?.walletByCategory?.name }}
        </h3>
      </div>
      <div class="relative container">
        <button
          class="absolute -translate-y-1/2 right-0 top-1/2 slider-wallet-next z-10"
        >
          <IconNext color="#000"></IconNext>
        </button>
        <button
          class="absolute -translate-y-1/2 left-0 top-1/2 slider-wallet-prev z-10"
        >
          <IconPrev color="#000"></IconPrev>
        </button>
        <swiper
          :navigation="{
            nextEl: '.slider-wallet-next',
            prevEl: '.slider-wallet-prev',
          }"
          :breakpoints="swiperBreakpoints"
          :modules="[SwiperNavigation, SwiperAutoplay]"
          :loop="true"
          :slidesPerView="2"
          spaceBetween="16"
        >
          <swiper-slide
            v-for="wallet in walletStore?.walletByCategory?.wallets"
            :key="wallet.id"
            class="my-4"
          >
            <WalletCard :walletData="wallet" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useWalletStore } from "@/stores/wallet";
import { onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import WalletCard from "@/components/wallet/WalletCard.vue";
import pending from "@/components/core/pending.vue";
import { swiperBreakpoints } from "@/lib/utils";
 
// Get wallet store instance
const walletStore = useWalletStore();
const route = useRoute();

// const walletsExist = computed(() => walletStore?.walletByCategory?.wallets);
// const categoryData = computed(() => walletStore?.walletByCategory);

// Fetch data initially on component mount
onMounted(async () => {
  await walletStore.getWalletByCategory(route.params.id);
});

// Watch for changes in route ID and refetch data if it changes
watch(
  () => route.params.id,
  (newId) => {
    console.log("walletStore?.walletByCategory", walletStore?.walletByCategory)
  }
);
</script>
