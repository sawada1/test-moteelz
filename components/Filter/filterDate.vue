<script lang="ts" setup>
import { useFilterUnits } from "~/stores/hotels/filter";
import { addDays, format } from "date-fns";
import { ref, onMounted } from "vue";
import { useScreens } from "vue-screen-utils";

// Define types for your component
interface DatePickerModel {
  start: Date | null;
  end: Date | null;
}

interface DatePickerAttrs {
  key: string;
  highlight: boolean;
}

const filterPackageId = useCookie<string | undefined>("filterPackageId");
const attrsStarPicker = ref<DatePickerAttrs[]>([
  { key: "check_in", highlight: true },
]);
const attrsEndPicker = ref<DatePickerAttrs[]>([
  { key: "check_out", highlight: true },
]);
const { mapCurrent } = useScreens({
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
});

const expanded = mapCurrent({ lg: false }, true);
const masks = ref({
  modelValue: "YYYY-MM-DD",
});
const getLastDayOfMonth = () => {
  var today = new Date();
  var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return lastDay;
};
const check_in = ref(false);
const check_out = ref(false);
const startPickerModel = ref<Date>(addDays(new Date(), 1));
const endPickerModel = ref<Date>(getLastDayOfMonth());
const rangePickerModel = ref<DatePickerModel>({
  start: null,
  end: null,
});
const errorInputDate = ref(false);

const store = useFilterUnits();

onMounted(() => {
  initializeDatePickers();
});

function initializeDatePickers() {
  const startDate = getStartDate();
  const endDate = getEndDate();
  rangePickerModel.value.start = startDate;
  rangePickerModel.value.end = endDate;
  // startPickerModel.value = startDate
  // endPickerModel.value = endDate
  // const currentDate = new Date()
  // if (startDate >= currentDate) {
  //   const diffInMilliseconds = endDate.getDate() - startDate.getDate()
  //   const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24)
  //   if (Number(filterPackageId.value) > 0 || diffInDays >= 14) {
  //     updateFilterAndStorage(startDate, endDate, diffInDays)
  //   }
  // }
}

const getStartDate: () => Date = () => {
  const startDate = tomorrow();

  if (store.filter.start_date !== undefined) {
    const arrayDate = store.filter.start_date?.toString()?.split("/");
    const d = new Date();
    d.setFullYear(Number(arrayDate[2]));
    d.setMonth(Number(arrayDate[1]) - 1);
    d.setDate(Number(arrayDate[0]));
    return d;
  }

  return startDate;
};

const getEndDate: () => Date = () => {
  if (store.filter.end_date !== undefined) {
    return new Date(store.filter.end_date);
  }
  return getLastDayOfMonth();
};

function updateFilterAndStorage(
  startDate: Date,
  endDate: Date,
  diffInDays: number
) {
  rangePickerModel.value.start = startDate;
  rangePickerModel.value.end = endDate;

  startPickerModel.value = startDate;
  endPickerModel.value = endDate;

  store.filter.start_date = startDate;
  store.filter.dateStartStr = format(startDate, "dd/MM/yyyy");
  store.filter.dateEndStr = format(endDate, "dd/MM/yyyy");
  store.filter.selectDays = diffInDays | 1;
  store.setFilterStorage();
}

function tomorrow(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}

const datePickerToggleSM = async (toggle: string) => {
  if (toggle === "check_in") {
    check_in.value = !check_in.value;
    check_out.value = false;
  } else if (toggle === "check_out") {
    check_out.value = !check_out.value;
    check_in.value = false;
  }
};

const handleDateSelectStart = async () => {
  rangePickerModel.value.start = startPickerModel.value;
  if (rangePickerModel.value.start == undefined) {
    rangePickerModel.value.start = getStartDate();
  }

  let diffInMilliseconds = 0;
  if (rangePickerModel.value.end) {
    diffInMilliseconds =
      rangePickerModel.value.end.getDate() -
      rangePickerModel.value.start.getDate();
  }
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  store.filter.dateStartStr = format(
    rangePickerModel.value.start,
    "dd/MM/yyyy"
  );
  store.filter.start_date = rangePickerModel.value.start;
  // change 14 day constrain

  // if (Number(filterPackageId.value) > 0 || diffInDays >= 14) {
  if (Number(filterPackageId.value) > 0 || diffInDays > 0) {
    datePickerToggleSM("check_in");
    store.activeMenu = "check_out";
    errorInputDate.value = false;
    store.filter.selectDays = diffInDays | 1;
    store.setFilterStorage();
    await store.filtering();
  }
};

