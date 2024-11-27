<template>
  <div class="container pt-8 mb-20 xl:mb-0">
    <div
      v-if="!walletStore?.categories"
      class="grid place-items-center"
      :style="{ height: 'calc(100vh - 362px)' }"
    >
      <pending />
    </div>

    <div v-else class="w-full">
      <WalletCover />
      <div class="flex flex-col md:flex-row gap-4 items-center mt-8">
        <WalletSearch />
        <WalletCategories />
      </div>

      <div
        class="my-8"
        v-for="wallet in walletStore?.categories"
        :key="wallet.id"
      >
        <!-- Wallet Header -->
        <div class="w-full flex justify-between gap-4 mb-4">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 flex-none">
              <img
                class="w-full h-full flex-none"
                :src="wallet.icon"
                alt="icon_image"
              />
            </span>
            <h3 class="font-bold text-xl">{{ wallet.name }}</h3>
          </div>
          <span
            @click="
              navigateTo(localPath(`/wallet/wallet-category-${wallet.id}`))
            "
            class="text-primary cursor-pointer"
          >
            {{ $t("content.show_all") }}
          </span>
        </div>

        <!-- Swiper Carousel -->
        <div class="relative">
          <button
            class="absolute -translate-y-1/2 right-[-30px] top-1/2 slider-wallet-next z-10"
          >
            <!-- <IconNext color="#000"></IconNext> -->
            <IconArrowNext></IconArrowNext>
          </button>
          <button
            class="absolute -translate-y-1/2 left-[-30px] top-1/2 slider-wallet-prev z-10"
          >
            <!-- <IconPrev color="#000"></IconPrev> -->
            <IconArrowPrev></IconArrowPrev>
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
              v-for="packageItem in wallet.wallets"
              :key="packageItem.id"
              class="my-4"
            >
              <WalletCard :walletData="packageItem" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div
        v-if="walletStore?.noDataFound && walletStore?.categories.length === 0"
      >
        {{ $t("content.no_data_search") }}
      </div>
    </div>
  </div>
</template>

<script setup>
import WalletCover from "../../components/wallet/WalletCover";
import WalletCategories from "../../components/wallet/WalletCategories";
import WalletSearch from "../../components/wallet/WalletSearch";
import WalletCard from "../../components/wallet/WalletCard";
import pending from "../../components/core/pending.vue";
import { onMounted, watch, ref } from "vue";
import { useWalletStore } from "../../stores/wallet";
import { swiperBreakpoints } from "../../lib/utils";
import { navigateTo } from "nuxt/app";
const { t } = useI18n();
useHead({
  title: t('header.wallet'),
  meta: [
    { name: 'description', content: t('') }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: '' } ]
}) 
const localPath = useLocalePath();

// Get wallet store instance
const walletStore = useWalletStore();

// Computed property to reactively bind to walletStore.categories
const categories = ref([]);

// Fetch data when the component mounts
onMounted(async () => {
  await walletStore.getWalletsCategories();
});
// Watch the categories data for changes
watch(
  () => walletStore.categories,
  (newCategories) => {
    categories.value = newCategories;
  }
);
</script>
