<template>
    <div
      class="border h-full flex flex-col items-center justify-center px-1 py-2 md:w-auto w-full md:mx-0 mx-2 rounded-md bg-primary/5"
    >
      <div class="flex-row w-full my-1 px-2">
        <div class="relative col-span-4">
          <div
            class="relative col-span-4 flex justify-center items-center border-2xl rounded-lg border-dark/30 md:mb-0"
          >
            <div class="relative col-span-3 w-full flex justify-center items-center h-full">
              <div
                class="flex items-center cursor-pointer w-full h-full border p-1 rounded-md bg-white"
                v-on:click="showDateRange = true"
              >
                <Icon
                  name="mdi:calendar"
                  class="w-8 me-2 h-8 text-primary object-contain"
                />
                <div class="flex flex-col grow w-full" v-on:click="showDateRange = true">
                  <label
                    v-if="!rangePickerModel"
                    for="check_in_out_date"
                    class="md:text-md cursor-pointer text-dark/50 w-full"
                    >{{ $t('content.check_in_out_date') }}</label
                  >
                  <div v-if="rangePickerModel" class="w-full flex flex-col text-dark/70">
                    <div class="flex-row md:text-sm md:text-[13px] text-[12px]">
                      {{ dateStartStr }} -
                      {{ dateEndStr }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                :class="showDateRange ? '' : 'hidden'"
                class="fixed md:pt-1 md:h-max bottom-0 end-0 w-screen md:w-auto md:absolute md:!z-50 !z-[9999999999] shadow-lg md:top-[calc(100%+5px)] min-h-[200px] rounded-lg max-h-max bg-light flex justify-between flex-col md:mt-0 mt-24 overflow-y-auto outline-none"
              >
                <div
                  class="flex justify-between items-center shadow-sm flex-shrink-0 rounded-t-md border-b-1 border-dark/10 ps-2 py-2 dark:border-opacity-50 min-[0px]:rounded-none"
                >
                  <span>{{ $t('content.check_in_out_date') }}</span>
                  <Icon
                    v-on:click="showDateRange = false"
                    name="mdi:close"
                    class="w-6 me-1 h-6 text-primary object-contain cursor-pointer"
                  />
                </div>

                <div class="flex flex-col justify-center items-center pt-2">
                  <span v-if="!!dateError">
                    <span class="text-red-500">{{ dateError }}</span>
                  </span>
                </div>
                <div class="flex flex-col justify-center items-center py-2">
                  <VueDatePicker
                    auto-apply
                    trim-weeks
                    :first-day-of-week="1"
                    :locale="locale"
                    :day-names="locale === 'en' ? dayNamesEN : dayNamesAR"
                    v-model="rangePickerModel"
                    range
                    inline
                    :min-date="tomorow()"
                    :multi-calendars="{
                      solo: false,
                      static: true,
                      count: currentWidth > 500 ? 0 : 2
                    }"
                    :enable-time-picker="false"
                    class="custom_calendar"
                    menu-class-name="w-full"
                    @update:model-value="handleDateRange"
                    @invalid-select="handleInvalidSelect"
                  >
                    <template #action-row="{ selectDate }">
                      <div class="action-row w-full"></div>
                    </template>
                  </VueDatePicker>
                </div>
                <!-- Modal footer -->
                <div class="flex justify-between gap-10 py-2 px-4 border-t">
                  <button
                    type="button"
                    class="bg-secondary text-white w-full md:mx-10 h-full rounded-lg hover:border-secondary hover:border hover:bg-white border hover:text-secondary p-1"
                    v-on:click="resetDateRange()"
                  >
                    {{ $t('filterSearch.btnReset') }}
                  </button>

                  <button
                    type="button"
                    class="bg-primary text-white w-full md:mx-10 h-full rounded-lg hover:border-primary hover:border hover:bg-white border hover:text-primary p-1"
                    @click="setRanges()"
                  >
                    {{ $t('filterSearch.apply') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-row w-full my-1 px-2 relative">
        <div class="relative w-full col-span-4">
          <div
            class="relative w-full flex justify-center items-center border-2xl rounded-lg border-dark/30 md:mb-0"
          >
            <div class="relative w-full flex justify-center items-center h-full">
              <div
                class="flex items-center cursor-pointer w-full h-full rounded-md"
                v-on:click="showCapacity = true"
              >
                <div
                  class="bg-white border p-1 rounded-md text-gray-500 cursor-pointer w-full"
                >
                  <Icon name="mdi:person" class="text-primary w-7 h-7" />
                  {{ storeFilter.filter.room_count }} {{ $t('content.rooms') }} ,
                  {{ storeFilter.filter.adult_count }} {{ $t('content.adults') }} ,
                  {{ storeFilter.filter.child_count }} {{ $t('content.children') }}
                </div>
              </div>
              <div
                :class="showCapacity ? '' : 'hidden'"
                class="fixed md:pt-1 md:h-max bottom-0 end-0 w-screen md:w-auto md:min-w-[250%] md:absolute md:!z-50 !z-[9999999999] shadow-lg md:top-[calc(100%+5px)] min-h-[100px] rounded-lg max-h-max bg-light flex  justify-between flex-col md:mt-0 mt-24 overflow-y-auto outline-none"
              >
                <div
                  class="flex justify-between items-center shadow-sm flex-shrink-0 rounded-t-md border-b-1 border-dark/10 ps-2 py-2 dark:border-opacity-50 min-[0px]:rounded-none"
                >
                  <span>{{ $t('content.guestsAndRooms') }}</span>
                  <Icon
                    v-on:click="showCapacity = false"
                    name="mdi:close"
                    class="w-6 me-2 h-6 text-primary object-contain cursor-pointer"
                  />
                </div>

                <div class="flex flex-col justify-center items-center pt-2">
                  <span v-if="!!dateError">
                    <span class="text-red-500">{{ dateError }}</span>
                  </span>
                </div>
                <div class="flex  flex-col justify-start items-center py-2">
                  <!-- <FilterRooms></FilterRooms> -->
                  <FilterRooms2></FilterRooms2>
                </div>
                <!-- Modal footer -->
                <div class="flex justify-between gap-10 py-2 px-4 border-t">
                  <button
                    type="button"
                    class="bg-secondary text-white w-full md:mx-10 h-full rounded-lg hover:border-secondary hover:border hover:bg-white border hover:text-secondary p-1"
                    v-on:click="storeFilter.resetDataFilter('guestsAndRooms')"
                  >
                    {{ $t('filterSearch.btnReset') }}
                  </button>

                  <button
                    type="button"
                    class="bg-primary text-white w-full md:mx-10 h-full rounded-lg hover:border-primary hover:border hover:bg-white border hover:text-primary p-1"
                    v-on:click="showCapacity = false"
                  >
                    {{ $t('filterSearch.apply') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-row w-full my-1 px-2">
        <button
          class="py-1 w-full rounded-md  border"
          @click="updatePrices()"
          :disabled="updatePricesLoading"
          :class="{
            'bg-primary cursor-not-allowed text-white ': updatePricesLoading,
            'bg-primary text-white hover:border-primary hover:bg-white border hover:text-primary':
              !updatePricesLoading
          }"
        >
          <span v-if="updatePricesLoading">
            <Icon name="mdi:sync" class="text-inherit animate-spin h-5 w-5" />
          </span>
          <span v-else>
            {{ !!filterPackageId ? $t('content.update') : $t('content.update_prices') }}
          </span>
        </button>
      </div>
    </div>
  </template>

  <script setup>
  import { useDateUtilities } from '~/composables/utilities/useDateUtilities'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'
  import { useFilterUnits } from '~/stores/filter'
  import { useSettings } from '~/stores/settings'
  import FilterRooms from '~/components/Filter/filterRooms.vue'
  import FilterRooms2 from '~/components/Filter/filterRooms2.vue'

  const props = defineProps({
    bookingSummary: Object,
    loading: Boolean,
    filterPackageId: String | null | undefined
  })
  const storeBooking = useBookings()

  const emit = defineEmits(['update:bookingSummary', 'update:loading', 'updatePricesFilter'])

  const bookingSummary = computed({
    get() {
      return props.bookingSummary
    },
    set(value) {
      emit('update:bookingSummary', value)
    }
  })


  const updatePricesLoading = computed({
    get() {
      return props.loading
    },
    set(value) {
      emit('update:loading', value)
    }
  })

  const updatePrices = () => {
    updatePricesLoading.value = true
      storeBooking.bookings.dateStart = payload.value.check_in
      storeBooking.bookings.dateEnd = payload.value.check_out
      emit('updatePricesFilter')
  }

  const {
    masks,
    datAfter14Days,
    dayNamesAR,
    dayNamesEN,
    dayAfterMonth,
    today,
    tomorow,
    formatDate,
    differenceInMonths,
    differenceInDays,
    isDateAfterToday,
    parseFilterDate,
    isValidDate
  } = useDateUtilities()
  const { t, locale } = useI18n()
  const storeFilter = useFilterUnits()
  const storeSettings = useSettings()
  const filterPackageId = useCookie('filterPackageId')

  const showDateRange = ref(false)
  const showCapacity = ref(false)
  const errorInputDate = ref(false)
  const rangePickerModel = ref([tomorow(), datAfter14Days(null)])
  const payload = ref({
    check_in: tomorow(),
    check_out: datAfter14Days(tomorow()),
    num_of_people: 1,
    days: 1,
    months: 1,
    years: 1
  })

  watch(
    () => payload.value,
    () => {
      bookingSummary.value.check_in = payload.value.check_in
      bookingSummary.value.check_out = payload.value.check_out
    },
    { deep: true }
  )

  watch(showCapacity, () => {
    if (showCapacity.value === true) {
      showDateRange.value = false
    }
  })

  watch(showDateRange, () => {
    if (showDateRange.value === true) {
      showCapacity.value = false
    }
  })
  const handleDateSelection = () => {
    const startDate = rangePickerModel.value[0]
    const endDate = rangePickerModel.value[1]

    payload.value.check_in = startDate
    payload.value.check_out = endDate

    const diffInDays = differenceInDays(endDate, startDate)
    // change 14 day constrain
     errorInputDate.value = !(Number(filterPackageId.value) > 0 || diffInDays >= 14)
    // errorInputDate.value = !(Number(filterPackageId.value) > 0 || diffInDays > 0)
    dateError.value = ''
    if (!errorInputDate.value) {
      dateChange()
      showDateRange.value = false
    } else {
      if (storeFilter.filter.dateStartStr || storeFilter.filter.dateEndStr) {
        rangePickerModel.value[1] = datAfter14Days(rangePickerModel.value[0])
      } else {
        rangePickerModel.value[1] = datAfter14Days(null)
      }
      dateError.value = t('filterSearch.errorSelectDatePicker')
    }
  }

  const dateChange = () => {
    if (payload.value.check_out && payload.value.check_in) {
      const date1 = new Date(payload.value.check_in)
      const date2 = new Date(payload.value.check_out)

      payload.value.months = differenceInMonths(date2, date1)
      payload.value.days = differenceInDays(date2, date1)
    }
  }

  const resetDateRange = () => {
    rangePickerModel.value = [tomorow(), datAfter14Days(tomorow())]
    handleDateSelection()
  }
  const setRanges = () => {
    handleDateSelection()
  }

  const dateError = ref('')
  const handleInvalidSelect = () => {
    dateError.value = 'Invalid date range'
  }
  const handleDateRange = (val) => {
    rangePickerModel.value = [val[0], val[1]]
    handleDateSelection()
  }
  const dateStartStr = computed(() => {
    return formatDate(payload.value.check_in)
  })
  const dateEndStr = computed(() => {
    return formatDate(payload.value.check_out)
  })

  onMounted(() => {
    rangePickerModel.value = [tomorow(), datAfter14Days(tomorow())]

    storeFilter.getFilterStorage()

    const startDate = parseFilterDate(
      storeFilter.filter.start_date?.toString() ?? '',
      tomorow().toString()
    )
    const endDate = parseFilterDate(
      storeFilter.filter.end_date?.toString() ?? '',
      new Date(startDate.getDate()).setMonth(startDate.getMonth() + 1).toString()
    )
    // check if invalid date
    if (isValidDate(startDate)) rangePickerModel.value[0] = startDate

    if (isValidDate(endDate)) rangePickerModel.value[1] = endDate
    if (storeFilter.filter.dateStartStr || storeFilter.filter.dateEndStr) {
      rangePickerModel.value[0] = storeFilter.filter.dateStartStr
      rangePickerModel.value[1] = storeFilter.filter.dateEndStr
      payload.value.check_in = rangePickerModel.value[0]
      payload.value.check_out = rangePickerModel.value[1]
    } else {
      payload.value.check_in = rangePickerModel.value[0]
      payload.value.check_out = rangePickerModel.value[1]
    }
    payload.value.num_of_people = storeFilter.filter.capacity
    payload.value.bedrooms = storeFilter.filter.bedrooms
    dateChange()
  })
  </script>


  <style>
  .vc-header {
    direction: ltr;
  }

  .dp__input,
  .dp__input {
    padding: 8px 3px 6px 12px !important;
  }

  .custom_input .multiselect__tags {
    border: unset !important;
    background: unset !important;
  }

  .custom_input .multiselect__option--selected.multiselect__option--highlight {
    background: #755cf1;
    color: white;
  }

  .custom_input .multiselect__option--highlight {
    background: #755cf1;
    color: white;
  }
  .country_input .multiselect__select {
    padding-top: 1rem;
  }

  .custom_calendar .dp__menu_inner::before {
    height: 0px;
  }
  .custom_calendar .dp__instance_calendar .dp__menu_inner {
    width: 100%;
  }
  .custom_calendar .dp__instance_calendar {
    padding-inline: 10px;
  }

  .custom_calendar {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom_calendar .dp__menu.dp__relative.dp__theme_light {
    border: 0px solid black !important;
    width: 100%;
  }

  .custom_calendar .dp__range_start,
  .dp__range_end {
    background: #755cf1;
    border-color: #755cf1;
    width: 100%;
    font-weight: bold;
  }
  .custom_calendar .dp__range_between {
    background: #755cf120;
    width: 100%;
  }

  .custom_calendar .dp__calendar_header_item {
    font-size: 13px;
    margin-inline-end: 13px;
  }
  </style>