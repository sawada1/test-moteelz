<template>
  <div class="flex flex-col justify-evenly">
    <div class="flex-row flex">
      <div class="flex-col md:w-44 w-[30%]">
         <NuxtImg :src="img" class="rounded-md md:h-[120px] h-[80px] md:w-40 w-[90%]" />
      </div>
      <div class="flex-col flex justify-center">
        <div>
          <span class="font-medium md:text-lg text-base">{{
            roomName.replace(/\d+/g, '')
          }}</span>
        </div>
        <div class="row" v-if="roomFeatures.hotel_name">
          <span class="text-gray-500">
            {{ roomFeatures.hotel_name }}
          </span>
          <span class="text-gray-500">

            (
            <Icon
              v-for="star in roomFeatures.stars"
              name="mdi:star"
              :key="star"
              class="!text-yellow-500 md:h-4 md:w-4 h-2 w-2"
            />
            <Icon
              v-for="star in 5-(roomFeatures.stars)"
              name="mdi:star"
              :key="star"
              class="!text-gray-300 md:h-4 md:w-4 h-2 w-2"
            />
            )
          </span>
        </div>
        <div>
          <div class="flex flex-row items-center gap-x-2">
            <Icon name="mdi:person" class="text-primary h-4 w-4 md:h-6 md:w-6" />
            <span class="md:text-sm text-xs">
              {{ $t('content.room_capacity') }}
              {{ roomFeatures.capacity }}
            </span>
            <Icon name="mdi:bed-king" class="text-primary h-4 w-4 md:h-6 md:w-6" />
            <span class="md:text-sm text-xs">
              {{ roomFeatures.bed }}
              {{ $t('content.bed') }}
            </span>
          </div>
          <div class="flex flex-row items-center gap-x-2">
            <span class="flex items-center gap-x-2">
              <Icon name="mdi:bathtub" class="text-primary h-4 w-4 md:h-6 md:w-6" />
              <span class="md:text-sm text-xs">{{ $t('content.tub') }}</span>
            </span>
            <span class="flex items-center gap-x-2">
              <Icon name="mdi:television" class="text-primary h-4 w-4 md:h-6 md:w-6" />
              <span class="md:text-sm text-xs">{{ $t('content.tv') }}</span>
            </span>
            <span class="flex items-center gap-x-2">
              <Icon name="mdi:snowflake" class="text-primary h-4 w-4 md:h-6 md:w-6" />
              <span class="md:text-sm text-xs">{{ $t('content.ac') }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  roomFeatures: Object,
  img: String,
  roomName: String
})
</script>