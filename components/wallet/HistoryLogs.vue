<script setup>
import { useWalletStore } from "@/stores/wallet";
import CardGift from "./CardGift.vue";
import { navigateTo } from "nuxt/app";

const localPath = useLocalePath();
const walletStore = useWalletStore();
</script>

<template>
  <div class="w-full">
    <div
      v-for="(log, index) in walletStore?.userWalletLogs"
      :key="index"
      :class="[
        'grid grid-cols-12 w-full py-2 border-b border-borderLightColor p-2 mb-2',
        { 'border-t': index === 0 },
      ]"
    >
      <div
        class="relative col-span-2 md:col-span-1 flex flex-col justify-center"
      >
        <span
          v-if="log?.typeProcess == 1"
          class="absolute flex items-center justify-center md:w-12 md:h-12 w-8 h-8 bg-white rounded-full ring-2 ring-green pe-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
          >
            <path
              d="M16 8L8 16M8 16v-6M8 16h6"
              fill="none"
              stroke="#177a1f"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span
          v-else
          class="absolute flex items-center justify-center md:w-12 md:h-12 w-8 h-8 bg-white rounded-full ring-2 ring-error pe-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
          >
            <path
              d="M8 16L16 8M16 8v6M16 8H10"
              fill="none"
              stroke="#ff0000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>

      <div class="relative col-span-10 md:col-span-11">
        <div class="flex flex-col justify-between items-start text-start">
          <div class="w-[100%] flex flex-row justify-between">
            <span
              class="truncate text-black p-1 text-[10px] md:text-[12px] font-semibold block"
            >
              {{ log?.typeName }}
            </span>
          </div>
          <div class="w-[100%] flex flex-row justify-between">
            <div
              class="flex md:max-w-[70%] max-w-[50%] flex-col justify-between items-start text-start"
            >
              <h3
                class="text-clip whitespace-normal w-full mb-1 text-[14px] md:text-[16px] font-semibold text-gray-900"
              >
                <!-- {{ log?.status.description }} -->

                <span
                  class="cursor-pointer text-primary hover:text-primary/80 font-semibold mx-2"
                  >{{ log?.text }}</span
                >
              </h3>
              <time
                class="block mb-1 mt-1 text-sm font-normal leading-none text-gray-400"
              >
                {{ log?.created_at }}
              </time>
            </div>
            <div
              class="h-[100%] sm:min-w-[48%] flex flex-row justify-end items-center text-center"
            >
              <div class="flex flex-col justify-center">
                <div class="flex flex-row justify-center">
                  <div
                    v-if="log?.status.id == 2"
                    class="flex flex-col justify-center"
                  >
                    <button
                      @click="
                        navigateTo(
                          localPath(
                            `/dashboard/wallet/invoice-${log?.user_wallet_id}`
                          )
                        )
                      "
                      class="bg-primary hover:bg-opacity-70 my-1 text-light inline-block md:mx-2 py-[3px] md:px-2 md:text-[12px] mx-1 text-[11px] md:text-[13px] shadow-md rounded-lg cursor-pointer transition-colors"
                    >
                      <span class="px-1 font-bold text-md">{{
                        $t("content.show_details")
                      }}</span>
                    </button>
                  </div>
                  <div
                    v-if="
                      log?.status.id == 5 && log?.stage !== 1 && log?.stage !== 10
                    "
                    class="flex flex-col justify-center"
                  >
                    <button
                      @click="navigateTo(localPath(`/books/${log?.book_id}`))"
                      class="bg-primary hover:bg-opacity-70 my-1 text-light inline-block md:mx-2 py-[3px] md:px-2 md:text-[12px] mx-1 text-[11px] md:text-[13px] shadow-md rounded-lg cursor-pointer transition-colors"
                    >
                      <span class="px-1 font-bold text-md">{{
                        $t("content.show_details")
                      }}</span>
                    </button>
                  </div>

                  <div
                    v-if="log?.status.id === 5 && log?.stage === 1"
                    class="flex flex-col justify-center"
                  >
                    <div
                      class="bg-waitingColor my-1 text-light inline-block md:mx-2 py-1 md:px-2 mx-1 text-sm md:text-sm shadow-md rounded-lg cursor-pointer transition-colors"
                    >
                      {{ $t("content.bookingWaiting") }}
                    </div>
                  </div>

                  <div
                    v-else-if="log?.status.id === 5 && log?.stage === 10"
                    class="flex flex-col justify-center"
                  >
                    <div
                      class="bg-error my-1 text-light inline-block md:mx-2 py-1 md:px-2 mx-1 text-sm md:text-sm shadow-md rounded-lg cursor-pointer transition-colors"
                    >
                      {{ $t("content.rentalCancellation") }}
                    </div>
                  </div>

                  <div
                    v-if="log?.status.id === 6"
                    class="flex flex-col justify-center"
                  >
                    <!-- <button
                      @click="
                        openGiftDetails(
                          log?.user_package_gift_id,
                          log?.statusGift
                        )
                      "
                      class="bg-primary hover:bg-opacity-70 my-1 text-light inline-block md:mx-2 py-[3px] md:px-2 md:text-[12px] mx-1 text-[11px] md:text-[13px] shadow-md rounded-lg cursor-pointer transition-colors"
                    >
                      <span class="px-1 font-bold text-md">{{
                        $t("content.show_details")
                      }}</span>
                    </button> -->
                    <!-- <span @click="navigateTo(localPath(`/dashboard/wallet/gifts/gift-${log?.user_wallet_gift_id}`))">Gift</span> -->
                    <CardGift :giftId="log?.user_wallet_gift_id" />
                  </div>

                  <span
                    v-if="log?.days != null && log?.typeProcess == 1"
                    class="truncate md:ms-4 text-green mt-1 font-semibold text-[14px] md:text-[15px] text-center"
                  >
                    {{ log?.days }} {{ $t("content.days") }} +
                  </span>
                  <span
                    v-if="log?.days != null && log?.typeProcess == 0"
                    class="truncate md:ms-4 text-error mt-1 font-semibold text-[15px] md:text-[18px]"
                  >
                    {{ log?.days }} {{ $t("content.days") }} -
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
