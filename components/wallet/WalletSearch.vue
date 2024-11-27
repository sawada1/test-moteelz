<template>
  <div class="relative w-72">
    <Input
      v-model="searchQuery"
      type="text"
      :placeholder="$t('content.search')"
      class="rounded-lg w-full text-start p-2 border border-bg-gray-200 text-dark focus:border-primary focus:outline-none"
      @input="handleInputChange"
    />
    <span
      class="absolute inset-y-0 left-2 flex items-center pl-2"
    >
      <!-- icon here -->
       <IconSearch />
    </span>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Input } from "@/components/ui/input";
const searchQuery = ref("");
import { useWalletStore } from "../../stores/wallet";
import IconSearch from "../../components/icon/IconSearch"

// Get wallet store instance
const walletStore = useWalletStore();

// Function to get the current value of the input
const getInputValue = () => {
  return searchQuery.value.trim();
};

const handleInputChange = async () => {
  const trimmedQuery = getInputValue()

  walletStore.fetchWalletSearch(trimmedQuery);
};
</script>
