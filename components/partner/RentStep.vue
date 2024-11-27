<template>
  <div class="text-black border border-bg_lightgray p-3 rounded-xl flex w-full my-3">
    <div class="w-[10%] flex items-center justify-start">
      <div
        class="bg-burgundy rounded-full w-8 h-8 p-2 overflow-hidden text-white justify-center flex items-center font-semibold"
      >
        {{ id }}
      </div>
    </div>
    <div
      class="w-[80%] flex items-center justify-start mx-4 md:mx-1 md:text-lg text-[14px] text-start text-dark/80"
    >
      {{ title }}
    </div>
    <div class="w-[10%] flex items-center justify-end">
      <NuxtImg :src="img" class="h-8" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  img: String,
  title: String,
  id: Number,
});
</script>
