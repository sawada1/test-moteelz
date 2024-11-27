<script setup lang="ts">
import Reservations from '@/components/booking/Reservations.vue';

import FilterBooking from '@/components/booking/FilterBooking.vue';
import FavTapComponent from '@/components/dashboard/FavTapComponent.vue';
import LayoutProfile from '@/components/layout/LayoutProfile.vue';
import { Slash } from 'lucide-vue-next';
</script>

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
            <NuxtLink to="/ar/dashboard/booking">
              {{ $t("content.booking") }}
            </NuxtLink>
          </BreadcrumbItem>
     
      
        </BreadcrumbList>
      </Breadcrumb>
        <div class="flex flex-col gap-4 mt-10 container">
<b class="text-xl">الحجوزات</b>
<FilterBooking />
<!-- <BookingForUser  />
<BookingForUser bookingStatus="قيد الانتظار" bookingBorderColor="#F6C000" bookingBgColor="#FFF8DD" />
<BookingForUser bookingStatus="ملغية" bookingBorderColor="#F1416C" bookingBgColor="#FFF5F8" /> -->
<Reservations />
</div>
    </LayoutProfile>
</template>