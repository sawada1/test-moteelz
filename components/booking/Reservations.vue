<template>
  <div class="mb-20 xl:mb-0">
    <!-- <div v-if="bookings.length">
      <BookingForUser
        v-for="(booking) in bookings"
        :key="booking.id"
        :booking="booking"
      />
    </div> -->
    <NoBooking />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BookingForUser from "@/components/booking/BookingForUser.vue";
import NoBooking from "@/components/booking/NoBooking.vue";


</script>
