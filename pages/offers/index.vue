<template>
  <!-- <div>
    <div
      v-if="checkOutStore?.loading"
      class="grid items-center"
      :style="{ height: 'calc(100vh - 362px)' }"
    >
      <pending />
    </div>
    <div class="container mt-10 flex flex-col mb-24">
      <StepsBooking />
      <div class="mt-10 grid md:grid-cols-2 grid-cols-1 gap-8">
        <BookingCheckout />
        <div class="flex flex-col gap-4" v-if="checkOutStore?.preBookDetails">
          <UserForm ref="travelerForm" />
          <BookingGuests
            v-for="(room, index) in checkOutStore?.preBookDetails?.package?.packageRooms"
            :key="index"
            :index="index"
            @guestDataChange="handleGuestData(index, $event)"
            ref="guestSections"
            @validationStatus="handleValidationStatus(index, $event)"
            :room="room"
          />
        </div>
      </div>
      <div class="flex justify-start w-full">
        <Button @click="submitBooking" class="text-white w-full md:w-1/2 mt-8"
          >{{ $t('content.continue_payment') }}</Button
        >
      </div>
    </div>
  </div> -->
  <Waiting />
</template>

<script setup>
import { ref, onMounted } from "vue";
import BookingCheckout from "../../components/checkout/BookingCheckout.vue";
import BookingGuests from "../../components/checkout/BookingGuests.vue";
import StepsBooking from "@/components/checkout/StepsBooking.vue";
// import UserForm from "@/components/checkout/UserForm.vue";
import payment from "@/components/checkout/Payment.vue";
import BookingForUser from "@/components/booking/BookingForUser.vue";
import FilterBooking from "@/components/booking/FilterBooking.vue";
import NoBooking from "@/components/booking/NoBooking.vue";
import { useCheckout } from "@/stores/checkout";
import Waiting from "@/components/core/Waiting.vue"
const { t } = useI18n();
useHead({
  title: t('content.offers'),
  meta: [
    { name: 'description', content: t('') }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: '' } ]
}) 

// Number of guests
const guestCount = 2;

// Ref to store all guest data
const guestData = ref(Array(guestCount).fill(null));

// Validation statuses for each guest
const validationStatus = ref(Array(guestCount).fill(false));

// Refs for each guest section
const guestSections = ref([]);

// Function to handle data emitted from each guest component
const handleGuestData = (index, data) => {
  guestData.value[index] = {
    firstName: data.firstName,
    lastName: data.lastName,
    guestMail: data.guestMail,
    bedSelection: data.bedSelection,
  };
};

// Function to handle validation status emitted from each guest component
const handleValidationStatus = (index, status) => {
  console.log(index, status);
  validationStatus.value[index] = status;
};

// Function to validate all guests based on the emitted validation status
const validateAllGuests = () => {
  return validationStatus.value.every((status) => status === true);
};

// Scroll to the first invalid guest section
const scrollToFirstInvalidSection = () => {
  const firstInvalidIndex = validationStatus.value.findIndex(
    (status) => status === false
  );
  if (firstInvalidIndex !== -1 && guestSections.value[firstInvalidIndex]) {
    guestSections.value[firstInvalidIndex].$el.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

// On form submission, validate and submit data
const submitBooking = async () => {
  if (validateAllGuests()) {
    console.log("Form submitted successfully:", guestData.value);
    // Handle successful form submission (e.g., API call)
  } else {
    scrollToFirstInvalidSection(); // Scroll to the first invalid section
    console.log("Validation failed. Please check the required fields.");
    // Handle validation failure (e.g., show error message)
  }
};

onMounted(async () => {
  await checkOutStore.getHotelDetails(1568417);
  await checkOutStore.getPreBookDetails();
});
</script>
