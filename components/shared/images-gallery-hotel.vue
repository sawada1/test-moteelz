<script setup>
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
// const currentWidth = ref(window.innerWidth);
const isMob = ref(false);
const hideCarousel = ref(true);
const { locale } = useI18n();
// watch(currentWidth, (newVal, oldVal) => {
//   if (newVal && newVal > 500) {
//     isMob.value = false;
//   }

//   if (newVal && newVal <= 500) {
//     isMob.value = true;
//   }
// });
// const updateWidth = () => {
//   currentWidth.value = window.innerWidth;
//   if (window.innerWidth > 500) {
//     isMob.value = false;
//   }

//   if (window.innerWidth <= 500) {
//     isMob.value = true;
//   }
// };
// onBeforeMount(() => {
//   updateWidth();
// });
onMounted(() => {
  Fancybox.bind("[data-fancybox]", {
    //Custom options for all galleries
  });
  // updateWidth();
  // nextTick(() => {
  //   window.addEventListener("resize", updateWidth);
  // });
});
onUnmounted(() => {
  // window.removeEventListener("resize", updateWidth);
});
const props = defineProps({
  main_img: String,
  images: Array,
});
// const {main_img,images} = toRefs(props)
// watch(()=>main_img.value , (val)=>{

// },{immediate:true})
const showModal = ref(false);
const showModalCard = ref(false);
const opendImage = ref(null);

const openImage = (imageUrl) => {
  opendImage.value = imageUrl;
};
const openModel = (image_url, flag) => {
  hideCarousel.value = flag;
  showModal.value = true;
  showModalCard.value = true;
  openImage(image_url);
};
const closeImage = () => {
  opendImage.value = null;
  showModal.value = false;
  showModalCard.value = false;
};
</script>

<template>
  <div>
    <div
      class="md:p-[30px_0px] md:grid-cols-5 gap-2 md:max-h-[350px]"
      :class="images?.length > 0 ? 'grid' : ''"
    >
      <div class="md:col-span-2 col-span-5 mx-4 md:mx-0 max-h-[350px]">
        <a
          :data-src="main_img"
          class="cursor-pointer"
          data-fancybox="gallery"
          :data-caption="`Gallery A #0`"
        >
          <NuxtImg
            class="h-full w-full bg-dark/60 rounded-lg max-h-[350px]"
            :src="main_img"
          />
        </a>
      </div>
      <div class="md:col-span-3 col-span-5 mx-4 md:mx-0 md:max-h-[350px]">
        <div
          class="grid grid-cols-2 h-full w-full gap-2 "
          :class="images?.length > 2 ? 'md:grid-cols-2' : 'md:grid-cols-2'"
        >
          <a
            v-for="(img, i) in images?.slice(1)"
            :key="i"
            class="relative cursor-pointer"
            data-fancybox="gallery"
            :data-caption="`Gallery A #${i + 1}`"
            :data-src="img.url"
          >
          <div :class="{'hidden': i >= 4}">
            <div
              v-if="
                (images?.length > 4 && i === 3) ||
                (isMob && images?.length > 2 && i === 1)
              "
              class="absolute w-full h-full col-span-1 bg-dark/60 text-white font-semibold text-lg rounded-md flex items-center justify-center hover:bg-dark/80 cursor-pointer"
            >
              {{ $t("content.more_photos") }}
            </div>
            <NuxtImg
              :src="img.url"
              :class="images?.length > 3 ? '' : 'h-full'"
              class="col-span-1 bg-dark/60 rounded-lg w-full   h-[120px] xl:h-[170px] lg:h-[150px] object-cover"
              placeholder="/icons/loading.svg"
            />

          </div>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.box-of-image {
  padding: 10px 0px;
  width: 300px;
  height: 140px;
}

.box-of-image img {
  width: 150px;
  height: 100%;
  border-radius: 15px;
}

.carousel {
  margin-top: 30px;
}

.carousel div {
  height: 50px;
  width: 60px;
  background: #929292;
  border-radius: 3px;
}

.carousel div img {
  height: 100%;
  margin: auto;
}
</style>
