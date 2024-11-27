<template>
  <!-- <div class="min-h-screen">
    {{ id }}
    {{selectedRoomLocale}}
  </div> -->
  <div class="min-h-screen">
    <div
      v-if="checkOutStore?.loading"
      class="grid items-center"
      :style="{ height: 'calc(100vh - 362px)' }"
    >
      <pending />
    </div>
    <div v-else class="container mt-10 flex flex-col mb-24">
      <StepsBooking />
      <div class="mt-10 grid md:grid-cols-2 grid-cols-1 gap-8">
        <BookingCheckout />
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-4" v-if="checkOutStore?.preBookDetails">
            <BookingGuests
              v-for="(room, index) in checkOutStore?.preBookDetails?.package
                ?.packageRooms"
              :key="index"
              :index="index"
              @guestDataChange="handleGuestData(index, $event)"
              ref="guestSections"
              @validationStatus="handleValidationStatus(index, $event)"
              :room="room"
            />
          </div>
          <div class="w-full">
            <Button
              v-if="!isAuthenticated"
              @click.prevent="handleAuthClick()"
              class="text-white w-full mt-8"
              >{{ $t("content.continue_payment") }}</Button
            >
            <Button
              v-if="isAuthenticated"
              @click="submitBooking"
              class="text-white w-full mt-8"
              :disabled="checkOutStore?.loadingBookRoom"
            >
              <template v-if="checkOutStore?.loadingBookRoom">
                <Loader2 class="w-4 h-4 mx-2 animate-spin" />
                {{ $t("content.waiting") }}
              </template>
              <template v-else>
                {{ $t("content.continue_payment") }}
              </template>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from "vue";
import { storeToRefs } from "pinia";
import BookingCheckout from "../../components/checkout/BookingCheckout.vue";
import BookingGuests from "../../components/checkout/BookingGuests.vue";
import StepsBooking from "@/components/checkout/StepsBooking.vue";
import pending from "@/components/core/pending.vue";
import { hotelDetails } from "@/stores/hotels/hotelDetails";
import { useCheckout } from "@/stores/checkout";
import { useAuthStore } from "@/stores/auth";
const { t } = useI18n();
useHead({
  title: t('content.continue_payment'),
  meta: [
    { name: 'description', content: t('') }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: '' } ]
})
const auth = useAuthStore();
const route = useRoute();
let router = useRouter();
const localePath = useLocalePath();
const { id } = route.query;
const hotelDetailsStore = hotelDetails();
const checkOutStore = useCheckout();
const { selectedRoom } = storeToRefs(hotelDetailsStore);
const selectedRoomLocale = JSON.parse(localStorage.getItem("selectedRooms"));
const isAuthenticated = computed(() => auth.isAuthenticated);

// Number of guests (computed to dynamically reflect changes)
const guestCount = computed(
  () => checkOutStore?.preBookDetails?.package?.packageRooms?.length || 0
);

// Reactive Ref to store all guest data
const guestData = ref([]);

// Validation statuses for each guest
const validationStatus = ref([]);

// Refs to each BookingGuests component
const guestSections = ref([]);
// Handle validation status emitted from BookingGuests
const handleValidationStatus = (index, status) => {
  validationStatus.value[index] = status;
};
// Handle guest data emitted from BookingGuests
const handleGuestData = (index, data) => {
  guestData.value[index] = data;
  validateGuest(index);
};
const handleAuthClick = () => {
  auth.showModal = true;
};

// Validate individual guest
const validateGuest = (index) => {
  const guest = guestData.value[index];
  const isValid =
    guest && guest?.firstName?.trim() !== "" && guest?.lastName?.trim() !== "";

  validationStatus.value[index] = isValid;
};

// Validate all guests on submission
const validateAllGuests = () => {
  let allGuestsValid = true;

  guestData.value.forEach((_, index) => {
    validateGuest(index);
    if (!validationStatus.value[index]) {
      allGuestsValid = false; // If any guest is invalid, set overall validation to false
    }
  });

  return allGuestsValid;
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

// Submit booking
const submitBooking = async () => {
  // Validate all guest fields before proceeding
  const validGuests = validateAllGuests();

  if (validGuests) {
    console.log("All guest data is valid. Proceeding to payment...");

    // Set guest details in the store
    checkOutStore.setGuestDetails(guestData.value);
    // Proceed to booking
    await checkOutStore.fetchBookingRoom({
      payment_type: "Moyasar",
      platform: "web",
      rooms: checkOutStore.guestDetails,
    });

    router.push(localePath("/payment"));
  } else {
    console.log("Validation failed. Please fill in the required fields.");
    scrollToFirstInvalidSection();
  }
};

// On mounted, ensure proper guest data is initialized
onMounted(async () => {
  await checkOutStore.getHotelDetails(id);
  await checkOutStore.getPreBookDetails(hotelDetailsStore.selectedRoom[0]);

  nextTick(() => {
    // Initialize guest data for each room reactively
    guestData.value = checkOutStore?.preBookDetails?.package?.packageRooms.map(
      (room, index) => ({
        firstName: "",
        lastName: "",
        guestMail: "",
        title: "",
        packageRoomToken: room.roomToken,
        reference: index + 1,
        type: "adult",
        lead: true,
      })
    );

    // Initialize validation status for each guest
    validationStatus.value = guestData.value.map(() => false);

    // Explicitly validate each guest on mount to ensure validation status is set correctly
    guestData.value.forEach((_, index) => {
      validateGuest(index);
    });
  });
});
</script>
