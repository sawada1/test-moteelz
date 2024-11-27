<template>
    <div class="relative main-container :bottom-[70px] mb-[50px]  ">
        <div class="main-hero-container relative pt-[100px]  h-[90vh]  ">
            <div class="p-3 px-5 mb-5 hidden items-center justify-center image-mobile">
                <nuxtImg class="h-[50px]" src="/white_logo.png"></nuxtImg>
            </div>
            <div  class="hero-container !z-[5555]  container relative flex  justify-center gap-10  items-center">
                <div data-aos="fade-left" class="text-container items-start w-[60%]   flex flex-col gap-7">

                    <div
                        class="experment font-Rubik items-center  flex  justify-center bg-white text-[18px] font-semibold w-fit px-[20px] py-1 text-black1 rounded-[40px]">
                        {{ $t('content.banner_subtitile') }}
                    </div>
                    <h1 class="text-[36px] font-semibold block  text-black2"> {{ $t('content.hero1') }} <span class="text-primary"> {{ $t('content.hero2') }} </span>
                        {{ $t('content.hero3') }}</h1>
                    <p class="w-[350px] leading-6 block  font-medium text-[#796F97]">  {{ $t('content.moteelz_offering_desc') }} </p>
                    <div class="btns-container flex px-3 py-2 rounded-[16px] items-center gap-5 bg-white w-fit">
                        <button @click="activeBtn1 = 1"
                            class=" text-primary justify-center w-[135px] h-[40px] p-[10px] rounded-[8px] flex items-center gap-3"
                            :class="{ 'active': activeBtn1 == 1, 'bg-primary': activeBtn1 == 1 }">
                            <IconHero1></IconHero1>
                            <span> {{ $t('header.units') }} </span>
                        </button>
                        <nuxt-link
                         :to="localePath('/wallet')"
                            class=" text-primary justify-center w-[135px] h-[40px] p-[10px] rounded-[8px] flex items-center gap-3"
                        >
                            <IconHero2></IconHero2>
                            <span> {{ $t('header.wallet') }} </span>
                        </nuxt-link>

                    </div>
                
                     <CommonMainSearch id="search-section" class="w-full relative !z-[4444]"></CommonMainSearch>
                    
                </div>
                <div data-aos="fade-right" class="imgs-container flex  items-center z-[-1] justify-center gap-8 ">
                    <NuxtImg class="w-[244px]" alt="hero image 1" src="/img/hero1.webp"></NuxtImg>
                    <NuxtImg class="w-[244px] relative top-[50px]" alt="hero image 2" src="/img/hero2.webp"></NuxtImg>
                </div>
            </div>
            <nuxtImg class="absolute flex main-cover top-0 w-full object h-[100%]" src="/img/background-hero.webp"></nuxtImg>
        </div>
        <Drawer>
    <DrawerTrigger>

        <div
      v-if="showFixedButton"
      class="fixed-search block xl:hidden lg:hidden"
    >
      <div class="flex items-center gap-2">
        <NuxtImg src="/searchIcon1.svg" width="17"></NuxtImg>
        <div class="text flex items-start flex-col gap-1">
            <h6 class="text-primary font-bold"> {{ store.cityObj.name != "" ? store.cityObj.name : $t('content.selectedLocation')}}   </h6>
            <div class="dates flex flex-wrap items-center gap-2">
                <div class="flex items-center gap-2">
                    <NuxtImg src="/datee1.svg" width="20"></NuxtImg>
                    <span class="text-[#929292] text-[10px]"> {{ store.searchObj.checkIn }} </span>
                </div>
                <div class="flex items-center gap-2">
                    <NuxtImg src="/datee1.svg" width="20"></NuxtImg>
                    <span class="text-[#929292] text-[10px]"> {{ store.searchObj.checkOut }} </span>
                </div>
                <div class="flex items-center gap-2">
                    <NuxtImg src="/userr1.svg" width="20"></NuxtImg>
                    <span class="text-[#929292] text-[10px]"> {{ store.totalRoomsLength }} {{ $t('content.bedrooms') }} , {{ store.totalAdults }} {{ $t('content.adults') }} </span>
                </div>
            </div>
        </div>
      </div>
    </div>
    </DrawerTrigger>
    <DrawerContent class="z-[5555555]">
        <CommonMainSearch class="w-full relative !z-[4444]"></CommonMainSearch>
    <!-- <DrawerClose>
      <Button variant="outline">
        Cancel
      </Button>
    </DrawerClose> -->
    </DrawerContent>
  </Drawer>
    </div>
    <CommonMainFilter v-if="store.showModalFilter"></CommonMainFilter>

</template>
<script setup lang="ts">
import { generalStore } from '@/stores/general'
let store = generalStore();

let activeBtn1 = ref(1);
const localePath = useLocalePath();
const showFixedButton = ref(false);

const handleScroll = () => {
  const searchButton = document.querySelectorAll('.search-btn');  
  searchButton.forEach((ele)=>{
      const searchButtonPosition = ele.getBoundingClientRect().bottom;
      showFixedButton.value = searchButtonPosition < 0; // Show button if out of view
  });
};


onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>
<style lang="scss">
@media(max-width:1280px){
    .main-container{
        margin-bottom: 70px;
        .main-hero-container{
            .imgs-container{
             img{
                width: 200px;
             }
            }
     
        } 

    }
}
@media(max-width:1090px){
    .main-container{
        bottom: 0px;
        margin-bottom: 30px;
        .main-hero-container{
            padding-top: 30px;
            height: fit-content;
            .text-container{
                align-items: center;
                width: 100%;
                .experment , h1 , p{
                    display: none;
                }

            }

            .imgs-container , .main-cover{
             display: none;
            }
     
        } 

    }
}
html[dir="rtl"] {
    .dp__main * {
        direction: rtl !important;
     
        // z-index: 1111111 !important;
    }

    .dp__calendar_header {
        gap: 15px;

        .dp__calendar_header_item {
            width: auto !important;
            padding: 0px !important;
        }
    }
}

.dp__main *{
     
    // z-index: 1111111 !important;
}

.dp__main {

    .dp__cell_inner {
        width: auto;
    }

    .dp__input {
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 11px !important;
        font-weight: 700;
        color: #765cf1;
        display: none;
    }

    .dp__input_icon {
        display: none !important;
    }

    .dp__pointer {}

    .dp--clear-btn {
        display: none !important;
    }

    .dp__input_icon_pad {
        padding: 0px !important;
    }
}
@media(max-width:700px){
    html[dir="rtl"] {

    .dp__calendar_header {
        gap: 4px;

        .dp__calendar_header_item {
            width: auto !important;
            padding: 0px !important;
            font-size: 11px !important;
        }
    }
}  
}




.fixed-search {
  position: fixed;
  top: 10px;
  right: 0px;
  left: 0px;
  background-color: #fff;
  color: #fff;
  box-shadow: 0px 4px 18.4px 0px #00000008;
  padding: 10px 20px;
  z-index: 5555555;
  margin: 0px auto;
  border: none;
  border-radius: 10px;
  width: 97%;
  cursor: pointer;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>