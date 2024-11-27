<template>
  <div
    class="w-full border border-borderLightColor rounded-lg p-4 custom-shadow"
  >
    <div class="flex md:grid md:grid-cols-4 flex-col items-center gap-4 w-full">
      <div
        class="h-full col-span-1 cursor-pointer"
        @click="navigateTo(localPath(`/dashboard/wallet/${wallet?.wallet.id}`))"
      >
        <img
          :src="
            props.wallet.wallet.wallet_image === ''
              ? fallbackImage
              : props.wallet.wallet.wallet_image
          "
          class="rounded-xl h-full w-full object-cover"
        />
      </div>

      <div
        class="col-span-3 flex justify-between flex-col md:flex-row items-start md:items-center gap-4 w-full h-full"
      >
        <div class="flex h-full gap-4 flex-col justify-between w-full">
          <div class="flex w-full gap-2 justify-between items-center">
            <h3
              @click="navigateTo(localPath(`/dashboard/wallet/${wallet?.id}`))"
              class="font-bold text-primary_dark text-xl cursor-pointer hover:underline"
            >
              {{ wallet.wallet.name }}
            </h3>

            <div class="block md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline"><IconDots /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    class="flex items-center gap-1 w-full justify-end cursor-pointer"
                  >
                    <span
                      @click="
                        navigateTo(
                          localPath(
                            `/dashboard/wallet/process-${wallet?.wallet.id}`
                          )
                        )
                      "
                    >
                      {{ $t("content.viewProcess") }}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    class="flex items-center gap-1 w-full justify-end cursor-pointer"
                  >
                    <span
                      @click="
                        navigateTo(localPath(`/dashboard/wallet/${wallet?.id}`))
                      "
                    >
                      {{ $t("content.btnDetailsPackage") }}
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[#909090]">{{ $t("content.balance") }} : </span>
            <span class="text-textColor"
              >{{ wallet.available_days
              }}{{
                wallet.available_days <= 10
                  ? $t("labels.nights")
                  : $t("labels.night")
              }}</span
            >
          </div>

          <Button
            @click="
              navigateTo(
                localPath(`/wallet/wallet-details/${wallet?.wallet.id}`)
              )
            "
            class="text-white w-fit flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ffffff"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 5v14m-7-7h14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>
              {{ $t("content.renewPackage") }}
            </span>
          </Button>
        </div>

        <div class="flex items-center gap-4 w-full">
          <div class="flex gap-4 flex-col w-full">
            <Button
              :disabled="wallet?.available_days == 0"
              class="text-white w-full gap-2 flex items-center"
            >
              <IconBookingDashboard fill="#ffffff" height="18" width="18" />
              <span>{{ $t("content.book_now") }}</span></Button
            >

            <SendGift :wallet="wallet" />
          </div>

          <div class="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline"><IconDots /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  class="flex items-center gap-1 w-full justify-end cursor-pointer"
                >
                  <span
                    @click="
                      navigateTo(
                        localPath(`/dashboard/wallet/process-${wallet?.id}`)
                      )
                    "
                  >
                    {{ $t("content.viewProcess") }}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  class="flex items-center gap-1 w-full justify-end cursor-pointer"
                >
                  <span
                    @click="
                      navigateTo(localPath(`/dashboard/wallet/${wallet?.id}`))
                    "
                  >
                    {{ $t("content.btnDetailsPackage") }}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconDots from "../icon/IconDots";
import IconBookingDashboard from "../icon/IconBookingDashboard.vue";
import SendGift from "./SendGift.vue";
import { navigateTo } from "nuxt/app";

const fallbackImage = new URL("../../assets/images/3.jpg", import.meta.url)
  .href;

const localPath = useLocalePath();

const props = defineProps({
  wallet: {
    type: Object,
    require: true,
  },
});
</script>
