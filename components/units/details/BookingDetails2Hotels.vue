<template>
  <div
    class="h-full flex flex-col gap-4 md:flex-row items-center bg-primary md:bg-white bg-opacity-[0.5] px-4 py-4 justify-center md:w-[100%] md:mx-auto rounded-md"
  >
    <div class="flex flex-row w-full shrink-[2]">
      <div class="relative col-span-4 w-full">
        <div
          class="relative w-full gap-5 col-span-4 flex justify-center items-center border-2xl rounded-lg"
        >
          <div class="relative col-span-3 w-full flex justify-center items-center h-full">
            <div
              class="flex items-center cursor-pointer w-full p-[10px] md:px-4 py-2 border sm:border-[1px] h-full rounded-md bg-white"
              v-on:click="showDateRange = true"
            >
              <!-- <Icon
                name="mdi:calendar"
                /> -->
              <svg
                class="me-2"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#875FFF"
                  d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v4.675q0 .425-.288.713t-.712.287t-.712-.288t-.288-.712V10H5v10h5.8q.425 0 .713.288T11.8 21t-.288.713T10.8 22zm13 1q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23m.5-5.2v-2.3q0-.2-.15-.35T18 15t-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.525 1.525q.15.15.35.15t.35-.15t.15-.35t-.15-.35z"
                />
              </svg>
              <div class="flex flex-col grow w-full" v-on:click="showDateRange = true">
                <label
                  for="check_in_out_date"
                  class="text-xs md:text-sm cursor-pointer text-dark/50 w-full"
                  >{{ $t('content.check_in_date') }}</label
                >
                <div
                  v-if="rangePickerModel"
                  class="w-full flex md:flex-col gap[20px] text-dark/70"
                >
                  <div class="flex-row md:text-[16px] text-[12px] text-primary">
                    {{ rangePickerModel[0] }}
                  </div>
                </div>
              </div>
            </div>
            <div
              :class="showDateRange ? '' : 'hidden'"
              class="fixed md:pt-1 md:h-max bottom-0 start-0 w-screen md:w-auto md:absolute md:!z-50 !z-[9999999999] shadow-lg md:top-[calc(100%+5px)] md:min-h-[200px] rounded-lg max-h-max bg-light flex justify-between flex-col md:mt-0 mt-24 overflow-y-auto outline-none"
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
                  :max-date="max_date"
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
                  :disable-year-select="false"
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
          <div
            class="relative col-span-3 w-full flex justify-center items-center h-full md:flex"
          >
            <div
              class="flex items-center cursor-pointer w-full p-[10px] md:px-4 py-2 border sm:border-[1px] h-full rounded-md bg-white"
              v-on:click="showDateRange = true"
            >
              <svg
                class="me-2"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#875FFF"
                  d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v4.675q0 .425-.288.713t-.712.287t-.712-.288t-.288-.712V10H5v10h5.8q.425 0 .713.288T11.8 21t-.288.713T10.8 22zm13 1q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23m.5-5.2v-2.3q0-.2-.15-.35T18 15t-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.525 1.525q.15.15.35.15t.35-.15t.15-.35t-.15-.35z"
                />
              </svg>
              <div class="flex flex-col grow w-full" v-on:click="showDateRange = true">
                <label
                  for="check_in_out_date"
                  class="text-xs md:text-sm cursor-pointer text-dark/50 w-full"
                  >{{ $t('content.check_out_date') }}</label
                >
                <div v-if="rangePickerModel" class="w-full flex flex-col text-dark/70">
                  <div class="flex-row md:text-[16px] text-[12px] text-primary">
                    {{ rangePickerModel[1] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-row w-full shrink-[3] relative">
      <div class="relative w-full col-span-4">
        <div class="relative w-full flex justify-center items-center rounded-lg md:mb-0">
          <div class="relative w-full flex justify-center items-center h-full">
            <div
              class="flex items-center cursor-pointer w-full h-full p-[10px] md:px-4 py-2 border rounded-md sm:border-[1px]"
              v-on:click="showCapacity = true"
            >
              <div
                class="bg-white py-2 rounded-md text-gray-500 cursor-pointer w-full flex items-center"
              >
                <Icon name="mdi:person" class="text-primary w-7 h-7" />
                {{ storeFilter.filter.room_count }} {{ $t('content.rooms') }} ,
                {{ storeFilter.filter.adult_count }} {{ $t('content.adults') }} ,
                {{ storeFilter.filter.child_count }} {{ $t('content.children') }}
              </div>
            </div>

            <div
              :class="showCapacity ? '' : 'hidden'"
              class="fixed md:pt-1 md:h-max bottom-0 end-0 w-screen md:w-auto md:min-w-[100%] md:absolute md:!z-50 !z-[9999999999] shadow-lg md:top-[calc(100%+5px)] min-h-[100px] h-full rounded-lg max-h-max bg-light flex justify-between flex-col md:mt-0 mt-24 overflow-y-auto outline-none"
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
              <div class="flex flex-col justify-start items-center py-2">
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
    <div class="w-full md:w-fit">
      <button
        class="bg-primary text-white hover:border-primary hover:bg-white border transition-all hover:text-primary p-[10px] md:p-[20px] w-[150px] rounded-xl"
        @click="updatePrices"
        :disabled="updatePricesLoading || check_dates_availabe"
      >
        <span v-if="updatePricesLoading">
          <Icon name="mdi:sync" class="text-inherit animate-spin h-5 w-5" />
        </span>
        <span v-else>
          {{
            route.query.packageId
              ? $t('content.update_date')
              : $t('content.update_prices')
          }}
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
  import { useRouter } from 'vue-router'
  import { format } from 'date-fns'

  const router = useRouter()

  const route = useRoute()

  const props = defineProps({
    bookingSummary: Object,
    loading: Boolean,
    filterPackageId: String | null | undefined
  })
  const storeBooking = useBookings()

  const emit = defineEmits([
    'update:bookingSummary',
    'update:loading',
    'updatePricesFilter'
  ])

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

  const formatDateForFilter = (date) => {
    
    return format(date, 'yyyy/MM/dd')
  }
  const localePath = useLocalePath()

  const updatePrices = () => {
    updatePricesLoading.value = true
    
    showDateRange.value = false
    storeFilter.filter.dateStartStr = formatDateForFilter(new Date(payload.value.check_in))
    storeFilter.filter.dateEndStr = formatDateForFilter(new Date(payload.value.check_out))

    rangePickerModel.value = [
      formatDateForFilter(new Date(payload.value.check_in)),
      formatDateForFilter(new Date(payload.value.check_out))
    ]
    storeBooking.bookings.dateStart = formatDateForFilter(new Date(payload.value.check_in))
    storeBooking.bookings.dateEnd = formatDateForFilter(new Date(payload.value.check_out))
    
    emit('updatePricesFilter')
    if (route.path.indexOf('/wallet/wallet-hotels') !== -1) {
      // navigateTo(localePath(`/wallet/wallet-hotels/${unit.id}-book`))
      navigateTo(localePath({
        path: `/wallet/wallet-hotels/${route.params.room_id}-book`,
        query: {
          location: route.query.name,
          checkIn: formatDate(payload.value.check_in),
          checkOut: formatDate(payload.value.check_out),
          to_date: route.query.to_date,
          packageId: route.query.packageId
        }
      }))
    } else {
      navigateTo(localePath({
        path: `/hotels/${route.params.unit_id}-book`,
        query: {
          location: route.query.location,
          checkIn: formatDate(payload.value.check_in),
          checkOut: formatDate(payload.value.check_out)
        }
      }))
    }
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
  const rangePickerModel = ref(null)
  const payload = ref({
    check_in: storeFilter.filter.dateStartStr,
    check_out: storeFilter.filter.dateEndStr,
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
    const startDate = new Date(rangePickerModel.value[0])
    const endDate = new Date(rangePickerModel.value[1])

    payload.value.check_in = startDate
    payload.value.check_out = endDate

    const diffInDays = differenceInDays(endDate, startDate)
    // change 14 day constrain
    errorInputDate.value = !(Number(filterPackageId.value) > 0)
    // errorInputDate.value = !(Number(filterPackageId.value) > 0 || diffInDays > 0)
    dateError.value = ''
    if (!errorInputDate.value) {
      dateChange()
      showDateRange.value = false
    } else {
      // if (storeFilter.filter.dateStartStr || storeFilter.filter.dateEndStr) {
      //   rangePickerModel.value[1] = datAfter14Days(rangePickerModel.value[0])
      // } else {
      //   rangePickerModel.value[1] = datAfter14Days(null)
      // }
      // dateError.value = t('filterSearch.errorSelectDatePicker')
    }
  }

  const dateChange = () => {
    if (payload.value.check_out && payload.value.check_in) {
      const date1 = payload.value.check_in
      const date2 = payload.value.check_out

      // payload.value.months = differenceInMonths(date2, date1)
      // payload.value.days = differenceInDays(date2, date1)
    }
  }

  const resetDateRange = () => {
    rangePickerModel.value = [tomorow()]
    handleDateSelection()
  }
  const setRanges = () => {
    handleDateSelection()
    showDateRange.value = false
  }

  const dateError = ref('')
  const handleInvalidSelect = () => {
    dateError.value = 'Invalid date range'
  }
  const handleDateRange = (val) => {
    rangePickerModel.value = [formatDateForFilter(val[0]), formatDateForFilter(val[1])]
    handleDateSelection()
  }
  const dateStartStr = computed(() => {
    return formatDate(payload.value.check_in)
  })
  const dateEndStr = computed(() => {
    return formatDate(payload.value.check_out)
  })
  const max_date = ref()

  const getMaxDate = () => {
    if (route.path.includes('/wallet')) {
      const { to_date } = route.query
      max_date.value = new Date(to_date)
    } else {
      const today = new Date()
      const nextYear = new Date(today)
      max_date.value = nextYear.setFullYear(today.getFullYear() + 1)
    }
  }
  watch(
    () => route,
    (newVal, oldVal) => {
      console.log(newVal, oldVal)
    }
  )
  onMounted(() => {
    const { checkIn, checkOut } = route.query
    rangePickerModel.value = [checkIn, checkOut]
    storeFilter.filter.dateStartStr = checkIn
    storeFilter.filter.dateEndStr = checkOut

    storeFilter.getFilterStorage()

    // const startDate = parseFilterDate(
    //   storeFilter.filter.start_date?.toString() ?? '',
    //   tomorow().toString()
    // )
    // const endDate = parseFilterDate(
    //   storeFilter.filter.end_date?.toString() ?? '',
    //   new Date(startDate.getDate()).setMonth(startDate.getMonth() + 1).toString()
    // )
    // check if invalid date
    // if (isValidDate(startDate)) rangePickerModel.value[0] = startDate

    // if (isValidDate(endDate)) rangePickerModel.value[1] = endDate
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
    getMaxDate()
  })
  // const maxDate = () => {
  //   if (route.path.includes('/hotel') !== -1) {
  //     max_date.value = ref(new Date(new Date().setDate(new Date().getDate() + 365)))
  //   }
  // }
  const { to_date } = route.query
  const disable_date = computed(() => {
    const givenDate = new Date(to_date) // Parse the given date string
    const currentYear = new Date().getFullYear() // Get the current year

    // Check if the given date's year is next year
    return givenDate.getFullYear() === currentYear + 1
  })

  const isUpdate = ref(false)
  const { available_days } = route.query
  const check_dates_availabe = ref(false)
  watch(
    () => rangePickerModel.value,
    (val) => {
      // console.log(val);

      if (available_days && route.path.includes('/wallet/wallet-hotels/')) {
        if (isUpdate.value) {
          isUpdate.value = false
          return
        }
        // Get the time difference in milliseconds
        let timeDifference = val[1] - val[0]
        if (timeDifference / (1000 * 60 * 60 * 24) === 1 && available_days == 1) {
          rangePickerModel.value = [val[0], val[1]]
          timeDifference = val[1] - val[0]
          check_dates_availabe.value =
            (timeDifference / (1000 * 60 * 60 * 24) == 1) == available_days ? true : false
          isUpdate.value = true
          return
        } else if (timeDifference == 0 && available_days == 1) {
          rangePickerModel.value = [val[0], val[1].setDate(val[1].getDate() + 1)]
          check_dates_availabe.value =
            timeDifference == 0 && available_days == 1 ? true : false
          isUpdate.value = true
          return
        } else if (timeDifference == 0 && available_days > 1) {
          rangePickerModel.value = [val[0], val[1].setDate(val[1].getDate() + 1)]
          check_dates_availabe.value =
            timeDifference == 0 && available_days > 1 ? true : false
          isUpdate.value = true
          return
        }

        // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
        let daysDifference = timeDifference / (1000 * 60 * 60 * 24)
        // Return the difference in days

        check_dates_availabe.value = daysDifference + 1 <= available_days ? true : false
      }
    }
  )
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
    left: 0px;
  }
  @media (max-width: 991px) {
    .custom_calendar .dp__instance_calendar {
      left: -20px;
      position: relative;
    }
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
  .dp__month_year_wrap button:last-child {
    display: none;
    pointer-events: none;
  }
</style>
