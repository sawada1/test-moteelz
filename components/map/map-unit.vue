<script lang="ts" setup>
  // import { POSITION, useToast } from 'vue-toastification'
  import { useI18n } from 'vue-i18n'
  // import { useFilterUnits } from '~/stores/filter'
  // import { useDateUtilities } from '~/composables/utilities/useDateUtilities'

  // const emits = defineEmits(['navigateToPage'])
  // const localePath = useLocalePath()
  // const toast = useToast()
  const { t, locale } = useI18n()
  // const token = useCookie('token')
  // const savedUnitCache = useCookie<Array<any>>('savedUnitCache')
  // const savedUnit = ref<Array<boolean>>([])
  // const shareBtn = ref<Array<boolean>>([])
  // const showModal = ref(false)
  // const props = defineProps(['unit', 'taxFlag'])
  // const config = useRuntimeConfig()
  // const webUrl = config.public.webURL
  // const isMobile = ref(true)
  // const unitMap = ref(null)
  // const route = useRoute()
  // const router = useRouter()
  // const filterPackageId = useCookie<number>('filterPackageId')
  // const store = useFilterUnits()
  // const { differenceInDays } = useDateUtilities()
  // const isLogin = computed(() => {
  //   return token.value ? true : false
  // })
  // const authToken = localStorage.getItem('authToken')

  // const unitSave = async (unit: object, index: number) => {
  //   console.log(unit);
    
  //   if (isLogin.value) {
  //     const savedData  = await useApiAxios('post','/favorites/add', {
  //       body: {
  //         id: unit.id,
  //         type:'hotel'
  //       }
  //     })

  //     savedUnit.value[index] = !savedUnit.value[index]
  //   } else {
  //     savedUnitCache.value = savedUnitCache.value ? savedUnitCache.value : []
  //     let status = 0
  //     let temp: Array<string> = []
  //     savedUnitCache.value.map((e) => {
  //       if (e == unitId) {
  //         status = 1
  //       } else {
  //         temp = temp.concat([e])
  //       }
  //     })

  //     if (status == 0) {
  //       savedUnitCache.value = savedUnitCache.value.concat([unitId])
  //       toast.info(t('content.savedMostLogin'), {
  //         timeout: 2000,
  //         position: POSITION.BOTTOM_CENTER
  //       })
  //     } else {
  //       savedUnitCache.value = temp
  //       toast.success(t('content.unsaved'), {
  //         timeout: 1000,
  //         position: POSITION.BOTTOM_CENTER
  //       })
  //     }
  //   }
  // }

  // const inCache = computed(() => (unitId: string) => {
  //   savedUnitCache.value = savedUnitCache.value ? savedUnitCache.value : []
  //   return savedUnitCache.value.includes(unitId)
  // })

  // const openNewTab = () => {
  //   // navigateTo(localePath(`/units/${unit?.id}-book`))
  //   // Define the route path you want to navigate to
  //   const routePath = localePath(`/units/${props.unit?.id}-book`)

  //   console.log(routePath)
  //   // Open the route in a new tab
  //   //   window.open(routePath, '_blank');
  //   window.open(`/units/${props.unit?.id}-book`, '_blank')
  // }
  // function formatDateToDashedString(date) {
  //   // Extract year, month, and day components

  //   const year = date.getFullYear()
  //   // Months are zero-based, so add 1 to get the correct month
  //   const month = date.getMonth() + 1
  //   const day = date.getDate()

  //   // Add leading zeros if necessary
  //   const formattedMonth = month < 10 ? '0' + month : month
  //   const formattedDay = day < 10 ? '0' + day : day

  //   // Concatenate components with dashes
  //   const dashedString = `${year}-${formattedMonth}-${formattedDay}`

  //   return dashedString
  // }
  // const navigateToPage = (unit) => {
  //   console.log(unit);
    
  //   const startDate = new Date()
  //   const endDate = new Date(startDate)
  //   if (route.path.indexOf('/wallet/hotels') !== -1) {
  //     navigateTo( localePath({
  //       path: `/wallet/wallet-hotels/${unit.id}-book`,
  //       query: {
  //         location: unit.country.name,
  //         checkIn:
  //           store.filter.dateStartStr.length != 0
  //             ? formatDateToDashedString(new Date(store.filter.dateStartStr))
  //             : formatDateToDashedString(
  //                 new Date(startDate.setDate(startDate.getDate() + 2))
  //               ),
  //         checkOut:
  //           store.filter.dateEndStr.length != 0
  //             ? formatDateToDashedString(new Date(store.filter.dateEndStr))
  //             : formatDateToDashedString(
  //                 new Date(endDate.setDate(endDate.getDate() + 4))
  //               ),
  //         to_date: route.query.to_date,
  //         packageId: route.query.packageId,
  //         available_days:route.query.available_days
  //       }
  //     }))
  //   } else {
  //    navigateTo (localePath({
  //       path: `/hotels/${unit.id}-book`,
  //       query: {
  //         location: store.filter.location,
  //         checkIn: formatDateToDashedString(store.filter.dateStartStr),
  //         checkOut: formatDateToDashedString(store.filter.dateEndStr)
  //       }
  //     }))
  //   }
  // }
  const props = defineProps({
    unit:{
      type:Object
    }
  })
