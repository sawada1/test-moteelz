<template>
  <div class="">
    <div ref="rooms" v-if="Object.keys(hotelRatePlans).length > 0">
      <div
        class="mt-6 px-4 rounded-lg bg-white pb-1"
        v-for="(roomsNum, index) in hotelRatePlans?.offers[0]?.packages"
        :key="index"
      >
        <div
          class=""
          v-for="(rooms, roomsIdx) in roomsNum?.packageRooms"
          :key="rooms.packageToken"
        >
          <h4 class="text-2xl font-bold mb-4">
            {{
              rooms.occupancy?.adults == 1
                ? `${rooms.occupancy?.adults} ${$t("content.adults_show_1")}`
                : `${rooms.occupancy?.adults} ${$t(
                    "content.adults_show_more"
                  )} `
            }}
          </h4>
          <div
            class=""
            v-for="(room, roomId) in rooms?.roomReferences"
            :key="room?.roomToken"
          >
            <pre></pre>
            <div
              class="grid grid-cols-12 gap-1 border-[1px] border-[#F4F4F4] p-3 mb-8 rounded-lg bg-[#FBFBFB]"
            >
              <div class="col-span-12">
                <div class="col-span-12 py-4 px-2" :key="plan">
                  <div class="flex items-center gap-2 flex-col">
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
                      v-if="room?.roomData?.details?.images?.length > 0"
                    >
                      <swiper-slide
                        v-for="i in room?.roomData?.details?.images"
                        :key="i"
                      >
                        <div class="h-[150px] rounded-[24px]">
                          <NuxtImg
                            :src="i.url"
                            class="h-full w-full object-cover rounded-[24px]"
                            placeholder="/placeholder.webp"
                            alt=""
                          />
                        </div>
                      </swiper-slide>
                    </swiper>
                  </div>
                </div>
              </div>
              <div class="col-span-8 flex flex-col justify-around">
                <span
                  class="text-[#312B72] font-semibold text-[14px] md:text-[18px] block"
                  >{{ room.name }}</span
                >

                <!-- <span
              class="block underline cursor-pointer text-primary"
              @click="openSidebar(data?.unitsCollection[index])"
            >
              {{ $t("content.more_info") }}
            </span> -->
              </div>
              <div class="col-span-12">
                <div class="flex items-center gap-3">
                  <NuxtImg
                    src="/img/units/bed.svg"
                    alt="feature.name"
                    class="md:h-5 h-4 md:w-5 w-4 md:me-2 me-1"
                  />
                  <p class="text-center font-semibold">
                    {{ room.roomData?.name }}
                  </p>
                </div>
                <div class="flex items-center justify-between">
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
                    <span class="text-[14px] font-semibold">
                      {{
                        hotelRatePlans?.offers[0]?.packages[index]
                          ?.packageRooms[roomsIdx]?.occupancy?.adults == 1
                          ? `${
                              hotelRatePlans?.offers[0]?.packages[index]
                                ?.packageRooms[roomsIdx]?.occupancy?.adults
                            } ${$t("content.adults_show_1")}`
                          : `${
                              hotelRatePlans?.offers[0]?.packages[index]
                                ?.packageRooms[roomsIdx]?.occupancy?.adults
                            } ${$t("content.adults_show_more")} `
                      }}
                    </span>
                  </div>
                  <div
                    class="text-lightgreen_hover_color border-lightgreen_hover_color border mb-2 rounded-3xl py-2 px-4 w-fit text-[14px] text-center"
                  >
                    {{ $t("content.available_for_booking") }}
                  </div>
                </div>
                <div class="flex gap-2 items-center">
                  <svg
                    v-if="
                      room?.roomData?.nonRefundable === true ||
                      room?.roomData?.nonRefundable === null
                    "
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#f97e7e"
                      d="m12 12.708l3.246 3.246q.14.14.344.15t.364-.15t.16-.354t-.16-.354L12.708 12l3.246-3.246q.14-.14.15-.344t-.15-.364t-.354-.16t-.354.16L12 11.292L8.754 8.046q-.14-.14-.344-.15t-.364.15t-.16.354t.16.354L11.292 12l-3.246 3.246q-.14.14-.15.345q-.01.203.15.363t.354.16t.354-.16zM12.003 21q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#248c29"
                      d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                    />
                  </svg>
                  <div
                    class="flex items-center gap-2"
                    :class="
                      room?.roomData?.nonRefundable === true ||
                      room?.roomData?.nonRefundable === null
                        ? 'text-red-400'
                        : 'text-green-400'
                    "
                  >
                    <span>
                      {{
                        room?.roomData?.nonRefundable === true
                          ? $t("price_packages.not_refundable")
                          : room?.roomData?.nonRefundable === null
                          ? $t("price_packages.not_refundable")
                          : $t("price_packages.refundable")
                      }}
                    </span>
                  </div>
                </div>
                <span
                  v-if="!route.path.includes('wallet/wallet-hotels')"
                  class="mt-2 block pb-2"
                >
                  <span class="flex gap-2 items-center text-primary font-bold">
                    <span class="text-[22px]">
                      {{ room?.roomData?.price?.selling?.value }}
                    </span>
                    <span>
                      {{
                        $t(
                          `content.${
                            room?.roomData?.price?.selling?.currency
                              ? room?.roomData?.price.selling?.currency
                              : "SAR"
                          }`
                        )
                      }}
                    </span>
                  </span>
                </span>
                <div class="border-t-[1px] border-[#f1f1f1]">
                  <div
                    class="flex items-center justify-center gap-2 w-full h-full py-2"
                  >
                    <Checkbox
                      id="terms"
                      class="w-6 h-6 text-white"
                      :checked="room.selected"
                      v-model:checked="room.selected"
                      :disabled="room.selected"
                      @update:checked="handleCheckboxChange(roomsIdx, roomId)"
                    />
                    <span>
                      {{ room?.selected ? "تم الاختيار" : "لم يتم الاختيار" }}
                    </span>
                  </div>
                </div>
                <!-- <button
                class="bg-primary text-white px-4 py-3 rounded-lg mt-4 w-full"
                @click="confirmBookingHotel(rooms.id, plan.id)"
              >
                {{ $t("content.book_now") }}
              </button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center gap-1 justify-center flex-col"
        v-if="!buttonFixed"
      >
        <h4 class="flex items-center gap-1">
          <span class="text-[28px]">
            {{ totalSelectedPrice }}
          </span>
          <span class="text-[16px]">
            {{ $t(`content.SAR`) }}
          </span>
          <span class="text-[#909090] text-[14px]">
            / {{ $t("content.night") }}
          </span>
        </h4>
        <h5 class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="#765cf1"
              d="M2 19v-6q0-.675.275-1.225T3 10.8V8q0-1.25.875-2.125T6 5h4q.575 0 1.075.213T12 5.8q.425-.375.925-.587T14 5h4q1.25 0 2.125.875T21 8v2.8q.45.425.725.975T22 13v6h-2v-2H4v2zm11-9h6V8q0-.425-.288-.712T18 7h-4q-.425 0-.712.288T13 8zm-8 0h6V8q0-.425-.288-.712T10 7H6q-.425 0-.712.288T5 8zm-1 5h16v-2q0-.425-.288-.712T19 12H5q-.425 0-.712.288T4 13zm16 0H4z"
            />
          </svg>
          <span>
            {{
              $t("content.rooms_count", {
                number: totalSelectedCount,
              })
            }}
          </span>
        </h5>
        <h6 class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="#765cf1"
              d="M13.1 23h-2.6l.5-.312q.5-.313 1.088-.7t1.087-.7l.5-.313q2.025-.15 3.738-1.225t2.712-2.875q-2.15-.2-4.075-1.088t-3.45-2.412t-2.425-3.45T9.1 5.85Q7.175 6.925 6.088 8.813T5 12.9v.3l-.3.138q-.3.137-.663.287t-.662.288l-.3.137q-.05-.275-.062-.575T3 12.9q0-3.15 1.9-5.875T9.875 3.4q.275-.075.5-.025t.425.2t.288.363t.062.487q-.15 2.125.613 4.088t2.262 3.462q1.525 1.525 3.438 2.25t4.037.6q.275-.025.513.088t.362.312t.175.425t-.05.5q-1.075 3.125-3.55 4.988T13.1 23M6 21h4.5q.625 0 1.063-.437T12 19.5t-.425-1.062T10.55 18h-1.3l-.5-1.2q-.35-.825-1.1-1.312T6 15q-1.25 0-2.125.863T3 18q0 1.25.875 2.125T6 21m0 2q-2.075 0-3.537-1.463T1 18t1.463-3.537T6 13q1.5 0 2.738.813T10.575 16Q12 16.05 13 17.063t1 2.437q0 1.45-1.025 2.475T10.5 23z"
            />
          </svg>
          <span class="text-nowrap">
            {{
              $t("content.nights_room", {
                number:
                  hotelRatePlans?.offers[0]?.packages[0]?.packageRooms[0]
                    ?.roomReferences[0]?.roomData?.search?.stay,
              })
            }}
          </span>
        </h6>
      </div>
      <div
        :class="[
          buttonFixed
            ? 'fixed bottom-5 left-[50%] translate-x-[-50%] z-[999] w-[90%]'
            : '',
        ]"
      >
        <div
          class="flex items-center gap-1 justify-around bg-white py-2"
          v-if="buttonFixed"
        >
          <h4 class="flex items-center gap-2">
            <h3>{{ $t("content.price") }}:</h3>
            <div class="flex gap-1 items-center">
              <span class="text-[24px]">
                {{ totalSelectedPrice }}
              </span>
              <span class="text-[16px]">
                {{ $t(`content.SAR`) }}
              </span>
            </div>
          </h4>
          <div class="flex flex-col gap-1">
            <h5 class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#765cf1"
                  d="M2 19v-6q0-.675.275-1.225T3 10.8V8q0-1.25.875-2.125T6 5h4q.575 0 1.075.213T12 5.8q.425-.375.925-.587T14 5h4q1.25 0 2.125.875T21 8v2.8q.45.425.725.975T22 13v6h-2v-2H4v2zm11-9h6V8q0-.425-.288-.712T18 7h-4q-.425 0-.712.288T13 8zm-8 0h6V8q0-.425-.288-.712T10 7H6q-.425 0-.712.288T5 8zm-1 5h16v-2q0-.425-.288-.712T19 12H5q-.425 0-.712.288T4 13zm16 0H4z"
                />
              </svg>
              <span>
                {{
                  $t("content.rooms_count", {
                    number: totalSelectedCount,
                  })
                }}
              </span>
            </h5>
            <h6 class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#765cf1"
                  d="M13.1 23h-2.6l.5-.312q.5-.313 1.088-.7t1.087-.7l.5-.313q2.025-.15 3.738-1.225t2.712-2.875q-2.15-.2-4.075-1.088t-3.45-2.412t-2.425-3.45T9.1 5.85Q7.175 6.925 6.088 8.813T5 12.9v.3l-.3.138q-.3.137-.663.287t-.662.288l-.3.137q-.05-.275-.062-.575T3 12.9q0-3.15 1.9-5.875T9.875 3.4q.275-.075.5-.025t.425.2t.288.363t.062.487q-.15 2.125.613 4.088t2.262 3.462q1.525 1.525 3.438 2.25t4.037.6q.275-.025.513.088t.362.312t.175.425t-.05.5q-1.075 3.125-3.55 4.988T13.1 23M6 21h4.5q.625 0 1.063-.437T12 19.5t-.425-1.062T10.55 18h-1.3l-.5-1.2q-.35-.825-1.1-1.312T6 15q-1.25 0-2.125.863T3 18q0 1.25.875 2.125T6 21m0 2q-2.075 0-3.537-1.463T1 18t1.463-3.537T6 13q1.5 0 2.738.813T10.575 16Q12 16.05 13 17.063t1 2.437q0 1.45-1.025 2.475T10.5 23z"
                />
              </svg>
              <span class="text-nowrap">
                {{
                  $t("content.nights_room", {
                    number:
                      hotelRatePlans?.offers[0]?.packages[0]?.packageRooms[0]
                        ?.roomReferences[0]?.roomData?.search?.stay,
                  })
                }}
              </span>
            </h6>
          </div>
        </div>
        <button
          class="w-full mx-auto block text-white bg-primary py-3 rounded-md mb-[50px]"
          :class="[!buttonFixed ? 'mt-2' : '']"
          @click="bookNow()"
        >
          {{ $t("content.book_now") }}
        </button>
      </div>
      <!-- <div v-else class="mt-6 px-4 rounded-lg mb-6 bg-white pt-6 pb-4">
        {{ $t("content.no_rooms") }}
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { Checkbox } from "@/components/ui/checkbox";

