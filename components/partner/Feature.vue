<template>
  <div
    class="flex flex-col text-center items-center justify-start md:justify-center rounded-xl outline outline-dark/10 outline-1 outline-offset-[-1px] overflow-hidden min-h-[180px] md:min-h-[250px] hover:outline-burgundy hover:shadow hover:scale-105 hover:bg-[rgba(171,0,83,0.03)] transition-all duration-300"
  >
    <div class="flex flex-row w-full items-center justify-center">
      <NuxtImg
        class="w-[50px] h-[50px] md:w-[60px] md:h-[60px] text-center mt-6"
        :src="img"
        alt="alt text"
      />
    </div>
    <div class="flex flex-row w-full items-center justify-center">
      <h2
        class="flex items-center justify-end font-semibold mt-2 text-burgundy text-sm md:text-lg"
      >
        {{ title }}
      </h2>
    </div>
    <div class="flex flex-row w-full items-center justify-center">
      <h3 class="text-dark/70 text-xs md:text-base md:px-10 my-2 px-3">
        {{ description }}
      </h3>
    </div>
  </div>
</template>

<script setup>
defineProps({
  img: String,
  title: String,
  description: String,
  id: Number,
});
</script>
