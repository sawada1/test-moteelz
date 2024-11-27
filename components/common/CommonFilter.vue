<template>
    <div>
        <div
        @click="store.showModalFilter = true"
      class="fixed-search  !top-0 !right-0 !left-0 !w-full"
      :class="{'!relative': !activeNav , 'fixed': activeNav }"
    >
      <div class="flex items-center gap-2">
        <NuxtImg src="/searchIcon1.svg" width="17"></NuxtImg>
        <div class="text flex items-start flex-col gap-1">
            <h6 class="text-primary font-bold"> {{ store.cityObj.name != "" ? store.cityObj.name : $t('content.selectedLocation')}}   </h6>
            <div class="dates flex flex-wra items-center gap-2">
                <div class="flex items-center gap-2">
                    <NuxtImg src="/datee1.svg" width="15"></NuxtImg>
                    <span class="text-[#929292] text-[10px]"> {{ store.searchObj.checkIn }} </span>
                </div>
                <div class="flex items-center gap-2">
                    <NuxtImg src="/datee1.svg" width="15"></NuxtImg>
                    <span class="text-[#929292] text-[10px]"> {{ store.searchObj.checkOut }} </span>
                </div>
                <div class="flex items-center gap-2">
                    <NuxtImg src="/userr1.svg" width="15"></NuxtImg>
                    <span class="text-[#929292] text-[10px]"> {{ store.totalRoomsLength }} {{ $t('content.bedrooms') }} , {{ store.totalAdults }} {{ $t('content.adults') }} </span>
                </div>
            </div>
        </div>
      </div>
    </div> 
    <CommonMainFilter v-if="store.showModalFilter"></CommonMainFilter>
    </div>
</template>
<script setup>
import { generalStore } from '@/stores/general'
let store = generalStore();
let showModal = ref(false);
let activeNav = ref(false);
onMounted(() => {
    window.addEventListener("scroll", function () {
    if (this.window.scrollY >= 200) {
      activeNav.value = true;
    } else if (window.scrollY == 0) {
      activeNav.value = false;
    }
    // if (this.window.scrollY >= 300) {
    //   arrowActive.value = true;
    // } else if (window.scrollY == 0) {
    //   arrowActive.value = false;
    // }
  });
});
</script>
<style lang="">
    
</style>