import { navigateTo } from "nuxt/app";
import { storeToRefs } from "pinia";
import { hotelDetails } from "@/stores/hotels/hotelDetails";
import { useWindowScroll } from "@vueuse/core";
const localePath = useLocalePath();
const { selectedRoom, hotelGeneralData, hotelRatePlans } = storeToRefs(
  hotelDetails()
);
// console.log(offers.value);

const show_book_section = ref(false);

const totalSelectedPrice = computed(() => {
  return hotelRatePlans.value.offers[0].packages.reduce((total, pkg) => {
    return (
      total +
      pkg.packageRooms.reduce((roomTotal, room) => {
        return (
          roomTotal +
          room.roomReferences.reduce((refTotal, ref) => {
            return ref.selected
              ? refTotal + ref.roomData.price.selling.value
              : refTotal;
          }, 0)
        );
      }, 0)
    );
  }, 0);
});
const totalSelectedCount = computed(() => {
  return hotelRatePlans.value.offers[0].packages.reduce((total, pkg) => {
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
  return hotelRatePlans.value.offers[0].packages
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
//handle check box
function handleCheckboxChange(pkgIndex, roomIndex) {
  const packages = hotelRatePlans.value.offers[0].packages;

  // Get the current package
  const currentPackage = packages[0];
  console.log(pkgIndex, roomIndex);

  // Loop through all rooms in the current package and their references
  currentPackage.packageRooms.forEach((room, rIndex) => {
    room.roomReferences.forEach((ref, refIdx) => {
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
  selectedRoom.value = selectedRooms.value;
  console.log(selectedRoom.value);

  navigateTo(localePath({ path: `/hotels/checkout`, query: { id: unit_id } }));
  localStorage.setItem("selectedRooms", JSON.stringify(selectedRoom.value));
};

//handle show the btn
const rooms = ref();
const room_div_height = ref(0);
const btn_is_fixed = ref(false);
const { y } = useWindowScroll();
const buttonVisible = ref(false);
onMounted(() => {
  // nextTick(() => {
  //     room_div_height.value = rooms.value?.getBoundingClientRect().height;
  // });
});
watch(
  () => hotelRatePlans.value,
  () => {
    nextTick(() => {
      if (rooms.value) {
        room_div_height.value = rooms.value.getBoundingClientRect().height;
        console.log("Updated Room Height:", room_div_height.value);
      }
    });
  },
  { immediate: true }
);
const buttonFixed = computed(() => {
  if (y.value > 400 && y.value <= room_div_height.value) {
    btn_is_fixed.value = true;
    return true;
  } else if (y.value > room_div_height.value) {
    btn_is_fixed.value = false;
    return false;
  }
  btn_is_fixed.value = false;
  return false;
});
</script>
