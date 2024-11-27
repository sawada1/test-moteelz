<script setup>
import { onMounted, watch } from "vue";
import BookingCheckout from "../../components/checkout/BookingCheckout.vue";
import StepsBooking from "@/components/checkout/StepsBooking.vue";
import Payment from "@/components/checkout/Payment.vue";
import { useCheckout } from "@/stores/checkout";
const { t } = useI18n();
useHead({
  title: t('content.payment'),
  meta: [
    { name: 'description', content: t('') }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: '' } ]
}) 
const checkOutStore = useCheckout();
let router = useRouter();

// Log when the component is mounted
onMounted(() => {
  console.log("from payment page onMounted:", checkOutStore.guestDetails);

  if (!checkOutStore.guestDetails) {
    router.push(localePath('/hotels'))
  }

  // You can also log each guest's first name and last name:
  checkOutStore.guestDetails.forEach((guest, index) => {
    if (guest) {
      console.log(
        `Guest ${index + 1}: First Name - ${guest.firstName}, Last Name - ${
          guest.lastName
        }`
      );
    }
  });
});

// Watch for changes in the guestDetails array
watch(
  () => checkOutStore.guestDetails,
  (newGuestDetails) => {
    console.log("guestDetails updated:", newGuestDetails);
    newGuestDetails.forEach((guest, index) => {
      if (guest) {
        console.log(
          `Guest ${index + 1}: First Name - ${guest.firstName}, Last Name - ${
            guest.lastName
          }`
        );
      }
    });
  },
  { deep: true }
);
</script>

<template>
  <div class="container mt-10 flex flex-col mb-24">
    <StepsBooking :step="true" />
    <div class="mt-10 grid md:grid-cols-2 grid-cols-1 gap-8">
      <BookingCheckout />
      <Payment :isDarkTitle="true" :booking="true" />
    </div>
  </div>
</template>
