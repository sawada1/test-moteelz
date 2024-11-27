<template >
  <div>
      <div class=" container relative mb-[70px] xl:mb-[100px] lg:mb-[100px] mt-[70px] xl:mt-[100px] lg:mt-[100px] wallet-cards">
    <div class="header-container flex items-center justify-between mb-[32px]">
       <div class="flex items-center gap-2">
        <h3 class="text-[20px] xl:text-[32px] lg:text-[32px]  font-semibold text-primary"> {{ $t('header.wallet') }} </h3>
        <div class="dot h-[9px] w-[9px] bg-burgundy rounded"></div>
       </div>
       <NuxtLink :to="localePath('/wallet')" class="bg-[#875FFF1C] w-[135px] h-[41px] rounded-[38px] text-primary hidden xl:flex lg:flex items-center justify-center">
         {{ $t('content.show_more') }}
       </NuxtLink>
    </div>
    <div v-if="pending" >
      <div class="btns flex items-center gap-3 mb-5">
        <button  v-for="category , index in store.wallets" @click="checkBtnWallet = category.id , walletsArr = category.wallets" class="bg-[#FDFDFD] border-[#E9E9E9] border-dashed border-[1px] rounded-md py-1 px-3" :class="{'!border-[#875FFF] text-primary !bg-[#F1EDFF]':checkBtnWallet == category.id}"> {{ category?.name }} </button>
      </div>
      <button class="slider-icon top-[50%] hidden xl:block lg:block absolute right-[-30px] slider-wallet-next z-10 ">
        <IconArrowNext></IconArrowNext>
      </button>
      <button class="slider-icon top-[50%] hidden xl:block lg:block absolute left-[-30px] slider-wallet-prev z-10 ">
        <IconArrowPrev></IconArrowPrev>
      </button>
      <swiper  class="!px-[10px]" :navigation="{
        nextEl: '.slider-wallet-next',
        prevEl: '.slider-wallet-prev',
      }" :breakpoints="{
        '300': {
          slidesPerView: 1.2,
          spaceBetween: 20,
        },
        '900': {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        '1024': {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        '1200': {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }" :modules="[SwiperNavigation, SwiperAutoplay]">
        <swiper-slide v-for="item , index in walletsArr" >
         <CardWallet :data-aos-duration="100 + index * 2" :product="item"></CardWallet>
        </swiper-slide>

      </swiper>

    </div>
    <div v-else class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-2">
        <div v-for="i in 4"  class="flex flex-col space-y-3 py-2 ">
          <Skeleton class="h-[238px] rounded-[24px] w-[300px] shadow-custom-all-sides " />
          <div class="space-y-2">
            <Skeleton class="h-4 w-[250px] shadow-custom-all-sides" />
            <Skeleton class="h-4 w-[200px] shadow-custom-all-sides" />
          </div>
        </div>

      </div>
  </div>
  </div>
</template>
<script setup>
import { homeStore } from "@/stores/home";
let store  = homeStore();
const localePath = useLocalePath();
const { locale } = useI18n();
store.getWallet(locale.value);
let pending = ref(false);
let walletsArr = ref([]);
let checkBtnWallet = ref();
watch(()=>store.wallets , (val)=>{
if(val){
     pending.value = true;
     checkBtnWallet.value = val[0].id;
     walletsArr.value = val[0].wallets;
}

})
onMounted(() => {
if(store.wallets.length >= 1){
  checkBtnWallet.value = store.wallets[0].id;
  walletsArr.value = store.wallets[0].wallets;
  pending.value = true;
}
})
</script>
<style lang="">

</style>