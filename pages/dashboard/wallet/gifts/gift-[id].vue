<template>
  <div class="w-full h-screen bg-primary bg-opacity-10">
    <div
      v-if="walletStore?.loadingGift"
      class="grid place-items-center"
      :style="{ height: 'calc(100vh - 362px)' }"
    >
      <pending />
    </div>
    <div v-else class="container h-full py-8">
      <div class="text-xl font-bold text-primary text-center">
        {{ $t("content.giftDetails") }}
      </div>
      <div
        class="h-full p-4 rounded-xl flex flex-col gap-4 md:gap-4 items-center"
      >
        <!-- <div class="text-xl font-bold text-primary text-center">
          {{ $t("content.giftDetails") }}
        </div> -->
        <img
          :src="walletStore?.userGiftDetails.img"
          alt="wallet_gift"
          class="w-36 h-auto mb-8"
        />

        <div
          class="flex md:flex-row flex-col gap-4 justify-between md:items-start items-center w-full md:w-1/2"
        >
          <h2 class="text-base md:text-lg font-bold text-primary">
            <span>
              {{ $t("content.giftFrom") }} :
              <span class="text-md text-dark text-base">
                {{ walletStore.userGiftDetails?.name }}
              </span>
            </span>
          </h2>

          <h2 class="text-base md:text-lg font-bold text-primary">
            <span>
              {{ $t("content.package") }} :
              <span class="text-md text-dark"
                >{{ walletStore?.userGiftDetails?.wallet_name }}
              </span>
            </span>
          </h2>
        </div>

        <div
          class="flex md:flex-row flex-col gap-4 justify-between md:items-start items-center w-full md:w-1/2"
        >
          <h2 class="text-base md:text-lg font-bold text-primary">
            <span>
              {{ $t("content.night_counts") }} :
              <span class="text-md text-dark text-base">
                {{ walletStore?.userGiftDetails?.days }}
                {{ $t("content.days") }}
              </span>
            </span>
          </h2>
          <h2 class="text-base md:text-lg font-bold text-primary">
            <span>
              {{ $t("content.Validity") }} :
              <span class="text-md text-dark text-base">
                {{ formatDateInArabic(walletStore?.userGiftDetails?.to_date) }}
              </span>
            </span>
          </h2>
        </div>

        <div v-if="walletStore?.userGiftDetails?.features">
          <h2 class="text-base md:text-lg font-bold text-primary">
            <span class=" "> {{ $t("content.featurePackage") }} : </span>
          </h2>

          <div
            v-for="(feature, i) in walletStore?.userGiftDetails?.features"
            :key="i"
            class="text-base text-body-color dark:text-dark-6 flex items-center space-x-3"
          >
            <h5 class="text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                class="w-5 inline-block me-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </h5>
            <span> {{ feature.feature }}</span>
          </div>
        </div>

        <div
          v-if="
            walletStore?.userGiftDetails?.status !== 8 &&
            authStore.user.phone !== walletStore.userGiftDetails.mobile
          "
        >
          <div class="flex justify-between w-full gap-4">
            <Button
              @click="handleAcceptGift"
              class="text-white"
              :disabled="walletStore?.loadingAcceptGift"
            >
              <template v-if="walletStore?.loadingAcceptGift">
                <Loader2 class="w-4 h-4 mx-2 animate-spin" />
                {{ $t("content.waiting") }}
              </template>
              <template v-else>
                <span>{{ $t("content.accept") }}</span>
              </template>
            </Button>

            <Button
              variant="destructive"
              @click="handleRejectGift"
              class="text-white"
              :disabled="walletStore?.loadingRejectGift"
            >
              <template v-if="walletStore?.loadingRejectGift">
                <Loader2 class="w-4 h-4 mx-2 animate-spin" />
                {{ $t("content.waiting") }}
              </template>
              <template v-else>
                <span>{{ $t("content.reject") }}</span>
              </template>
            </Button>
          </div>

          <!-- <div v-if="!user" class="h-10 mt-5 flex justify-center">
                  <button
                    v-if="pendingBtn"
                    class="w-2/5 text-light rounded-md shadow-md flex justify-center bg-primary hover:bg-primary/90 p-2 tracking-wide font-bold cursor-pointer transition ease-in duration-300"
                  >
                    <spinner></spinner>
                    {{ $t("content.login") }}
                  </button>
                  <button
                    v-else
                    @click="acceptGiftAuth"
                    class="w-2/5 text-light rounded-md shadow-md flex justify-center bg-primary hover:bg-primary/90 p-2 tracking-wide font-bold cursor-pointer transition ease-in duration-300"
                  >
                    {{ $t("content.login") }}
                  </button>
                </div> -->
        </div>
      </div>
    </div>
    <Toaster />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useWalletStore } from "@/stores/wallet";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import { useToast } from "@/components/ui/toast/use-toast";
import Toaster from "@/components/ui/toast/Toaster.vue";
import pending from "@/components/core/pending.vue";
import { useApiAxios } from "~/composables/axios";
import { formatDateInArabic } from "@/lib/utils";
import { useI18n } from "vue-i18n";
import { Loader2 } from "lucide-vue-next";
const { t: $t } = useI18n();

const { toast } = useToast();

const route = useRoute();

const walletStore = useWalletStore();
const authStore = useAuthStore();

onMounted(async () => {
  // console.log(authStore.user.phone, walletStore.userGiftDetails.mobile);
  await walletStore.getUserGiftDetails(route.params.id);
});
// walletStore.getUserGiftDetails(route.params.id);

const handleAcceptGift = async () => {
  if (authStore?.user?.phone == walletStore?.userGiftDetails?.mobile) {
    await walletStore
      .fetchAcceptGift(walletStore.userGiftDetails.id)
      .then(async () => {
        await walletStore.getUserGiftDetails(route.params.id);
        await walletStore.getUserWalletLogs(walletStore.userGiftDetails.id)
        await walletStore.getUserWalletDetails(walletStore.userGiftDetails.id)
      });
  } else {
    toast({
      description: $t("content.giftErrorMessage"),
    });
  }
};

const handleRejectGift = async () => {
  if (authStore.user.phone == walletStore.userGiftDetails.mobile) {
    await walletStore
      .fetchRejectGift(walletStore.userGiftDetails.id)
      .then(async () => {
        await walletStore.getUserGiftDetails(route.params.id);
        await walletStore.getUserWalletLogs(walletStore.userGiftDetails.id)
        await walletStore.getUserWalletDetails(walletStore.userGiftDetails.id)
      });
  } else {
    toast({
      description: $t("content.giftErrorMessage"),
    });
  }
};
</script>
