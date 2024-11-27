<template>
  <div class="container mt-8 mb-20 xl:mb-0">
    <Breadcrumb class="mb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <NuxtLink to="/">{{ $t("header.home") }}</NuxtLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <span
            @click="navigateTo(localPath(`/wallet`))"
            class="cursor-pointer"
          >
            {{ $t("labels.wallet") }}
          </span>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage class="text-primary">
            {{ $t("content.logs") }}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <!-- Show loader if no logs -->
    <div
      v-if="walletStore?.loading"
      class="grid place-items-center"
      :style="{ height: 'calc(100vh - 362px)' }"
    >
      <pending />
    </div>
    <div v-else>
      <HistoryLogs />
    </div>
  </div>
</template>

<script lang="ts" setup>
import HistoryLogs from "@/components/wallet/HistoryLogs.vue";
import pending from "@/components/core/pending.vue"
import { Slash } from "lucide-vue-next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { onMounted } from "vue";
import { useWalletStore } from "@/stores/wallet";
import { useRoute } from "vue-router";

const route = useRoute();

const walletStore = useWalletStore();

onMounted(() => {
  walletStore.getUserWalletLogs(route.params.id);
});
</script>
