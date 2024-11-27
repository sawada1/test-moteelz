<template>
  <div>

        <div v-if="!changeStructure" class="w-full dates-btns">
                <Button @click="checkDateOpen = !checkDateOpen, updateWidth()"
                    class="flex items-center justify-start gap-2 border-[1px] w-full  border-[#EBEBEB] py-7 px-3  bg-transparent hover:bg-transparent">
                    <IconSearchIcon2 />
                    <div class=" flex items-start flex-col w-full ">
                        <span class="text-[#929292] text[10px] text-btn1 font-medium">
                            {{ $t('content.check_in_out_date') }}
                        </span>
                        <span class="text-[#929292] text[10px] text-btn2 hidden font-medium">
                            {{ $t('content.check_in_date') }}
                        </span>
                        <div class="flex items-center gap-">
                            <input type="text" class="w-[50%] outline-none input-date1 text-primary text-[10px]"
                                readonly v-model="store.searchObj.checkIn">
                            <!-- <span class="ml-1 input-date2">-</span> -->
                            <input type="text" class="w-[50%] outline-none input-date2 text-primary text-[10px]"
                                readonly v-model="store.searchObj.checkOut">
                        </div>
                        <CommonSearch2 :checkDateOpen="checkDateOpen" class="w-full"></CommonSearch2>
                    </div>
                </Button>
                <Button @click="checkDateOpen = !checkDateOpen, updateWidth()"
                    class="hidden second-btn-date items-center justify-start gap-2 border-[1px] w-full  border-[#EBEBEB] py-7 px-3  bg-transparent hover:bg-transparent">
                    <IconSearchIcon2 />
                    <div class=" flex items-start flex-col w-full ">
                        <span class="text-[#929292] text[10px] font-medium">
                            {{ $t('content.check_out_date') }}
                        </span>
                        <input type="text" class=" outline-none  text-primary input-date1 text-[12px]" readonly
                            v-model="store.searchObj.checkOut">
                    </div>
                </Button>
            </div>
             
            <div class="flex gap-3">
                <Button v-if="changeStructure" @click="checkDateOpen = !checkDateOpen, updateWidth()"
                        class="flex items-center xl:min-w-[200px] lg:min-w-[200px] w-auto justify-start gap-2 border-[1px] w-full  border-[#EBEBEB] py-7 px-3  bg-transparent hover:bg-transparent">
                        <IconSearchIcon2 />
                        <div class=" flex items-start flex-col w-full ">
                
                            <span class="text-[#929292] text[10px] text-btn2  font-medium">
                                {{ $t('content.check_in_date') }}
                            </span>
                            <div class="flex items-center gap-">
                                <input type="text" class="w-[100%] outline-none input-date1 text-primary text-[12px]"
                                    readonly v-model="store.searchObj.checkIn">
                    
                            </div>
                        </div>
                    </Button>
    
                    <Button v-if="changeStructure" @click="checkDateOpen = !checkDateOpen, updateWidth()"
                        class="flex items-center xl:min-w-[200px] lg:min-w-[200px] min-w-[50%] justify-start gap-2 border-[1px] w-full  border-[#EBEBEB] py-7 px-3  bg-transparent hover:bg-transparent">
                        <IconSearchIcon2 />
                        <div class=" flex items-start flex-col w-full ">
                           
                            <span class="text-[#929292] text[10px] text-btn2  font-medium">
                                {{ $t('content.check_out_date') }}
                            </span>
                            <div class="flex items-center gap-">
    
                                <input type="text" class="w-[100%] outline-none input-date2 text-primary text-[12px]"
                                    readonly v-model="store.searchObj.checkOut">
                            </div>
                            <CommonSearch2 :checkDateOpen="checkDateOpen" class="w-full"></CommonSearch2>
                        </div>
                    </Button>


            </div>
            
  </div>

</template>
<script setup>
import { generalStore } from '@/stores/general'
const checkDateOpen = ref(false);
let store = generalStore();
let props = defineProps({
    changeStructure:{
        type: Boolean,
        default:false
    }
});

let currentWidth = ref();
let checkCity = ref(false);
const updateWidth = () => {
    if (process.client) {
        currentWidth.value = window.innerWidth;
        if (currentWidth.value <= 768) {
            store.showModalFilter = true;
        }

    }
}

</script>
<style lang="">
    
</style>