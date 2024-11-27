<template>
  <div
    class="flex items-center justify-center min-h-screen bg-error bg-opacity-5"
  >
    <!-- Card container -->
    <div class="p-8 flex flex-col items-center justify-center gap-8">
      <!-- Animated checkmark icon -->
      <div class="max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          width="100"
          height="100"
        >
          <circle cx="12" cy="12" r="10" fill="#FF4D4D" />
          <path
            d="M15 9L9 15"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 9L15 15"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <!-- Success message -->
      <div class="flex flex-col gap-4">
        <h2 class="sm:text-2xl text-base font-bold text-error">
          {{ $t("content.failedMessage") }}
        </h2>
        <p class="text-base text-textColor">{{ paymentMessage }}</p>
      </div>

      <!-- Return button -->
      <Button @click="handleReturn" class="text-white">
        {{ $t("content.home") }}
      </Button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { usePaymentStore } from "@/stores/payment";

const paymentStore = usePaymentStore();
paymentStore.redirectPage

const route = useRoute();
const router = useRouter();

const localePath = useLocalePath();

const handleReturn = () => {
  router.push(localePath("/"));
};

const paymentMessage = computed(
  () => route.query.message || "No message available"
);

onMounted(() => {
  setTimeout(() => {
    router.push(localePath(paymentStore.redirectPage == 'wallet' ? "/wallet" : "/hotels"));
  }, 5000);
});
</script>

