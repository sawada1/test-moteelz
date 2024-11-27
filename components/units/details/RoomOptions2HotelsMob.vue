<template>
  <div class="w-full">
    <!-- المغلق -->
    <div @click="toggleOpen" class="flex justify-between items-center cursor-pointer bg-[#F9F8FF] border p-[12px_20px] hover:bg-[#f9f8ffab] transition duration-300">
      <div class="text-lg flex flex-col">
        <span v-if="!isOpen" class="text-[#191721] text-[12px]">ابتداء من</span>
        <span v-if="!isOpen" class="font-bold text-[20px] text-[#191721]">
          {{
            Number(availableOptions.ratePlans[0].totalAmountAfterTaxRate - availableOptions.ratePlans[0].offer_discount).toLocaleString(undefined, {
              maximumFractionDigits: 0
            })
          }}
          {{ $t('content.' + `${availableOptions.ratePlans[0].currency}`) }}
        </span>
      </div>
      <div class="flex gap-[5px] items-center">
        <span class="text-[14px] font-bold text-[#765BEB]">{{ isOpen ? 'اخفاء الخيارات' : 'عرض الخيارات' }}</span>
        <div class="w-[22px] h-[22px] bg-[#765BEB] rounded-full flex justify-center items-center">
          <i class="fa-solid fa-chevron-down text-[white] text-[14px] mt-[2px] transition-all ease-in-out delay-150 duration-300" :class="{ 'rotate-180': isOpen, 'rotate-0': !isOpen }"></i>
        </div>
      </div>
    </div>
    <!-- المفتوح -->
    <transition name="fade">
      <div v-if="isOpen" class=" bg-[#fefefe] p-4 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-4">
          <div class="text-[13px] font-semibold text-[#765BEB]">خطط الأسعار</div>
          <button @click="toggleOpen" class="text-blue-500 hover:underline"></button>
        </div>
        <div class="text-[17px] font-semibold mb-4 text-[#191721]">حدد الغرفة المناسبة لك</div>
        <div v-for="(opt, index) in availableOptions.ratePlans" :key="index" class="mb-4 p-4 rounded-lg border-2 cursor-pointer transition duration-300 hover:border-[#765BEB]" :class="{ 'border-[#765BEB]': selectedOption === opt.id }" @click="selectOption(opt.id)">
          <label class="flex items-center relative">
            <div class="ml-4 w-full">
              <div class="flex justify-between items-center">
                <div class="text-[15px] font-semibold text-[#191721] flex gap-[10px]">
                  <input type="radio" :value="opt.id" v-model="selectedOption" class="form-radio text-[#765BEB] h-5 w-5">
                  <span>{{ opt.name }}</span>
                </div>
                <div class="text-[16px] font-semibold text-[#765BEB]">
                  {{

                    Number(opt.totalAmountAfterTaxRate - opt.offer_discount).toLocaleString(undefined, {
                      maximumFractionDigits: 0
                    })
                  }}
                  {{ $t('content.' + `${opt.currency}`) }}
                </div>
              </div>
              <div class="text-[12px] text-[#191721] mr-[30px] flex justify-between items-center" :class="{ 'pb-[10px] border-b': selectedOption === opt.id }">
                <span>{{ opt.subtitle }}</span>
                <span>
                  الإجمالي لـ {{ opt.count_days }} ليلة (شاملاً الضريبة)
                </span>
              </div>
              <div v-if="selectedOption === opt.id && showDetails === opt.id" class="mt-2">
                <ul class="border-e px-4 relative ps-4 list-[auto] list-inside mt-[20px]">
                  <li v-for="(feature, index) in opt.features" :key="index" :class="feature.type === 'free_cancel' ? 'list-none text-[#3CA62F]' : ''">
                    <Icon name="mdi:check-circle" v-if="feature.type === 'free_cancel'" class="w-4 h-4 ms-[-5px] me-2" />
                    {{ feature.title }}
                  </li>

                  <div class="flex flex-wrap md:flex-col items-start">
                    <div class="text-primary  cursor-pointer font-bold" @click="handleClick(opt)">
                    اعرف المزيد
                    </div>
                  </div>

                  <div class="bg-[#EB9A5B] text-white py-[5px] rounded md:text-[10px] text-[10px] absolute top-2 end-2 px-4" v-if="opt.best_price">
                    {{ $t('content.best_price') }}
                  </div>
                </ul>
                <div class="bg-[#AB00530A] w-full px-[10px] py-[10px] mt-[30px] flex justify-between items-center">
                  <div class="text-[12px] text-[#191721] grid gap-[5px]">
                    <div class="text-[16px] font-semibold text-[#765BEB]">
                      {{

                        Number(opt.totalAmountAfterTaxRate - opt.offer_discount).toLocaleString(undefined, {
                          maximumFractionDigits: 0
                        })
                      }}
                      {{ $t('content.' + `${opt.currency}`) }}
                    </div>
                    <span>
                      الإجمالي لـ {{ opt.count_days }} ليلة (شاملاً الضريبة)
                    </span>
                  </div>
                  <button class="bg-primary px-2 text-[12px] py-2 rounded-md text-white font-bold w-full border hover:bg-white" :class="calculatePrice < 1
                  ? 'cursor-not-allowed hover:border-gray-600 hover:text-gray-600'
                  : 'hover:border-primary hover:text-primary'
                  " :disabled="calculatePrice < 1" @click="confirmBooking(availableOptions.id, opt.id)">
                  {{ $t('content.confirm_booking') }}
              </button>                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { watch } from 'vue'
