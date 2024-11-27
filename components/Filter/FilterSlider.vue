<script lang="ts" setup>
import { useFilterUnits } from "~/stores/hotels/filter";
import Package2 from "~/components/packages/package2.vue";
import { ref } from "vue";

import { ListSlickMethods, VueSlickCarousel } from "vue-slick-ts";
import type { SlickInstance } from "vue-slick-ts";
import "vue-slick-ts/dist/css/slick.css";

const slick = ref<SlickInstance | null>(null);
const handleInit = (e: JQuery.Event, instance: SlickInstance) => {
  console.log(e, instance);
};
const store = useFilterUnits();

const currentSlideIndex = ref(1);

const handleSlideChange = (event) => {
  // currentSlideIndex.value = index
  // const slick = event.target.$slick
  const slick = event.currentTarget.slick;
  // console.log(event.currentTarget.slick)
  // console.log(event.currentTarget.slick.slideCount)
  currentSlideIndex.value = slick.currentSlide + 1;
};
const handleSwipe = () => {
  // Perform your action or call your function here
};
</script>
<style>
.svg-image svg {
  fill: mediumspringgreen; /* Change 'red' to the color you want */
}
</style>
<template>
  <div
    v-if="store.filterAssets?.hosting_types?.length"
    class="relative flex-auto px-4 ps-7 py-2 min-[0px]:overflow-y-auto justify-center items-center"
  >
    <VueSlickCarousel
      ref="slick"
      @init="handleInit"
      @afterChange="handleSlideChange"
      @swiped="handleSwipe"
      v-bind="{
        rtl: $t('app.dir') == 'rtl',
        nextArrow: `<button  type='button'  class=' ms-5 controls-next w-4 controls-arrow slick-arrow me-[-10px]' style='bottom: 6px;width: 25px ; height: 25px' ></button>`,
        prevArrow: `<button type='button' class='controls-prev controls-arrow slick-arrow ms-[-28px]' style='bottom: 6px;width: 25px ; height: 25px' ></button>`,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        initialSlide: 0,
        variableWidth: true,
      }"
      :autoplay-speed="4000"
    >
      <!--        <div v-for="(p, i) in ['العروض']" :key="i">-->
      <!--          <div-->
      <!--            class="px-5 rounded-xl box w-full col-span-1 relative cursor-pointer overflow-hidden custom-gradient"-->
      <!--          >-->
      <!--           {{p}}-->
      <!--          </div>-->
      <!--        </div>-->
      <div v-for="(t, i) in store.filterAssets.hosting_types" class="mx-3">
        <div class="flex flex-col md:flex-row gap-2 items-center align-center">
          <nuxt-img :src="t.image" class="w-5 svg-image"></nuxt-img>
          <h4>{{ t.name }}</h4>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>
