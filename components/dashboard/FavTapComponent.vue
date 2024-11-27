<template>
    <div>
        <div class="wishlist-container">
            <h3 class="text-[#161B33] text-[20px] rtl:text-right ltr:text-left "> {{ $t('content.saved_units') }} ({{ store.favs.length }}) </h3>
            <p class="text-[#3D3D3D] mt-[20px] mb-[8px] rtl:text-right ltr:text-left"> {{ $t('content.searchHotel1') }} </p>
             <div class="input mb-8 w-full xl:w-[510px] lg:w-[510px] rtl:text-right ltr:text-left px-4 flex items-center justify-between h-[56px] border-[1px] border-[#EBEBEB] rounded-[10px]">
                <input type="text" v-model="store.searchText" @keyup="debouncedSearch" :placeholder="$t('content.enterHotel')" class="outline-none w-[70%]">
                 <NuxtImg src="/icons/search1.svg" width="20" height="20"></NuxtImg>
             </div>
             <div v-if="store.favs.length >= 1">
                 <div  class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
                     <div v-for="item in store.favs" class="mb-4" >
                       <CardProduct2 :product="item" :fav="true"></CardProduct2>
                     </div>
                 </div>
                 <div class="flex items-center justify-center mt-8">
                <button v-if="false" class="w-[176px] h-[56px] rounded-[8px] bg-primary text-white flex items-center justify-center">
                    {{ $t('content.show_more') }}
                </button>
            </div>
             </div>
              <div v-else class="flex flex-col items-center text-center justify-center gap-5">
                <NuxtImg src="/icons/emptyFav.svg"></NuxtImg>
                <h5 class="text-[#161B33] text-[24px]"> {{ $t('content.sorry1') }}  </h5>
                <p class="text-[#7B7B7B] w-[350px]"> {{ $t('content.sorry2') }} </p>
                <NuxtLink :to="localePath('/')" class="w-[176px] h-[56px] rounded-[8px] bg-primary text-white flex items-center justify-center">
                    {{ $t('content.browseNow') }}
                </NuxtLink>
              </div>
            
        </div>
    </div>
</template>
<script lang="ts" setup>
import { homeStore } from "@/stores/home";
const localePath = useLocalePath();
let store  = homeStore();
const { locale } = useI18n();
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

function debouncedSearch() {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(() => {
    store.getFavs(locale.value);
  }, 500);  // Delay of 500ms after the user stops typing
}

</script>
<style lang="">
    
</style>