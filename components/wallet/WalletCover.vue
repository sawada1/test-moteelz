<template>
  <swiper
    :loop="true"
    :autoplay="{ delay: 5000, disableOnInteraction: false }"
    :slidesPerView="1"
    spaceBetween="10"
    :pagination="{ clickable: true }"
    :navigation="{
      nextEl: `.slider-product-image-next-${index}`,
      prevEl: `.slider-product-image-prev-${index}`,
    }"
    :modules="[SwiperNavigation, SwiperAutoplay, SwiperPagination]"
  >
    <swiper-slide v-for="(item) in walletStore.sliders" :key="item.id">
      <div class="rounded-lg overflow-hidden w-full h-auto">
        <!-- Desktop Image - visible on md screens and above -->
        <img
          v-if="width >= 768"
          :src="item.slider_image"
          :alt="item.title"
          class="w-full h-full object-cover md:block hidden"
        />

        <!-- Mobile Image - visible below md screens -->
        <img
          v-else
          :src="item.slider_mobile_image"
          :alt="item.title"
          class="w-full h-full object-cover block md:hidden"
        />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { onMounted } from "vue";
import { useWindowSize } from "@vueuse/core";
import { useWalletStore } from "@/stores/wallet";

// Import and use wallet store
const walletStore = useWalletStore();

// Ensure sliders data is fetched when component is mounted
onMounted(async () => {
  await walletStore.getSliders();
});

// Use VueUse's useWindowSize() to track screen width directly
const { width } = useWindowSize();
</script>
