<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  bgName: {
    type: String,
    required: true,
  },
});

 
</script>

<template>
    <div :class="`relative w-full ${bgName} bg-cover bg-center after:content-[''] after:absolute after:w-full after:h-full after:bg-[hsl(259,85%,66%,0.5)] h-80 after:bg-opacity-5 flex flex-col gap-4 justify-center items-center`" >
      <div class="relative z-20 text-center">
        <h2 class="text-4xl mt-6 font-bold text-center">
          <span class="text-white">{{ $t(`${title}`) }}</span>
        </h2>
        <h5>
          <span class="text-white">     
        <NuxtLink to="/" class="text-white">{{$t('header.home')}} /</NuxtLink>  
        {{ $t(`${title}`) }}
        </span>

      
        </h5>
      </div>
    </div>
  </template>