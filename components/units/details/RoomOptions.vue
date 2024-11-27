<template>
  <div class="w-full md:flex hidden border !rounded-lg !overflow-hidden">
    <table v-if="!loading" class="w-full border-collapse">
      <thead class="bg-[#EDEAFD] text-black">
        <tr>
          <th class="border border-dark/5 px-4 py-2">
            {{ $t('content.price_plans') }}
          </th>
          <th class="border border-dark/5 px-4 py-2">{{ $t('content.features') }}</th>
          <th class="border border-dark/5 px-4 py-2">{{ $t('labels.rooms_count') }}</th>
          <th class="border border-dark/5 px-4 py-2" v-if="!filterPackageId">
            {{ $t('content.monthly_price') }}
          </th>
          <th class="border border-dark/5 px-4 py-2"></th>
        </tr>
      </thead>
      <tbody class="bg-primary/5">
        <tr v-for="(opt, index) in availableOptions" :key="index">
          <td class="border-e px-4 py-2 relative min-w-[150px]">
            <span class="font-bold">{{ opt.title }}</span>
            <div
              class="bg-[#3CA62F] text-white py-[2px] rounded md:text-xs text-[10px] absolute top-2 end-2 px-2"
              v-if="opt.best_price"
            >
              {{ $t('content.best_price') }}
            </div>
          </td>
          <td class="border-e px-4 py-2 min-w-[180px]">
            <ul class="ps-2 list-disc list-inside text-sm md:text-base">
              <li
                v-for="(feature, index) in opt.features"
                :key="index"
                :class="feature.type === 'free_cancel' ? 'list-none text-[#3CA62F]' : ''"
              >
                <Icon
                  name="mdi:check-circle"
                  v-if="feature.type === 'free_cancel'"
                  class="w-4 h-4 ms-[-5px] me-2"
                />
                {{ feature.title }}
              </li>
            </ul>
          </td>
          <td class="border-e min-w-[110px]">
            <div class="flex flex-col items-center justify-center py-5">
              <select
                class="bg-white border rounded outline-none w-[40%] font-medium text-center cursor-pointer"
                v-model="roomsSelections[index].rooms"
              >
                <option selected :value="null">0</option>
                <option
                  v-for="room in opt.rooms_count"
                  :key="room"
                  class="text-sm md:text-base"
                >
                  {{ room }}
                </option>
              </select>
              <span class="s text-orange-400 text-sm">
                {{ $t('content.remained') }}
                {{ opt.rooms_count - roomsSelections[index].rooms }}
                {{ $t('content.rooms') }}
              </span>
            </div>
          </td>
          <td class="border-e min-w-[170px]" v-if="!filterPackageId">
            <span class="flex items-center justify-center">
              {{
                Number(
                  opt.price.amount *
                    (roomsSelections[index].rooms ? roomsSelections[index].rooms : 1)
                ).toLocaleString(undefined, {
                  maximumFractionDigits: 0
                })
              }}
              {{ $t('content.' + `${opt.price.currency}`) }}
            </span>
          </td>
          <td rowspan="2" colspan="1" class="py-4">
            <span
              class="flex items-start ps-3 flex-col justify-center min-w-[180px]"
              v-if="index < 1"
            >
              <span class="text-primary flex-row">
                {{
                  roomsSelections.reduce((acc, currentVal) => {
                    return acc + Number(currentVal.rooms)
                  }, 0)
                }}
                {{ $t('content.rooms') }}
                {{ !!filterPackageId ? '' : $t('content.with_price') }}
              </span>
              <span class="flex-row text-lg font-bold" v-if="!filterPackageId">
                {{
                  calculatePrice.toLocaleString(undefined, {
                    maximumFractionDigits: 0
                  })
                }}

                {{ $t('content.' + `${opt.price.currency}`) }}
              </span>
              <div class="flex-row w-full pe-3 mt-4">
                <button
                  class="bg-primary px-4 py-2 rounded-md text-white font-bold w-full border hover:bg-white"
                  :class="
                    calculatePrice < 1
                      ? 'cursor-not-allowed hover:border-gray-600 hover:text-gray-600'
                      : 'hover:border-primary hover:text-primary'
                  "
                  :disabled="calculatePrice < 1"
                  @click="confirmBooking"
                >
                  {{ $t('content.confirm_booking') }}
                </button>
              </div>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex flex-row w-full" v-else>
      <div class="w-full">
        <!-- Table Skeleton -->
        <div class="border border-primary/20 rounded-md overflow-hidden mb-4">
          <!-- Table Header Skeleton -->
          <div class="bg-primary/10 flex h-[41px] items-center justify-between p-2">
            <div
              class="w-1/4 h-6 bg-white mx-3 animate-pulse rounded-md"
              v-for="i in 5"
              :key="i"
            ></div>
          </div>
          <!-- Table Body Skeleton -->
          <div class="divide-y divide-primary/10">
            <div
              class="h-[91px] flex items-center justify-center"
              v-for="j in 3"
              :key="j"
            >
              <div
                class="w-1/4 h-6 bg-primary/10 mx-7 animate-pulse rounded-md"
                v-for="x in 5"
                :key="x"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full md:hidden flex mx-2">
    <div class="flex flex-col w-full gap-y-2" v-if="!loading">
      <div
        class="bg-primary/5 px-2 w-full flex-row flex rounded-md overflow-hidden border"
        v-for="(opt, index) in availableOptions"
        :key="index"
      >
        <div class="w-[60%] relative py-2">
          <span class="font-bold flex flex-row">{{ opt.title }}</span>
          <span class="flex flex-row my-4">
            <ul class="ps-2 list-disc list-inside text-sm md:text-base">
              <li
                v-for="(feature, index) in opt.features"
                :key="index"
                :class="feature.type === 'free_cancel' ? 'list-none text-[#3CA62F]' : ''"
              >
                <Icon
                  name="mdi:check-circle"
                  v-if="feature.type === 'free_cancel'"
                  class="w-4 h-4 ms-[-5px] me-2"
                />
                {{ feature.title }}
              </li>
            </ul>
          </span>
          <span
            class="flex flex-row items-center justify-center text-primary"
            v-if="!filterPackageId"
          >
            {{
              Number(
                opt.price.amount *
                  (roomsSelections[index].rooms ? roomsSelections[index].rooms : 1)
              ).toLocaleString(undefined, {
                maximumFractionDigits: 0
              })
            }}
            {{ $t('content.' + `${opt.price.currency}`) }}
          </span>
          <div
            class="bg-[#3CA62F] text-white py-[2px] rounded md:text-xs text-[10px] absolute top-2 end-2 px-2"
            v-if="opt.best_price"
          >
            {{ $t('content.best_price') }}
          </div>
        </div>
        <div class="flex border-s w-[40%] ps-2 py-2 items-center justify-center">
          <div class="flex flex-col items-center justify-center w-full">
            <select
              class="bg-white border w-[75%] rounded outline-none font-medium text-center cursor-pointer"
              v-model="roomsSelections[index].rooms"
            >
              <option selected :value="null">0</option>
              <option
                v-for="room in opt.rooms_count"
                :key="room"
                class="text-sm md:text-base"
              >
                {{ room }}
              </option>
            </select>
            <span class="text-orange-400 text-sm">
              {{ $t('content.remained') }}
              {{ opt.rooms_count - roomsSelections[index].rooms }}
              {{ $t('content.rooms') }}
            </span>
          </div>
        </div>
      </div>
      <div
        class="bg-primary/5 px-2 w-full flex-col items-center justify-center py-4 flex rounded-md overflow-hidden border"
      >
        <div class="flex-row flex w-full justify-center">
          <div class="w-[50%] flex justify-end me-3">
             <NuxtImg :src="img" class="rounded-md md:h-[120px] h-[80px] w-[70%]" />
          </div>
          <div class="w-[50%] flex flex-col">
            <span class="text-primary flex-row">
              {{
                roomsSelections.reduce((acc, currentVal) => {
                  return acc + Number(currentVal.rooms)
                }, 0)
              }}
              {{ $t('content.rooms') }}
              {{ !!filterPackageId ? '' : $t('content.with_price') }}
            </span>

            <span class="flex-row text-lg font-bold" v-if="!filterPackageId">
              {{
                calculatePrice.toLocaleString(undefined, {
                  maximumFractionDigits: 0
                })
              }}

              {{ $t('content.' + `${availableOptions[0]?.price?.currency}`) }}
            </span>
          </div>
        </div>

        <button
          class="bg-primary mt-3 px-4 py-1 rounded-md text-white font-bold w-full border hover:bg-white"
          :class="
            calculatePrice < 1
              ? 'cursor-not-allowed hover:border-gray-600 hover:text-gray-600'
              : 'hover:border-primary hover:text-primary'
          "
          :disabled="calculatePrice < 1"
          @click="confirmBooking"
        >
          {{ $t('content.confirm_booking') }}
        </button>
      </div>
    </div>
    <div class="flex flex-col w-full gap-y-2" v-else>
      <div class="w-full flex flex-col border rounded-md border-primary/20">
        <div
          class="h-24 rounded-md border mx-4 my-2 bg-primary/5 border-primary/10 animate-pulse"
          v-for="i in 4"
          :key="i"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
