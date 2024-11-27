<template>
  <div
    class="flex items-center justify-center min-h-screen bg-green bg-opacity-5"
  >
    <!-- Card container -->
    <div class="p-8 flex flex-col items-center justify-center gap-8">
      <!-- Animated checkmark icon -->
      <div class="max-w-md">
        <svg
          width="100"
          height="100"
          fill="none"
          stroke="green"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <!-- Success message -->
      <div class="flex flex-col gap-4">
        <h2 class="sm:text-2xl text-base font-bold text-green">
          {{ $t("content.doneMessage") }}
        </h2>
        <p class="text-base text-textColor">{{ paymentMessage }}</p>
      </div>
      <!-- Transaction details button -->
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
    router.push(localePath(paymentStore.redirectPage == 'wallet' ? "/dashboard/wallet" : "/"));
  }, 30000);
});

</script>