const handleDateSelectEnd = async () => {
  rangePickerModel.value.end = endPickerModel.value;
  let diffInMilliseconds = 0;
  if (rangePickerModel.value.end == undefined) {
    rangePickerModel.value.end = getEndDate();
  }
  if (rangePickerModel.value.start) {
    diffInMilliseconds =
      rangePickerModel.value.end.getTime() -
      rangePickerModel.value.start.getTime();
  }
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  store.filter.end_date = rangePickerModel.value.end;
  store.filter.dateEndStr = format(rangePickerModel.value.end, "dd/MM/yyyy");
  // change 14 day constrain
  // if (Number(filterPackageId.value) > 0 || diffInDays >= 14) {
  if (Number(filterPackageId.value) > 0 || diffInDays > 0) {
    errorInputDate.value = false;
    store.filter.selectDays = diffInDays | 1;
    store.setFilterStorage();
    datePickerToggleSM("check_out");
    store.activeMenu = "";
    await store.filtering();
  } else {
    errorInputDate.value = true;
  }
};
</script>

<template>
  <template v-if="store.activeMenu === 'check_in'">
    <div
      class="w-full flex justify-around items-center col-12"
      :class="{
        '': store.activeMenu === 'check_in',
        hidden: store.activeMenu !== 'check_in',
      }"
    >
      <div
        class="h-full pt-5 md:pt-1 md:h-max top-0 w-full min-h-[100px] rounded-md left-0 ltr:left-0 rtl:right-0 max-h-max bg-lightflex justify-between flex-col overflow-y-auto overflow-x-hidden outline-none"
      >
        <div
          class="flex flex-col items-center py-2 justify-center my-2 relative p-4 min-[0px]:overflow-y-auto"
        >
          <span
            :class="{ '': errorInputDate, 'hidden m-0': !errorInputDate }"
            class="mb-2 text-red text-start text-burgundy text-md"
          >
            {{ $t("filterSearch.errorSelectDatePicker") }}
          </span>
          <div class="data-picker-c flex flex-col items-center">
            <VDatePicker
              transparent
              borderless
              :attributes="attrsStarPicker"
              :min-date="tomorrow()"
              v-model="startPickerModel"
              mode="date"
              locale="ar"
              :masks="masks"
              @update:model-value="handleDateSelectStart"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-if="store.activeMenu === 'check_out'">
    <div
      :class="{
        '': store.activeMenu === 'check_out',
        hidden: store.activeMenu !== 'check_out',
      }"
      class="w-full flex justify-around items-center col-12"
    >
      <div
        class="h-full pt-5 md:pt-1 md:h-max top-0 w-full min-h-[100px] rounded-md ltr:left-0 rtl:right-0 max-h-max bg-lightflex justify-between flex-col left-0 overflow-y-auto overflow-x-hidden outline-none"
      >
        <div
          class="flex flex-col items-center py-2 justify-center my-2 relative p-4 min-[0px]:overflow-y-auto"
        >
          <span
            :class="{ '': errorInputDate, 'hidden m-0': !errorInputDate }"
            class="mb-2 text-red text-start text-burgundy text-md"
          >
            {{ $t("filterSearch.errorSelectDatePicker") }}
          </span>
          <div class="data-picker-c flex flex-col items-center">
            <VDatePicker
              transparent
              borderless
              :attributes="attrsEndPicker"
              :expanded="expanded"
              :min-date="startPickerModel"
              v-model="endPickerModel"
              mode="date"
              locale="ar"
              :masks="masks"
              @update:model-value="handleDateSelectEnd"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
