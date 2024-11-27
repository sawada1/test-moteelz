<template>
    
    <div class="w-full relative">
        <div
            class="search-container relative flex-col justify-between xl:flex lg:flex-row mb-[30px] xl:mb-0 lg:mb-0 md:flex-row w-fit flex items-center gap-3 bg-white py-4 px-3 rounded-[16px]">
            <Button v-if="!changeStructure"  @click="updateWidth('city'), store.check1 = true, store.cityObj.name = ''"
                class="flex justify-start items-center mainCustomInput  gap-2 border-[1px] w-full   border-[#EBEBEB] py-7 px-3  bg-transparent hover:bg-transparent">
                <IconSearchIcon1 />
                <div v-if="!store.check1" class="text flex items-start mainCustomInput flex-col gap-1">
                    <span class="text-[#929292] text[10px] font-medium"> {{ $t('content.enter_unit') }} </span>
                    <h4 class="text-primary text-[12px] font-medium whitespace-normal line-clamp-2 leading-[15px]">
                        {{ store.cityObj.name != "" ? store.cityObj.name : $t('content.selectedLocation') }}
                    </h4>

                </div>
                <div v-else>
                    <h4 v-if="store.cityObj.name != ''"
                        class="text-primary text-[12px] font-medium whitespace-normal line-clamp-2 leading-[15px]">
                        {{ store.cityObj.name != "" ? store.cityObj.name : $t('content.selectedLocation') }}
                    </h4>
                    <input v-else type="text" v-model="store.searchText" @keyup="debouncedSearch"
                        class="outline-none w-[fit-content]" :placeholder="$t('content.enter_unit')" name="" id="">
                </div>
            </Button>
            <div v-if="check" class="w-[180px] h-[45px] bg-white absolute flex items-center justify-center border-[tomato] text-[tomato] top-[100%] border-[1px] rounded-lg">
                {{ $t('required1') }}
            </div>

            <CommonSearch1  class="hidden xl:block lg:block md:block" v-if="store.check1 && !changeStructure"></CommonSearch1>

             <SharedDatesSearch :changeStructure="changeStructure"></SharedDatesSearch>
            <DropdownMenu>
                <DropdownMenuTrigger class="!z-[55555]" as-child>
                    <Button @click="updateWidth('room')"
                        class="flex items-center justify-start gap-2 border-[1px] w-full  border-[#EBEBEB] py-7 px-3  bg-transparent hover:bg-transparent">
                        <IconSearchIcon3 />
                        <div class="text flex items-start flex-col gap-1">
                            <span class="text-[#929292] text[10px] font-medium"> {{ $t('content.rooms_guests') }}
                            </span>
                            <h4 class="text-primary text-[12px] font-medium"> {{ store.totalRoomsLength }} {{
                                $t('content.bedrooms') }} , {{ store.totalAdults }} {{ $t('content.adults') }} , {{
                                store.totalChilds }} {{ $t('content.children') }}
                            </h4>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="hidden bg-transparent xl:block lg:block md:block">
                    <CommonSearch3></CommonSearch3>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button v-if="store.hotelId && !changeStructure" class="bg-primary hidden xl:flex lg:flex md:flex search-btn py-7 font-bold px-7 w-full xl:w-fit lg:w-fit text-white"
                @click="goToHotel() , checkCityFunc()">
                {{changeStructure ? $t('content.editSearch') : $t('content.search_now') }} 
            </Button>
            <Button v-else class="bg-primary search-btn py-7 hidden xl:flex lg:flex md:flex font-bold  w-full xl:w-fit lg:w-fit text-white"
                @click="submitSearch() , checkCityFunc()"
                :class="locale === 'en'? '!px-1' : 'px-7'">
                {{changeStructure ? $t('content.editSearch') : $t('content.search_now') }} 
            </Button>
            <div class="search-btn flex xl:hidden lg:hidden md:hidden"></div>
    

        </div>

    </div>

</template>
<script setup lang="ts">
import { generalStore } from '@/stores/general'
import { useDateSearchRooms } from '@/composables/utilities/searchRooms'
import { useDateSearchCity } from '@/composables/utilities/searchCity'
import { navigateTo } from 'nuxt/app';
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();
let props = defineProps({
    changeStructure: {
        type: Boolean,
        default: false
    }
})
const { t, locale } = useI18n();
const emits = defineEmits(['submitSearch'])
const { updateData } = useDateSearchRooms();
const { debouncedSearch } = useDateSearchCity();
let store = generalStore();
let currentWidth = ref();
let checkCity = ref(false);
const updateWidth = (val: string) => {
    if (process.client) {
        currentWidth.value = window.innerWidth;
        if (currentWidth.value <= 768) {
            // if (val == "city") {
            //     store.checkMobileCitySearch = true;
            // } else if (val == "room") {
            //     store.checkMobileRoomSearch = true;
            // }
            store.showModalFilter = true;
        }

    }
}

let check = ref(false);
const checkCityFunc = ()=>{
   if(checkCity.value) return;
   else check.value = true; 
}
watch(() => store.cityObj.name, (val) => {
    if(val != ''){
        checkCity.value = true ;
        check.value = false;
    } else{
        checkCity.value = false;
    }
})
onMounted(() => {
    updateData();
    if(store.cityObj.name != ''){
        checkCity.value = true ;
        check.value = false;
    } else{
        checkCity.value = false;
    }
})
const submitSearch = () => {
    if (props.changeStructure) {
        // logic for hotel page 
            emits('submitSearch')
    } else {
        console.log('no');
        if (checkCity.value) {
            
            emits('submitSearch')
            navigateTo(localePath('/hotels'))
        }
    }
}

const goToHotel = () =>{
    const url = `/hotels/${store.hotelId}-book`;
    // const queryParams = {
    //   id: id,
    //   name: name,
    //   color: color,
    // };
    const updatedRoute = {
      path: url,
      // query: {
      //   ...queryParams,
      // },
    };
  
    const fullLocalePath = localePath(updatedRoute);
    router.push(fullLocalePath);
}
</script>