<template>
  <div>
    <div
      class="product-card relative bg-white xl:bg-transparent lg:bg-transparent md:bg-transparent rounded-[20px]"
    >
      <div
        class="flex flex-col"
        :class="{ 'md:!flex-col bg-white p-4 gap-0 rounded-[16px]': row }"
      >
        <div class="image-container relative" :class="{ 'md:w-[100%]': row }">
          <!-- <button
                  :class="`slider-icon top-[40%] hidden xl:block lg:block absolute right-[5px] slider-product-image-next-${index} z-10`">
                  <IconCardNext></IconCardNext>
                </button>

                <button
                  :class="`slider-icon top-[40%] hidden xl:block lg:block absolute left-[5px] slider-product-image-prev-${index} z-10`">
                  <IconCardPrev></IconCardPrev>
                </button> -->

          <swiper
            :dir="locale == 'ar' ? 'rtl' : 'ltr'"
            :slidesPerView="1"
            spaceBetween="10"
            :pagination="{
              clickable: true,
            }"
            :navigation="{
              nextEl: `.slider-product-image-next-${index}`,
              prevEl: `.slider-product-image-prev-${index}`,
            }"
            :modules="[SwiperNavigation, SwiperAutoplay, SwiperPagination]"
            v-if="product.hotelImages?.length > 0"
          >
            <swiper-slide v-for="i in product.hotelImages" :key="i">
              <div
                class="h-[180px] xl:h-[238px] lg:h-[238px] image-swiper rounded-[24px]"
              >
                <NuxtImg
                  :src="i.url"
                  class="h-[100%] xl:h-[100%] lg:h-[100%] w-full object-cover rounded-[24px]"
                  placeholder="/placeholder.webp"
                  alt=""
                />
              </div>
            </swiper-slide>
          </swiper>
          <swiper
            :dir="locale == 'ar' ? 'rtl' : 'ltr'"
            :slidesPerView="1"
            spaceBetween="10"
            :pagination="{
              clickable: true,
            }"
            :navigation="{
              nextEl: `.slider-product-image-next-${index}`,
              prevEl: `.slider-product-image-prev-${index}`,
            }"
            :modules="[SwiperNavigation, SwiperAutoplay, SwiperPagination]"
            v-else
          >
            <swiper-slide v-for="i in [product.url]" :key="i">
              <div
                class="h-[180px] xl:h-[238px] lg:h-[238px] image-swiper rounded-[24px]"
              >
                <NuxtImg
                  :src="i.url"
                  class="h-[100%] xl:h-[100%] lg:h-[100%] w-full object-cover rounded-[24px]"
                  placeholder="/placeholder.webp"
                  alt=""
                />
              </div>
            </swiper-slide>
          </swiper>
          <buttonF
            @click="addFav()"
            class="AddFav absolute flex items-center justify-center z-[3] top-[15px] left-[10px] w-[36px] h-[36px] rounded-[50%] bg-white"
          >
            <IconFavFill v-if="product.favIcon"></IconFavFill>
            <IconFavStroke v-else></IconFavStroke>
          </buttonF>
          <div
            v-if="product.specialDeal"
            class="absolute flex items-center bg-burgundy border-[1px] px-[6px] py-[3px] border-white rounded-[49px] text-white justify-center z-[3] top-[15px] right-[10px]"
          >
            <span class="text-[12px]"> خصم 10% </span>
          </div>
        </div>
        <div class="w-full p-2 xl:p-0 lg:p-0 md:p-0">
          <div class="flex items-center justify-between w-full">
            <h4
              class="text-black2 font-bold text-[18px] lg:text-[18px] mb-[9px] mt-[17px]"
            >
              {{ product.name }}
            </h4>
            <div
              v-if="true"
              class="rate flex gap-1 w-[63px] bg-[#AC00541F] items-center justify-center py-[7px] rounded-[50px]"
            >
              <IconRedStar></IconRedStar>
              <span
                class="text-[14px] text-burgundy font-bold leading-none mt-[1px]"
              >
                {{ product.stars }}
              </span>
            </div>
          </div>
          <div class="address flex items-center gap-2">
            <IconPin></IconPin>
            <div class="flex flex-col">
              <span
                class="text-[#909090] font-medium text-[12px] text-normal xl:text-nowrap line-clamp-1 lg:text-nowrap"
              >
                {{ product.address }}
              </span>
              <span
                class="text-[#909090] font-medium text-[12px] text-normal xl:text-nowrap line-clamp-1 lg:text-nowrap"
              >
                {{ product.city.name }}
              </span>
            </div>
          </div>
          <!-- <div class="categories flex items-center gap-3 mt-[16px]">
            <div
              class="item w-[80px] h-[33px] rounded-[38px] flex items-center gap-2 justify-center bg-white"
              :class="{ 'bg-[#f8f8f8]': row || fav }"
            >
              <NuxtImg src="/icons/bed2.svg"></NuxtImg>
              <span class="text-[11px] mt-[1px] font-medium text-primary">
                2 غرفة
              </span>
            </div>
            <div
              class="item w-[80px] h-[33px] rounded-[38px] flex items-center gap-2 justify-center bg-white"
              :class="{ 'bg-[#f8f8f8]': row || fav }"
            >
              <IconSize></IconSize>
              <span
                class="text-[11px] mt-[1px] font-medium text-primary"
                :class="{ 'text-[16px] font-bold': row }"
              >
                175 متر
              </span>
            </div>
            <div
              class="item w-[80px] h-[33px] rounded-[38px] flex items-center gap-2 justify-center bg-white"
              :class="{ 'bg-[#f8f8f8]': row || fav }"
            >
              <IconBoy></IconBoy>
              <span
                class="text-[11px] mt-[1px] font-medium text-primary"
                :class="{ 'text-[16px] font-bold': row }"
              >
                1 شخص
              </span>
            </div>
          </div> -->
          <div class="price flex mt-[24px]">
            <h5
              v-if="!row && !fav"
              class="text-[18px] w-full font-bold text-primary"
            >
             <h5
                  class="text-primary flex items-center gap-1 font-bold text-[18px]"
                >
                  <span
                    class="text-[14px] line-through decoration-1 text-[#909090]"
                  >
                    {{ product.pricePerDay.value }}
                  </span>
                  {{ product.pricePerDay.value }}
                  <span class="text-[#909090]"> / ليلة </span>
                </h5>
                <h6 class="text-[14px] text-[#909090] font-bold">
                  إجمالي ( {{ product.search.stay }} ليلة )
                  {{ product.minPrice.value }}
                  <span class="text-primary">
                    {{ $t(`content.${product.minPrice.currency}`) }}
                  </span>
                </h6>
            </h5>
            <div
              v-if="row || fav"
              class="discount-container flex items-center w-full justify-between"
            >
              <div class="">
                <h5
                  class="text-primary flex items-center gap-1 font-bold text-[18px]"
                >
                  <span
                    class="text-[14px] line-through decoration-1 text-[#909090]"
                  >
                    {{ product.pricePerDay.value }}
                  </span>
                  {{ product.pricePerDay.value }}
                  <span class="text-[#909090]"> / ليلة </span>
                </h5>
                <h6 class="text-[14px] text-[#909090] font-bold">
                  إجمالي ( {{ product.search.stay }} ليلة )
                  {{ product.minPrice.value }}
                  <span class="text-primary">
                    {{ $t(`content.${product.minPrice.currency}`) }}
                  </span>
                </h6>
              </div>
            </div>
            <button
              class="bg-primary flex items-center justify-center text-[14px] gap-1 text-white w-[160px] md:w-[90px] md:h-[48px] rounded-[10px]"
            >
              عرض الغرف
              <NuxtImg
                src="/icons/arrow-white.svg"
                class="transform rotate-180 md:w-3 w-6"
                v-if="locale === 'ar'"
              />
            </button>
          </div>
        </div>
      </div>
      <AuthPopUP
        v-if="showModal"
        :show="showModal"
        @close="showModal = false"
      />
    </div>
    <Toaster />
  </div>
