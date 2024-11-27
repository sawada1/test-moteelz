<template>
  <div>
    <div
      v-if="loading"
      class="fixed left-0 top-0 h-0.5 w-full z-50 bg-green-500"
    ></div>
   
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useSearchStore } from "@/stores/hotels/search"; // Pinia store for managing search data

const nuxtApp = useNuxtApp();
const searchStore = useSearchStore(); // Access Pinia store for tracking state

const loading = ref(false);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>
