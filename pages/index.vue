<template>
  <div class="">
    <HomeHero></HomeHero>

    <!-- <HomeHotels></HomeHotels> -->

    <HomeProduct></HomeProduct>

    <HomeCity></HomeCity>

    <!-- <HomeBanner></HomeBanner> -->

    <HomeWalletCards></HomeWalletCards>

    <HomeAbout></HomeAbout>

  </div>
</template>

<script lang="ts" setup>// import {locale} from "@nuxtjs/i18n"
import {onMounted} from "vue"
import { useSearchStore } from "@/stores/hotels/search";
import { storeToRefs } from "pinia";
const { t } = useI18n();
useHead({
  title: t('content.home'),
  meta: [
    { name: 'description', content: t('') }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: '' } ]
}) 
const { hotels,filter,meta,events_completed } = storeToRefs(useSearchStore());
 onMounted(()=>{
hotels.value = []
filter.value = {}
meta.value = {}
events_completed.value = false
 })
</script>
<style lang="scss">

</style>
