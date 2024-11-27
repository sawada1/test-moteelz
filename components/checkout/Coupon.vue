<script setup lang="ts">
import { ref } from "vue";
import { useCheckout } from "@/stores/checkout";
import Input from "../ui/input/Input.vue";

const couponValue = ref("");
const checkoutStore = useCheckout();

const applyCoupon = async () => {
  await checkoutStore.handleAddCoupon(couponValue.value);
};

</script>

<template>
  <div class="rounded-xl flex flex-col justify-center items-center bg-white">
    <div class="w-full mx-auto">
      <div class="md:flex md:items-center md:justify-center sm:w-auto md:h-full">
        <div class="w-full">
          <div class="relative flex flex-col gap-1">
            <div class="relative w-full">
              <button
                @click="applyCoupon"
                class="absolute left-2 top-1/2 -translate-y-1/2 flex items-center h-fit px-8 py-3 text-light bg-primary hover:bg-primary/90 rounded-md text-xs md:text-[15px] font-bold cursor-pointer transition ease-in duration-300"
              >
                {{ $t("content.apply") }}
              </button>
              <Input
                type="text"
                class="block w-full h-[50px] pl-[70px] pr-3 rounded-md border border-solid placeholder:text-secondary-500 bg-primary/5 bg-clip-padding leading-tight text-dark transition duration-200 ease-linear focus:border-primary focus:text-dark focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-dark"
                id="coupon"
                v-model="couponValue"
                :placeholder="$t('content.enter_coupon')"
                required
              />
            </div>
            <!-- Error message display -->
            <p v-if="checkoutStore.error" class="text-red-500 text-sm mt-2">
              {{ checkoutStore.error }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