</template>
<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { Hotel } from "@/types/hotel";
import { PropType } from "vue";
import { useAuthStore } from "@/stores/auth";
import AuthPopUP from "@/components/card/AuthPopUp.vue";
const localePath = useLocalePath();
const { locale, setLocale } = useI18n();
let router = useRouter();
const showModal = ref(false);

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

const { toast } = useToast();
let props = defineProps({
  index: {
    required: true,
    type: Number,
  },
  product: {
    required: true,
    type: Object as PropType<Hotel>,
    default: () => ({
      mainImage: null,
      url: "http:\/\/127.0.0.1:8000\/api\/v1\/search\/9d6d0a2d-9109-441c-9fa3-263a9f635a4b\/hotels\/1005\/offers",
      id: 1005,
      name: "3 PYRAMIDS VIEW INN (3EST)",
      stars: 3,
      type: { id: 9, name: "Guest house" },
      address: "7 Abou Al Hool Al Seiahi Al Haram Pyramids Nazlet",
      zipCode: "",
      city: { id: 1646, name: "Cairo", countryId: 51 },
      country: { id: 51, name: "Egypt", iso: "EG" },
      geolocation: { latitude: "29.977170", longitude: "31.142454" },
      recommended: false,
      specialDeal: false,
      rateTags: [],
      minPrice: { value: 1011, currency: "SAR" },
      boardBasis: [{ code: "BB", price: { value: 1011, currency: "SAR" } }],
      cancelaition_policy: [
        { code: "refundable", price: { value: 1011, currency: "SAR" } },
      ],
    }),
  },
  row: {
    default: false,
    required: true,
    type: Boolean,
  },
  fav: {
    default: false,
    required: false,
    type: Boolean,
  },
});

const addFav = () => {
  if (!isAuthenticated.value) {
    authStore.showModal = true; // Show the login modal
  } else {
    // Redirect to the localized user dashboard
    const localizedDashboardPath = localePath("/dashboard");
    router.push(localizedDashboardPath);
  }
  props.product.favIcon = !props.product.favIcon;
};
</script>
<style lang="scss">
// :class="{'!w-[349px]':row , '!h-[273px]':row}"
.product-card {
  .main-container {
    &.active {
      flex-direction: row;
      .image-container {
        width: 349px;
        .image-swiper {
          width: 349px;
          height: 273px;
        }
      }
      .discount-container {
        margin-top: 70px;
      }
    }
  }
}
@media (max-width: 800px) {
  .product-card {
    .main-container {
      &.active {
        flex-direction: column;
        .image-container {
          width: 100%;
          .image-swiper {
            width: 100%;
            height: 230px;
          }
        }
        .discount-container {
          margin-top: 0px;
          button {
            display: none;
          }
        }
      }
    }
  }
}
html[dir="rtl"] {
  .product-card,
  .wishlist-container {
    direction: rtl;
  }
}
</style>
