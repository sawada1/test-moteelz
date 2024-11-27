<template>
    <div>
        <div
            class="rooms-container w-[450px] shadow-custom-all-side p-3 rounded-[16px] max-h-[350px] overflow-y-auto bg-white">
            <div class="flex items-center w-full justify-between">
                <Select class="" v-model="numRooms" @update:modelValue="addRoom()">
                    <SelectTrigger class="!w-[200px]">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent class="bg-white">
                        <SelectGroup>
                            <SelectItem v-for="i in 4" :value="Number(i)" class="hover:!text-white hover:!bg-primary !bg-transparent cursor-pointer">
                                {{ i }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div class=""> {{ $t('labels.rooms_count') }} </div>
            </div>
            <div v-for="room, index in store.totalRooms" class="flex flex-col items-start">
                <div class="flex items-center mt-5 w-full justify-between">
                    <div class="flex flex-col items-center gap-2">
                        <span> {{ $t('content.children') }} </span>

                        <Select class="" v-model="room.child" @update:modelValue="addAgesChids(room.child, index) , updateData()">
                            <SelectTrigger class="!w-[150px]">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent class="bg-white">
                                <SelectGroup>
                                    <SelectItem v-for="i in 8" :value="Number(i)"
                                        class="hover:!text-white hover:!bg-primary !bg-transparent cursor-pointer">
                                        {{ i }}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                        <span> {{ $t('content.adults') }} </span>
                        <Select class="" v-model="room.adult" @update:modelValue="updateData()">
                            <SelectTrigger class="!w-[150px]">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup class="bg-white">
                                    <SelectItem v-for="i in 8" :value="i" class="hover:!text-white hover:!bg-primary !bg-transparent cursor-pointer">
                                        {{ i }}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="flex items-center gap-2 mt-8">

                        <div class=""> {{ $t('content.room') }} {{ index + 1 }} </div>
                        <IconBed color="#765cf1"></IconBed>
                    </div>
                </div>
                <div class="flex items-center gap-1 flex-wrap">
                    <div v-for="child, index in room.ages_child" class="flex mt-2 flex-col items-center gap-1">
                        <span> {{ $t('content.child') }} {{ index + 1 }} </span>

                        <Select class="" v-model="child.value" @update:modelValue="updateData()">
                            <SelectTrigger class="!w-[100px]">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent class="bg-white">
                                <SelectGroup>
                                    <SelectItem v-for="i in 10" :value="Number(i)"
                                        class="hover:!text-white hover:!bg-primary !bg-transparent cursor-pointer">
                                        {{ i }} {{ $t('age.year') }}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { generalStore } from '@/stores/general'
import IconBed from '../icon/IconBed.vue';
let store = generalStore();
import { useDateSearchRooms } from '~/composables/utilities/searchRooms'
const { updateData, numRooms, addRoom , addAgesChids } = useDateSearchRooms();
watch(()=>store.totalRooms , (val:[])=>{
    numRooms.value = val.length
    console.log(val);
    
},{
    immediate:true
})
</script>