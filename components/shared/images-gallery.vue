<script setup>
const currentWidth = ref(window.innerWidth)
const isMob = ref(false)
const hideCarousel = ref(true)
const { locale } = useI18n()
watch(currentWidth, (newVal, oldVal) => {
  if (newVal && newVal > 500) {
    isMob.value = false
  }

  if (newVal && newVal <= 500) {
    isMob.value = true
  }
})
const updateWidth = () => {
  currentWidth.value = window.innerWidth
  if (window.innerWidth > 500) {
    isMob.value = false
  }

  if (window.innerWidth <= 500) {
    isMob.value = true
  }
}
onBeforeMount(() => {
  updateWidth()
})
onMounted(() => {
  updateWidth()
  nextTick(() => {
    window.addEventListener('resize', updateWidth)
  })
})
onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
defineProps({
  main_img: String,
  images: Array
})
const showModal = ref(false)
const showModalCard = ref(false)
const opendImage = ref(null)

const openImage = (imageUrl) => {
  opendImage.value = imageUrl
}
const openModel = (image_url, flag) => {
  hideCarousel.value = flag
  showModal.value = true
  showModalCard.value = true
  openImage(image_url)
}
const closeImage = () => {
  opendImage.value = null
  showModal.value = false
  showModalCard.value = false
}
</script>

<template>
  <div>

    <div class="grid md:grid-cols-5 gap-2">
      <div class="md:col-span-2 col-span-5 mx-4 md:mx-0 max-h-[300px]">
       <NuxtImg class="h-full w-full bg-dark/60 rounded-lg object-cover" :src="main_img" />
    </div>
    <div class="md:col-span-3 col-span-5 mx-4 md:mx-0 md:h-[300px]">
      <div class="grid md:grid-cols-3 grid-cols-2 h-full w-full gap-2">
        <div
          v-for="(img, i) in images.slice(0, isMob ? 2 : 6)"
          :key="img.id"
          class="relative cursor-pointer"
          @click="openModel(img.image_url, true)"
          >
          <div
          @click.stop="openModel(img.image_url, false)"
          v-if="
          (images.length > 6 && i === 5) || (isMob && images.length > 2 && i === 1)
            "
            class="absolute w-full h-full col-span-1 bg-dark/60 text-white font-semibold text-lg rounded-md flex items-center justify-center hover:bg-dark/80 cursor-pointer"
          >
          {{ $t('content.more_photos') }}
          </div>
          <NuxtImg
          :src="img.image_url"
          class="col-span-1 bg-dark/60 rounded-lg w-full max-h-[150px] min-h-[150px] object-cover"
          />
        </div>
      </div>
    </div>
  </div>
  <div
  v-if="showModal"
    class="fixed inset-0 top-0 w-full h-100 z-[99999] overflow-hidden justify-center items-center animated faster select-none"
    :class="showModal ? 'fadeIn flex' : 'fadeOut hidden'"
    style="background: rgba(0, 0, 0, 0.7)"
    >
    <div
      class="main-modelW p-2 border border-primary shadow-lg modal-container bg-light md:mx-1 md:my-10 md:w-[70%] h-auto w-[90%] mx-auto rounded z-50 overflow-y-auto"
      :class="!showModalCard ? 'md:max-w-[700px]' : 'md:max-w-[700px]'"
    >
      <div class="modal-content pt-1 h-[100%] text-left px-1 relative">
        <button
        class="top-2 p-2 z-50 bg-primary m-2 py-2 px-2 rounded-full cursor-pointer hover:opacity-100 transition-colors absolute"
          :class="locale === 'ar' ? 'left-2 ' : 'right-2'"
          @click="closeImage"
          >
          <Icon name="mdi:close" color="white" class="w-6 h-6 object-contain" />
        </button>
        <div class="mb-1">
          <NuxtImg
            class="rounded shadow-lg w-full md:h-[500px] h-[90%] object-cover"
            :src="opendImage"
            alt=""
            srcset=""
          />
        </div>
        <div class="flex w-100 overflow-auto mt-2 select-none" v-if="!hideCarousel">
          <Swiper
          ref="mySwiper"
          :modules="[SwiperEffectCreative, SwiperNavigation]"
          :loop="false"
          :allowTouchMove="true"
          :grabCursor="true"
          :keyboard="{
            enabled: true
            }"
            :scrollbar="true"
            :navigation="true"
            :slidesPerView="isMob ? 3 : 5"
            :centeredSlides="false"
            :slidesPerGroupSkip="isMob ? 3 : 5"
          >
            <SwiperSlide v-for="(slide, index) in images" :key="index">
              <div
                class="md:w-[130px] md:h-[120px] w-[94px] h-[80px] flex flex-col justify-center"
                @click="openModel(slide.image_url, false)"
                >
                 <NuxtImg
                  class="rounded-md overflow-hidden"
                  :class="opendImage === slide.image_url ? 'border-4 border-primary' : ''"
                  :src="slide.image_url"
                  alt=""
                  srcset=""
                  />
                </div>
              </SwiperSlide>
            </Swiper>
        </div>
        <card-gift v-if="showModalCard"></card-gift>
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
