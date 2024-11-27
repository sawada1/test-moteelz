<template>
  <div
    :class="[
      'flex-none rounded-lg  overflow-hidden',
      !isInCard ? 'w-fit h-fit' : 'sm:h-44 h-auto sm:w-auto w-full',
    ]"
  >
    <img
      class="w-full max-h-full object-cover rounded-lg"
      :src="image !== '' ? image : fallbackImage"
      alt="wallet_image"
      loading="lazy"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const fallbackImage = new URL("../../assets/images/3.jpg", import.meta.url).href;

const props = defineProps({
  isInCard: {
    type: Boolean,
  },
  image: {
    type: String,
    required: true,
  },
});
</script>
