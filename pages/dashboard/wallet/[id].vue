<template>
  <div class="container mt-8 mb-20 xl:mb-0 h-full">
    <div
      v-if="!walletStore?.userWalletDetails"
      class="grid place-items-center"
      :style="{ height: 'calc(100vh - 362px)' }"
    >
      <pending />
    </div>
    <div v-else class="container flex flex-col gap-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <NuxtLink to="/">{{ $t("header.home") }}</NuxtLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <span @click="navigateTo(localPath(`/wallet`))">
              {{ $t("labels.wallet") }}
            </span>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage class="text-primary">{{
              walletStore.userWalletDetails?.wallet.name
            }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div class="rounded-xl grid lg:grid-cols-5 gap-6 lg:gap-12">
        <div class="col-span-full lg:col-span-3">
          <div class="divide-y divide-neutral-200 border-b border-neutral-200">

            <div class="flex justify-between gap-4 py-4">
              <div class="flex flex-col gap-2">
                <div class="font-normal text-lg text-primary_dark">
                  {{ $t("content.wallet_name") }}
                </div>
                <div
                  class="mt-1 flex sm:mt-0 sm:col-span-2 text-center text-textColor font-medium leading-none"
                >
                  {{ walletStore?.userWalletDetails.wallet.name }}
                </div>
              </div>
            </div>

            <div class="flex justify-between gap-4 py-4">
              <div class="flex flex-col gap-2">
                <div class="font-normal text-lg text-primary_dark">
                  {{ $t("content.balance") }}
                </div>
                <div
                  class="mt-1 flex sm:mt-0 sm:col-span-2 text-center text-textColor font-medium leading-none"
                >
                  {{ walletStore?.userWalletDetails.available_days }}
                  {{ $t("content.days") }}
                </div>
              </div>
              <div class="ml-4 flex items-center">
                <Button
                  @click="
                    navigateTo(
                      localPath(
                        `/wallet/wallet-details/${walletStore?.userWalletDetails.wallet.id}`
                      )
                    )
                  "
                  class="text-white w-full"
                >
                  <span>{{ $t("content.renewPackage") }}</span></Button
                >
              </div>
            </div>

            <div class="flex justify-between gap-4 py-4">
              <div class="flex flex-col gap-2">
                <div class="font-normal text-lg text-primary_dark">
                  {{ $t("content.Validity") }}
                </div>
                <div
                  class="mt-1 flex sm:mt-0 sm:col-span-2 text-center text-textColor text-lg font-medium leading-none gap-4"
                >
                  <div class="flex gap-2 items-center">
                    <span class="text-sm">{{ $t("content.since") }}</span>
                    <span class="text-sm">{{
                      formatDateInArabic(
                        walletStore?.userWalletDetails.from_date
                      )
                    }}</span>
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="text-sm">{{ $t("content.to") }}</span>
                    <span class="text-sm">{{
                      formatDateInArabic(walletStore?.userWalletDetails.to_date)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-between gap-4 py-4">
              <div class="flex flex-col gap-2">
                <div class="font-normal text-lg text-primary_dark">
                  {{ $t("content.expiry_date") }}
                </div>
                <div
                  class="mt-1 flex sm:mt-0 sm:col-span-2 text-center text-burgundy font-medium leading-none gap-4"
                >
                  {{ formatDateInArabic(walletStore?.userWalletDetails.wallet.expiry_date) }}
                </div>
              </div>
            </div>

            <div class="flex justify-between gap-4 py-4">
              <div class="flex flex-col gap-2">
                <dt class="font-normal text-lg text-primary_dark">
                  {{ $t("content.balanceUsed") }}
                </dt>
                <dd
                  class="mt-1 flex sm:mt-0 sm:col-span-2 text-center text-textColor font-medium leading-none"
                >
                  {{ walletStore?.userWalletDetails.usage }}
                  {{ $t("content.days") }}
                </dd>
              </div>
            </div>

            <div class="flex justify-between gap-4 py-4">
              <div class="flex flex-col gap-2">
                <div class="font-normal text-lg text-primary_dark">
                  {{ $t("content.historyLogs") }}
                </div>
                <div
                  class="flex sm:col-span-2 font-medium leading-none text-textColor"
                >
                  {{ walletStore?.userWalletDetails.logs?.length }}
                  {{ $t("content.process") }}
                </div>
              </div>
              <div class="flex items-center">
                <NuxtLink
                  class="text-primary underline leading-none"
                  :to="`/ar/dashboard/wallet/process-${walletStore?.userWalletDetails.id}`"
                  >{{ $t("content.viewProcess") }}</NuxtLink
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-full lg:col-span-2 space-y-4">
          <div
            class="rounded-2xl hidden md:flex py-3 md:py-5 items-center justify-between bg-white border-neutral-400 border-opacity-70 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden px-5"
          >
            <div class="flex gap-2 items-center">
              <IconNight />
              <span class="text-lg leading-none text-textColor">
                {{ walletStore?.userWalletDetails.available_days }}
                {{ $t("content.days") }}
                {{ $t("content.available") }}
              </span>
            </div>
            <div class="w-2/5 flex justify-end">
              <Button
              :disabled="walletStore?.userWalletDetails.available_days == 0"
                class="bg-primary hover:bg-opacity-90 text-light justify-center items-center inline-flex gap-2 px-2 md:px-5 md:py-2 shadow-md rounded-lg cursor-pointer transition-colors w-auto ms-auto flex-none"
              >
                <IconBookingDashboard fill="#ffffff" height="18" width="18" />
                <span class="text-sm md:text-base font-medium leading-none">{{
                  $t("content.book_now")
                }}</span>
              </Button>
            </div>
          </div>

          <div
            class="rounded-2xl hidden md:flex py-3 md:py-5 items-center justify-between bg-white border-neutral-400 border-opacity-70 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden px-5"
          >
            <div class="flex w-3/5 gap-2 items-center">
              <IconGift />
              <span class="text-lg leading-none text-textColor">
                {{ $t("content.you_want_send_gift") }}
              </span>
            </div>
            <SendGift :wallet="walletStore?.userWalletDetails" />
          </div>
          <div
            class="rounded-2xl flex py-3 md:py-5 items-center justify-between bg-white border-neutral-400 border-opacity-70 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden px-5"
          >
            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-2">
                <IconWalletDashboard />
                <span class="text-lg leading-none text-primary_dark">
                  {{ $t("content.featurePackage") }}
                </span>
              </div>
              <ul
                class="w-full list-disc ms-8 text-right text-textColor text-xl font-medium leading-10"
              >
                <li
                  v-for="(feature, i) in walletStore?.userWalletDetails.wallet
                    .Wallet_features"
                  :key="i"
                  class="text-base text-body-color dark:text-dark-6 items-center space-x-3 mb-1"
                >
                  <span> {{ feature.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Slash } from "lucide-vue-next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SendGift from "@/components/wallet/SendGift";
import pending from "@/components/core/pending.vue";
import IconWalletDashboard from "@/components/icon/IconWalletDashboard";
import IconGift from "@/components/icon/IconGift";
import IconNight from "@/components/icon/IconNight";
import IconBookingDashboard from "@/components/icon/IconBookingDashboard";
import { useWalletStore } from "@/stores/wallet";
import { useRoute } from "vue-router";
import { formatDateInArabic } from "../../../lib/utils";
import { navigateTo } from "nuxt/app";

const localPath = useLocalePath();

const route = useRoute();

// Get wallet store instance
const walletStore = useWalletStore();

onMounted(async () => {
  // await walletStore.getUserWalletDetails(route.params.id);

  await walletStore.getUserWalletDetails(route.params.id);
});
</script>
