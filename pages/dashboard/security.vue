<template>
    <div>
        <LayoutProfile >
            <Breadcrumb class="mt-5 ms-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <NuxtLink to="/">{{ $t("header.home") }}</NuxtLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <NuxtLink to="/ar/dashboard/security">
              {{ $t("content.loginAndSecurity") }}
            </NuxtLink>
          </BreadcrumbItem>
     
      
        </BreadcrumbList>
      </Breadcrumb>
            <SecurityTapComponent class="p-5"></SecurityTapComponent>
        </LayoutProfile>
    </div>
</template>
<script>

</script>
<script lang="ts" setup>

import LayoutProfile from '@/components/layout/LayoutProfile.vue';
import SecurityTapComponent from '@/components/dashboard/SecurityTapComponent.vue';
import { Method, useApi } from "@/composables/api";

import { useSecurityStore } from "@/stores/security";
import { Slash } from 'lucide-vue-next';
let store = useSecurityStore();
// const calling = async () => {
//     const response = await useApi("/api/v1/account/user/devices", Method.GET, undefined);

// }
// calling();
onMounted(() => {
    // Force the API call on page refresh
    // store.forceApiCall = true;
    store.getDevices();
});




</script>