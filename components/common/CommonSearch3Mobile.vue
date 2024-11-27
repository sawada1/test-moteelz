<template>
    <div>
        <div class="fixed w-[100vw] left-0 right-0 z-[9999999] h-[100vh] bg-white top-0"
            :class="{ 'hidden': !store.checkMobileRoomSearch }">
            <div class="head bg-primary p-3 flex items-center justify-between text-white">
                <button @click="store.checkMobileRoomSearch = false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-arrow-lef -scale-x-100 transform">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
                <span class="font-bold text-[18px]"> {{ $t('content.guestsAndRooms') }}</span>
            </div>
            <div class="mt-5 border-purple-50 max-h-[450px] overflow-y-auto border-[1px]  mx-2 rounded-[6px]">
                <div class="items flex flex-col gap-5">
                    <div v-for="room, index in store.totalRooms" class="item">
                        <div class="head px-3 py-3 flex items-center justify-between bg-purple-50">
                            <div class="flex items-center gap-3">
                                <IconBed color="#765cf1"></IconBed>
                                <span> {{ $t('content.room') }} {{ index + 1 }} </span>
                            </div>
                            <button @click="removeRoom(index)">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 5H14C14 4.46957 13.7893 3.96086 13.4142 3.58579C13.0391 3.21071 12.5304 3 12 3C11.4696 3 10.9609 3.21071 10.5858 3.58579C10.2107 3.96086 10 4.46957 10 5ZM8.5 5C8.5 4.54037 8.59053 4.08525 8.76642 3.66061C8.94231 3.23597 9.20012 2.85013 9.52513 2.52513C9.85013 2.20012 10.236 1.94231 10.6606 1.76642C11.0852 1.59053 11.5404 1.5 12 1.5C12.4596 1.5 12.9148 1.59053 13.3394 1.76642C13.764 1.94231 14.1499 2.20012 14.4749 2.52513C14.7999 2.85013 15.0577 3.23597 15.2336 3.66061C15.4095 4.08525 15.5 4.54037 15.5 5H21.25C21.4489 5 21.6397 5.07902 21.7803 5.21967C21.921 5.36032 22 5.55109 22 5.75C22 5.94891 21.921 6.13968 21.7803 6.28033C21.6397 6.42098 21.4489 6.5 21.25 6.5H19.93L18.76 18.611C18.6702 19.539 18.238 20.4002 17.5477 21.0268C16.8573 21.6534 15.9583 22.0004 15.026 22H8.974C8.04186 22.0001 7.1431 21.653 6.45295 21.0265C5.7628 20.3999 5.33073 19.5388 5.241 18.611L4.07 6.5H2.75C2.55109 6.5 2.36032 6.42098 2.21967 6.28033C2.07902 6.13968 2 5.94891 2 5.75C2 5.55109 2.07902 5.36032 2.21967 5.21967C2.36032 5.07902 2.55109 5 2.75 5H8.5ZM10.5 9.75C10.5 9.55109 10.421 9.36032 10.2803 9.21967C10.1397 9.07902 9.94891 9 9.75 9C9.55109 9 9.36032 9.07902 9.21967 9.21967C9.07902 9.36032 9 9.55109 9 9.75V17.25C9 17.4489 9.07902 17.6397 9.21967 17.7803C9.36032 17.921 9.55109 18 9.75 18C9.94891 18 10.1397 17.921 10.2803 17.7803C10.421 17.6397 10.5 17.4489 10.5 17.25V9.75ZM14.25 9C14.0511 9 13.8603 9.07902 13.7197 9.21967C13.579 9.36032 13.5 9.55109 13.5 9.75V17.25C13.5 17.4489 13.579 17.6397 13.7197 17.7803C13.8603 17.921 14.0511 18 14.25 18C14.4489 18 14.6397 17.921 14.7803 17.7803C14.921 17.6397 15 17.4489 15 17.25V9.75C15 9.55109 14.921 9.36032 14.7803 9.21967C14.6397 9.07902 14.4489 9 14.25 9Z"
                                        fill="#AB0053" />
                                </svg>
                            </button>
                        </div>
                        <div class="details flex flex-col gap-3 px-3 mt-2">
                            <div class="flex items-center border-b-purple-50 pb-2 border-b-[1px] justify-between">
                                <div class="flex flex-col ">
                                    <span class="text-[14px]"> {{ $t('content.adults') }} </span>
                                    <span class="text-[14px]"> {{ $t('content.age_above') }}</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <button @click="room.adult > 1 ? room.adult-- : false, updateData()"
                                        class="w-[28px] h-[28px] rounded-full flex items-center justify-center border-primary border-[1px] ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="#765cf1" height="12"
                                            viewBox="0 0 21 21">
                                            <path d="M0 10h20v4h-20z" />
                                        </svg>
                                    </button>
                                    <span class="text-primary">{{ room?.adult }}</span>
                                    <button @click="room.adult++, updateData()"
                                        class="w-[28px] h-[28px] rounded-full flex items-center justify-center bg-primary border-primary border-[1px]">
                                        <span class="mt-1 font-bold text-white"> + </span>
                                    </button>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <div class="flex items-center justify-between">
                                    <div class="flex flex-col ">
                                        <span class="text-[14px]"> {{ $t('content.children') }} </span>
                                        <span class="text-[14px]"> {{ $t('content.age_range') }}</span>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <button
                                            @click="room.child > 0 ? room.child-- : false, addAgesChids(room.child, index)"
                                            class="w-[28px] h-[28px] rounded-full flex items-center justify-center border-primary border-[1px] ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="#765cf1"
                                                height="12" viewBox="0 0 21 21">
                                                <path d="M0 10h20v4h-20z" />
                                            </svg>
                                        </button>

                                        <span class="text-primary"> {{ room.child }} </span>
                                        <button @click="room.child++, addAgesChids(room.child, index)"
                                            class="w-[28px] h-[28px] rounded-full flex items-center justify-center bg-primary border-primary border-[1px]">
                                            <span class="mt-1 font-bold text-white"> + </span>
                                        </button>
                                    </div>

                                </div>
                                <div class="childerns flex flex-wrap items-center gap-3 mt-3">
                                    <div v-for="child, ind in room.ages_child">
                                        <select v-model="child.value" @change="updateData()"
                                            class="item border-primary px-2 text-primary border-[1px] text-[14px] rounded-[10px]"
                                            name="" id="">
                                            <option v-for="item in 10" :key="ind" :value="item"> {{ $t('content.child')
                                                }} ({{ ind + 1 }}): {{
                                                    item }} {{ $t('content.years') }} </option>
                                        </select>

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="px-3 mt-4">
                <button v-if="store.totalRooms.length < 4" @click="addRoom()"
                    class="w-full text-primary border-primary border-[1px] rounded-md py-2 font-bold"> {{
                        $t('content.add_room') }}</button>
            </div>
            <div class="flex items-center gap-5 px-3 justify-center mt-3">
                <button @click="store.checkMobileRoomSearch = false"
                    class="bg-white border-[1px] border-primary px-5  py-2 rounded-md text-primary font-bold"> {{
                        $t('content.cancel') }} </button>
                <button @click="store.checkMobileRoomSearch = false"
                    class="bg-primary px-5 py-2 rounded-md text-white font-bold"> {{ $t('content.confirm') }} </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { generalStore } from '@/stores/general'
let store = generalStore();
import { useDateSearchRooms } from '~/composables/utilities/searchRooms'
const { updateData, addAgesChids } = useDateSearchRooms();

const addRoom = () => {
    if (store.totalRooms.length < 4) {
        store.totalRooms.push({
            child: 0,
            adult:1,
            ages_child: []
        });
        updateData();
    }
}

const removeRoom = (index: number) => {
    if (store.totalRooms.length > 1) {
        store.totalRooms.splice(index, 1);
        updateData();
    }
}


</script>
<style lang="scss">
select {}
</style>