const props = defineProps({
  bookingDataSelected: Object,
  availableOptions: Array,
  roomFeatures: Object,
  img: String,
  roomName: String,
  roomsSelections: Array,
  loading: Boolean,
  filterPackageId: String | null | undefined,
  pricesFilter: Object,
  unit: Object
})
const copiedAvailableOptions = ref([])
onMounted(() => {
  copiedAvailableOptions.value = [...props.availableOptions]
})
watch(
  () => props.pricesFilter,
  (newVal, oldVal) => {
    if (newVal) {
      const currentOpts = [...props.availableOptions]
      const { adult_count, child_count, check_in, check_out } = newVal
    }
  },
  { deep: true }
)
const emit = defineEmits([
  'update:bookingDataSelected',
  'update:roomsSelections',
  'confirmBooking'
])

const confirmBooking = () => {
  emit('confirmBooking')
}

const calculatePrice = computed({
  get() {
    const ids = []
    if (roomsSelections.value.length) {
      roomsSelections.value.forEach((item) => {
        if (item.rooms) {
          ids.push(item.id)
        }
      })
    }
    const selectedOpts = props.availableOptions.filter((opt) => ids.includes(opt.id))
    selectedOpts.forEach((item) => {
      roomsSelections.value.forEach((room) => {
        if (item.id === room.id && room.rooms != null) {
          item.rooms_amount = Number(room.rooms)
        }
      })
    })
    let total = 0
    if (selectedOpts.length) {
      total = selectedOpts.reduce((acc, currentVal) => {
        return acc + Number(currentVal.rooms_amount * Number(currentVal.price?.amount))
      }, 0)
    }
    return total
  }
})

const bookingDataSelected = computed({
  get() {
    return props.bookingDataSelected
  },
  set(value) {
    emit('update:bookingDataSelected', value)
  }
})

const roomsSelections = computed({
  get() {
    return props.roomsSelections
  },
  set(value) {
    emit('update:roomsSelections', value)
  }
})
</script>