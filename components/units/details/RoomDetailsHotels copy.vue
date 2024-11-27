<template>
  <div class="flex flex-col justify-evenly border-l">
    <div class="p-[25px] border-b md:mb-[20px] hidden md:block">
      <h1 class="text-[18px] md:text-[26px] text-[#191721] font-[600]">جناح جونيور</h1>
    </div>
    <div class="flex-row flex md:flex-col md:p-[40px] md:pt-[20px] md:rtl:pr-[20px] md:ltr:pl-[20px]">
      <div class="flex-col w-[50%] md:w-[300px]">
         <NuxtImg :src="img" class="md:rounded-md md:w-[500px] h-full w-[90%] object-cover" />
      </div>
      <div class="flex-col flex justify-center">
        <div class="p-[10px] border-b md:mb-[20px]">
        <h1 class="text-[20px] block md:hidden md:text-[26px] text-[#191721] font-[600]">جناح جونيور</h1>
      </div>
        <div>
          <span class="text-[10px] md:text-[13px] p-[5px_15px] border-[2px] mt-[20px] font-bold mb-[10px] text-[red] block w-fit border-[red] rounded-md">تبقى 3  غرف فقط</span>
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
          <div class="flex flex-wrap md:flex-col items-start gap-[15px] mt-[10px] mb-[10px]">
            <div class="flex gap-[5px] items-center">
              <Icon name="mdi:person" class="text-primary h-4 w-4 md:h-[25px] md:w-[25px]" />
              <span class="md:text-[15px] text-xs">
                {{ $t('content.room_capacity') }}
                {{ roomFeatures.capacity }}
              </span>
            </div>
            <div>
              <Icon name="mdi:bed-king" class="text-primary h-4 w-4 md:h-[25px] md:w-[25px]" />
              <span class="md:text-[15px] text-xs">
                {{ roomFeatures.bed }}
                {{ $t('content.bed') }}
              </span>
            </div>
          </div>
          <div class="flex flex-wrap md:flex-col items-start gap-[15px] mb-[20px]">
            <span class="flex items-center gap-x-2">
              <Icon name="mdi:bathtub" class="text-primary h-4 w-4 md:h-[25px] md:w-[25px]" />
              <span class="md:text-[15px] text-xs">{{ $t('content.tub') }}</span>
            </span>
            <span class="flex items-center gap-x-2">
              <Icon name="mdi:television" class="text-primary h-4 w-4 md:h-[25px] md:w-[25px]" />
              <span class="md:text-[15px] text-xs">{{ $t('content.tv') }}</span>
            </span>
            <span class="flex items-center gap-x-2">
              <Icon name="mdi:snowflake" class="text-primary h-4 w-4 md:h-[25px] md:w-[25px]" />
              <span class="md:text-[15px] text-xs">{{ $t('content.ac') }}</span>
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