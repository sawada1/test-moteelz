<template>
  <div class="w-full">
    <!-- Show All Items Button -->
    <!-- <div class="w-full flex justify-between gap-4 mb-4">
      <h4 class="font-bold text-xl">{{ $t("content.sections") }}</h4>
      <div @click="openModal" class="text-primary cursor-pointer">
        {{ $t('content.show_more') }}
      </div>
      <DialogTrigger as-child>
        <span class="w-4 h-4 cursor-pointer rounded-full border border-textLightGray flex items-center justify-center">
          <small class="text-textLightGray text-xs">Show All</small>
        </span>
      </DialogTrigger>
    </div> -->

    <!-- Carousel Component -->
    <div class="relative">
      <button
        class="absolute -translate-y-1/2 right-0 top-1/2 slider-next z-10"
      >
        <IconNext color="#000"></IconNext>
      </button>
      <button class="absolute -translate-y-1/2 left-0 top-1/2 slider-prev z-10">
        <IconPrev color="#000"></IconPrev>
      </button>
      <swiper
        :navigation="{
          nextEl: '.slider-next',
          prevEl: '.slider-prev',
        }"
        :breakpoints="{
          '640': {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          '768': {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          '1024': {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }"
        :modules="[SwiperNavigation, SwiperAutoplay]"
        :loop="true"
        :slidesPerView="3"
        spaceBetween="16"
      >
        <swiper-slide
          v-for="item in walletStore.walletCategories"
          :key="item.id"
        >
          <span
            @click="
              navigateTo(localPath(`/wallet/wallet-category-${item.id}`))
            "
            class="flex flex-col cursor-pointer md:border-white border border-bg_lightgray hover:bg-primary md:hover:bg-transparent md:hover:text-primary hover:text-white md:bg-transparent md:rounded-none rounded-lg p-2 md:py-0 md:flex-row items-center gap-2 transition-all duration-200 ease-in-out slide-link"
          >
            <span
              class="w-8 h-8 flex-none rounded-full flex items-center justify-center bg-white"
            >
              <img
                class="w-6 h-6 flex-none"
                :src="item.icon"
                alt="icon_image"
              />
            </span>
            <span class="flex-none">{{ item.name }}</span>
          </span>
        </swiper-slide>
      </swiper>
    </div>

    <Dialog>
      <DialogContent>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <NuxtLink
            v-for="item in walletStore.walletCategories"
            :key="item.id"
            :to="`wallet/${item?.id}`"
            class="flex flex-col items-center gap-2 bg-gray-200 rounded-lg shadow py-4"
          >
            <span class="w-6 h-6 flex-none">
              <img
                class="w-full h-full flex-none"
                :src="item.icon"
                alt="icon_image"
              />
            </span>
            <span>{{ item.name }}</span>
          </NuxtLink>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { useWalletStore } from "@/stores/wallet";
import { onMounted, onUnmounted } from "vue";
import { navigateTo } from "nuxt/app";

const localPath = useLocalePath();

const walletStore = useWalletStore();

const isMediumScreen = ref(false);

const handleResize = () => {
  isMediumScreen.value = window.innerWidth >= 768;
};

onMounted(async () => {
  window.addEventListener("resize", handleResize);
  handleResize();
  // Fetch categories and log them
  await walletStore.getCategories();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
