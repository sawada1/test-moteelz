<template>
  <div>
    <Dialog v-model="open">
      <DialogTrigger asChild>
        <Button
          :disabled="wallet?.available_days == 0"
          variant="outline"
          class="group border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-white gap-2 flex items-center w-full"
        >
          <span class="group-hover:flex hidden"
            ><IconGift color="#ffffff"
          /></span>
          <span class="group-hover:hidden flex"
            ><IconGift color="#ac0054"
          /></span>
          {{ $t("content.sendGift") }}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <!-- <DialogTitle>{{ $t("content.sendGift") }}</DialogTitle> -->
        </DialogHeader>
        <div class="md:grid flex flex-col grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:w-full md:h-full w-44 h-32 mx-auto content-center">
            <img
              class="h-auto w-auto object-cover"
              src="../../assets/images/sendGift1.png"
            />
          </div>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Input
                id="name"
                v-model="name"
                :placeholder="$t('content.nameForReceiver')"
              />
              <span v-if="errors.name" class="text-red-500 text-sm">
                {{ errors.name }}
              </span>
            </div>

            <div>
              <PhoneInputComponent
                :mobile="phoneNumber"
                :countryCode="countryCode"
                @update:countryCode="countryCode = $event"
                @update:mobile="phoneNumber = $event"
                :placeholder="$t('content.contact_phone_number')"
                width="w-[40%]"
              />
              <span v-if="errors.phone" class="text-red-500 text-sm">
                {{ errors.phone }}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm">
                {{ $t("content.inputNumberGift") }}
              </span>
              <div class="flex items-center gap-4">
                <!-- Decrement Button -->
                <Button variant="outline" class="p-2" @click="decrementDays">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 12h14"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </Button>

                <!-- Days Count Display -->
                <span class="font-semibold">{{ daysCount }}</span>

                <!-- Increment Button -->
                <Button variant="outline" class="p-2" @click="incrementDays">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
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
                </Button>
              </div>
              <span v-if="errors.days" class="text-red-500 text-sm">
                {{ errors.days }}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter class="mb-20 md:mb-0">
          <Button
            @click="handleSendGift"
            class="text-white w-full gap-2 flex items-center"
            :disabled="walletStore?.loading"
          >
            <!-- <IconGift color="#ffffff" />
          <span>{{ $t("content.sendGift") }}</span> -->
            <template v-if="walletStore?.loading">
              <Loader2 class="w-4 h-4 mx-2 animate-spin" />
              {{ $t("content.waiting") }}
            </template>
            <template v-else>
              <IconGift color="#ffffff" />
              <span>{{ $t("content.sendGift") }}</span>
            </template>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <CardGift
      :hideTitle="true"
      :giftId="walletStore?.giftData?.giftId"
      ref="cardGift"
    />
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import IconGift from "../icon/IconGift";
import CardGift from "./CardGift.vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneInputComponent from "@/components/form/PhoneInputComponent.vue";
import { useWalletStore } from "@/stores/wallet";
import { useI18n } from "vue-i18n";
import { Loader2 } from "lucide-vue-next";
const { t } = useI18n();

const walletStore = useWalletStore();

const daysCount = ref(0);
const name = ref("");
const countryCode = ref("+966");
const phoneNumber = ref("");
const cardGift = ref(null);
const open = ref(false);

const errors = ref({
  name: "",
  phone: "",
  days: "",
});

const props = defineProps({
  wallet: {
    type: Object,
    require: true,
  },
});

// Methods to increment and decrement the days
function incrementDays() {
  if (daysCount.value >= props.wallet.available_days) {
    return;
  }
  daysCount.value++;
}

function decrementDays() {
  if (daysCount.value > 0) daysCount.value--;
}

function validateForm() {
  errors.value = { name: "", phone: "", days: "" };
  let isValid = true;

  if (!name.value.trim()) {
    errors.value.name = t("content.enterFullName");
    isValid = false;
  }
  if (!phoneNumber.value.trim()) {
    errors.value.phone = t("content.phone_numberError");
    isValid = false;
  }
  if (daysCount.value <= 0) {
    errors.value.days = t("content.inputNumberGiftError");
    isValid = false;
  }

  return isValid;
}

const handleSendGift = async () => {
  if (!validateForm()) return;

  await walletStore
    .fetchSendGift({
      wallet_id: props.wallet.id, // this is id for user wallet not wallet
      days: daysCount.value,
      phone: `${countryCode.value}${phoneNumber.value}`,
      name: name.value,
    })
    .then(() => {
      walletStore.getUserWalletDetails(props.wallet.id);
      walletStore.fetchUserWallets();
      cardGift.value.openModal();
      // open.value = false;
    });
};
</script>
