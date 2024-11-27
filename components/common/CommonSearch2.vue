<template>
  <div>
    <VueDatePicker
      ref="datepicker"
      v-model="selectedDate"
      :range="true"
      :min-date="minDate"
      :max-date="maxDate"
      :multi-calendars="currentWidth <= 700 ? false : true"
      auto-apply
      trim-weeks
      :first-day-of-week="1"
      :locale="locale"
      :show="['month', 'day']"
      :enable-time-picker="false"
      :day-names="locale === 'en' ? dayNamesEN : dayNamesAR"
      @update:model-value="onDateChange"
      class="custom-date-picker border-none"
    />
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import { generalStore } from "@/stores/general";
import "@vuepic/vue-datepicker/dist/main.css";
import { format, addDays } from "date-fns";
import { useDateUtilities } from "~/composables/utilities/useDateUtilities";
import type { DatePickerInstance } from "@vuepic/vue-datepicker";
let props = defineProps(["checkDateOpen"]);
let store = generalStore();
const { datAfter14Days, dayNamesAR, dayNamesEN, differenceInDays } =
  useDateUtilities();
const tomorrow = addDays(new Date(), 2);
const fiveDaysFromTomorrow = addDays(tomorrow, 14);
const { t, locale } = useI18n();
const datepicker = ref<DatePickerInstance>(null);
const date = ref(new Date());

// Get the current year and create the minDate and maxDate
const currentYear = new Date().getFullYear();
const minDate = new Date(); // January 1st of the current year
const maxDate = new Date(currentYear + 1, 11, 31); // December 31st of the next year
const openDatePicker = () => {
  if (datepicker.value) {
    datepicker.value.openMenu();
  }
};
const selectedDate = ref([tomorrow, fiveDaysFromTomorrow]);
const onDateChange = () => {
  store.searchObj.checkIn = format(selectedDate.value[0], "yyyy-MM-dd");
  store.searchObj.checkOut = format(selectedDate.value[1], "yyyy-MM-dd");
  console.log(selectedDate.value);
  
};
const currentWidth = ref();
const updateWidth = () => {
  currentWidth.value = window.innerWidth;
};

onMounted(() => {
    
  if(store.searchObj.checkIn == ""){
    onDateChange();
  }
  updateWidth();
  window.addEventListener("resize", updateWidth);
    console.log(store.searchObj.checkIn , store.searchObj.checkOut)
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

watch(
  () => props.checkDateOpen,
  (newDate) => {
    if (newDate) {
      openDatePicker();
    }
  }
);
</script>

<style>
.dp__today {
  border: 1px solid #875fff;
}
.dp__range_end,
.dp__range_start,
.dp__active_date {
  background-color: #875fff;
  border: 1px solid #875fff;
}
</style>
