<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Button from '@/components/ui/button/Button.vue';
const { t } = useI18n();
useHead({
  title: t('content.about_moteelz'),
  meta: [
    { name: 'description', content: t('content.about_company') }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: '' } ]
})

const currentWidth = ref<number | null>(null)

// Function to update the width
const updateWidth = () => {
    if (typeof window !== 'undefined') {
        currentWidth.value = window.innerWidth
    }
}

 
onMounted(() => {
    updateWidth() 
    window.addEventListener('resize', updateWidth)
})

 
onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
})
</script>

<template>
    <BannerComponent bgName="bg-about-bg" title="content.about_moteelz" />
    <div class="flex flex-col mt-10 md:mt-24 md:max-w-7xl md:mx-auto">
        <div class="flex flex-col justify-center md:grid md:grid-cols-2 items-center">
            <div data-aos="zoom-in-up" data-aos-duration="400" class="relative col-span-1 p-10 md:p-1">
                <NuxtImg class="md:w-[70%] relative z-10" src="img/about-banner.webp" />
                <NuxtImg class="absolute md:w-[70%] top-0 z-[0]" src="img/about-banner-bg.webp" />
            </div>
            <div data-aos="zoom-in-up" data-aos-duration="1000" class="col md:text-start p-10 md:p-1 text-center">
                <h3 class="text-primary  md:text-start font-bold text-[25px] ">{{ $t('content.about_company') }}<span
                        class="text-[#AC0054] text-[50px]">.</span></h3>
                <p >{{ $t(`content.about_company_details`) }}</p>
                <p class="mt-5 mb-5">{{ $t(`content.about_company_details2`) }}</p>
                <Button class=" px-10 py-2 md:text-lg text-sm  rounded-md text-white cursor-pointer">
                    <NuxtLink :to="localePath('/contact')"
                    class="">{{ $t('content.contact_us') }} 
                </NuxtLink>
                </Button>
             
            </div>
        </div>
        <div class="text-center md:mt-28 px-5 md:px-0">
            <h3 class="text-primary font-bold text-[25px] font-rubik"> {{ $t('content.products_and_services') }}<span
                    class="text-[#AC0054] text-[50px] ">.</span></h3>
            <p class="text-[#696871] md:w-2/5 mx-auto mb-5">{{ $t('content.products_and_services_sub') }}</p>
            <div class="flex flex-col md:flex-row gap-14">
                <div data-aos="fade-right"
                    class="text-center w-full relative overflow-hidden flex flex-col gap-10 items-center justify-center py-5 md:py-10 px-10 bg-white rounded-xl">
                    <div class="rounded-full absolute z-0 opacity-5  -top-52 bg-primary w-96 h-96"></div>
                    <div class="rounded-full absolute z-0 opacity-5  -top-72 bg-primary w-full h-[100%]"></div>
                    <IconAboutWallet></IconAboutWallet>

                    <span class="text-[#AC0054] text-[20px] font-semibold">{{ $t('content.moteels_uniq_wallet') }}  </span>
                    <p>{{ $t('content.moteels_uniq_wallet_details') }}</p>
                    <NuxtLink :to="localePath('/wallet')"
                        class="bg-primary px-10 py-2 md:text-lg text-sm  rounded-md text-white cursor-pointer">{{ $t('content.view_wallet') }}</NuxtLink>

                </div>
                <div data-aos="fade-left"
                    class="text-center w-full relative flex overflow-hidden flex-col gap-10 items-center justify-center py-5 md:py-10 px-10 bg-white rounded-xl ">
                    <div class="rounded-full absolute z-0 opacity-5  -top-52 bg-primary w-96 h-96"></div>
                    <div class="rounded-full absolute z-0 opacity-5  -top-72 bg-primary w-full h-[100%]"></div>
                    <IconAboutHome class="relative z-10"></IconAboutHome>

                    <span class="text-[#AC0054] text-[20px] font-semibold">{{ $t('content.long_stay') }}</span>
                    <p>{{ $t('content.long_stay_details') }}</p>
                    <NuxtLink :to="localePath('/hotels')"
                        class="bg-primary px-10 py-2 md:text-lg text-sm  rounded-md text-white cursor-pointer">{{ $t('content.view_hotels') }}</NuxtLink>

                </div>
            </div>
        </div>
        <div data-aos="fade-up" class="text-center h-full w-full my-20">
            <h3 class="text-primary font-bold text-[25px]">{{ $t('content.our_partners') }}<span class="text-[#AC0054] text-[50px]">.</span></h3>


            <Swiper class="bg-white px-5 py-2 flex justify-center items-center rounded-3xl" :modules="[SwiperAutoplay]"
                :slides-per-view="currentWidth > 600 ? 6 : 3" :loop="true" :autoplay="{
                    delay: 1000,
                }">
                <SwiperSlide class="px-5 py-2" v-for="slide in 6" :key="slide">
                    <NuxtImg class="w-[200px] h-[85px]" :src="'/img/about/partners/p' + slide + '.svg'" />
                </SwiperSlide>
            </Swiper>
            <div class="md:hidden flex justify-center w-full">

            </div>
        </div>
    </div>
</template>