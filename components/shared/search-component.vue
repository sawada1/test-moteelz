<script setup>
  import { useApiFetch } from '~/composables/useApiFetch'
  import { useFilterUnits } from '~/stores/filter'
  import VueMultiselect from 'vue-multiselect'
  import FilterRooms from '~/components/Filter/filterRooms.vue'
  import FilterRooms2 from '~/components/Filter/filterRooms2.vue'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import { format } from 'date-fns'
  import { POSITION, useToast } from 'vue-toastification'
  import { storeToRefs } from 'pinia'
  import { refDebounced } from '@vueuse/core'

  import '@vuepic/vue-datepicker/dist/main.css'
  import { useStaticData } from '~/stores/staticData'
  import { useDateUtilities } from '~/composables/utilities/useDateUtilities'
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions
  } from '@headlessui/vue'
  const props = defineProps({
    limits: {
      type: Object,
      default: null
    },
    hotelPage: {
      type: Boolean,
      default: false
    }
  })
  const router = useRouter()
  const staticData = useStaticData()
  const store = useFilterUnits()
  const { selectLocation, fromSearchSection } = storeToRefs(useFilterUnits())

  const toast = useToast()
  const country = ref(null)
  const city = ref(null)
  const hotel = ref(null)
  const unit = ref(null)

  const dateRange = ref(null)
  const dataRange_start = ref(null)
  const district = ref(null)
  const searchInLocations = ref(null)
  const searchInLocationsDebounce = refDebounced(searchInLocations, 500)

  const { t, locale } = useI18n()
  const route = useRoute()
  const localePath = useLocalePath()
  const currentWidth = ref(window.innerWidth)
  const dateError = ref(null)
  const errorLocation = ref(false)

  //handle all units for reset data when choose new data
  // watch(
  //   () => [country.value, city.value, hotel.value, district.value],
  //   (
  //     [newCountryVal, newCityVal, newHotelVal, newDistrictVal],
  //     [oldCountryVal, oldCityVal, oldHotelVal, oldDistrictVal]
  //   ) => {
  //    const newValues =  [newCountryVal, newCityVal, newHotelVal, newDistrictVal]
  //    const oldValues =  [oldCountryVal, oldCityVal, oldHotelVal, oldDistrictVal]

  //   }
  // )

  watch(
    () => searchInLocationsDebounce.value,
    (val) => {
      searchInLocations.value = val
    },
    { immediate: true }
  )
  const { datAfter14Days, dayNamesAR, dayNamesEN, differenceInDays } = useDateUtilities()

  const formatDate = (date) => {
    return format(date, 'yyyy/MM/dd')
  }
  const formatDate2 = (date) => {
    return format(date, 'yyyy-MM-dd')
  }

  const rangeStart = (data) => {
    dataRange_start.value = data
  }

  const handleDateRange = (val) => {
    handleDateSelection(val)
  }
  const handleDateSelection = (val) => {
    // console.log("handleDateSelection",val)
    // if(val){

    const startDate = '2024/10/12'

    const endDate = '2024/10/16'

    // console.log("handleDateSelection", startDate, endDate)
    const diffInDays = differenceInDays('2024-10-12', '2024-10-10')
    dateError.value = ''
    store.activeMenu = ''
    // change 14 day constrain
    if (diffInDays > 0) {
      // if (diffInDays >= 14) {
      dateError.value = null
    } else {
      dateError.value = t('filterSearch.errorSelectDatePicker')
    }
    // }
  }

  //   watch(
  //   () => store.filter.dateStartStr,
  //   (newVal) => {
  //     console.log('New dateStartStr value:', newVal);

  //   },
  //   { immediate: true }
  // );

  watch([store.filter.dateStartStr, store.filter.dateEndStr], ([newStart, newEnd]) => {
    dateRange.value = [newStart, newEnd]
  })

  // const resetDateRange = () => {
  //   if (!dateRange.value) {
  //     store.activeMenu = ''
  //   }
  //   dateRange.value = null
  //   store.filter.dateEndStr = ''
  //   store.filter.dateStartStr = ''
  // }
  const setRanges = () => {
    if (dateRange.value) {
      const diffInDays = differenceInDays(dateRange.value[0], dateRange.value[1])
      store.activeMenu = ''

      // change 14 day constrain
      // if (diffInDays >= 14) {
      if (diffInDays > 0) {
        store.activeMenu = ''
        dateError.value = ''
      } else {
        dateRange.value = [dateRange.value[0], datAfter14Days(dateRange.value[0])]
        store.activeMenu = ''
        dateError.value = ''
      }
    } else {
      store.activeMenu = ''
      dateError.value = ''
    }
  }
  const updateWidth = () => {
    currentWidth.value = window.innerWidth
  }

  const locationFlag = ref(false)
  const resetLocation = () => {
    city.value = null
    unit.value = null
    country.value = null
    district.value = null
    hotel.value = null
    locationFlag.value = false
    store.filter.city_id = null
    store.filter.country_id = null
    store.filter.unit = null
    store.filter.district = null
    store.filter.hotel = null
    searchInLocations.value = ''
    selectLocation.value.hotel = ''
    selectLocation.value.country = ''
    selectLocation.value.city = ''
    selectLocation.value.district = ''
    for (let prop in selectedLocation.value) {
      selectedLocation.value[prop] = null
    }
  }
  const setLoction = () => {
    store.activeMenu = ''

    if (city.value || country.value || district.value || unit.value) {
      locationFlag.value = true
    }

    store.filter.city_id = city.value && city.value.city_id
    store.filter.country_id = country.value && country.value.country_id
    store.filter.unit = unit.value
    store.filter.district = district.value
    store.filter.hotel = hotel.value
  }
  const handleSearch = () => {
    store.current_units = []
    store.activeMenu = ''
    setLoction()
    if (
      (route.path.includes('hotels') || route.path.includes('/')) &&
      route.path.includes('offers') == false &&
      (route.path.includes('wallet/hotels-') || city.value || country.value)
    ) {
      fromSearchSection.value = true
      if (hotel.value) {
        store.filter.hotel = hotel.value.id
        // console.log(store.filter.hotel)

        store.filter.unit = null
      } else if (district.value) {
        store.filter.district = district.value
        store.filter.unit = null
      } else if (country.value) {
        store.filter.country_id = country.value.country_id
        store.filter.unit = null
      } else if (city.value) {
        store.filter.city_id = city.value.id
        store.filter.unit = null
      }

      if (dateRange.value && dateRange.value[0] && dateRange.value[1]) {
        store.filter.dateStartStr = dateRange.value[0]
        store.filter.dateEndStr = dateRange.value[1]
      }
    }

    if (
      (route.path.includes('units') || !route.path.includes('/')) &&
      route.path.includes('offers') == false &&
      route.path.includes('hotels') == false &&
      (city.value || country.value)
    ) {
      navigateTo(localePath('/units'))
      store.isLoadingFirst = true
      route.path.includes('/units/') ? (store.filter.packages = '') : null
      store.units = []
      store.scrollPaginate = 0
      store.getUnitsByFilterDate()
    } else if (
      (route.path.includes('hotels') || route.path.includes('/')) &&
      route.path.includes('offers') == false &&
      route.path.includes('units') == false
    ) {
      // console.log(store.selected_hotel_search?.type)
      if (
        store.selected_hotel_search?.type ||
        city.value ||
        country.value ||
        store.filter.adult_count
      ) {
        store.units = []
        store.scrollPaginate = 0
        console.log(dateRange.value[0], dateRange.value[1], 'date range')
        store.filter.dateStartStr = dateRange.value[0]
        store.filter.dateEndStr = dateRange.value[1]
        // console.log(dateRange.value)

        if (!route.path.includes('wallet/hotels')) {
          // router.push({
          //   path: '/hotels',
          //   query: {
          //     checkIn: formatDate2(new Date(dateRange.value[0])),
          //     checkOut: formatDate2(new Date(dateRange.value[1])),
          //     child_count: store.filter.child_count,
          //     adult_count: store.filter.adult_count,
          //     room_count: store.filter.room_count
          //   }
          // })
          navigateTo(
            localePath({
              path: '/hotels',
              query: {
                checkIn: formatDate2(new Date(dateRange.value[0])),
                checkOut: formatDate2(new Date(dateRange.value[1])),
                child_count: store.filter.child_count,
                adult_count: store.filter.adult_count,
                room_count: store.filter.room_count
              }
            })
          )
        } else {
          navigateTo(
            localePath({
              path: `${route.path}`,
              query: {
                to_date: route.query.to_date,
                packageId: route.query.packageId,
                checkIn: formatDate2(new Date(dateRange.value[0])),
                checkOut: formatDate2(new Date(dateRange.value[1]))
              }
            })
          )
        }
      }
      store.getUnitsByFilterDate(false, true, true)
      store.isLoadingFirst = true
      route.path.includes('/hotels/') ? (store.filter.packages = '') : null
    } else if (route.path.includes('offers')) {
      useEvent('offersFilterChange', store.filter)
    } else {
      errorLocation.value = true
      // navigateTo(localePath('/units'))
    }
    // console.log(route.path)
  }

  const selectedLocation = ref()
  const is_input_search_show = ref(false)
  watch(
    () => is_input_search_show.value,
    (val) => {
      if (val) {
        selectedLocation.value.focus()
      }
    }
  )
  const startDate = new Date()
  startDate.setDate(startDate.getDate() + 14)
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 1)
  onMounted(async () => {
    store.activeMenu = ''
    if (route.path.includes('/dashboard/wallet/units')) {
      resetLocation()
    }
    staticData.getCountries()
    staticData.getCities().then(() => {})
    if (store.filter.district) {
      unit.value = null
      district.value = store.filter.district
    }
    if (store.filter.unit) {
      unit.value = store.filter.unit
    }
    if (store.filter.city_id) {
      unit.value = null
      city.value = staticData.cities.find((item) => item.city_id === store.filter.city_id)
    }
    if (store.filter.country_id) {
      unit.value = null
      country.value = staticData.countries.find(
        (item) => item.country_id === store.filter.country_id
      )
    }
    if (store.filter.dateStartStr && store.filter.dateEndStr) {
      dateRange.value = [
        new Date(store.filter.dateStartStr),
        new Date(store.filter.dateEndStr)
      ]
    }
    setLoction()

    updateWidth()
    nextTick(() => {
      window.addEventListener('resize', updateWidth)
    })
  })
  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })
  const filterTop = ref(false)

  ///display search input
  const showLabel = ref(true)
  const showSearchInput = () => {
    store.activeMenu = 'selectedLocation'
    showLabel.value = false
    setTimeout(() => {
      is_input_search_show.value = true
    }, 0)
  }

  const checkHotelSearch = () => {
    let flag = 0
    for (let prop in selectLocation.value) {
      if (selectLocation.value[prop]?.name?.length > 0) {
        flag = 1
        showLabel.value = false
        return
      }
    }
  }
  const disableSearchInput = () => {
    store.activeMenu = ''
    checkHotelSearch()
    setTimeout(() => {
      is_input_search_show.value = false
    }, 0)
  }
  watchEffect(() => {
    checkHotelSearch()
  })

  const tomorrow = ref(new Date(new Date().setDate(new Date().getDate() + 1)))
  const max_date = ref()
  const getMaxDate = () => {
    if (route.path.includes('/wallet')) {
      const { to_date } = route.query
      max_date.value = new Date(to_date)
      return max_date.value
    } else {
      const today = new Date()
      const nextYear = new Date(today)
      max_date.value = nextYear.setFullYear(today.getFullYear() + 1)
    }
  }
  const selected = ref({})
  const { checkIn, checkOut, room_count, adult_count, child_count, available_days } =
    route.query
  const checkDate = () => {
    store.filter.dateStartStr = new Date(checkIn)
    store.filter.dateEndStr = new Date(checkOut)
    dateRange.value = [new Date(checkIn), new Date(checkOut)]
  }
  const checkDateBox = () => {
    if (checkIn) {
      checkDate()
      return
    } else if (store.filter.dateEndStr) {
      dateRange.value = [
        new Date(store.filter.dateStartStr),
        new Date(store.filter.dateEndStr)
      ]
      return
    } else {
      if (!route.path.includes('/wallet/hotels')) {
        const today = new Date()
        const endDate = new Date(today)
        const startDate = new Date(today)
        startDate.setDate(startDate.getDate() + 2)
        endDate.setDate(endDate.getDate() + 4)
        dateRange.value = [startDate, endDate]
        store.filter.dateStartStr = new Date(startDate)
        store.filter.dateEndStr = new Date(endDate)
      }
    }
  }
  const checkRooms = () => {
    if (room_count) {
      store.filter.room_count = room_count
      store.filter.adult_count = adult_count
      store.filter.child_count = child_count
      store.setRoomText(t)
      return
    } else if (store.filter.room_count) {
      console.log(store.filter.room_count)
      store.setRoomText(t)
    } else {
      // const today = new Date()
      // const endDate = new Date(today)
      // const startDate = new Date(today)
      // startDate.setDate(startDate.getDate() + 2)
      // endDate.setDate(endDate.getDate() + 4)
      // dateRange.value = [startDate, endDate]
      // store.filter.dateStartStr = new Date(startDate)
      // store.filter.dateEndStr = new Date(endDate)
    }
  }
  onMounted(() => {
    checkDateBox()
    checkRooms()
    getMaxDate()
  })
  watch(
    () => selected.value,
    (val) => {
      // if (route.path.inc
      store.selected_hotel_search = val
      if (selected.value == 'city') {
        city.value = val
      } else if (selected.value === 'country') {
        country.value = val
      }
      // }
    },
    {
      immediate: true
    }
  )
  const minDate = new Date(2024, 9, 26) // September 26, 2024
  const isUpdate = ref(false)
  const datePicker = ref()
  watch(
    () => dateRange.value,
    (val) => {
      // console.log(val);

      if (available_days && route.path.includes('/wallet/hotels')) {
        if (isUpdate.value) {
          isUpdate.value = false
          return
        }
        // Get the time difference in milliseconds
        let timeDifference = val[1] - val[0]
        if (timeDifference / (1000 * 60 * 60 * 24) === 1 && available_days == 1) {
          dateRange.value = [val[0], val[1]]
          timeDifference = val[1] - val[0]
          store.check_dates_availabe =
            (timeDifference / (1000 * 60 * 60 * 24) == 1) == available_days ? true : false
          isUpdate.value = true
          return
        } else if (timeDifference == 0 && available_days == 1) {
          dateRange.value = [val[0], val[1].setDate(val[1].getDate() + 1)]
          store.check_dates_availabe =
            timeDifference == 0 && available_days == 1 ? true : false
          isUpdate.value = true
          return
        } else if (timeDifference == 0 && available_days > 1) {
          dateRange.value = [val[0], val[1].setDate(val[1].getDate() + 1)]
          store.check_dates_availabe =
            timeDifference == 0 && available_days > 1 ? true : false
          isUpdate.value = true
          return
        }

        // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24)
        // Return the difference in days

        store.check_dates_availabe = daysDifference + 1 <= available_days ? true : false
        if (!store.check_dates_availabe) {
          store.activeMenu = 'check_in_out_date'
        }
      }
    }
  )
  const showWarn = ref(true)
  watch(
    () => store.check_dates_availabe,
    (val) => {
      showWarn.value = !val
    },
    {
      immediate: true
    }
  )

  watch(
    () => store.check_dates_availabe,
    (val) => {
      showWarn.value = !val
    },
    {
      immediate: true
    }
  )

  const locationInput = (ref < HTMLInputElement) | (null > null) // Ref for the input element

  // Set focus on the input when the component is mounted
  if ((store.activeMenu = 'selectedLocation')) {
    if (locationInput.value) {
      locationInput.value.focus()
    }
  }
