<template>
  <div>
    <div
      @click="goToHotel(product?.key)"
      class="product-card cursor-pointer relative bg-white xl:bg-transparent lg:bg-transparent md:bg-transparent rounded-[20px]"
    >
      <div
        class="flex flex-col bg-white rounded-[24px]"
        :class="{
          'lg:flex-row  p-4 gap-7 ': row,
          'lg:flex-col': !row,
          'shadow-customShadow': fav,
        }"
      >
        <div
          class="image-container relative"
          :class="{ 'xl:w-[430px] lg:w-[430px] w-full': row }"
        >
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
            v-if="product?.hotelImages.slice"
          >
            <swiper-slide v-for="i in product?.hotelImages.slice(0,3)" :key="i">    
              <div
                class="h-[180px] xl:h-[238px] lg:h-[238px] image-swiper rounded-[24px]"
              >
                <NuxtImg
                  :src="i.url"
                  class="h-[100%] xl:h-[100%] lg:h-[100%] w-full object-cover rounded-[24px]"
                  alt=""
                  loading="lazy"
                />
              </div>
            </swiper-slide>
          </swiper>
          <!-- <div
            class="h-[180px] xl:h-[238px] lg:h-[238px] image-swiper rounded-[24px] mb-2"
          >
            <NuxtImg
              :src="product?.image"
              class="h-[100%] xl:h-[100%] lg:h-[100%] w-full object-cover rounded-[24px]"
              alt=""
                placeholder="/placeholder.webp"

            />
          </div> -->
          <!-- placeholder="/placeholder.webp" -->
          <!-- loading="lazy" -->
          <button
            @click.stop="addFav(product?.key)"
            class="AddFav absolute flex items-center justify-center z-[3] top-[15px] left-[10px] w-[36px] h-[36px] rounded-[50%] bg-white"
          >
            <IconFavFill v-if="product?.isFavorite"></IconFavFill>
            <IconFavStroke v-else></IconFavStroke>
          </button>
          <div
            v-if="product?.specialDeal"
            class="absolute flex items-center bg-burgundy border-[1px] px-[6px] py-[3px] border-white rounded-[49px] text-white justify-center z-[3] top-[15px] right-[10px]"
          >
            <span class="text-[12px]"> خصم 10% </span>
          </div>
        </div>
        <div
          class="w-full flex flex-col"
          :class="{ 'justify-between': row, 'p-3': !row }"
        >
          <div>
            <div class="flex items-center justify-between w-full">
              <h4
                class="text-black2 font-bold w-[75%] line-clamp-1 text-[18px] lg:text-[18px] mb-[9px] mt-[17px]"
              >
                {{ product?.name }}
              </h4>
              <div
                v-if="true"
                class="rate flex gap-1 w-[55px] bg-[#AC00541F] items-center justify-center py-[7px] rounded-[50px]"
              >
                <IconRedStar></IconRedStar>
                <span
                  class="text-[14px] text-burgundy font-bold leading-none mt-[1px]"
                >
                  {{ product?.stars }}
                </span>
              </div>
            </div>
            <div class="address flex items-center gap-2">
              <IconPin></IconPin>
              <div class="flex flex-col">
                <span
                  class="text-[#909090] font-medium text-[12px] text-normal xl:text-nowrap line-clamp-1 lg:text-nowrap"
                >
                  {{ product?.city?.name }} , {{ product?.address }}
                </span>
              </div>
            </div>
          </div>
          <!-- <div class="categories flex items-center gap-3 mt-[16px]">
                        <div class="item w-[80px] h-[33px] rounded-[38px] flex items-center gap-2 justify-center bg-white"
                            :class="{ 'bg-[#f8f8f8]': row  }">
                            <NuxtImg src="/icons/bed2.svg"></NuxtImg>
                            <span class="text-[11px] mt-[1px] font-medium text-primary">
                                2 غرفة
                            </span>
                        </div>
                        <div class="item w-[80px] h-[33px] rounded-[38px] flex items-center gap-2 justify-center bg-white"
                            :class="{ 'bg-[#f8f8f8]': row  }">
                            <IconSize></IconSize>
                            <span class="text-[11px] mt-[1px] font-medium text-primary"
                                :class="{ 'text-[16px] font-bold': row }">
                                175 متر
                            </span>
                        </div>
                        <div class="item w-[80px] h-[33px] rounded-[38px] flex items-center gap-2 justify-center bg-white"
                            :class="{ 'bg-[#f8f8f8]': row  }">
                            <IconBoy></IconBoy>
                            <span class="text-[11px] mt-[1px] font-medium text-primary"
                                :class="{ 'text-[16px] font-bold': row }">
                                1 شخص
                            </span>
                        </div>
                    </div> -->
          <div class="price flex mt-[24px]">
            <h5
              v-if="!row && !fav && !$route.path.includes('/hotels')"
              class="text-[18px] w-full font-bold text-primary"
            >
              {{ product?.pricePerDay?.value }} {{ $t("content.SAR_currency") }}
              <span class="text-[#565656] text-[18px] font-medium">
                - {{ $t("content.daily2") }}
              </span>
            </h5>
            <button
              class="bg-primary w-full text-white p-2 rounded-lg"
              v-if="fav"
            >
              {{ $t("content.check_price") }}
            </button>

            <div
              v-if="row || $route.path.includes('/hotels')"
              class="discount-container flex items-center w-full justify-between"
            >
              <div class="flex flex-col">
                <div class="flex gap-2 items-center">
                  <div class="flex flex-col">
                    <!-- <h5
                      class="text-primary flex items-center gap-1 font-bold text-[18px]"
                    >
                      {{ product.pricePerDay.value }}
                      {{ $t(`content.${product.minPrice.currency}`) }}
                      <span class="text-[#909090]">
                        / {{ $t("content.night") }}
                      </span>
                    </h5> -->
                    <h6
                      class="text-[18px] flex flex-col text-[#909090] font-semibold"
                    >
                      <span class="text-primary text-[22px]">
                        {{ product.minPrice.value }}
                        {{ $t(`content.${product.minPrice.currency}`) }}
                      </span>
                      <span class="underline flex gap-1">
                        <span>
                          {{
                            product.search.stay === 1
                              ? $t("content.one_night")
                              : product.search.stay === 2
                              ? $t("content.two_night")
                              : product.search.stay > 2 &&
                                product.search.stay < 11
                              ? $t(
                                  "content.more_two_night",{
                                    night:product.search.stay

                                  }
                                )
                              : $t("content.hotel_package_2", {
                                  days: product.search.stay,
                                })
                          }}
                        </span>
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
              <button
                v-if="row"
                class="bg-primary flex items-center justify-center text-[14px] gap-2 text-white w-[110px] h-[48px] rounded-[10px]"
              >
                {{ $t("hotels.Show_rooms") }}
                <NuxtImg
                  src="/icons/arrow-white.svg"
                  class="transform rotate-180 w-4"
                  v-if="locale === 'ar'"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <AuthPopUP
        v-if="showModal"
        :show="showModal"
        @close="showModal = false"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Method, useApi } from "@/composables/api";
