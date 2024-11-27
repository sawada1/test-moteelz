<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-4 border border-bg_lightgray rounded-lg p-4">
      <span class="text-xl font-bold text-primary_dark">{{
        $t("content.orderSummary")
      }}</span>

      <div class="hidden lg:grid-cols-3 grid-cols-1 gap-4 w-full md:grid">
        <div class="md:col-span-1 h-auto md:max-h-48">

          <img
            :src="checkOutStore?.hotelDetails?.image"
            class="rounded-xl h-full w-full object-cover"
          />
        </div>

        <div class="flex flex-col gap-4 lg:col-span-2">
          <div class="flex gap-2 justify-between items-center w-full">
            <h3 class="font-bold text-primary_dark line-clamp-1 text-wrap">
              {{ checkOutStore?.hotelDetails?.name }}
            </h3>
            <div
              class="rounded-full px-2 py-1 bg-lightPrimary text-burgundy text-sm font-bold flex-none"
            >
              {{ checkOutStore?.hotelDetails?.stars }} / 5
            </div>
          </div>

          <div class="flex items-center flex-row-reverse w-fit gap-2">
            <IconStarRate
              v-for="(_, index) in 5"
              :key="index"
              :color="index >= restStars ? '#DDB163' : undefined"
            />
          </div>
          <div class="flex items-center gap-2">
            <IconLocation />
            <span class="text-[#909090]">{{
              checkOutStore?.hotelDetails?.hotelDescriptions[0]?.address
            }}</span>
          </div>
          <div class="flex items-center gap-4 flex-wrap">

            <div
              v-for="(
                facility, index
              ) in checkOutStore?.hotelDetails?.facilities.filter(
                (f) => f.name && f.name.trim() !== ''
              )"
              :key="index"
              class="flex items-center gap-2"
            >
              <img class="h-4 w-auto" :src="facility.icon" />
              <span class="text-xs text-textColor">{{ facility.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid sm:grid-cols-3 grid-cols-1 gap-4 w-full md:hidden">
        <div class="col-span-1 h-auto sm:max-h-48">
          <img
            :src="checkOutStore?.hotelDetails?.image"
            class="rounded-xl h-full w-full object-cover"
          />
        </div>
        <div class="flex flex-col gap-4 sm:col-span-2">
          <div class="flex gap-2 justify-between items-center w-full">
            <h3 class="font-bold text-primary_dark line-clamp-1 text-wrap">
              {{ checkOutStore?.hotelDetails?.name }}
            </h3>
            <div
              class="rounded-full px-2 py-1 bg-lightPrimary text-burgundy text-sm font-bold flex-none"
            >
              {{ checkOutStore?.hotelDetails?.stars }} / 5
            </div>
          </div>

          <div class="flex items-center flex-row-reverse w-fit gap-2">
            <IconStarRate
              v-for="(_, index) in 5"
              :key="index"
              :color="index >= restStars ? '#DDB163' : undefined"
            />
          </div>
          <div class="flex items-center gap-2">
            <IconLocation />
            <span class="text-[#909090] md:text-base text-sm">{{
              checkOutStore?.hotelDetails?.hotelDescriptions[0]?.address
            }}</span>
          </div>

          <div class="flex items-center gap-4 flex-wrap">

            <div
              v-for="(
                facility, index
              ) in checkOutStore?.hotelDetails?.facilities.filter(
                (f) => f.name && f.name.trim() !== ''
              )"
              :key="index"
              class="flex items-center gap-2"
            >
              <img class="h-4 w-auto" :src="facility.icon" />
              <span class="text-xs text-textColor">{{ facility.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <div class="flex items-start gap-2">
            <IconCalendar />
            <div class="flex flex-col gap-2">
              <span class="font-bold md:text-base text-sm"
                >{{ $t("content.rental_details") }}
              </span>
              <div class="flex items-center gap-6">
                <div class="flex items-center gap-6">
                  <div
                    class="flex flex-col gap-2 pl-6 border border-bg_lightgray border-t-0 border-b-0 border-r-0"
                  >
                    <span class="text-textColor text-sm">{{
                      $t("content.check_in_time")
                    }}</span>
                    <span class="font-bold md:text-base text-sm">{{
                      formatDateInArabic(
                        checkOutStore?.preBookDetails?.serviceDates.startDate
                      )
                    }}</span>
                  </div>
                  <!-- <IconArrowLine /> -->
                  <div class="flex flex-col gap-2">
                    <span class="text-textColor text-sm">{{
                      $t("content.check_out_time")
                    }}</span>
                    <span class="font-bold md:text-base text-sm">{{
                      formatDateInArabic(
                        checkOutStore?.preBookDetails?.serviceDates.endDate
                      )
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <b class="md:text-base text-sm"
                  >{{ $t("content.night_counts") }} :</b
                >
                <span
                  class="text-sm w-fit font-bold text-burgundy bg-lightPrimary rounded-3xl px-3 py-1"
                >
                  {{
                    getNightLabel(
                      checkOutStore?.preBookDetails?.serviceDates.duration,
                      $t
                    )
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <IconUser />
          <span class="font-bold md:text-base text-sm"
            >{{ $t("content.room_capacity") }}
            {{ getAdultLabel(capacityNumber, $t) }}</span
          >
          <span
            v-if="capacityChildren > 0"
            class="font-bold md:text-base text-sm"
            >, {{ getChildrenLabel(capacityChildren, $t) }}</span
          >
        </div>

        <div class="flex flex-col gap-2" v-if="checkOutStore?.preBookDetails">
          <div
            class="flex items-center flex-wrap gap-2"
            v-for="(room, index) in checkOutStore?.preBookDetails?.package
              ?.packageRooms"
            :key="index"
          >
            <IconBed color="#765cf1" />
            <span class="md:text-base text-sm"
              >{{ room?.roomReferences[0]?.roomData?.boardBasis?.label }} -
              <span class="font-bold">{{
                room?.roomReferences[0]?.roomData?.name
              }}</span>
              -
            </span>
            <span class="text-sm">{{ getAdultLabel(room?.occupancy.adults, $t) }}</span>

            <span class="text-sm" v-if="room?.occupancy.childrenAges.length >= 1">
              ,
              {{
                getChildrenLabel(room?.occupancy.childrenAges.length, $t)
              }}</span
            >
            <span class="text-sm" v-if="room?.occupancy.childrenAges.length >= 1">
              (<span
                v-for="(child, index) in room?.occupancy.childrenAges"
                :key="index"
                >{{ child }}
                <span v-if="index + 1 !== room?.occupancy.childrenAges.length">
                  ,
                </span></span
              >
              {{ $t("age.years") }})
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- <Coupon /> -->

    <div class="flex flex-col gap-4 border border-bg_lightgray rounded-lg py-4">
      <div class="md:text-xl text-base font-bold text-primary_dark px-4">
        {{ $t("content.amount_details") }}
      </div>

      <div class="flex flex-col gap-2 bg-bg_lightgray py-8 px-4">

        <div class="flex justify-between text-textColor">
          <span class="md:text-xl text-base font-bold">{{
            $t("content.total_price")
          }}</span>
          <span class="md:text-xl text-base font-bold"
            >{{ checkOutStore?.preBookDetails?.price.selling.value }}
            {{ checkOutStore?.preBookDetails?.price.selling.currency }}</span
          >
        </div>
      </div>

    </div>

    <!-- <SpecialOrders /> -->

    <PoliciesAndTerms />
  </div>
</template>

<script setup>
import IconStarRate from "../icon/IconStarRate.vue";
import IconLocation from "../icon/IconLocation.vue";
import IconCalendar from "../icon/IconCalendar.vue";
import IconUser from "../icon/IconUser.vue";
import IconBed from "../icon/IconBed.vue";
import IconPlane from "../icon/IconPlane.vue";
import IconDiner from "../icon/IconDiner.vue";
import IconPool from "../icon/IconPool.vue";
import IconPark from "../icon/IconPark.vue";
import PoliciesAndTerms from "./PoliciesAndTerms";
// import SpecialOrders from "./SpecialOrders";
// import Coupon from "./Coupon.vue";
import { useCheckout } from "@/stores/checkout";
// import { computed } from "vue";
import { formatDateInArabic, getAdultLabel, getChildrenLabel } from "@/lib/utils";

const checkOutStore = useCheckout();

const stars = computed(() => checkOutStore?.hotelDetails?.stars || 0);

const capacityNumber = computed(() => {
  return checkOutStore?.preBookDetails?.package?.packageRooms.reduce(
    (total, room) => {
      return total + (room.occupancy?.adults || 0);
    },
    0
  );
});

const capacityChildren = computed(() => {
  return checkOutStore?.preBookDetails?.package?.packageRooms.reduce(
    (total, room) => {
      return total + (room.occupancy?.childrenAges.length || 0);
    },
    0
  );
});


// Computed property to calculate remaining stars
const restStars = computed(() => 5 - stars.value);

function differenceInDays(startDate, endDate) {
  const ONE_DAY = 1000 * 60 * 60 * 24;

  const differenceMs = Math.abs(endDate - startDate);

  return Math.floor(differenceMs / ONE_DAY);
}

function getNightLabel(nightCount, $t) {
  // Check if night count is 1 to return label without the number
  if (nightCount === 1) {
    return $t("labels.night");
  }

  // For counts other than 1, include the count with the label
  const label = nightCount <= 10 ? $t("labels.nights") : $t("labels.night");
  return `${nightCount} ${label}`;
}
</script>