import { useFilterUnits } from '~/stores/filter'
import { useBookings } from '~/stores/booking'

const storeFilter = useFilterUnits()
const storeBooking = useBookings()
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

const isOpen = ref(false);
const selectedOption = ref(null);
const showDetails = ref(null);


const options = [
  { id: 1, price: 'SAR 8,800', title: 'إقامة فقط', subtitle: 'غير مستردة', description: 'غير مستردة\nإقامة فقط\n1 غرفة، 1 بالغين، 1 أطفال، 30 ليلة\nأقل سعر!' },
  { id: 2, price: 'SAR 9,200', title: 'إقامة فقط', subtitle: 'إلغاء مجاني', description: 'إلغاء مجاني\n1 غرفة، 1 بالغين، 1 أطفال، 30 ليلة' },
  { id: 3, price: 'SAR 9,900', title: 'إقامة + إفطار', subtitle: 'غير مستردة', description: 'إقامة + إفطار\nغير مستردة\n1 غرفة، 1 بالغين، 1 أطفال، 30 ليلة' },
];

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (id) => {
  console.log('name')
  showDetails.value = showDetails.value === id ? null : id;
  selectedOption.value = id;
};

const completeBooking = () => {
  alert('حجز تم!');
};

const emit = defineEmits([
    'update:bookingDataSelected',
    'update:roomsSelections',
    'confirmBooking',
    'planCancelClick'
])
console.log(props)

const confirmBooking = (id, y) => {

    storeBooking.bookings.reateSelected = id
    storeBooking.bookings.reateSelected2 = y

    roomsSelections.value.forEach((item) => {
        if (item.id == id) {
            item.room_count = storeFilter.filter.room_count
            item.rooms = storeFilter.filter.rooms
        }
    })

    emit('confirmBooking')
}

const calculatePrice = computed({
    get() {
        const ids = []
        // if (roomsSelections.value.length) {
        //     roomsSelections.value.forEach((item) => {
        //         if (item.rooms) {
        //             ids.push(item.id)
        //         }
        //     })
        // }
        const selectedOpts = ids.includes(props.availableOptions)
        // selectedOpts.forEach((item) => {
        //     roomsSelections.value.forEach((room) => {
        //         if (item.id === room.id && room.rooms != null) {
        //             item.rooms_amount = Number(room.rooms)
        //         }
        //     })
        // })
        let total = 0
        if (selectedOpts.length) {
            total = selectedOpts.reduce((acc, currentVal) => {
                return acc + Number(currentVal.rooms_amount * Number(currentVal.price?.amount))
            }, 0)
        }
        total = 10

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


const handleClick = (opt) => {

  emit('planCancelClick', opt)
}


</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

input:checked+div {
  border-color: #6b46c1;
  /* Purple-500 */
}

input:checked+div label {
  border-color: #6b46c1;
  /* Purple-500 */
}
</style>
