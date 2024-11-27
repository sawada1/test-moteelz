<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    unit: {
      type: Object,
      default: () => ({})
    },
    hotel: {
      type: Object,
      default: () => ({})
    },
    img: {
      type: String,
      default: ''
    }
  })
  const opendImage = ref(null)

  const emit = defineEmits(['update:show'])

  const isOpen = ref(props.show)

  watch(
    () => props.show,
    (newVal) => {
      isOpen.value = newVal
    }
  )

  const descriptionItems = computed(() => {
    return props.unit.desc.split('\n')
  })

  watch(
    () => props.unit,
    (newVal) => {
      if (newVal) {
        if (newVal.images) {
          if (newVal.images.length > 0) {
            opendImage.value = newVal.images[0].image_url
          }
        }
      }
    }
  )

  const close = () => {
    emit('update:show', false)
  }

  const openImage = (imageUrl) => {
    opendImage.value = imageUrl
  }
  const openModel = (image_url, flag) => {
    openImage(image_url)
  }
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 overflow-hidden flex" style="z-index: 100">
    <!-- Overlay -->
    <div
      @click="close"
      class="fixed left-0 w-full h-full   bg-gray-500 bg-opacity-75 transition-opacity duration-300"
    ></div>
    <!-- Sidebar Content -->
    <section
      :class="[
        'absolute top-[72px] rtl:left-0 ltr:right-0 max-w-full flex ',
        isOpen
          ? 'transition-transform translate-x-0'
          : 'transition-transform translate-x-full'
      ]"
    >
      <div
        class="w-screen max-w-md h-full flex flex-col justify-between  bg-white shadow-xl"
      >
        <!-- Sidebar Header -->
        <div class="flex items-center justify-between shadow-lg pt-4 px-4">
          <h2 class="text-xl font-semibold text-black">{{ unit.title }}</h2>
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            <span class="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg"  width="32" height="32" viewBox="0 0 24 24"><path fill="#f00" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m3.59-13L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41z"/></svg>
          </button>
        </div>
        <!-- Sidebar Content -->

        <div class="mt-1 h-[83vh] overflow-auto sidesheet">
          <div class="w-full justify-center items-center" v-if="unit?.images">
            <div
              class="bg-light md:mb-8 md:mt-4 h-auto w-full rounded overflow-y-auto"
              v-if="unit?.images.length > 0"
            >
              <div class="pt-1 h-[100%] px-1 relative">
                <div class="mb-1">
                  <NuxtImg
                    v-if="opendImage"
                    class="rounded shadow-lg w-[99%] md:max-h-[400px] max-h-[90%] object-cover"
                    :src="opendImage"
                    alt=""
                    srcset=""
                  />
                </div>
                <div class="flex w-100 overflow-auto mt-2 select-none">
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
                    <SwiperSlide v-for="(slide, index) in unit?.images" :key="index">
                      <div
                        class="w-[80px] h-[80px] mx-1 flex flex-col justify-center"
                        @click="openModel(slide.image_url, false)"
                      >
                        <NuxtImg
                          class="rounded-md overflow-hidden"
                          :class="opendImage === slide ? 'border-2 border-primary' : ''"
                          :src="slide.image_url"
                          alt=""
                          srcset=""
                        />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-full justify-center items-center"
            v-if="!unit?.images && unit?.image"
          >
            <div class="bg-light md:my-2 h-auto w-full rounded overflow-y-auto">
              <div class="pt-1 h-[100%] px-1 relative">
                <div class="mb-1">
                  <NuxtImg
                    v-if="opendImage"
                    class="rounded shadow-lg w-[99%] md:max-h-[400px] max-h-[90%] object-cover"
                    :src="opendImage"
                    alt=""
                    srcset=""
                  />
                </div>
                <div class="flex w-100 overflow-auto mt-2 select-none">
                  <div class="w-[100%] mx-1 flex flex-col justify-center">
                    <NuxtImg
                      class="max-h-[300px] rounded-md overflow-hidden"
                      :src="unit?.image.image_url"
                      alt=""
                      srcset=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 w-full">
            <div class="w-full flex">
              <div class="flex flex-col space-y-4 w-full mt-[20px] mb-[40px]">
                <div class="flex flex-row w-full" v-if="unit.max_capacity > 0">
                  <div class="flex flex-row justify-between pe-5">
                    <div
                      class="text-md font-semibold text-[#333333eb] text-[15px] min-w-[64px]"
                    >
                      {{ $t('content.capacitance') }}
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="text-[14px] text-[#333333]">
                      {{ $t('content.room_capacity') }} {{ unit.max_capacity }}
                    </div>
                  </div>
                </div>
                <ol
                  class="relative border-s border-gray-200 dark:border-gray-700"
                  v-if="unit.cancelPolicy?.length > 0"
                >
                  <li
                    class="mb-10 ms-6"
                    v-for="feature in unit.cancelPolicy"
                    :key="feature"
                  >
                    <span
                      class="absolute flex items-center justify-center w-6 h-6 bg-gray-50 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900"
                    >
                      <!-- <img class="rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/> -->
                      <!-- <span :class="`text-${feature.type.color}-400 text-sm`">
                                  {{ feature.type.name }}
                                </span> -->
                      <svg
                        v-if="feature.type.class === 'avalable'"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#248c29"
                          d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                        />
                      </svg>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#f97e7e"
                          d="m12 12.708l3.246 3.246q.14.14.344.15t.364-.15t.16-.354t-.16-.354L12.708 12l3.246-3.246q.14-.14.15-.344t-.15-.364t-.354-.16t-.354.16L12 11.292L8.754 8.046q-.14-.14-.344-.15t-.364.15t-.16.354t.16.354L11.292 12l-3.246 3.246q-.14.14-.15.345q-.01.203.15.363t.354.16t.354-.16zM12.003 21q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                        />
                      </svg>
                    </span>
                    <div
                      class="flex-col justify-between items-start p-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600"
                      dir="rtl"
                    >
                      <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                        <a
                          href="#"
                          class="font-semibold text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          {{ feature.type.name }}
                        </a>
                      </div>
                      <time
                        class="mb-1 text-right text-xs font-normal text-gray-400 sm:order-last sm:mb-0 ps-2"
                      >
                        <strong> من:</strong>
                        {{ formatDate(feature.startDate) }}
                        <br />
                        <strong>الي:</strong>
                        {{ formatDate(feature.endDate) }}
                      </time>
                    </div>
                  </li>
                </ol>
                <div class="flex flex-row w-full" v-if="unit.bedrooms > 0">
                  <div class="flex flex-row justify-between pe-5">
                    <div
                      class="text-md font-semibold text-[#333333eb] text-[15px] min-w-[64px]"
                    >
                      {{ $t('content.bedrooms') }}
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="text-[14px] text-[#333333]">
                      {{ unit.bedrooms }} {{ $t('content.bedrooms') }}
                    </div>
                  </div>
                </div>

                <div class="flex flex-row w-full" v-if="unit.square_area > 0">
                  <div class="flex flex-row justify-between pe-5">
                    <div
                      class="text-md font-semibold text-[#333333eb] text-[15px] min-w-[64px]"
                    >
                      {{ $t('content.space') }}
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="text-[14px] text-[#333333]">
                      {{ unit.square_area }} {{ $t('hosting.squareMeters') }}
                    </div>
                  </div>
                </div>

                <!-- {{$t('content.persons')}} -->

                <div class="flex flex-row w-full" v-if="unit.no_of_child > 0">
                  <div class="flex flex-row justify-between pe-5">
                    <div
                      class="text-md font-semibold text-[#333333eb] text-[15px] min-w-[64px]"
                    >
                      {{ $t('content.childes') }}
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="text-[14px] text-[#333333]">
                      {{ unit.no_of_child }}
                    </div>
                  </div>
                </div>
                <div v-if="unit.desc && unit.desc !== ''">
                  <hr class="border-gray-300 my-[20px]" />

                  <ul class="bg-white rounded-lg w-full max-w-md list-none">
                    <li
                      v-for="(item, index) in descriptionItems"
                      :key="index"
                      class="flex items-center py-2 border-b border-[#eeeeee] last:border-none text-sm gap-[10px]"
                    >
                      <span class="w-1 h-1 bg-primary rounded-full mr-2"></span>
                      {{ item }}
                    </li>
                  </ul>
                </div>

                <div>
                  <hr
                    class="border-gray-300 mb-[20px]"
                    v-if="!unit.furnished || !unit.kitchen || !unit.parking"
                  />

                  <div
                    class="flex flex-wrap items-start gap-[20px_50px] mb-[20px]"
                    v-if="!unit.furnished || !unit.kitchen || !unit.parking"
                  >
                    <span class="flex items-center gap-x-2" v-if="!unit.furnished">
                      <Icon name="la:couch" class="text-primary h-[20px] w-[20px]" />
                      <span class="text-[14px]">{{ $t('content.couch') }}</span>
                    </span>
                    <span class="flex items-center gap-x-2" v-if="!unit.kitchen">
                      <Icon name="mdi:kitchen" class="text-primary h-[20px] w-[20px]" />
                      <span class="text-[14px]">{{ $t('content.kitchen') }}</span>
                    </span>
                    <span class="flex items-center gap-x-2" v-if="!unit.parking">
                      <Icon name="mdi:parking" class="text-primary h-[20px] w-[20px]" />
                      <span class="text-[14px]">{{ $t('content.parking') }}</span>
                    </span>
                  </div>
                </div>
                <template
                  v-if="unit?.facility_groups && unit?.facility_groups.length > 0"
                >
                  <hr class="border-gray-300 !m-0 !mb-[20px]" />

                  <div class="flex flex-col w-full mb-[40px]">
                    <div class="flex flex-col w-full">
                      <div class="text-lg text-[#333333] font-semibold">
                        {{ $t('content.facility_groups2') }}
                      </div>
                    </div>
                    <div class="w-full" v-for="(group, index) in unit?.facility_groups" :key="index">
                      <div class="flex flex-col w-full space-y-2">
                        <div class="text-[15px] text-[#414141] font-[600] my-[10px]">
                          {{ group.group_name }}
                        </div>
                      </div>
                      <div class="grid grid-cols-2 gap-4 w-full">
                        <div
                          v-for="(feature, i) in group?.facilities"
                          :key="i"
                          class="flex col-span-1 justify-between items-center space-x-2 text-[#66797f]"
                        >
                        <div class="flex items-center">

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            viewBox="0 0 24 24"
                            fill="none"
                            width="20"
                            height="20"
                            class="text-gray-500"
                          >
                            <path
                              d="M20.25 6.75047L9.75 17.25L4.5 12.0005"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                          <p class="text-sm">{{ feature.name }}</p>
                        </div>

                          <span
                            v-if="!!!feature.pivot?.ind_fee"
                            class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                            >{{ $t('content.free') }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <div
                  class="bg-white rounded-md py-6 px-5"
                  v-if="unit.facilitiesOnly?.length > 0"
                >
                  <p class="text-[#312B72] text-[22px] font-semibold">
                    {{ $t('content.facility') }}
                  </p>
                  <ul class="flex flex-wrap mt-4 gap-5">
                    <li
                      class="flex align-items-center justify-center text-[14px] gap-2 border-2 rounded-md border-gray-100 py-3 px-2 bg-[#FDFDFD]"
                      v-for="facility in unit.facilitiesOnly"
                      :key="facility.id"
                    >
                      <NuxtImg class="w-4 h-4" :src="facility.icon" />
                      <span>{{ facility.name }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            class="pt-4 pb-4 px-4 w-full border-t-2 shadow-lg flex flex-row justify-between items-center"
          >
            <div class="text-lg flex flex-col"
            
            >
              <span class="text-[#191721] text-[12px]">ابتداء من</span>
              <span class="font-bold text-[20px] text-[#191721]">
                {{ Number(unit?.ratePlans[0].totalAmountAfterTaxRate) }}
                {{ $t('content.' + `${unit?.ratePlans[0].currency}`) }}
              </span>
            </div>
            <button
              @click="close"
              class="flex justify-center items-center bg-primary text-white rounded-md text-sm p-2 gap-1"
            >
              اضهر الخيارات
            </button>
          </div>
        </div>
        <!-- Sidebar Footer -->
      </div>
    </section>
  </div>
</template>

<style scoped>
  .box-of-image {
    padding: 10px 0px;
    width: 300px;
    height: 140px;
  }

  .box-of-image img {
    width: 90px;
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