</script>
<template>
  <button
    @click="filterTop = !filterTop"
    v-if="store.MAP && store.isMobile"
    class="absolute w-12 z-50 cursor-pointer h-12 top-2 start-2 p-3 rounded-full bg-slate-50 border"
  >
    <IconsSetting v-if="!filterTop" />

    <Icon v-else name="mdi:close" class="w-6 h-6 object-contain text-primary" />
  </button>

  <div
    v-show="!(store.MAP && store.isMobile) || filterTop"
    :class="[
      store.MAP && store.isMobile ? 'fixed top-20 start-0 ' : '',
      hotelPage ? 'gap-3' : 'shadow ps-4 '
    ]"
    class="md:bg-white transition pl-5 md:pl-0 ease-in-out delay-150 z-40 text-dark/80 sm:rounded-lg rounded-md items-center justify-center w-full grid sm:grid-cols-12 grid-cols-4"
  >
    <div
      class="col-span-4 w-full sm:h-[56px] justify-center flex items-center border-b pt-2 sm:pt-0"
      :class="
        hotelPage
          ? 'sm:border rounded-lg pr-3 pl-5 sm:col-span-3'
          : 'border-e sm:border-b-0 sm:col-span-3'
      "
      v-if="!route.path.includes('wallet/hotels')"
    >
      <div
        class="relative bg-primary bg-opacity-10 px-3 py-2 md:py-0 md:px-0 rounded md:bg-white col-span-3 w-full flex justify-center items-center h-full"
      >
        <div
          class="flex items-center cursor-pointer w-full h-full text-[1rem] text-sm"
          v-on:click="store.activeMenu = 'selectedLocation'"
        >
          <NuxtImg
            src="/icons/search_location.svg"
            class="w-7 ml-2 h-7 text-primary object-contain"
          />

          <div class="relative flex flex-col grow w-full" v-on:click="showSearchInput">
            <label
              v-if="currentWidth > 700"
              for="selectedLocation"
              class="sm:text-sm cursor-pointer text-dark/50 w-full sm:ms-0 ms-1 sm:pt-0 pt-2"
              >{{ $t('content.enter_unit') }}</label
            >

            <label
              for="selectedLocation"
              v-if="showLabel"
              class="sm:text-md cursor-pointer text-primary w-full sm:ms-0 ms-1 sm:pt-0 pt-2"
              >{{ $t('content.selectedLocation') }}</label
            >

            <input
              v-if="store.activeMenu === 'selectedLocation'"
              id="selectedLocation"
              class="block md:hidden outline-none w-[90%] px-1 sm:my-0 my-1 sm:pb-0 py-1.5 ps-2 rounded-md bg-transparent"
              ref="selectedLocation"
              v-model="searchInLocations"
              @change="(e) => (searchInLocations = e.target.value.trim())"
              style="box-shadow: 0 2px 4px rgb(135 95 255 / 25%)"
            />
            <input
              v-if="store.activeMenu === 'selectedLocation'"
              id="selectedLocation"
              class="hidden md:block outline-none w-[90%] px-1 sm:my-0 my-1 sm:pb-0 py-1.5 ps-2 rounded-md bg-transparent"
              ref="selectedLocation"
              v-model="searchInLocations"
              @change="(e) => (searchInLocations = e.target.value.trim())"
            />
            <div
              v-if="
                (locationFlag && store.activeMenu !== 'selectedLocation') ||
                store.activeMenu === ''
              "
              class="w-full py-1 mx-1 font-semibold sm:py-0 bg-[transparent] focus:outline-none text-dark/70"
            >
              <div
                class="py-1 pl-3 flex justify-between items-center"
                :style="`font-size: ${
                  selectLocation.hotel ? '12px' : '16px'
                };line-height: ${selectLocation.hotel ? '1.2' : '1.5'}`"
                v-if="
                  selectLocation.country ||
                  selectLocation.city ||
                  selectLocation.district ||
                  selectLocation.hotel
                "
              >
                <p>
                  {{
                    selectLocation.country?.name
                      ? selectLocation.city?.name && selectLocation.country?.name
                        ? selectLocation.country?.name + '-'
                        : selectLocation.country?.name
                      : ''
                  }}
                  {{
                    selectLocation.city?.name
                      ? selectLocation.city?.name && selectLocation.district?.name
                        ? selectLocation.city?.name + '-'
                        : selectLocation.city?.name
                      : ''
                  }}
                  {{
                    selectLocation.district?.name
                      ? selectLocation.district?.name && selectLocation.hotel?.name
                        ? selectLocation.district?.name + '-'
                        : selectLocation.district?.name
                      : ''
                  }}
                  <!-- {{
                    selectLocation.district?.name
                      ? '- ' + selectLocation.district?.name
                      : ''
                  }} -->
                  {{
                    selectLocation.hotel?.name ? '- ' + selectLocation.hotel?.name : ''
                  }}
                </p>
                <p>
                  <!-- {{  }} -->
                </p>
              </div>
            </div>
            <div
              v-if="errorLocation"
              class="bg-[#d4111e] rounded-[4px] text-[#fff] text-[12px] px-[8px] py-[4px] absolute ltr:left-[-30px] rtl:right-[-30px] top-[135%] after:w-[0] after:h-[0] after:border-r-[5px] after:border-r-[transparent] after:border-l-[5px] after:border-l-[transparent] after:border-b-[5px] after:border-b-[#d4111e] after:absolute after:bottom-full after:ltr:left-[30px] after:rtl:right-[30px]"
            >
              {{ $t('errors.error_location') }}
            </div>
          </div>
          <Icon
            v-if="locationFlag"
            name="mdi:close"
            v-on:click.stop="resetLocation()"
            class="w-6 me-1 h-6 text-primary object-contain cursor-pointer"
          />
        </div>
        <div
          v-if="currentWidth > 500"
          :class="store.activeMenu == 'selectedLocation' ? '' : 'hidden'"
          class="fixed sm:pt-1 sm:h-max top-0 w-full sm:absolute z-50 shadow-lg sm:top-[calc(100%+10px)] rounded-lg lg:rtl:left-0 lg:ltr:right-0 rtl:right-0 ltr:left-0 sm:w-[470px] max-h-max bg-light block justify-between flex-col left-0 sm:mt-0 mt-[7rem] overflow-y-auto overflow-x-hidden outline-none"
        >
          <div
            class="relative flex justify-between items-center shadow-sm flex-shrink-0 rounded-t-md border-b-1 border-dark/10 ps-2 py-2 dark:border-opacity-50 min-[0px]:rounded-none"
          >
            <span>{{ $t('content.selectedLocation') }}</span>
            <Icon
              v-on:click="disableSearchInput"
              name="mdi:close"
              class="w-6 me-2 h-6 text-primary object-contain cursor-pointer"
            />
          </div>

          <div class="flex flex-col justify-center items-center">
            <SharedSelectLocation
              v-model:district="district"
              v-model:city="city"
              v-model:country="country"
              v-model:hotel="hotel"
              v-model:unit="unit"
              v-model:searchInLocations="searchInLocationsDebounce"
              @disableSearchInput="disableSearchInput"
              :limits="limits"
            />
          </div>
          <!-- Modal footer -->
          <div class="flex justify-between gap-10 p-2 px-4 border-t">
            <button
              type="button"
              class="bg-secondary text-white w-full h-full rounded-lg hover:border-secondary hover:border hover:bg-white border hover:text-secondary p-1"
              v-on:click="resetLocation()"
            >
              {{ $t('filterSearch.btnReset') }}
            </button>

            <button
              type="button"
              class="bg-primary text-white w-full h-full rounded-lg hover:border-primary hover:border hover:bg-white border hover:text-primary p-1"
              v-on:click="setLoction()"
            >
              {{ $t('filterSearch.apply') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="route.path.includes('wallet/hotels')"
      class=" "
      :class="
        hotelPage
          ? 'sm:border rounded-lg  sm:col-span-3'
          : 'border-e sm:border-b-0 sm:col-span-3'
      "
    >
      <div class="col-span-8 w-full flex items-center gap-2">
        <!-- <span class="text-lg font-semibold">
          {{ $t('content.country') }} :
        </span> -->
        <!-- {{store.wallet_hotels_search}} -->
        <Listbox as="div" class="flex-1 z-30 h-[55px]" v-model="selected">
          <div class="relative w-full h-full">
            <ListboxButton
              class="relative w-full h-full rounded-md bg-white pl-3 pr-4 py-3 text-left text-gray-900 border-none focus:outline-none focus:ring-2 sm:text-sm sm:leading-6 cursor-pointer"
            >
              <span class="flex items-center">
                <span class="ml-3 block truncate" v-if="selected?.name">{{
                  selected?.name
                }}</span>
                <span class="ml-3 block truncate" v-else>يرجي اختيار الوجهه</span>
              </span>
              <span
                class="pointer-events-none absolute inset-y-0 ml-3 flex items-center pr-2"
                :class="locale === 'ar' ? 'left-0' : 'right-0'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#7E7E7E"
                    d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z"
                  />
                </svg>
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <div v-if="store.wallet_hotels_search.length == 0" class="py-2 px-3">
                  {{ $t('content.no_hotel_search') }}
                </div>
                <div v-else>
                  <ListboxOption
                    v-slot="{ active, selected }"
                    @click="
                      selected = { name: t('content.select_all_places'), type: 'all' }
                    "
                  >
                    <li
                      :class="[
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-pointer select-none py-2 px-3 flex justify-between items-center'
                      ]"
                    >
                      {{ $t('content.select_all_places') }}
                    </li>
                  </ListboxOption>
                  <ListboxOption
                    as="template"
                    v-for="place in store.wallet_hotels_search"
                    :key="place.id"
                    :value="place"
                    v-slot="{ active, selected }"
                  >
                    <li
                      :class="[
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-pointer select-none py-2 px-3 flex justify-between items-center'
                      ]"
                    >
                      <!-- {{place.name}} -->

                      <div class="flex items-center">
                        <span
                          :class="[
                            selected ? 'font-semibold' : 'font-normal',
                            'ml-3 block truncate'
                          ]"
                          >{{ place.name }}</span
                        >
                      </div>
                      <div class="text-gray-400 text-xs">
                        {{ $t('content.' + place.type) }}
                      </div>

                      <!-- <span
                      v-if="selected"
                      :class="[
                        active ? 'text-white' : 'text-indigo-600',
                        'absolute inset-y-0 right-0 flex items-center pr-4'
                      ]"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span> -->
                    </li>
                  </ListboxOption>
                </div>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
    </div>
    <div
      class="fixed -top-36 left-1/2 transform -translate-x-1/2 w-[100vw] h-[100vh] bg-white z-[1000] overflow-y-auto flex flex-col justify-stretch"
      style=""
      v-if="currentWidth <= 500 && store.activeMenu === 'selectedLocation'"
    >
      <header class="w-full bg-purple-600 text-white flex justify-end items-center p-4">
        <div class="w-full flex justify-evenly">
          <span class="text-lg font-bold">{{ $t('content.selectedLocation') }}</span>
        </div>
        <button class="mr-4" v-on:click="store.resetDataFilter('guestsAndRooms')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-left"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
      </header>
      <div class="flex flex-col flex-1 px-1">
        <div class="flex flex-row w-full ps-4 pt-2">
          <span class="flex items-start justify-start clear-start w-full font-semibold">
            {{ $t('content.where_do_you_want_to_live') }}</span
          >
        </div>
        <input
          type="text"
          class="rounded-lg peer mt-5 text-start ps-10 block h-[56px] w-full border-[1px] border-solid bg-[#e1e1e130] bg-clip-padding px-3 py-5 leading-tight text-dark transition duration-200 ease-linear placeholder:text-transparent focus:border-dark/20 focus:pb-[0.825rem] focus:pt-[1.825rem] focus:text-dark focus:outline-none peer-focus:text-dark dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-dark dark:peer-focus:text-dark [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
          id="selectedLocation"
          :placeholder="$t('content.enter_unit')"
          autofocus
          v-model="searchInLocations"
          ref="locationInput"
          @change="(e) => (searchInLocations = e.target.value.trim())"
        />

        <div class="flex flex-row justify-center items-center py-2">
          <div class="flex flex-col flex-1 pt-3">
            <SharedSelectLocation
              v-model:district="district"
              v-model:city="city"
              v-model:country="country"
              v-model:hotel="hotel"
              v-model:unit="unit"
              v-model:searchInLocations="searchInLocationsDebounce"
              :limits="limits"
            />
          </div>
        </div>
        <div class="flex flex-row justify-between gap-10 p-2 px-4 mx-3 sm:mx-0 border-t">
          <button
            type="button"
            class="bg-primary text-white w-full h-full rounded-lg hover:border-primary hover:border hover:bg-white border hover:text-primary p-1"
            v-on:click="setLoction()"
          >
            {{ $t('filterSearch.apply') }}
          </button>
        </div>
      </div>
    </div>
    <div
      class="col-span-4 w-full sm:h-[56px] relative flex items-center cursor-pointer md:border-b flex-row py-2"
      :class="hotelPage ? 'sm:col-span-4' : 'sm:col-span-5 mad:ps-2'"
    >
      <div
        class="relative w-full flex bg-primary bg-opacity-10 px-3 py-2 md:py-0 md:px-0 rounded md:bg-white justify-center items-center sm:h-[56px]"
      >
        <div
          class="flex items-center cursor-pointer w-full h-full border-[#f0f0f0]"
          v-on:click="store.activeMenu = 'check_in_out_date'"
          :class="hotelPage ? 'sm:border rounded-lg pr-3 pl-5' : 'md:border-l'"
        >
          <Icon name="mdi:calendar" class="w-8 me-2 h-8 text-primary object-contain" />
          <div
            class="flex flex-col grow w-full gap-0.5"
            v-on:click="store.activeMenu = 'check_in_out_date'"
          >
            <label
              for="check_in_out_date"
              class="text-sm md:text-md cursor-pointer text-dark/50 w-full"
            >
              {{
                hotelPage ? $t('content.check_in_out_date') : $t('content.check_in_date')
              }}
            </label>
            <div
              v-if="dateRange"
              class="w-full flex flex-col font-semibold text-dark/50 md:text-primary"
              :class="hotelPage ? 'text-primary' : 'text-dark/50'"
            >
              <div class="flex-row text-sm">
                {{
                  hotelPage
                    ? formatDate(dateRange[0]) + ' الي ' + formatDate(dateRange[1])
                    : formatDate(dateRange[0])
                }}
              </div>
            </div>
          </div>
          <Icon
            v-if="dateRange"
            name="mdi:close"
            v-on:click.stop="dateRange = null"
            class="w-6 me-1 h-6 text-primary object-contain cursor-pointer"
          />
        </div>
        <div
          :class="[
            store.activeMenu === 'check_in_out_date' ? '' : 'hidden',
            currentWidth < 640 ? 'left-1/2' : ''
          ]"
          class="sm:pt-1 sm:h-max date_select absolute p-5 z-50 shadow-xl transform translate-x-[-71%] md:translate-x-0 md:transform-none md:top-[65px] w-[95vw] rounded-lg sm:w-[690px] max-h-max bg-light flex justify-center flex-col sm:mt-0 overflow-y-auto overflow-x-hidden outline-none"
        >
          <div
            class="flex justify-between items-center shadow-sm flex-shrink-0 rounded-t-md border-b-1 border-dark/10 py-2 px-2 dark:border-opacity-50 min-[0px]:rounded-none"
          >
            <span>{{ $t('content.check_in_out_date') }}</span>
            <Icon
              @click="setRanges"
              v-on:click="store.activeMenu = ''"
              name="mdi:close"
              class="w-6 me-1 h-6 text-primary object-contain cursor-pointer"
            />
          </div>

          <!-- <div class="flex flex-col justify-center items-center pt-2">
            <span v-if="!!dateError">
              <span class="text-red-500">{{ dateError }}</span>
            </span>
          </div> -->
          <div
            class="hotels_box_date ltr:left-[-66px] flex flex-col justify-center items-center py-2 search_box_date md:relative right-[0px] w-[480px] md:w-full p-2"
          >
            <VueDatePicker
              auto-apply
              trim-weeks
              :first-day-of-week="1"
              :locale="locale"
              :day-names="locale === 'en' ? dayNamesEN : dayNamesAR"
              v-model="dateRange"
              range
              inline
              :show="['month', 'day']"
              :min-date="tomorrow"
              :max-date="max_date"
              :enable-time-picker="false"
              :multi-calendars="currentWidth > 500 ? true : false"
              @range-start="rangeStart"
              @update:model-value="handleDateRange"
              class="custom_calendar ltr:left-[-66px]"
              @close="closeDatePicker"
              ref="datePicker"
              id="datePicker"
            >
              <template #action-row="{ selectDate }">
                <div class="action-row w-full"></div>
              </template>
            </VueDatePicker>
          </div>
          <div
            class="bg-[#ab0053] text-[14px] text-white flex z-40 py-2 md:px-6 rounded-2xl cursor-pointer mx-auto mt-4 border-dark/10 items-center gap-3"
            @click="showWarn = false"
            v-if="showWarn && route.path.includes('wallet/hotels')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M12 5.99L19.53 19H4.47zM2.74 18c-.77 1.33.19 3 1.73 3h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0zM11 11v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1m0 5h2v2h-2z"
              />
            </svg>
            <div>
              {{ t('content.availbe_days', { day: route.query.available_days }) }}
            </div>
          </div>
          <div
            class="bg-[#ab0053] text-[14px] text-white flex justify-center z-40 py-2 md:px-6 rounded-full cursor-pointer mx-auto mt-4 border-dark/10 items-center gap-3"
            @click="showWarn = true"
            v-if="!showWarn && route.path.includes('wallet/hotels')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M12 5.99L19.53 19H4.47zM2.74 18c-.77 1.33.19 3 1.73 3h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0zM11 11v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1m0 5h2v2h-2z"
              />
            </svg>
          </div>
          <!-- Modal footer -->
          <!-- <div class="flex justify-between gap-10 py-2 px-4 border-t">
            <button
              type="button"
              class="bg-secondary text-white w-full sm:mx-10 h-full rounded-lg hover:border-secondary hover:border hover:bg-white border hover:text-secondary p-1"
              v-on:click="resetDateRange()"
            >
              {{ $t('filterSearch.btnReset') }}
            </button>

            <button
              type="button"
              class="bg-primary text-white w-full sm:mx-10 h-full rounded-lg hover:border-primary hover:border hover:bg-white border hover:text-primary p-1"
              @click="setRanges()"
            >
              {{ $t('filterSearch.apply') }}
            </button>
          </div> -->
        </div>
      </div>
      <div
        class="relative col-span-3 w-full flex justify-center items-center h-full"
        v-if="!hotelPage"
      >
        <div
          class="flex items-center bg-primary bg-opacity-10 ms-2 md:ms-0 px-3 py-2 md:py-0 md:px-0 rounded md:bg-white cursor-pointer p-2 w-full h-full"
          v-on:click="store.activeMenu = 'check_in_out_date'"
        >
          <Icon name="mdi:calendar" class="w-8 me-2 h-8 text-primary object-contain" />
          <div
            class="flex flex-col grow w-full gap-0.5"
            v-on:click="store.activeMenu = 'check_in_out_date'"
          >
            <label
              for="check_in_out_date"
              class="text-sm md:text-md cursor-pointer text-dark/50 w-full"
              >{{ $t('content.check_out_date') }}</label
            >
            <div
              v-if="dateRange"
              class="w-full flex flex-col text-dark/50 md:text-primary"
            >
              <div class="flex-row text-sm">
                {{ formatDate(dateRange[1]) }}
              </div>
            </div>
          </div>
          <Icon
            v-if="dateRange"
            name="mdi:close"
            v-on:click.stop="dateRange = null"
            class="w-6 me-1 h-6 text-primary object-contain cursor-pointer"
          />
        </div>
      </div>
    </div>
    <div
      class="col-span-4 w-full sm:h-full h-[56px] justify-center flex items-center"
      :class="
        hotelPage
          ? 'sm:border rounded-lg pr-3 pl-5 sm:col-span-3'
          : 'md:border-l sm:col-span-3'
      "
    >
      <div
        class="relative mt-3 bg-primary bg-opacity-10 mb-2 px-3 py-2 md:py-0 md:px-0 rounded md:bg-white col-span-3 w-full flex justify-center items-center "
      >
        <!-- mobile input -->
        <div
          class="flex items-center cursor-pointer w-full h-full"
          v-on:click="store.activeMenu = 'guestsAndRooms'"
        >
          <Icon
            :name="!!store.filter.guestsAndRoomsInput ? 'mdi:bed' : 'mdi:bed-empty'"
            class="w-8 mx-2 h-8 text-primary object-contain"
          />
          <div
            class="flex flex-col grow w-full"
            v-on:click="store.activeMenu = 'guestsAndRooms'"
          >
            <label
              v-if="!store.filter.guestsAndRoomsInput"
              for="guestsAndRooms"
              class="sm:text-md cursor-pointer text-dark/50 w-full ms-1"
              >{{ $t('content.guestsAndRooms') }}</label
            >

            <input
              v-if="!!store.filter.guestsAndRoomsInput"
              id="guestsAndRooms"
              readonly
              type="text"
              v-model="store.filter.guestsAndRoomsInput"
              class="w-full py-1 bg-[transparent] outline-none focus:outline-none focus:ring-0 border-transparent focus:border-transparent text-dark/70"
            />
          </div>
          <Icon
            v-if="!!store.filter.guestsAndRoomsInput"
            name="mdi:close"
            v-on:click.stop="store.resetDataFilter('guestsAndRooms')"
            class="w-6 me-2 h-6 text-primary object-contain cursor-pointer"
          />
        </div>

        <div
          v-if="currentWidth > 500"
          :class="store.activeMenu == 'guestsAndRooms' ? '' : 'hidden'"
          class="fixed drop-shadow-2xl sm:pt-1 sm:h-max top-0 w-full sm:absolute z-50 shadow-lg sm:top-[calc(100%+10px)] min-h-[200px] md:min-w-[350px] md:w-[350px] rtl:left-0 ltr:right-0 sm:w-[400px] max-h-max bg-light flex justify-between flex-col left-0 sm:mt-0 mt-24 overflow-y-auto overflow-x-hidden outline-none"
        >
          <!-- <div
            class="flex justify-between items-center shadow-sm flex-shrink-0 rounded-t-md border-b-1 border-dark/10 ps-2 py-2 dark:border-opacity-50 min-[0px]:rounded-none"
          >
            <span>{{ $t('content.guestsAndRooms') }}</span>
            <Icon
              v-on:click="store.activeMenu = ''"
              name="mdi:close"
              class="w-6 me-2 h-6 text-primary object-contain cursor-pointer"
            />
          </div> -->

          <div class="flex flex-col justify-center items-center py-3">
            <!-- <FilterRooms></FilterRooms> -->
            <FilterRooms2></FilterRooms2>
          </div>
          <!-- Modal footer -->
          <div class="flex justify-end gap-2 p-2 px-4 ">
            <!-- <button
              type="button"
              class="bg-secondary text-white w-full h-full rounded-lg hover:border-secondary hover:border hover:bg-white border hover:text-secondary p-1"
              v-on:click="store.resetDataFilter('guestsAndRooms')"
            >
              {{ $t('filterSearch.btnReset') }}
            </button> -->
            <button
              type="button"
              class="flex flex-row w-fit h-full rounded-lg hover:border-primary hover:border hover:bg-white border hover:text-primary p-1"
              v-on:click="store.activeMenu = ''"
            >
              {{ $t('content.cancel') }}
            </button>
            <button
              type="button"
              class="bg-primary flex flex-row text-white w-fit h-full rounded-lg hover:border-primary hover:border hover:bg-white border hover:text-primary p-1"
              v-on:click="store.handleSearch(t)"
            >
              {{ $t('filterSearch.apply') }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path
                  d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="currentWidth <= 500 && store.activeMenu === 'guestsAndRooms'"
      class="fixed -top-36 left-1/2 transform -translate-x-1/2 w-[100vw] h-[100vh] bg-white z-[1000] overflow-y-auto flex flex-col justify-stretch"
    >
      <header class="w-full bg-purple-600 text-white flex justify-end items-center p-4">
        <div class="w-full flex justify-evenly">
          <h2 class="text-lg font-bold">{{ $t('content.guestsAndRooms') }}</h2>
        </div>

        <button class="mr-4" v-on:click="store.resetDataFilter('guestsAndRooms')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-left"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
      </header>
      <div class="px-10">
        <!-- Rooms Filter Component -->
        <div class="flex flex-row justify-center items-center py-2">
          <div class="flex flex-col">
            <FilterRooms2 />
          </div>
        </div>
        <!-- Buttons Row -->
        <div class="flex flex-row justify-between gap-10 p-2 px-4 border-t">
          <button
            type="button"
            class="bg-secondary text-white w-full h-full rounded-lg hover:border-secondary hover:border hover:bg-white border hover:text-secondary p-1"
            v-on:click="store.resetDataFilter('guestsAndRooms')"
          >
            {{ $t('content.cancel') }}
          </button>

          <button
            type="button"
            class="bg-primary text-white w-full h-full rounded-lg hover:border-primary hover:border hover:bg-white border hover:text-primary p-1"
            v-on:click="store.handleSearch(t)"
          >
            {{ $t('filterSearch.apply') }}
          </button>
        </div>
      </div>
    </div>

    <div
      class="col-span-4 w-full justify-center flex items-center"
      v-if="(!store.activeMenu && currentWidth <= 500) || (currentWidth > 500 && true)"
      :class="hotelPage ? 'md:h-[56px] sm:col-span-2' : 'md:h-[65px] sm:col-span-1'"
    >
      <button
        class="bg-primary text-white w-full h-full mt-2 md:mt-0 py-2 md:py-0 text-lg hover:text-xl"
        :class="hotelPage ? 'rounded-xl' : 'md:rounded-e-lg rounded-b-lg rounded-t-lg'"
        @click="handleSearch"
      >
        {{ $t('content.search') }}
      </button>
    </div>
  </div>
</template>

<style>
  /* Slide up animation */
  /* Slide up animation */
  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  /* Transition for sliding up */
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 0.4s ease;
  }

  .slide-up-enter,
  .slide-up-leave-to {
    transform: translateY(100%);
  }

  .fullscreen-modal {
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
    font-size: 12px;
    margin-inline-end: 12px;
  }
  @media (max-width: 900px) {
    .dp__outer_menu_wrap {
      position: relative !important;
      width: 100%;
    }
    .dp__main .dp__theme_light {
      right: -35px;
    }
    .cities_box_selection {
      position: relative;
      background: #fff;
      z-index: 999;
    }
  }
  @media (max-width: 768px) {
    .date_select {
      -webkit-width: 95vw;
      -webkit-height: 95vh;
      -webkit-position: fixed;
      -webkit-top: -206px !important;
    }
    .rtl\:right-0:where([dir='rtl'], [dir='rtl'] *) {
      right: 0px;
    }
  }
  .dp__btn.dp__month_year_select {
  }
  .hotels_box_date .dp__month_year_wrap button:last-child {
    display: none;
    pointer-events: none;
  }
  textarea:focus,
  input:focus {
    outline: none !important;
  }
</style>
