<template>
    <div>
        <LayoutProfile >
            <FavTapComponent class="p-5"></FavTapComponent>
        </LayoutProfile>
    </div>
</template>
<script>

</script>
<script lang="ts" setup>

import LayoutProfile from '@/components/layout/LayoutProfile.vue';
import FavTapComponent from '@/components/dashboard/FavTapComponent.vue';
import { homeStore } from "@/stores/home";
let store  = homeStore();
const { locale } = useI18n();
store.getFavs(locale.value);
let pending = ref(false);
watch(()=>store.cities , (val)=>{
  if(val){
       pending.value = true;
  }

})
onMounted(() => {
  if(store.cities.length >= 1){
       pending.value = true;
  }

})




</script>