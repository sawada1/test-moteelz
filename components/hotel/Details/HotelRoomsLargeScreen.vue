<template>
  <div class="relative">
    <div class="" v-if="Object.keys(hotelRatePlans)?.length > 0">
      <div
        class="grid grid-cols-12 mt-10 rounded-t-2xl"
        v-if="hotelPlans?.offers[0]?.packages[0]?.packageRooms.length > 0"
      >
        <div
          class="hidden md:grid col-span-12 grid-cols-12 gap-4 px-5 bg-white rounded-t-xl"
        >
          <div class="col-span-1 text-[#7D7D7D] py-6 px-2 bg-white">
            {{ $t("fillter.Choose") }}
          </div>
          <div class="col-span-3 text-[#7D7D7D] py-6 px-4 bg-white">
            {{ $t("content.room_info") }}
          </div>
          <div class="col-span-2 text-[#7D7D7D] py-6 bg-white">
            {{ $t("content.options") }}
          </div>
          <div class="col-span-2 text-[#7D7D7D] py-6 bg-white">
            {{ $t("content.guest") }}
          </div>
          <div class="col-span-2 text-[#7D7D7D] py-6 bg-white">
            {{ $t("content.price") }}
          </div>
          <div class="col-span-2 text-[#7D7D7D] py-6 bg-white px-2">
            {{ $t("content.total_price") }}
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-12"
        v-if="hotelPlans?.offers[0]?.packages[0]?.packageRooms.length > 0"
      >
        <div class="grid col-span-10 w-full gap-4" id="room">
          <div class="col-span-12 grid px-6 pb-6 bg-white rounded-b-xl">
            <div
              v-for="(pkg, pkgIndex) in hotelPlans?.offers[0]?.packages[0]
                ?.packageRooms"
              :key="pkgIndex"
              class="package-section col-span-12 grid"
            >
              <div
                class="package-header flex items-center gap-2 py-3 font-semibold"
              >
                <span> {{ $t("content.room_options") }}: </span>
                {{
                  pkg.occupancy?.adults == 1
                    ? `${pkg.occupancy?.adults} ${$t("content.adults_show_1")}`
                    : `${pkg.occupancy?.adults} ${$t(
                        "content.adults_show_more"
                      )} `
                }}
              </div>

              <div
                class="bg-[#FBFBFB] py-6 px-4 hidden rounded-b-lg gap-4 md:grid grid-cols-10"
                v-for="(rooms, roomIndex) in pkg?.roomReferences"
                :key="roomIndex"
              >
                <div class="col-span-1 grid grid-cols-12 bg-white">
                  <div
                    class="flex items-center gap-2 col-span-12 justify-center w-full h-full"
                  >
                    <Checkbox
                      id="terms"
                      class="w-8 h-8 text-white"
                      :checked="rooms.selected"
                      v-model:checked="rooms.selected"
                      :disabled="rooms.selected"
                      @update:checked="
                        handleCheckboxChange(pkgIndex, roomIndex)
                      "
                    />
                  </div>
                </div>

                <div class="col-span-3 grid grid-cols-12">
                  <div
                    class="col-span-12 px-4 py-4 bg-white border-l-[3px] border-[#FBFBFB] h-[160px]"
                    :key="plan"
                  >
                    <div class="flex items-center gap-2 flex-col">
                       <span
                        class="text-center text-sm font-semibold"
                      >
                        {{ rooms?.roomData?.name }}
                      </span>
                      <swiper
                        :dir="locale == 'ar' ? 'rtl' : 'ltr'"
                        :slidesPerView="1"
                        spaceBetween="10"
                        :pagination="{ clickable: true }"
                        :navigation="{
                          nextEl: `.slider-product-image-next-${index}`,
                          prevEl: `.slider-product-image-prev-${index}`,
                        }"
                        :modules="[
                          SwiperNavigation,
                          SwiperAutoplay,
                          SwiperPagination,
                        ]"
                        class="w-full"
                        v-if="rooms.roomData?.details?.images?.length > 0"
                      >
                        <swiper-slide
                          v-for="i in rooms.roomData?.details?.images"
                          :key="i.name"
                        >
                          <div class="h-[90px] rounded-[24px]">
                            <NuxtImg
                              :src="i.url"
                              class="h-full w-full object-cover rounded-[24px]"
                              placeholder="/placeholder.webp"
                              :alt="i.name"
                              loading="lazy"
                            />
                          </div>
                        </swiper-slide>
                      </swiper>
                      <div v-else class="h-[90px] w-full rounded-[24px]">
                        <NuxtImg
                          src="/placeholder.webp"
                          placeholder="/placeholder.webp"
                          class="h-[100%] w-full object-cover rounded-[24px]"
                          alt=""
                        />
                      </div>
                     
                    </div>
                  </div>
                </div>

                <!-- Add more design sections as in your original code -->
                <div class="col-span-2 grid grid-cols-12">
                  <div
                    class="col-span-12 p-4 bg-white border-l-[3px] border-[#FBFBFB] h-[160px]"
                    :class="rooms.length > 1 ? 'mb-4' : ''"
                  >
                    <div
                      class="flex items-center gap-2"
                      :class="
                        rooms?.roomData?.nonRefundable === true ||
                        rooms?.roomData?.nonRefundable === null
                          ? 'text-red-400'
                          : 'text-green-400'
                      "
                    >
                      <span class="w-3 h-3 bg-primary rounded-full"></span>
                      <span>
                        {{
                          rooms?.roomData?.nonRefundable === true
                            ? $t("price_packages.not_refundable")
                            : rooms?.roomData?.nonRefundable === null
                            ? $t("price_packages.not_refundable")
                            : $t("price_packages.refundable")
                        }}
                      </span>
                    </div>
                    <span class="flex items-center gap-2 mt-2">
                      <NuxtImg
                        class="w-4"
                        :src="rooms?.roomData?.boardBasis?.icon"
                      />
                      <small
                        ><strong>
                          {{ rooms?.roomData?.boardBasis?.label }}
                        </strong></small
                      >
                    </span>
                  </div>
                </div>
                <div class="col-span-2 grid grid-cols-12">
                  <div
                    class="col-span-12 p-4 bg-white border-l-[3px] border-[#FBFBFB]"
                    :class="rooms.length > 1 ? 'mb-4' : ''"
                  >
                    <div class="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="#875FFF"
                          d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128m89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4"
                        />
                      </svg>
                      <span>
                        {{
                          pkg?.occupancy?.adults == 1
                            ? `${pkg?.occupancy?.adults} ${$t(
                                "content.adults_show_1"
                              )}`
                            : `${pkg?.occupancy?.adults} ${$t(
                                "content.adults_show_more"
                              )} `
                        }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-span-2 grid grid-cols-12">
                  <div
                    class="col-span-12 py-4 px-2 bg-white border-l-[3px] border-[#FBFBFB]"
                    :class="rooms.length > 1 ? 'mb-4' : ''"
                  >
                    <h5 class="flex items-center gap-1 justify-center">
                      <div
                        class="text-[12px] flex gap-1 items-center font-bold"
                      >
                        <span class="text-[20px]">
                          {{ rooms.roomData?.pricePerDay?.value }}
                        </span>
                        <span class="text-[14px]">
                          {{
                            $t(
                              `content.${rooms.roomData?.price?.selling?.currency}`
                            )
                          }}
                        </span>
                      </div>
                      /
                      <span class="text-[#909090] text-[14px]">
                        {{ $t("content.night") }}
                      </span>
                    </h5>
                    <h6
                      class="text-[15px] text-center text-[#909090] underline"
                    >
                      {{
                        $t("content.hotel_package", {
                          price: rooms.roomData?.price?.selling?.value,
                          days: rooms.roomData?.search?.stay,
                        })
                      }}
                      <span class="">
                        {{
                          $t(
                            `content.${rooms.roomData?.price.selling?.currency}`
                          )
                        }}
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid col-span-2 pb-4 pr-2 pt-12 pl-4 sticky top-0 bg-white">
          <div class="p-4 rounded-xl bg-[#FBFBFB]">
            <div class="col-span-12 py-y">
              <div class="flex items-center gap-2 flex-col">
                <div
                  class="col-span-12"
                  :class="rooms?.length > 1 ? 'mb-4' : ''"
                >
                  <div
                    class="text-sm text flex flex-col gap-1"
                  >
                    <h4 class="flex items-center gap-1 mb-1">
                      <div
                        class="text-[12px] flex gap-1 items-center font-bold"
                      >
                        <span class="text-[18px]">
                          {{ totalSelectedPrice }}
                        </span>
                        <span class="text-[12px]">
                          {{ $t(`content.SAR`) }}
                        </span>
                      </div>
                      <!-- <span class="text-[#909090] text-[14px]">
                      {{ $t("content.night") }}
                    </span> -->
                    </h4>
                    <h5 class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#765cf1" d="M2 19v-6q0-.675.275-1.225T3 10.8V8q0-1.25.875-2.125T6 5h4q.575 0 1.075.213T12 5.8q.425-.375.925-.587T14 5h4q1.25 0 2.125.875T21 8v2.8q.45.425.725.975T22 13v6h-2v-2H4v2zm11-9h6V8q0-.425-.288-.712T18 7h-4q-.425 0-.712.288T13 8zm-8 0h6V8q0-.425-.288-.712T10 7H6q-.425 0-.712.288T5 8zm-1 5h16v-2q0-.425-.288-.712T19 12H5q-.425 0-.712.288T4 13zm16 0H4z"/></svg>
                      <span>

                        {{
                          $t("content.rooms_count", {
                            number: totalSelectedCount,
                          })
                        }}
                      </span>
                      
                    </h5>
                    <h6 class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#765cf1" d="M13.1 23h-2.6l.5-.312q.5-.313 1.088-.7t1.087-.7l.5-.313q2.025-.15 3.738-1.225t2.712-2.875q-2.15-.2-4.075-1.088t-3.45-2.412t-2.425-3.45T9.1 5.85Q7.175 6.925 6.088 8.813T5 12.9v.3l-.3.138q-.3.137-.663.287t-.662.288l-.3.137q-.05-.275-.062-.575T3 12.9q0-3.15 1.9-5.875T9.875 3.4q.275-.075.5-.025t.425.2t.288.363t.062.487q-.15 2.125.613 4.088t2.262 3.462q1.525 1.525 3.438 2.25t4.037.6q.275-.025.513.088t.362.312t.175.425t-.05.5q-1.075 3.125-3.55 4.988T13.1 23M6 21h4.5q.625 0 1.063-.437T12 19.5t-.425-1.062T10.55 18h-1.3l-.5-1.2q-.35-.825-1.1-1.312T6 15q-1.25 0-2.125.863T3 18q0 1.25.875 2.125T6 21m0 2q-2.075 0-3.537-1.463T1 18t1.463-3.537T6 13q1.5 0 2.738.813T10.575 16Q12 16.05 13 17.063t1 2.437q0 1.45-1.025 2.475T10.5 23z"/></svg>
                      <span  class="text-nowrap">

                        {{
                          $t("content.nights_room", {
                            number:
                            hotelPlans?.offers[0]?.packages[0]?.packageRooms[0]
                            ?.roomReferences[0]?.roomData?.search?.stay,
                          })
                        }}
                      </span>
                    </h6>   
                  </div>
                  <button
                    class="bg-primary mt-4 w-full py-3 text-white rounded-lg"
                    @click="bookNow"
                    :disabled="totalSelectedCount == 0"
                  >
                    {{ $t("content.book_now") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="mt-6 px-4 rounded-lg mb-6 bg-white pt-6 pb-4 text-red-400"
    >
      {{ $t("content.no_rooms") }}
    </div>

    <div
      class="absolute top-0 left-0 w-full h-full flex items-center flex-col gap-3 bg-[#f1f1f154] z-[9999]"
      v-if="processing_loading"
    >
      <div class="loader mt-[200px]"></div>
      <div class="p-4 bg-white items-center rounded-2xl w-fit">
        <span class="text-md font-bold">
          {{ $t("hotels.Show_rooms_loading") }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Checkbox } from "@/components/ui/checkbox";

import { hotelDetails } from "@/stores/hotels/hotelDetails";
import { navigateTo } from "nuxt/app";
import { storeToRefs } from "pinia";

const props = defineProps({
  processing: {
    type: Boolean,
  },
});
const processing_loading = ref(false);
watch(
  () => props.processing,
  (val) => {
    if (val !== undefined) {
      processing_loading.value = val;
    }
  }
);
const localePath = useLocalePath();
const { selectedRoom, hotelRatePlans } = storeToRefs(hotelDetails());
const hotelPlans = ref({ offers: [{ packages: [] }] });
watch(
  () => hotelRatePlans.value,
  (val) => {
    if (val !== undefined) {
      hotelPlans.value = val;
    }
  }
);
// console.log(offers.value);

const totalSelectedPrice = computed(() => {
  const packageData = hotelPlans.value.offers[0].packages[0]; // Access the first package directly

  if (!packageData || !packageData.packageRooms) return 0; // Handle edge cases

  return packageData.packageRooms.reduce((roomTotal, room) => {
    return (
      roomTotal +
      room.roomReferences.reduce((refTotal, ref) => {
        return ref.selected
          ? refTotal + ref.roomData.price.selling.value
          : refTotal;
      }, 0)
    );
  }, 0);
});

const totalSelectedCount = computed(() => {
  return hotelPlans.value.offers[0].packages.reduce((total, pkg) => {
    return (
      total +
      pkg.packageRooms.reduce((roomTotal, room) => {
        return (
          roomTotal +
          room.roomReferences.reduce((count, ref) => {
            return ref.selected ? count + 1 : count;
          }, 0)
        );
      }, 0)
    );
  }, 0);
});
const selectedRooms = computed(() => {
  return hotelPlans.value.offers[0].packages
    .map((pkg) => {
      const selectedRoomTokens = pkg.packageRooms
        .flatMap((room) => room.roomReferences)
        .filter((roomRef) => roomRef.selected) // Only selected rooms
        .map((roomRef) => roomRef.roomToken); // Extract roomTokens

      // Return an object if there are selected rooms
      return selectedRoomTokens.length > 0
        ? {
            packageToken: pkg.packageToken,
            roomTokens: selectedRoomTokens,
          }
        : null;
    })
    .filter((pkg) => pkg !== null); // Remove null entries
});
function handleCheckboxChange(pkgIndex, roomIndex) {
  const packages = hotelPlans.value.offers[0].packages;

  // Get the current package
  const currentPackage = packages[0];
  console.log(pkgIndex, roomIndex);

  // Loop through all rooms in the current package and their references
  currentPackage.packageRooms.forEach((room, rIndex) => {
    room.roomReferences.forEach((ref, refIdx) => {
      // Uncheck all except the currently clicked checkbox
      console.log(ref);
      console.log(!(rIndex === pkgIndex && refIdx === roomIndex));

      if (refIdx !== roomIndex) {
        if (rIndex == pkgIndex) {
          ref.selected = false;
        }
      }
    });
  });
}
// watch(()=>)
const total_price = ref(0);

//book now
const route = useRoute();
const { unit_id } = route.params;
const bookNow = () => {
  if (!selectedRooms.value || selectedRooms.value.length === 0) {
    console.warn("No rooms selected!");
    return;
  }

  selectedRoom.value = selectedRooms.value;
  localStorage.setItem("selectedRooms", JSON.stringify(selectedRoom.value));

  setTimeout(() => {
    navigateTo(
      localePath({
        path: `/hotels/checkout`,
        query: { id: unit_id },
      })
    );
  }, 100);
};

// onMounted(async () => {
//   await hotelDetails().getNearHotels(offers.nearHotelsUrl);
// });
</script>
