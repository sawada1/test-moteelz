
<template>
    <div class="hidden md:flex w-full gap-[20px] md:p-[30px] bg-[#F9F8FF]">
        <table v-if="!loading" class="w-full">
            <thead class="bg-[#F9F8FF] text-black ">
                <tr>
                    <th class=" text-start py-4">
                        {{ $t('content.price_plans') }}
                    </th>
                    <th class=" text-start py-4">
                        {{ $t('content.rooms_guests') }}
                    </th>
                    <th class=" text-start py-4" v-if="!filterPackageId">
                        {{ $t('content.total_price') }}
                    </th>
                </tr>
            </thead>
            <tbody class="bg-[#fff] rounded-lg border border-[#D1D1D1] rounded-lg overflow-hidden">
                <tr v-for="(opt, index) in availableOptions.ratePlans" :key="index" class="p-[20px_0] border-b border-[#eee]">
                    <td class="border-e px-4 py-[40px] relative min-w-[200px]">
                        <span class="text-[12px] md:text-[20px] font-bold text-[#44424D] mb-[20px] block">{{ opt.name }}</span>
                        <div class="bg-[#EB9A5B] text-white py-[5px] rounded md:text-xs text-[10px] absolute top-2 end-2 px-4" v-if="opt.best_price">
                            {{ $t('content.best_price') }}
                        </div>
                        <ul class="ps-4 list-[auto] list-inside text-[12px] md:text-[16px] text-[#44424D]">
                            <li v-for="(feature, index) in opt.features" :key="index" :class="feature.type === 'free_cancel' ? 'list-none text-[#3CA62F]' : ''">
                                <Icon name="mdi:check-circle" v-if="feature.type === 'free_cancel'" class="w-4 h-4 ms-[-5px] me-2" />
                                {{ feature.title }}
                            </li>
                        </ul>

                        <div class="flex flex-wrap md:flex-col items-start">
                            <div class="text-primary  cursor-pointer font-bold" @click="handleClick(opt)">
                            إعرف المزيد
                            </div>

                        </div>


                    </td>

                    <td class="border-e min-w-[110px]">
                        <div class="flex flex-col items-start justify-start px-4 py-[40px] relative min-w-[200px] ">
                            <span class="text-[#44424D] text-[17px] font-[400]">
                                {{ opt.rooms_count }} {{ $t('content.rooms') }}
                            </span>
                            <span class=" text-[#44424D] text-[17px] font-[400]">

                                {{ opt.adults }} {{ $t('content.adults') }} ,
                                {{ opt.childes }} {{ $t('content.children') }}
                            </span>
                        </div>
                    </td>
                    <td class="border-e min-w-[170px] p-[20px_0]" v-if="!filterPackageId">
                        <span class="flex items-start ps-3 flex-col justify-start min-w-[180px]">
                            <p v-if="storeFilter.filter.includeTaxes" class="text-[11px] md:text-[13px] text-[#838383] text-end md:text-start font-bold mb-[20px]">{{ $t('hotels.tax_text', { days: hotel?.count_days || 0 }) }}</p>
                            <p v-if=" !storeFilter.filter.includeTaxes" class="text-[11px] md:text-[13px] text-[#838383] text-end md:text-start font-bold mb-[20px]">{{ $t('hotels.tax_text2', { days: hotel?.count_days || 0 }) }}</p>
                            <span class="flex items-center justify-center text-[24px] font-bold my-[10px] block text-[#44424D]">

                                <!-- {{
                                    Number(
                                        opt.price.amount *
                                        (storeFilter.filter.room_count ? storeFilter.filter.room_count : 1)
                                    ).toLocaleString(undefined, {
                                        maximumFractionDigits: 0
                                    })
                                }} -->

                                {{

                                    Number(opt.totalAmountAfterTaxRate - opt.offer_discount).toLocaleString(undefined, {
                                        maximumFractionDigits: 0
                                    })
                                }}
                                {{ $t('content.' + `${opt?.currency}`) }}
                            </span>

                        </span>
                        <span class="flex items-start ps-3 flex-col justify-center min-w-[250px]">
                            <div class="flex-row w-full pe-3 mt-4">
                                <button class="bg-primary px-4 py-2 rounded-md text-white font-bold w-full border hover:bg-white" :class="calculatePrice < 1
                                    ? 'cursor-not-allowed hover:border-gray-600 hover:text-gray-600'
                                    : 'hover:border-primary hover:text-primary'
                                    " :disabled="calculatePrice < 1" @click="confirmBooking(availableOptions.id, opt.id)">
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
                        <div class="w-1/4 h-6 bg-white mx-3 animate-pulse rounded-md" v-for="i in 5" :key="i"></div>
                    </div>
                    <!-- Table Body Skeleton -->
                    <div class="divide-y divide-primary/10">
                        <div class="h-[91px] flex items-center justify-center" v-for="j in 3" :key="j">
                            <div class="w-1/4 h-6 bg-primary/10 mx-7 animate-pulse rounded-md" v-for="x in 5" :key="x"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import { watch } from 'vue'
import { useFilterUnits } from '~/stores/filter'
import { useBookings } from '~/stores/booking'
const route = useRoute()

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
    unit: Object,
    hotel: Object,
})
console.log(props.availableOptions)
const copiedAvailableOptions = ref([])
onMounted(() => {
    // copiedAvailableOptions.value = [...props.availableOptions]


})
watch(
    () => props.pricesFilter,
    (newVal, oldVal) => {
        if (newVal) {
            // const currentOpts = [...props.availableOptions]
            const { adult_count, child_count, check_in, check_out } = newVal
        }
    },
    { deep: true }
)
const emit = defineEmits([
    'update:bookingDataSelected',
    'update:roomsSelections',
    'confirmBooking',
    'planCancelClick'
])
console.log(props)

const confirmBooking = (id, y) => {

    storeBooking.bookings.reateSelected = y
    storeBooking.bookings.reateSelected2 = id

    console.log("id >>>", id)
    console.log("OOOO", y)
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
