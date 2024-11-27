<template>
  <div>
    <AlertDialog :open="isModalOpen">
      <AlertDialogTrigger v-if="!hideTitle">
        <button
          @click="openModal"
          class="bg-primary hover:bg-opacity-70 my-1 text-light inline-block md:mx-2 py-[3px] md:px-2 md:text-sm mx-1 text-[11px] md:text-[13px] shadow-md rounded-lg cursor-pointer transition-colors"
        >
          <span class="px-1 font-bold text-md">{{
            $t("content.show_details")
          }}</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <!-- <AlertDialogTitle>{{ $t("content.sendGift") }}</AlertDialogTitle> -->
          <AlertDialogClose as-child>
            <span @click="closeModal" class="cursor-pointer">
              <IconClose />
            </span>
          </AlertDialogClose>
        </AlertDialogHeader>
        <div class="" v-if="walletStore?.loadingGift">
          <pending />
        </div>
        <div v-else class="flex flex-col gap-4">
          <div class="w-40 h-auto mx-auto">
            <!-- <NuxtImg
              class="md:max-h-56 sm:max-h-32 object-cover"
              :src="walletStore.userGiftDetails.img"
            /> -->
            <NuxtImg
              class="h-full w-full object-cover"
              :src="walletStore?.userGiftDetails.img"
            />
          </div>
          <div
            class="relative grid grid-cols-6 md:px-9 px-4 md:mx-2 md:mt-1 mt-3 w-full text-base focus:outline-primary"
          >
            <div class="col-span-6 mt-6 mb-3">
              <div class="grid grid-cols-10 w-full justify-between">
                <div class="col-span-8">
                  <input
                    id="urlShare"
                    name="name"
                    :value="linkShare"
                    class="border border-primary normal-case h-10 rtl:rounded-r-full ltr:rounded-l-full border-dark/10 w-full text-base px-4 py-2 focus:outline-primary"
                    type="text"
                    readonly
                  />
                </div>

                <div class="col-span-2">
                  <button
                    @click="copyLinkGift"
                    class="bg-primary w-full flex justify-center text-sm text-light p-2 shadow-md ltr:rounded-r-full rtl:rounded-l-full cursor-pointer transition-colors"
                  >
                    <svg
                      data-v-c3ad5561=""
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#ffffff"
                        d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-span-6 mt-2 mb-4">
              <div class="grid grid-cols-6">
                <div class="col-span-3 flex flex-row justify-end">
                  <button
                    @click="shareLink"
                    class="bg-primary w-full text-sm text-light inline-block py-2 px-2 shadow-md rounded-lg rtl:rounded-r-full ltr:rounded-l-full cursor-pointer transition-colors"
                  >
                    <span class="px-1 text-center font-bold">
                      {{ $t("content.btnShareLink") }}
                    </span>
                  </button>
                </div>

                <div class="col-span-3 flex flex-row justify-start">
                  <button
                    @click="saveImageGift()"
                    class="bg-primary ms-1 w-full text-sm text-light inline-block py-2 px-2 shadow-md rounded-lg ltr:rounded-r-full rtl:rounded-l-full cursor-pointer transition-colors"
                  >
                    <span class="px-1 text-center font-bold">
                      {{ $t("content.btnDownloadCard") }}
                    </span>
                  </button>
                </div>

                <!-- <div
                  v-if="walletStore.userGiftDetails.status.id === 6"
                  class="col-span-3 flex flex-row justify-start"
                >
                  <button
                    @click="canceledGift"
                    class="bg-primary ms-1 w-full text-sm text-light inline-block py-2 px-2 shadow-md rounded-lg ltr:rounded-r-full rtl:rounded-l-full cursor-pointer transition-colors"
                  >
                    <span class="px-1 text-center font-bold">
                      {{ $t("content.cancel") }}
                    </span>
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
    <Toaster />
  </div>
</template>

<script setup>
import { ref, defineExpose, defineProps } from "vue";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/toast/use-toast";
import pending from "@/components/core/pending.vue";
import IconClose from "@/components/icon/IconClose";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useWalletStore } from "@/stores/wallet";
import { number } from "zod";

const walletStore = useWalletStore();
const { t } = useI18n();

const { toast } = useToast();

const linkShare = ref("");
const isModalOpen = ref(false);


const openModal = async () => {
  isModalOpen.value = true;
  if (isModalOpen.value) {
    try {
      await walletStore.getUserGiftDetails(props.giftId);
      linkShare.value = `${window.location.origin}/dashboard/wallet/gifts/gift-${props.giftId}`;
    } catch (error) {
      console.error("Error fetching gift details:", error);
    }
  }
};

const closeModal = async () => {
  isModalOpen.value = false;
};

const props = defineProps({
  giftId: {
    type: number,
    require: true,
  },
  hideTitle: {
    type: Boolean,
    default: false
  }
});

const copyLinkGift = () => {
  try {
    navigator.clipboard.writeText(linkShare.value);
    toast({
      description: t("content.urlCopiedToClipboard"),
    });
  } catch (err) {
    toast({
      description: t("content.failedToCopy"),
    });
  }
};

const saveImageGift = async () => {
  try {
    const imageUrl = `${walletStore.userGiftDetails.img}`;
    const imageName = "cardGiftMoteelz.jpg";
    const url = imageUrl;
    const a = document.createElement("a");
    a.href = url;
    a.download = imageName;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};

const shareLink = () => {
  // Check if the Share API is supported by the browser
  if (navigator.share) {
    try {
      // Ensure currentPath is a valid URL
      const basePath = window.location.origin; // Gets the base URL (e.g., https://example.com)
      const fullPath = `${basePath}/dashboard/wallet/gifts/gift-${props.giftId}`;

      navigator.share({
        title: `بطاقه هدية محفظة موتيلز`,
        url: fullPath,
      });
    } catch (error) {
      console.error("Error sharing the link:", error);
    }
  } else {
    console.error("Web Share API is not supported in this browser.");
  }
};



defineExpose({ openModal });

// watch(isModalOpen , async (newValue) => {
//   if (newValue) {
//     console.log("newValue", newValue)
//     if (newValue) {
//       await walletStore.getUserGiftDetails(props.giftId);
//       linkShare.value = `${window.location.origin}/dashboard/wallet/gifts/gift-${props.giftId}`;
//     }
//   }
// });
</script>
