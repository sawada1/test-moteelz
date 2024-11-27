<template>
  <div :class="`h-[${height}px] bg-gray-300 rounded-lg relative overflow-hidden`">
    <div
      class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"
    ></div>
  </div>
</template>
<script setup>
  const props = defineProps({
    height: {
      type: String,
      default: '24'
    }
  })
</script>