import { useToast } from "@/components/ui/toast/use-toast";
import { useAuthStore } from "@/stores/auth";
import AuthPopUP from "@/components/card/AuthPopUp.vue";
import { useSearchStore } from "@/stores/hotels/search";
import { generalStore } from "@/stores/general";
import { storeToRefs } from "pinia";
const { searchQueryId } = storeToRefs(useSearchStore());
const { searchObj } = storeToRefs(generalStore());
const localePath = useLocalePath();
const { locale, setLocale } = useI18n();
let router = useRouter();
const showModal = ref(false);
import { homeStore } from "@/stores/home";
let store = homeStore();
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

const goToHotel = (id) => {
  const url = `/hotels/${id}-book`;
  const queryParams = {
    searchId: id,
    checkIn: searchObj.value.checkIn,
    checkOut: searchObj.value.checkOut,
  };
  const updatedRoute = {
    path: url,
    query: {
      ...queryParams,
    },
    replace: false,
  };

  const fullLocalePath = localePath(updatedRoute);
  router.push(fullLocalePath);
};
const { toast } = useToast();
let props = defineProps({
  index: {
    required: true,
    type: Number,
  },
  product: {
    required: true,
    type: Object,
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

const addFav = async (id) => {
  if (!isAuthenticated.value) {
    authStore.showModal = true; // Show the login modal
  } else {
    try {
      const response = await useApi(
        "/api/v1/account/favorites/toggle",
        Method.POST,
        undefined,
        { id: id },
        locale.value
      );

      if (response.error) {
        console.error(`Error ${response.statusCode}: ${response.error}`);
      } else if (response.data) {
        toast({
          title: response.data?.message,
          duration: 3000,
          class: "p-3 bg-primary text-white",
        });
        if (props.fav) {
          store.getFavs(locale.value);
        }
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
    props.product.isFavorite = !props.product.isFavorite;
  }
};
</script>
<style lang="scss"></style>
