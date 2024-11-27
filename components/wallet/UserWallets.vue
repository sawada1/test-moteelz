<template>
  <div class="w-full h-full">
    <div
      v-if="walletStore?.loading"
      class="grid place-items-center"
      :style="{ height: 'calc(100vh - 362px)' }"
    >
      <pending />
    </div>
    <div
      v-else-if="!walletStore?.loading && walletStore?.userWallets"
      class="flex flex-col gap-4"
    >
      <WalletForUser
        v-for="wallet in walletStore?.userWallets"
        :key="wallet.id"
        :wallet="wallet"
      />
    </div>
    <div
      v-else-if="!walletStore?.loading && walletStore?.userWallets?.length === 0"
      class="w-full h-full flex items-center justify-center flex-col gap-4 my-8"
    >
      <NuxtImg src="/icons/emptyFav.svg"></NuxtImg>
      <h3 class="text-2xl font-bold text-textColor">
        {{ $t("content.noWalletsFound") }}
      </h3>
      <p class="text-textLightGray w-full md:w-1/2 mx-auto">
        {{ $t("content.walletText") }}
      </p>
      <Button @click="navigateTo(localPath(`/wallet`))" class="text-white">{{ $t("content.browseNow") }}</Button>
    </div>
  </div>
</template>

<script setup>
import pending from "../core/pending.vue";
import WalletForUser from "./WalletForUser.vue";
import { onMounted } from "vue";
import { useWalletStore } from "@/stores/wallet";
import SendGift from "../../components/wallet/SendGift";
import { navigateTo } from "nuxt/app";

const localPath = useLocalePath();
// Get wallet store instance
const walletStore = useWalletStore();

onMounted(async () => {
  await walletStore.fetchUserWallets();
});
</script>