</script>

<template>

  <section
    class="grid grid-cols-12 overflow-hidden bg-light hover:bg-[#e1e1e115]"
    style="max-width: 300px; min-height: 250px"
   
  >
    <div class="relative md:h-[150px] h-[150px] col-span-12 overflow-hidden">
           <div class="image-container relative md:w-[100%]">
          <!-- <button
                  :class="`slider-icon top-[40%] hidden xl:block lg:block absolute right-[5px] slider-product-image-next-${index} z-10`">
                  <IconCardNext></IconCardNext>
                </button>

                <button
                  :class="`slider-icon top-[40%] hidden xl:block lg:block absolute left-[5px] slider-product-image-prev-${index} z-10`">
                  <IconCardPrev></IconCardPrev>
                </button> -->
                {{unit.hotelImages.length}}
          <swiper
            :dir="locale == 'ar' ? 'rtl' : 'ltr'"
            :slidesPerView="1"
            spaceBetween="10"
            :pagination="{
              clickable: true,
            }"
            :navigation="{
              nextEl: `.slider-product-image-next-0`,
              prevEl: `.slider-product-image-prev-0`,
            }"
            :modules="[SwiperNavigation, SwiperAutoplay, SwiperPagination]"
            v-if="unit.hotelImages?.length > 0"
          >
            <swiper-slide v-for="i in unit.hotelImages" :key="i">
              <div
                class="w-full h-full rounded-[24px]"
              >
                <NuxtImg
                  :src="i.url"
                  class="h-[100%] xl:h-[100%] lg:h-[100%] w-full object-cover rounded-[24px]"
                  placeholder="/icons/loading.svg"
                  alt=""
                />
              </div>
            </swiper-slide>
          </swiper>
          <buttonF
            @click="addFav()"
            class="AddFav absolute flex items-center justify-center z-[3] top-[15px] left-[10px] w-[36px] h-[36px] rounded-[50%] bg-white"
          >
            <IconFavFill v-if="unit.favIcon"></IconFavFill>
            <IconFavStroke v-else></IconFavStroke>
          </buttonF>
          <div
            v-if="unit.specialDeal"
            class="absolute flex items-center bg-burgundy border-[1px] px-[6px] py-[3px] border-white rounded-[49px] text-white justify-center z-[3] top-[15px] right-[10px]"
          >
            <span class="text-[12px]"> خصم 10% </span>
          </div>
        </div>
    </div>

    <div class="relative col-span-12 h-full">
      <div class="grid grid-cols-12 h-full">
        <div class="md:col-span-12 col-span-12 flex justify-between flex-col">
          <div class="flex-row">
            <div
              class="row flex items-center justify-between text-sm text-start pt-4"
              v-if="unit?.key"
            >
              <span class="text-gray-800 font-semibold text-sm md:text-xl">
                {{ unit?.name }}
              </span>
              <span>
                <div
                  class="bg-[#F5E0EA] text-[#AC0054] gap-1 flex items-center text-md px-2 rounded-3xl font-semibold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 12 12"

                  >
                    <path
                      fill="#AC0054"
                      d="M5.283 1.546a.8.8 0 0 1 1.435 0L7.83 3.798l2.486.361a.8.8 0 0 1 .443 1.365L8.96 7.277l.425 2.476a.8.8 0 0 1-1.16.844L6 9.427l-2.224 1.17a.8.8 0 0 1-1.16-.844l.424-2.476l-1.799-1.753a.8.8 0 0 1 .444-1.365l2.486-.36z"
                    />
                  </svg>
                  <span class="text-lg font-bold">
                    {{ unit?.stars }}
                  </span>
                </div>
              </span>
            </div>
          </div>
          <div class="flex items-center justify-between mt-2">
            <div class="flex-row text-right" >
              <div class="flex gap-2 items-center">
                {{ unit.minPrice.value }}
                <!-- <span class="text-primary font-bold text-[16px]">
                  {{
                    $t(
                      `content.${
                        unit.ratePlan?.currency ? unit.ratePlan?.currency : 'SAR'
                      }`
                    )
                  }}
                </span> -->
              </div>
            
            </div>
            <!-- @click="navigateToPage(unit)" -->
            <button
              class="bg-primary text-sm text-white px-2 py-1 rounded-md w-fit hover:underline"
            >
            {{ $t('content.details') }}
              
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
