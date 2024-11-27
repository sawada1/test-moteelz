<template>
  <div class="grid grid-cols-12 w-full gap-4 mt-10">
    <div class="col-span-12 md:col-span-9">
      <div id="room_select" class="rounded-md hidden md:block mt-[20px]">
        <div
          class="mt-4 bg-white px-[24px] rounded-lg pb-6"
          v-if="data?.unitsCollection?.length > 0"
        >
          <div class="hidden md:grid grid-cols-12 gap-12">
            <div class="col-span-3 text-[#7D7D7D] py-6">
              {{ $t("content.select_room") }}
            </div>
            <div class="col-span-3 text-[#7D7D7D] py-6">
              {{ $t("content.room_info") }}
            </div>
            <div class="col-span-3 text-[#7D7D7D] py-6">
              {{ $t("content.options") }}
            </div>
            <div class="col-span-3 text-[#7D7D7D] py-6">
              {{ $t("content.guest") }}
            </div>
            <div class="col-span-3 text-[#7D7D7D] py-6">
              {{ $t("content.total_price") }}
            </div>
          </div>
          <div
            class="bg-[#FBFBFB] p-6 hidden rounded-lg gap-4 md:grid grid-cols-12"
            v-for="(rooms, index) in data?.unitsCollection"
            :key="index"
          >
            <div class="col-span-3 grid grid-cols-12">
              <div
                class="col-span-12 p-4 bg-white border-l-[3px] border-[#FBFBFB]"
                v-for="(plan, index) in rooms.ratePlans"
                :class="rooms.ratePlans.length > 1 ? 'mb-4' : ''"
                :key="plan"
              >
                <div class="flex items-center gap-2 flex-col">1</div>
              </div>
            </div>
            <div class="col-span-3 grid grid-cols-12">
              <div
                class="col-span-12 p-4 bg-white border-l-[3px] border-[#FBFBFB]"
                v-for="(plan, index) in rooms.ratePlans"
                :class="rooms.ratePlans.length > 1 ? 'mb-4' : ''"
                :key="plan"
              >
                <div class="flex items-center gap-2 flex-col">1</div>
              </div>
            </div>
            <div class="grid grid-cols-9 col-span-9 rounded-lg">
              <div class="col-span-3 grid grid-cols-12">
                <div
                  v-for="(plan, index) in rooms.ratePlans"
                  :key="plan"
                  class="col-span-12 p-4 bg-white border-l-[3px] border-[#FBFBFB]"
                  :class="rooms.ratePlans.length > 1 ? 'mb-4' : ''"
                >
                  <span class="text-[18px] font-semibold">{{ plan.name }}</span>

                  <ol class="relative my-3">
                    <li
                      class="mb-1"
                      v-for="feature in plan.features"
                      :key="feature"
                    >
                      <div class="flex items-center gap-1">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            v-if="feature.type.id === 'not_refundable'"
                          >
                            <path
                              fill="#f97e7e"
                              d="m12 12.708l3.246 3.246q.14.14.344.15t.364-.15t.16-.354t-.16-.354L12.708 12l3.246-3.246q.14-.14.15-.344t-.15-.364t-.354-.16t-.354.16L12 11.292L8.754 8.046q-.14-.14-.344-.15t-.364.15t-.16.354t.16.354L11.292 12l-3.246 3.246q-.14.14-.15.345q-.01.203.15.363t.354.16t.354-.16zM12.003 21q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                            />
                          </svg>
                          <svg
                            v-else-if="feature.type.id === 'full_refundable'"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#7DDF64"
                              d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                            />
                          </svg>
                          <svg
                            v-else-if="feature.type.id === 'features'"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#7DDF64"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
                            />
                          </svg>
                          <svg
                            v-if="feature.type.id === 'stars'"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#2DC7FF"
                              d="m19.65 9.04l-4.84-.42l-1.89-4.45c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.73l3.67-3.18c.67-.58.32-1.68-.56-1.75M12 15.4V6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28z"
                            />
                          </svg>
                        </span>
                        <span class="text-[13px]">
                          {{ feature.title }}
                        </span>
                      </div>
                    </li>
                  </ol>
                  <div
                    v-if="!route.path.includes('wallet-hotels')"
                    class="text-primary font-semibold cursor-pointer"
                    @click="showRatePlanPolicies(plan)"
                  >
                    {{ t("content.know_more") }}
                  </div>
                </div>
              </div>

              <div class="col-span-3 grid grid-cols-12">
                <div
                  class="col-span-12 p-4 bg-white border-l-[3px] border-[#FBFBFB]"
                  v-for="(plan, index) in rooms.ratePlans"
                  :class="rooms.ratePlans.length > 1 ? 'mb-4' : ''"
                  :key="plan"
                >
                  <div class="flex items-center gap-2 flex-col">
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
                      <span class="text-[14px]">
                        {{
                          $t("content.capacity", {
                            name: rooms.capacity,
                          })
                        }}
                      </span>
                    </div>

                    <div
                      class="text-lightgreen_hover_color border-lightgreen_hover_color border mb-2 rounded-3xl py-2 px-4 w-fit text-[14px] text-center"
                    >
                      {{ $t("content.available_for_booking") }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-3 grid grid-cols-12">
                <div
                  class="col-span-12 p-4 bg-white border-l-[3px] border-[#FBFBFB] flex items-center justify-center"
                >
                  <div class="flex gap-3 flex-col">
                    <!-- <span class="font-semibold text-[14px] text-[#909090]">
                      {{
                        plan.count_days > 1
                          ? $t("content.hotel_package", {
                              price:
                                plan.totalAmountAfterTaxRate.toFixed(0),
                              allDays: plan.count_days,
                            })
                          : $t("content.inlcude_vat")
                      }}
                    </span> -->
                  </div>
                  <button
                    class="bg-primary text-white px-4 py-2 rounded-lg"
                    @click="confirmBookingHotel(rooms.id, plan.id)"
                  >
                    {{ $t("content.book_now") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-md my-6 py-6 px-8 font-bold" v-else>
          {{ $t("content.no_rooms") }}
        </div>
      </div>

      <!-- <div id="room" class="block md:hidden">
        <div v-if="data?.unitsCollection?.length > 0">
          <div
            class="mt-6 px-4 rounded-lg mb-6 bg-white pt-6 pb-4"
            v-for="(rooms, index) in data?.unitsCollection"
            :key="index"
          >
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-4">
                <NuxtImg
                  :src="rooms.image.image_url"
                  class="rounded-lg w-full h-[120px] object-cover"
                  height="150"
                  placeholder="/icons/loading.svg"
                />
              </div>
              <div class="col-span-8 flex flex-col justify-around">
                <span
                  class="text-[#312B72] font-semibold text-[14px] md:text-[18px] block"
                  >{{ rooms.title }}</span
                >

                <span
                  class="block underline cursor-pointer text-primary"
                  @click="openSidebar(data?.unitsCollection[index])"
                >
                  {{ $t("content.more_info") }}
                </span>
              </div>
              <div class="col-span-12">
                <div
                  class="bg-[#FBFBFB] border-1 border-[#F4F4F4] rounded-md py-3 mt-3 px-4"
                  id="rooms"
                  v-for="plan in rooms.ratePlans"
                  :key="plan"
                >
                  <div class="flex items-center gap-3">
                    <NuxtImg
                      src="/img/units/bed.svg"
                      alt="feature.name"
                      class="md:h-5 h-4 md:w-5 w-4 md:me-2 me-1"
                    />
                    <p class="text-center font-semibold mb-2">
                      {{ rooms.title }}
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
                          $t("content.capacity", {
                            name: rooms.capacity,
                          })
                        }}
                      </span>
                    </div>
                    <div
                      class="text-lightgreen_hover_color border-lightgreen_hover_color border mb-2 rounded-3xl py-2 px-4 w-fit text-[14px] text-center"
                    >
                      {{ $t("content.available_for_booking") }}
                    </div>
                  </div>
                  <ul class="list-disc my-2 marker:text-primary">
                    <li
                      v-for="feature in plan.cancelPolicy"
                      :key="feature"
                      :class="`mb-3 flex  flex-col gap-1 text-sm`"
                    >
                      <div class="flex gap-1">
                        <svg
                          v-if="feature.type.class === 'avalable'"
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
                        <svg
                          v-else
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
                        <span :class="`text-${feature.type.color}-400 flex`">
                          {{ feature.type.name }}
                        </span>
                      </div>

                      <time
                        class="mb-1 text-right flex gap-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0 ps-2"
                      >
                        <strong>- من:</strong>
                        {{ formatDate(feature.startDate) }}
                        <br />
                        <strong>الي:</strong>
                        {{ formatDate(feature.endDate) }}
                      </time>
                    </li>
                  </ul>
                  <span v-if="!route.path.includes('wallet/wallet-hotels')">
                    <span
                      class="flex gap-2 items-center text-primary font-bold"
                    >
                      <strong
                        class="line-through text-[16px] text-[#909090]"
                        v-if="plan.offer_discount"
                      >
                        {{ plan.totalAmountBeforeTaxRate }}
                      </strong>
                      <span class="text-[22px]">
                        {{ plan.totalAmountAfterTaxRate }}
                      </span>
                      <span>
                        {{
                          $t(`content.${plan.currency ? plan.currency : "SAR"}`)
                        }}
                      </span>
                    </span>
                  </span>

                  <span
                    class="font-semibold block text-[14px] text-[#909090]"
                    v-if="!route.path.includes('wallet/wallet-hotels')"
                  >
                    {{
                      plan.count_days > 1
                        ? $t("content.hotel_package", {
                            price: plan.totalAmountAfterTaxRate.toFixed(0),
                            allDays: plan.count_days,
                          })
                        : $t("content.inlcude_vat")
                    }}
                  </span>
                  <button
                    class="bg-primary text-white px-4 py-3 rounded-lg mt-4 w-full"
                    @click="confirmBookingHotel(rooms.id, plan.id)"
                  >
                    {{ $t("content.book_now") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="mt-6 px-4 rounded-lg mb-6 bg-white pt-6 pb-4">
          {{ $t("content.no_rooms") }}
        </div>
       -->
    </div>
  </div>
</template>
<script setup>
import { hotelDetails } from "@/stores/hotels/hotelDetails";
import { storeToRefs } from "pinia";
const { hotelRatePlans } = storeToRefs(hotelDetails());
console.log(hotelRatePlans.value);
</script>
