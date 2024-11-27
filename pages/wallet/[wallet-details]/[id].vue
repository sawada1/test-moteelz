<template>
  <div class="container mt-8 mb-20 xl:mb-0">
    <div
      v-if="!walletStore?.walletDetails"
      class="grid place-items-center"
      :style="{ height: 'calc(100vh - 362px)' }"
    >
      <pending />
    </div>
    <div v-else class="container flex flex-col gap-8 mb-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <NuxtLink to="/">{{ $t("header.home") }}</NuxtLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <NuxtLink to="/ar/wallet">
              {{ $t("labels.wallet") }}
            </NuxtLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage class="text-primary">{{
              walletStore.walletDetails?.name
            }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <WalletNights
        :walletData="walletStore.walletDetails"
        @updateSelectedNight="updateSelectedNight"
      />
      <div class="md:grid flex flex-col-reverse md:grid-cols-2 gap-4">
        <WalletData />
        <WalletOrder
          :selectedNight="selectedNight"
          :price="walletStore.walletDetails?.price"
          :tax_percent="walletStore.walletDetails?.tax_percent"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Slash } from "lucide-vue-next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import WalletNights from "@/components/wallet/WalletNights";
import WalletData from "@/components/wallet/WalletData";
import WalletOrder from "@/components/wallet/WalletOrder";
import pending from "@/components/core/pending.vue"
import { useWalletStore } from "@/stores/wallet";
import { useRoute } from "vue-router";
const { t } = useI18n();
useHead({
  title: t('header.wallet'),
  meta: [
    { name: 'description', content: t('') }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: '' } ]
}) 
const route = useRoute();

// Get wallet store instance
const walletStore = useWalletStore();

const selectedNight = ref(null);

const updateSelectedNight = (night) => {
  selectedNight.value = night;
};

onMounted(() => {
  walletStore.getWalletDetails(route.params.id);
});

watch(
  () => walletStore.walletDetails,
  (newDetails) => {
    if (newDetails && newDetails.numbers_of_days?.length) {
      updateSelectedNight(newDetails.numbers_of_days[0]);
    }
  },
  { immediate: true }
);

</script>
