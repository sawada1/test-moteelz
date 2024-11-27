<template>
    <div>
        <h3 class="text-[#161B33] text-[22px]"> {{ $t('content.loginAndSecurity') }} </h3>
        <div>
            <div class="text flex items-center text-center mt-10 justify-center flex-col gap-2">
                <h4 class="text-[#161B33] text-[22px]"> {{ $t('content.devices1') }} </h4>
                <p class="w-full xl:w-[329px] lg:w-[329px] md:w-[329px] text-[#7B7B7B]"> {{ $t('content.devices2') }}</p>
            </div>
            <div v-if="store.devices" class="grid grid-cols-1 gap-4 xl:grid-cols-2 mt-10 lg:grid-cols-2 security-cards">
                <div v-for="item in store.devices" class="card-container bg-[#FBFBFB] rounded-[16px] border-[1px] border-[#F1F1F1]">
                    <div class="head p-[16px] flex items-center justify-between">
                        <div class="image flex items-center gap-4">
                            <div class="icon h-[56px] w-[56px] flex items-center justify-center bg-white rounded-full">
                                <!-- <NuxtImg src="/icons/device1.svg" class="w-[28px] h-[28px]"></NuxtImg> -->
                                <NuxtImg :src="item?.icon?.device" class="w-[28px] h-[28px]"></NuxtImg>
                            </div>
                            <h6 class="text-[#161B33] font-medium text-[14px] w-[fit-content] xl:w-[145px] lg:w-[145px]" v-if="item?.type == 'desktop'"> {{ $t('content.type1') }} {{ item?.platform }} </h6>
                                <h6  class="text-[#161B33] font-medium text-[14px] w-[fit-content] xl:w-[145px] lg:w-[145px]" v-if="item?.type == 'phone'"> {{ $t('content.type2') }} {{ item?.platform }} </h6>
                        </div>
                        <button
                          @click="store.getOutFromDevice(item?.id)"
                            class="h-[40px] bg-transparent border-[1px] w-[150px] xl:w-[fit-content] lg:w-[fit-content] text-[12px] xl:text-[16px] lg:text-[16px] border-primary text-primary  flex items-center justify-center rounded-[10px] px-3"
                            :class="{ 'active': item?.device_current }"> {{ $t('content.logout') }}</button>
                    </div>
                    <div class="divider w-full h-[1px] bg-[#F1F1F1]"></div>
                    <div class="details flex flex-col gap-3 p-[16px]">
                        <div class="item flex items-center gap-3">
                            <NuxtImg v-if="item?.device_current" src="/icons/active.svg" class="w-[16px] h-[16px]"></NuxtImg>
                            <NuxtImg v-if="!item?.device_current" src="/icons/anActive.svg" class="w-[16px] h-[16px]"></NuxtImg>
                            <span v-if="item?.device_current" class="font-medium text-[14px] text-[#161B33]"> {{ $t('content.newSet') }}</span>
                            <span v-if="!item?.device_current" class="font-medium text-[14px] text-[#4a5279]"> {{ $t('content.since') }} {{ item?.last_used }} </span>
                        </div>
                        <div class="item flex items-center gap-3">
                            <NuxtImg src="/icons/time1.svg" class="w-[16px] h-[16px]"></NuxtImg>
                            <span class="font-medium text-[14px] text-[#161B33]"> {{ $t('content.last1') }}: {{ item?.last_used_at }}  </span>
                        </div>
                        <!-- <div class="item flex items-center gap-3">
                            <NuxtImg src="/icons/pin1.svg" class="w-[16px] h-[16px]"></NuxtImg>
                            <span class="font-medium text-[14px] text-[#161B33]"> قريب من جدة </span>
                        </div> -->
                        <div class="item flex items-center gap-3">
                            <NuxtImg src="/icons/ipan1.svg" class="w-[16px] h-[16px]"></NuxtImg>
                            <span class="font-medium text-[14px] text-[#161B33]">  {{ item?.ip_address }} : IP </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-center mt-10">
                <button @click="store.getOutFromAllDevice()" class="h-[56px] bg-primary text-white rounded-[8px] px-5"> {{ $t('logedOut4') }}</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useSecurityStore } from "@/stores/security";
let store  = useSecurityStore();

</script>
<style lang="scss">
.security-cards {
    .card-container {
        button {
            &.active {
                border-color: #FF0A0E;
                color: #FF0A0E;
            }
        }
    }
}

html[dir="rtl"] {
    .security-cards {
        direction: rtl;
        text-align: right;
    }
}
</style>