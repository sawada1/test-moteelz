<template>
  <LayoutProfile>
    <Breadcrumb class="mt-5 ms-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <NuxtLink to="/">{{ $t("header.home") }}</NuxtLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <NuxtLink to="/ar/dashboard/wallet">
            {{ $t("header.wallet") }}
          </NuxtLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="container my-4">
      <UserWallets />
    </div>
  </LayoutProfile>
</template>

<script setup>
import LayoutProfile from "@/components/layout/LayoutProfile.vue";
import UserWallets from "../../../components/wallet/UserWallets.vue";
import { Slash } from "lucide-vue-next";
</script>
