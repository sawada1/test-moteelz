<template>
  <div
    class="w-full flex flex-row justify-between items-center gap-x-2 select-none cursor-pointer py-2"
    :class="route.path.includes('wallet/hotels') ? 'mt-16' : ''"
  >
    <div
      class="shadow rounded-md bg-white flex items-center w-full"
      @click="mainModalToggle"
    >
      <div class="grid grid-cols-6 gap-2 w-full h-full">
        <div class="col-span-1 flex items-center ps-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#875FFF"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="m17 17l4 4M3 11a8 8 0 1 0 16 0a8 8 0 0 0-16 0"
            />
          </svg>
        </div>
        <div class="relative col-span-5 flex gap-2 flex-col justify-center p-2">
          <div
            class="py-1 pl-3 flex justify-between items-center"
            :style="`font-size: ${selectLocation.hotel ? '12px' : '16px'};line-height: ${
              selectLocation.hotel ? '1.2' : '1.5'
            }`"
            v-if="
              !route.path.includes('wallet/hotels') &&
              !route.path.includes('wallet/hotels') &&
              (selectLocation.country ||
                selectLocation.city ||
                selectLocation.district ||
                selectLocation.hotel)
            "
          >
            <!-- <span v-if="unit">
              {{ unit.title }}
            </span> -->
            <span>
              <!-- {{ selectLocation.country?.name ? selectLocation.country?.name + '-' : '' }} -->
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
              {{ selectLocation.hotel?.name ? '- ' + selectLocation.hotel?.name : '' }}
            </span>
          </div>
          <div v-else class="py-1 pl-3 flex justify-between items-center">
            {{ selected.name }}
          </div>
          <div
            v-if="errorLocation"
            class="bg-[#d4111e] rounded-[4px] text-[#fff] text-[12px] px-[8px] py-[4px] absolute ltr:left-[-30px] rtl:right-[-30px] top-[135%] after:w-[0] after:h-[0] after:border-r-[5px] after:border-r-[transparent] after:border-l-[5px] after:border-l-[transparent] after:border-b-[5px] after:border-b-[#d4111e] after:absolute after:bottom-full after:ltr:left-[30px] after:rtl:right-[30px]"
          >
            {{ $t('errors.error_location') }}
          </div>

          <div class="flex flex-row items-center text-sm text-dark/60">
            <svg
              v-if="dateRange?.length > 0"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#999"
                d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v4.675q0 .425-.288.713t-.712.287t-.712-.288t-.288-.712V10H5v10h5.8q.425 0 .713.288T11.8 21t-.288.713T10.8 22zm13 1q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23m.5-5.2v-2.3q0-.2-.15-.35T18 15t-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.525 1.525q.15.15.35.15t.35-.15t.15-.35t-.15-.35z"
              />
            </svg>
            <span v-if="dateRange?.length > 0" class="mr-1">
              {{
                new Date(dateRange[0]).toLocaleDateString('en-US', {
                  day: 'numeric'
                }) + ' '
              }}
            </span>
            <span v-if="dateRange?.length > 0" class="mr-1">
              {{
                new Date(dateRange[0]).toLocaleDateString('en-US', {
                  month: 'short'
                })
              }}
            </span>
            <svg
              v-if="dateRange?.length > 0"
              class="mr-3 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#999"
                d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v4.675q0 .425-.288.713t-.712.287t-.712-.288t-.288-.712V10H5v10h5.8q.425 0 .713.288T11.8 21t-.288.713T10.8 22zm13 1q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23m.5-5.2v-2.3q0-.2-.15-.35T18 15t-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.525 1.525q.15.15.35.15t.35-.15t.15-.35t-.15-.35z"
              />
            </svg>
            <span v-if="dateRange?.length > 0">
              {{
                new Date(dateRange[1]).toLocaleDateString('en-US', {
                  day: 'numeric'
                }) + ' '
              }}
            </span>
            <span v-if="dateRange?.length > 0">
              {{
                new Date(dateRange[1]).toLocaleDateString('en-US', {
                  month: 'short'
                })
              }}
            </span>
            <!-- <Icon
            name="mdi:user"
            class="-8 h-8 p-3 text-primary bg-white rounded-full border shadow"
            /> -->
            <NuxtImg src="/icons/user_search.svg" class="mr-3 ml-1" />
            <span class="text-[70%]">
              {{ store.filter.guestsAndRoomsInput }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Main Modal of search filter -->
  <MobileModal v-model="mainModalFlag" class="max-h-[100%] overflow-auto">
    <div class="flex flex-row w-full">
      <div class="flex flex-col w-full gap-y-3 h-fll overflow-y-scroll">
        <div v-if="!route.path.includes('wallet/hotels')">
          <div
            class="flex flex-row border shadow rounded-lg w-full min-h-[355px] max-h-[355px] items-start overflow-y-scroll"
            v-show="store.expandedSection === 'location'"
          >
            <div class="flex flex-col justify-center items-center w-full">
              <div class="flex flex-row w-full ps-4 pt-2">
                <span
                  class="flex items-start justify-start clear-start w-full font-semibold"
                >
                  {{ $t('content.where_do_you_want_to_live') }}</span
                >
              </div>
              <div class="relative w-full px-3 mt-4 mb-2">
                <Icon
                  name="mdi:search"
                  class="text-dark/50 w-8 h-8 absolute top-3 start-[.85rem]"
                />

                <input
                  type="text"
                  class="rounded-lg peer m-0 text-start ps-10 block h-[56px] w-full border-[1px] border-solid bg-[#e1e1e130] bg-clip-padding px-3 py-5 leading-tight text-dark transition duration-200 ease-linear placeholder:text-green focus:border-dark/20 focus:pb-[0.825rem] focus:pt-[1.825rem] focus:text-dark focus:outline-none peer-focus:text-dark dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-dark dark:peer-focus:text-dark [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                  id="selectedLocation"
                  placeholder=""
                  autofocus
                  v-model="searchInLocations"
                  @change="(e) => (searchInLocations = e.target.value.trim())"
                  required
                />
                <label
                  for="selectedLocation"
                  class="pointer-events-none absolute ps-11 ltr:left-0 rtl:right-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-400 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[1rem] peer-focus:scale-[0.85] peer-focus:text-dark/80 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[1rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-dark"
                >
                  {{ $t('content.selectedLocation') }}
                </label>
              </div>
              <div class="w-full flex items-center justify-center">
                <SharedSelectLocation
                  v-model:district="district"
                  v-model:city="city"
                  v-model:country="country"
                  v-model:unit="unit"
                  v-model:searchInLocations="searchInLocations"
                  @disableSearchInput="disableSearchInput"
                />
              </div>
            </div>
          </div>
          <div
            class="flex flex-row border shadow rounded-lg p-2 items-center"
            @click="expandSection('location')"
            v-show="store.expandedSection !== 'location'"
          >
            <Icon name="mdi:location" class="w-8 me-2 h-8 text-dark/50 object-contain" />
            <div class="flex flex-col grow w-full">
              <label
                for="select_destination"
                class="md:text-md cursor-pointer text-dark/50 w-full"
                v-if="country || city"
              >
                <!-- {{country}} -->
                <!-- {{ country && country.country_name }}
                {{ country && country.country_name && city && city.city_name ? '-' : '' }}
                {{ city && city.city_name }} -->
                {{ country?.name ? country?.name : '' }}
                {{ city?.name ? '- ' + city?.name : '' }}
                {{ district?.name ? '- ' + district?.name : '' }}
                {{ hotel?.name ? '- ' + hotel?.name : '' }}
              </label>
              <label
                for="select_destination"
                class="md:text-md cursor-pointer text-dark/50 w-full"
                v-else
              >
                {{ $t('content.select_destination') }}
              </label>
              <!-- <div v-if="dateRange" class="w-full flex flex-col text-dark/70">
                <div class="flex-row text-sm">
                  {{ formatDate(dateRange[0]) }} - {{ formatDate(dateRange[1]) }}
                </div>
              </div> -->
            </div>
            <Icon
              v-if="country || city"
              name="mdi:close"
              v-on:click.stop="resetLocation()"
              class="w-6 me-1 h-6 text-dark/60 object-contain cursor-pointer"
            />
          </div>
        </div>
        <div
          v-else
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
          class="flex flex-row rounded-lg w-full relative right-6 justify-center items-center"
          v-show="store.expandedSection === 'date'"
        >
          <div class="flex flex-col">
            <div class="flex flex-row justify-center items-center pt-2">
              <span v-if="!!dateError">
                <span class="text-red-500">{{ dateError }}</span>
              </span>
            </div>
            <VueDatePicker
              auto-apply
              trim-weeks
              :first-day-of-week="1"
              :locale="locale"
              :day-names="locale === 'en' ? dayNamesEN : dayNamesAR"
              v-model="dateRange"
              range
              inline
              :min-date="tomorow()"
              :max-date="max_date"
              :enable-time-picker="false"
              @update:model-value="handleDateRange"
              class="mobile_custom_calendar custom_calendar scale-x-90"
              menu-class-name="w-full"
              :multi-calendars="false"
              @range-start="rangeStart"
              @close="closeDatePicker"
            >
              <template #action-row="{ selectDate }">
                <div class="action-row w-full"></div>
              </template>
            </VueDatePicker>
          </div>
        </div>
        <div
          class="flex flex-row border shadow rounded-lg p-2 items-center"
          @click="expandSection('date')"
          v-show="store.expandedSection !== 'date'"
        >
          <Icon name="mdi:calendar" class="w-8 me-2 h-8 text-dark/50 object-contain" />
          <div class="flex flex-col grow w-full">
            <label
              v-if="!dateRange"
              for="check_in_out_date"
              class="md:text-md cursor-pointer text-dark/50 w-full"
              >{{ $t('content.check_in_out_date') }}</label
            >
            <div v-else class="w-full flex flex-col text-dark/70">
              <div class="flex-row text-sm">
                {{ formatDate(dateRange[0]) }} - {{ formatDate(dateRange[1]) }}
              </div>
            </div>
          </div>
          <Icon
            v-if="dateRange"
            name="mdi:close"
            v-on:click.stop="dateRange = null"
            class="w-6 me-1 h-6 text-dark/60 object-contain cursor-pointer"
          />
        </div>
        <div
          class="flex flex-row rounded-lg w-full p-2 border shadow justify-center items-center"
          v-show="store.expandedSection === 'guests'"
        >
          <div class="flex flex-col">
            <!-- <FilterRooms></FilterRooms> -->
            <FilterRooms2></FilterRooms2>
          </div>
        </div>
        <div
          class="flex flex-row border shadow rounded-lg p-2 items-center mb-28"
          @click="expandSection('guests')"
          v-show="store.expandedSection !== 'guests'"
        >
          <Icon name="mdi:bed-empty" class="w-8 me-2 h-8 text-dark/50 object-contain" />
          <div class="flex flex-col grow w-full">
            <label
              for="guestsAndRooms"
              class="md:text-md cursor-pointer text-dark/50 w-full ms-1 text-sm"
              >{{ $t('content.guestsAndRooms') }}</label
            >
            <input
              id="guestsAndRooms"
              readonly
              type="text"
              v-model="guestsAndRoomsInput"
              class="w-full text-sm bg-[transparent] focus:outline-none text-dark/70 ps-1"
            />
          </div>
          <Icon
            v-if="!!store.filter.guestsAndRoomsInput"
            name="mdi:close"
            v-on:click.stop="store.resetDataFilter('guestsAndRooms')"
            class="w-6 me-1 h-6 text-dark/60 object-contain cursor-pointer"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col w-full gap-[20px] absolute bottom-0 p-[10px_20px] bg-white">
      <div
        class="bg-[#ab0053] text-[14px] text-white flex z-40 py-2 md:px-6 px-4 rounded-2xl cursor-pointer mx-auto mt-4 border-dark/10 items-center gap-3"
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
          {{
            route.query.available_days > 1
              ? t('content.availbe_days', { day: route.query.available_days })
              : route.query.available_days === 0
              ? t('content.no_days')
              : t('content.availbe_day', { day: route.query.available_days })
          }}
        </div>
      </div>
      <div
        class="bg-[#ab0053] text-[14px] text-white flex justify-center z-40 py-2 md:px-6 px-[24px] rounded-full cursor-pointer mx-auto mt-4 border-dark/10 items-center gap-3"
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
      <div class="flex flex-col items-center w-full">
        <div class="flex flex-row justify-between mt-2 w-full">
          <div class="flex">
            <button class="text-dark/90 text-[14px]" @click="resetFilter()">
              {{ $t('content.reset_all') }}
            </button>
          </div>
          <div class="flex">
            <button
              class="text-white bg-primary p-[5px_50px] rounded-md disabled:pointer-events-none disabled:opacity-50"
              @click="searchAll()"
              :disabled="!store.check_dates_availabe"
            >
              {{ $t('content.search') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </MobileModal>

  <!-- Secondary Modal of search filter -->
  <Modal v-model="secondModelFlag" class="pt-20 mx-[-20px]" :title="''" icon="mdi:tune">
    <div class="flex flex-row w-full h-screen px-4">
      <div class="flex flex-col w-full h-[80%] overflow-y-scroll">
        <fillter />
      </div>
    </div>
    <div class="flex flex-row w-full absolute bottom-0 p-[10px_20px] bg-white">
      <div class="flex flex-col items-center w-full">
        <div class="flex flex-row justify-between mt-2 w-full">
          <div class="flex">
            <button
              class="text-dark/90 text-[14px]"
              @click="resetFilter(), (secondModelFlag = !secondModelFlag)"
            >
              {{ $t('content.reset_all') }}
            </button>
          </div>
          <div class="flex">
            <button
              class="text-white bg-primary p-[5px_50px] rounded-md disabled:pointer-events-none disabled:opacity-50"
              @click="secondModelFlag = !secondModelFlag"
              :disabled="!store.check_dates_availabe"
            >
              {{ $t('content.search') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
  import { format } from 'date-fns'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import { useDateUtilities } from '~/composables/utilities/useDateUtilities'
  import Modal from './Modal.vue'
  import fillter from '../Fillter.vue'
  import { useFilterUnits } from '~/stores/filter'
  import { useStaticData } from '~/stores/staticData'
  import { Icon } from '@iconify/vue'
  import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions
  } from '@headlessui/vue'
  import MobileModal from './mobile-modal.vue'

  const route = useRoute()
  const store = useFilterUnits()
  const staticData = useStaticData()
  const { selectLocation, fromSearchSection } = storeToRefs(useFilterUnits())

  const { dayNamesAR, dayNamesEN, tomorow, differenceInDays, datAfter14Days } =
    useDateUtilities()
  const city = ref(null)
  const unit = ref(null)
  const district = ref(null)
  const hotel = ref(null)
  const country = ref(null)
  const searchInLocations = ref('')
  const dateRange = ref(null)
  const mainModalFlag = ref(false)
  const secondModelFlag = ref(false)
  const expandedSection = ref('location')
  const filteredTypes = ref([])
  const filteredFeatures = ref([])
  const selectedPriceRange = ref([1000, 4000])
  const guestsRooms = ref({ bedrooms: 1, beds: 1, persons: 1, bathrooms: 1 })
  const taxFlag = ref(false)
  const priceRange = ref({ from: 0, to: 10000 })
  const { t, locale } = useI18n()
  const dateError = ref(null)
  const errorLocation = ref(false)
  const localePath = useLocalePath()
  const setRanges = () => {
    if (dateRange.value) {
      const diffInDays = differenceInDays(dateRange.value[0], dateRange.value[1])
      // change 14 day constrain
      if (diffInDays > 0) {
        // if (diffInDays >= 14) {
        dateError.value = ''
      } else {
        dateRange.value = [dateRange.value[0], datAfter14Days(dateRange.value[0])]
        dateError.value = ''
      }
    } else {
      dateError.value = ''
    }
  }

  watch(expandedSection, (newVal, oldVal) => {
    if (newVal) {
      store.expandedSection = newVal
      expandedSection.value = store.expandedSection
      setRanges()
    }
  })
  const handleDateRange = (val) => {
    handleDateSelection(val)
  }
  const handleDateSelection = (val) => {
    const diffInDays = differenceInDays(val[0], val[1])
    dateError.value = ''
    expandSection('guests')
    // change 14 day constrain
    if (diffInDays > 0) {
      // if (diffInDays >= 14) {
      dateError.value = null
    } else {
      dateError.value = t('filterSearch.errorSelectDatePicker')
    }
  }
  const formatDate2 = (date) => {
    return format(date, 'yyyy-MM-dd')
  }
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
  const setLoction = () => {
    store.filter.city_id = city.value && city.value.city_id
    store.filter.country_id = country.value && country.value.country_id
    store.filter.unit = unit.value
    store.filter.district = district.value
    store.filter.hotel = hotel.value

    store.activeMenu = ''
  }
  const startDate = new Date()
  startDate.setDate(startDate.getDate() + 2)
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 2)
  const { checkIn, checkOut, room_count, adult_count, child_count, available_days } =
    route.query
  const checkDate = () => {
    store.filter.dateStartStr = new Date(checkIn)
    store.filter.dateEndStr = new Date(checkOut)
    dateRange.value = [new Date(checkIn), new Date(checkOut)]
  }
  onMounted(() => {
    if (route.path.includes('/dashboard/wallet/units')) {
      resetLocation()
    }
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
    store.activeMenu = ''
    if (staticData.countries.length === 0) {
      staticData.getCountries()
    }
    if (staticData.cities.length === 0) {
      staticData.getCities().then(() => {})
    }
    if (store.filter.filterAssets?.length === 0) {
      store.getFilterAssets()
    }
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
      dateRange.value = [store.filter.dateStartStr, store.filter.dateEndStr]
    }
    setLoction()
  })
  const formatDate = (date) => {
    return format(date, 'yyyy/MM/dd')
  }
  const mainModalToggle = () => {
    errorLocation.value = false
    mainModalFlag.value = !mainModalFlag.value
    expandSection('location')
  }

  const secondModalToggle = () => {
    secondModelFlag.value = !secondModelFlag.value
  }
  const expandSection = (section) => {
    store.expandedSection = section
    expandedSection.value = store.expandedSection
  }
  const resetLocation = () => {
    city.value = null
    unit.value = null
    country.value = null
    district.value = null
    store.filter.city_id = null
    store.filter.country_id = null
    store.filter.unit = null
    store.filter.district = null
    searchInLocations.value = ''
  }

  const resetFilter = () => {
    expandSection('location')
    resetLocation()
    dateRange.value = null
    store.resetDataFilter('guestsAndRooms')
  }
  const router = useRouter()
  const searchAll = () => {
    setLoction()
    setRanges()
    mainModalFlag.value && mainModalToggle()
    expandSection('location')
    store.current_units = []

    if (unit.value) {
      store.filter.city_id = null
      store.filter.district = null
      store.filter.country_id = null
      store.filter.unit = unit.value
    }
    if (hotel.value) {
      store.filter.hotel = hotel.value.id
      store.filter.unit = null
    } else if (district.value) {
      store.filter.district = district.value
      store.filter.unit = null
    } else if (city.value) {
      store.filter.city_id = city.value.city_id
      store.filter.unit = null
    } else if (country.value) {
      store.filter.country_id = country.value.country_id
      store.filter.unit = null
    }
    if (dateRange.value && dateRange.value[0] && dateRange.value[1]) {
      store.filter.dateStartStr = dateRange.value[0]
      store.filter.dateEndStr = dateRange.value[1]
    }
    // if (!dateRange.value) {
    //   store.filter.dateStartStr = ''
    //   store.filter.dateEndStr = ''
    // }
    if (
      (route.path.includes('hotels') || route.path.includes('/')) &&
      route.path.includes('offers') == false &&
      (city.value ||
        country.value ||
        store.filter.adult_count ||
        store.selected_hotel_search?.type)
    ) {
      store.isLoadingFirst = true
      store.units = []
      store.scrollPaginate = 0
      store.filter.dateStartStr = dateRange.value[0]
      store.filter.dateEndStr = dateRange.value[1]
      if (!route.path.includes('wallet/hotels')) {
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
      } else {
        localePath({
          path: `${route.path}`,
          query: {
            to_date: route.query.to_date,
            packageId: route.query.packageId,
            checkIn: formatDate2(new Date(dateRange.value[0])),
            checkOut: formatDate2(new Date(dateRange.value[1]))
          }
        })
      }
      // store.getUnitsByFilterDate()
      store.getUnitsByFilterDate(false, true, true)

      route.path.includes('/hotels/') ? (store.filter.packages = '') : null
    } else {
      errorLocation.value = true
      // navigateTo(localePath('/units'))
    }
  }

  onMounted(() => {
    filteredTypes.value = store.filter.unitTypes
    filteredFeatures.value = store.filter.features
    guestsRooms.value.bedrooms = store.filter.bedrooms
    guestsRooms.value.persons = store.filter.capacity
  })
  const resetSecondFilter = () => {
    filteredTypes.value = []
    taxFlag.value = false
    selectedPriceRange.value = [1000, 4000]
    guestsRooms.value = { bedrooms: 1, beds: 1, persons: 1, bathrooms: 1 }
    filteredFeatures.value = []
  }

  const searchAllWithSecondFilter = () => {
    store.filter.unitTypes = filteredTypes.value
    store.filter.features = filteredFeatures.value
    store.filter.bedrooms = guestsRooms.value.bedrooms
    store.filter.capacity = guestsRooms.value.persons

    secondModalToggle()
    searchAll()
  }

  const guestsAndRoomsInput = computed(() => {
    let text = ''
    if (store.filter.capacity > 0) {
      text = store.filter.capacity + ' ' + t('content.guests') + ' '
    } else {
      store.filter.capacity = 1
      text = '1 ' + t('content.guests')
    }

    if (store.filter.bedrooms > 0) {
      text = text + ' , ' + store.filter.bedrooms + ' ' + t('content.rooms')
    } else {
      store.filter.bedrooms = 1
      text = text + '  1 ' + t('content.rooms')
    }

    store.filter.guestsAndRoomsInput = text
    return text
  })
  const showLabel = ref(true)

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
  onMounted(() => {
    getMaxDate()
  })
  const selected = ref({})
  watch(
    () => selected.value,
    (val) => {
      store.selected_hotel_search = val
      if (val?.type == 'city') {
        city.value = val
      } else if (val?.type === 'country') {
        country.value = val
      }
    }
  )
  const isUpdate = ref(false)
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
      }
    }
  )
</script>

<style scoped>
  .mobile_custom_calendar .dp__menu_inner::before {
    height: 0px;
  }
  .dp__month_year_wrap button:last-child {
    display: none;
    pointer-events: none;
  }
  .mobile_custom_calendar .dp__instance_calendar .dp__menu_inner {
    width: 100%;
  }
  .mobile_custom_calendar .dp__instance_calendar {
    padding-inline: -10px;
    margin: auto;
    widows: 100%;
  }

  .mobile_custom_calendar {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile_custom_calendar .dp_menu.dprelative.dp_theme_light {
    border: 0px solid black !important;
    width: 100%;
  }

  .mobile_custom_calendar .dp__menu_inner {
    margin-top: -15px;
    margin-bottom: -15px;
    border: 1px solid #e1e1e1;
    width: 346px !important;
    border-radius: 10px;
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),
      0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
      var(--tw-shadow);
  }

  .mobile_custom_calendar .dp__calendar {
    padding-inline: 4px;
  }

  .mobile_custom_calendar .dp__range_start,
  .dp__range_end {
    background: #755cf1;
    border-color: #755cf1;
    width: 100%;
    font-weight: bold;
  }

  .mobile_custom_calendar .dp__range_between {
    background: #755cf120;
    width: 100%;
  }

  .mobile_custom_calendar .dp__calendar_header_item {
    font-size: 13px;
    margin-inline-end: 13px;
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
