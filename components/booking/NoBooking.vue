<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="flex flex-col items-center gap-4">
      <IconNoBooking />
      <b class="text-lg">{{ $t("hosting.estates.noBookings") }} </b>
      <span class="text-textLightGray">
        {{ $t("about.mobileAppNormalUsers.desc") }}
      </span>
    </div>
  </div>
</template>

<script setup>
import IconNoBooking from "../icon/IconNoBooking.vue";
</script>
