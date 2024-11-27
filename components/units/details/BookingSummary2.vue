<script setup lang="ts">
  import '@vuepic/vue-datepicker/dist/main.css'
  import { ModalsContainer } from 'vue-final-modal'
  import { type Unit } from '~/stores/units'

  import { useDateUtilities } from '~/composables/utilities/useDateUtilities'
  import BookPaymentCard from '~/components/card/BookPaymentCard.vue'
  import BookByPackage from '~/components/card/BookByPackage.vue'
  import BookPaymentBank from '~/components/card/BookPaymentBank.vue'
  import { useUnits } from '~/stores/units'
  import { useFilterUnits } from '~/stores/filter'
  import { useSettings } from '~/stores/settings'
  import { useBookings } from '~/stores/booking'
  const route = useRoute()

  const { t, locale } = useI18n()
  const storeBooking = useBookings()
  const storeFilter = useFilterUnits()
  const storeSettings = useSettings()
  const filterPackageId = useCookie('filterPackageId')
  const dateRange = ref(null)
  const mainTotalRooms = ref(0)
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
  const store = useUnits()

  useListen('otp', async (user) => {
    otpCheck.value = true
  })

  const props = defineProps<{
    unit: Object
    guestsData: any[]
    bookingData: any[]
    availableOptions: any[]
    days: Number
    children: Number
    adults: Number
    couponValue: null | String
  }>()

  const emit = defineEmits(['update:guestsData'])

  const guestsData = computed({
    get() {
      return props.guestsData
    },
    set(value) {
      emit('update:guestsData', value)
    }
  })

  const rangePickerModel = ref([tomorow(), datAfter14Days(null)])

  const otpCheck = ref(false)
  const errorInputDate = ref(false)
  const availablePaymentTypes = computed(() => [
    { val: 'paid_total_price', name: t('content.pay_booking_price') }
  ])

  const availablePaymentMethods = computed(() => [
    { val: 'payment_methods', name: t('content.online_payment') }
  ])
  const payload = ref({
    unit_id: props.unit?.id,
    name: null,
    mobile: null,
    mobile_code: '',
    payment_type: availablePaymentTypes.value[0]?.val,
    payment_method: availablePaymentMethods.value[0]?.val,
    email: null,
    rent_type: '',
    check_in: tomorow(),
    check_out: datAfter14Days(tomorow()),
    num_of_people: 1,
    bedrooms: props.unit?.bedrooms,
    days: 1,
    months: 1,
    years: 1
  })

  onMounted(() => {
    if (props.unit?.prices?.length) {
      payload.value.rent_type = props.unit.prices[0].code
    }
    rangePickerModel.value = [tomorow(), datAfter14Days(tomorow())]

    // storeFilter.getFilterStorage()

    const startDate = parseFilterDate(
      storeBooking.bookings.dateStart ?? '',
      tomorow().toString()
    )
    const endDate = parseFilterDate(
      storeBooking.bookings.dateEnd ?? '',
      new Date(startDate.getDate()).setMonth(startDate.getMonth() + 1).toString()
    )
    // check if invalid date
    if (isValidDate(startDate)) rangePickerModel.value[0] = startDate

    if (isValidDate(endDate)) rangePickerModel.value[1] = endDate

    store.coupon = {} as Coupon
    if (storeBooking.bookings.dateStart || storeBooking.bookings.dateEnd) {
      rangePickerModel.value[0] = storeBooking.bookings.dateStart
      rangePickerModel.value[1] = storeBooking.bookings.dateEnd
      payload.value.check_in = rangePickerModel.value[0]
      payload.value.check_out = rangePickerModel.value[1]
    } else {
      payload.value.check_in = rangePickerModel.value[0]
      payload.value.check_out = rangePickerModel.value[1]
    }
    // payload.value.num_of_people = storeFilter.filter.capacity
    // payload.value.bedrooms = storeFilter.filter.bedrooms
    allTotalBooking.value = 0
    allTotalBooking.value = allTotalBookingFN()
    dateChange()
  })

  // prices related

  const totalPersentOffer = computed(() => {
    if (!props.unit) return 0

    return props.unit.offers.reduce((acc, cur) => {
      if (cur.discount_type.id == 1 /* % */) {
        acc += cur.discount_value
      }

      return acc
    }, 0)
  })

  const totalPriceOffer = computed(() => {
    if (!props.unit) return 0

    return props.unit.offers.reduce((acc, cur) => {
      if (cur.discount_type.id == 2 /* $ */) {
        acc += cur.discount_value
      }
      return acc
    }, 0)
  })

  const totalOffer = (t: any): number => {
    const totalPrice = Number(t)
    // const totalPercentOffer = Number(totalPersentOffer.value)
    // const totalPriceOfferValue = Number(totalPriceOffer.value)

    // const total = totalPrice * (totalPercentOffer / 100) + totalPriceOfferValue
    const total = totalPrice

    return Math.round(total)
  }

  const totalCoupon = (t: number): number => {
    let type = store.coupon?.discount_type
    if (!type) return 0

    const discountValue = Number(type.id === 1 ? store.coupon.discount_value : 0)
    const fixedValue = Number(
      (t * discountValue) / 100 + (type.id === 2 ? discountValue : 0)
    )
    return Math.round(fixedValue)
  }

  function value_added_tax(t: number, v: number): number {
    const taxAmount = t * (v / 100)
    return parseFloat(taxAmount.toFixed(2))
  }

  const calculatePrice = (price: number, rentType: string) => {
    if (!price) return 0
    switch (rentType) {
      case 'day':
        return price
      case 'month':
        return price
      case 'year':
        return price / 365
      default:
        return price
    }
  }
  const sub_total = (total: number): number => {
    return total - totalCoupon(total) - totalOffer(total)
  }

  const municipalTaxAmount = computed<Number>(() => {
    const taxRate = props.unit.hotel.municipal_ration

    const taxAmount = value_added_tax(
      props.unit?.ratePlan?.totalAmountAfterTaxRate,
      taxRate
    )
    return parseFloat(taxAmount.toFixed(0))
  })
  const currency = computed(() => t(`content.${props.unit?.ratePlans[0]?.currency}`))
  const currency_code = computed(() => props.unit?.ratePlans[0]?.currency)
  const vatRate = computed(() => props.unit.hotel.value_added_tax)
  const municipalRate = computed(() => props.unit.hotel.municipal_ration)
  const subTotalBeforeVat = computed(() => {
    const subtotal = sub_total(mainTotalRooms.value)
    const municipalTaxAmount = value_added_tax(subtotal, municipalRate.value)
    return Number(subtotal) + Number(municipalTaxAmount)
  })
  const vatAmount = computed(() => {
    // return value_added_tax(subTotalBeforeVat.value, vatRate.value).toFixed(0)
    return value_added_tax(
      props.unit?.ratePlan?.totalAmountAfterTaxRate,
      vatRate.value
    ).toFixed(0)
  })
  const grandTotal = computed(() => {
    const totalBeforeVat =
      Number(sub_total(mainTotalRooms.value)) + Number(municipalTaxAmount.value)
    return (totalBeforeVat + Number(vatAmount.value)).toFixed(0)
  })
  const unitPrices = computed(() => {
    return (
      props.unit.prices?.find((p) => p.code === payload.value.rent_type) ?? {
        price: 0,
        old_price: 0,
        price_with_tax: 0
      }
    )
  })
  const price = computed(() => {
    const rentType = payload.value.rent_type
    const unitPrice = unitPrices.value.price
    const total = calculatePrice(unitPrice, rentType)
    return Number(total.toFixed(0))
  })

  const oldPrice = computed(() => {
    const rentType = payload.value.rent_type
    const unitOldPrice = unitPrices.value.old_price
    const total = calculatePrice(unitOldPrice, rentType)
    return Number(total.toFixed(0))
  })

  const priceWithTax = computed(() => {
    const rentType = payload.value.rent_type
    const priceWithTax = unitPrices.value.price_with_tax
    const total = calculatePrice(priceWithTax, rentType)
    return Number(total.toFixed(0))
  })

  const total = computed<number>(() => {
    const calculatedTotal = price.value
    return calculatedTotal
    // the following code is not need anymore becouse
    // the price calculation is done for each day
    // if (payload.value.rent_type === 'day') {
    //   return calculatedTotal
    // } else if (payload.value.rent_type === 'month') {
    //   return calculatedTotal * 30
    // } else {
    //   return calculatedTotal * 365
    // }
  })

  const canPay = computed(() => {
    return (
      payload.value.rent_type != null &&
      payload.value.check_in != null &&
      payload.value.payment_type != null &&
      payload.value.payment_method != null &&
      (payload.value.payment_type == 'month'
        ? payload.value.months > 0
        : payload.value.days > 0)
    )
  })

  function payedAmount(t: number) {
    if (payload.value.payment_type == 'free_inspection') return 0
    else if (payload.value.payment_type == 'pay_in_arrive') return 0
    else if (payload.value.payment_type == 'paid_total_price') return t
    else if (payload.value.payment_type == 'book_inspection_appointment')
      return props.unit.pay_commission_amount
    else if (payload.value.payment_type == 'pay_percent')
      return t * (props.unit.pay_percent_value / 100)
    return t
  }

  function nameOfPrice() {
    var t1,
      t2 = ''
    t1 = payload.value.days < 3 ? ' ' : payload.value.days.toString()
    switch (payload.value.days) {
      case 1:
        t2 = t('content.one_day')
        break
      case 2:
        t2 = t('content.two_days')
        break
      default:
        t2 = t('content.days')
    }

    return t1.concat(' ' + t2)
  }

  // date related
  const handleDateSelection = () => {
    const startDate = rangePickerModel.value[0]
    const endDate = rangePickerModel.value[1]

    payload.value.check_in = startDate
    payload.value.check_out = endDate

    const diffInDays = differenceInDays(endDate, startDate)
    // change 14 day constrain
    // errorInputDate.value = !(Number(filterPackageId.value) > 0 || diffInDays >= 14)
    errorInputDate.value = !(Number(filterPackageId.value) > 0 || diffInDays > 0)
    dateError.value = ''
    if (!errorInputDate.value) {
      dateChange()
      showDateRange.value = false
    } else {
      if (storeBooking.bookings.dateStart || storeBooking.bookings.dateEnd) {
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

  const showDateRange = ref(false)
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
  const handleDateRange = (val: Date[]) => {
    rangePickerModel.value = [val[0], val[1]]
    handleDateSelection()
  }
  const dateStartStr = computed(() => {
    return formatDate(payload.value.check_in)
  })
  const dateEndStr = computed(() => {
    return formatDate(payload.value.check_out)
  })

  const currentWidth = ref(window.innerWidth)
  const isMob = ref(false)

  watch(currentWidth, (newVal, oldVal) => {
    if (newVal && newVal > 500) {
      isMob.value = false
    }

    if (newVal && newVal <= 500) {
      isMob.value = true
    }
  })
  const updateWidth = () => {
    currentWidth.value = window.innerWidth
    if (window.innerWidth > 500) {
      isMob.value = false
    }

    if (window.innerWidth <= 500) {
      isMob.value = true
    }
  }
  onMounted(() => {
    updateWidth()
    nextTick(() => {
      window.addEventListener('resize', updateWidth)
    })
  })

  const getCurrentOpt = (id: any) => {
    const option = props.availableOptions.find((item) => item.id === id)
    return option
  }

  const getRoomsCountForPlan = (planId: any) => {
    let count = 0
    const rooms = props.bookingData.find((item) => item.id === planId)
    if (rooms.room_count) {
      count = Number(rooms.room_count)
    }
    return count
  }

  const getRatePlanForPlan = (planId: any) => {
    let plan = {}
    const plans = props.unit.ratePlans.find((item: any) => item.id === planId)
    plan = plans && plans
    return plan
  }

  const allTotalBooking = ref(0)
  const offerDiscountBooking = ref(0)
  const allTotalBookingFN = () => {
    allTotalBooking.value = 0
    offerDiscountBooking.value = 0
    const bookingOpts = props.bookingData

    var total = 0
    var mainTotal = 0
    var minus = 0

    offerDiscountBooking
    bookingOpts
      .filter((item) => item.rooms || item.count)
      .forEach((bookItem) => {
        const curr: any = getRatePlanForPlan(bookItem.id)
        // const count: any = getRoomsCountForPlan(bookItem.id)
        minus += Number(curr?.offer_discount ? curr?.offer_discount : 0)
        mainTotal += Number(
          curr?.totalAmountAfterTaxRate -
            (curr?.offer_discount ? curr?.offer_discount : 0)
        )
      })

    total += mainTotal

    offerDiscountBooking.value = minus

    return total
  }

  const newMunicipalTaxAmount = computed<Number>(() => {
    const taxRate = props.unit.hotel.municipal_ration

    let totalAmount = 0
    props.bookingData.forEach((item) => {
      const curr: any = getRatePlanForPlan(item.id)
      const count: any = getRoomsCountForPlan(item.id)
      totalAmount += Number(curr?.totalAmountBeforeTaxRate * count)
    })
    let taxAmount = (totalAmount * taxRate) / 100
    return taxAmount
  })

  const newVatAmount = computed(() => {
    const vatRate = props.unit.hotel.value_added_tax

    let totalAmount = 0
    props.bookingData.forEach((item) => {
      const curr: any = getRatePlanForPlan(item.id)
      const count: any = getRoomsCountForPlan(item.id)
      totalAmount += Number(curr?.totalAmountBeforeTaxRate * count)
    })
    let vatAmount = (totalAmount * vatRate) / 100
    return vatAmount
  })
  const taxes = computed(() => {
    let totalAmountAfterTax = 0
    let totalAmountBeforeTax = 0
    props.bookingData.forEach((item) => {
      const curr: any = getRatePlanForPlan(item.id)
      totalAmountBeforeTax += Number(curr?.totalAmountBeforeTaxRate)
    })

    props.bookingData.forEach((item) => {
      const curr: any = getRatePlanForPlan(item.id)
      totalAmountAfterTax += Number(curr?.totalAmountAfterTaxRate)
    })
    let vatAmount = totalAmountAfterTax - totalAmountBeforeTax
    return vatAmount
  })

  const ratePlans = computed(() => {
    let arr = []
    arr = [...props.bookingData.filter((item) => item.rooms || item.count)]
    return arr
  })

  watch(props.unit, (newVal, oldVal) => {}, { deep: true, immediate: true })
</script>

<template>
  <div>
    <ModalsContainer />
    <div
      class="box flex flex-col justify-center items-center"
      v-if="!route.query.packageId"
    >
      <div class="w-full">
        <div class="text-xl font-bold text-primary_dark">
          {{ $t('content.amount_details') }}
        </div>

        <div
          v-if="
            filterPackageId > 0 &&
            storeSettings.setting?.packages_filter_show_price == false
          "
        ></div>

        <div v-else>
          <div
            v-for="bookItem in bookingData"
            v-show="Number(bookItem.room_count) > 0"
            :key="bookItem.id"
            class="border-dashed rounded-md flex flex-row w-full items-center justify-between mb-3"
          >
            <div class="flex gap-x-2 text-secondary-700">
              <span class="text-md">
                {{ days }} {{ $t('labels.night') }}
                -
                {{ bookItem.room_count }} X {{ getCurrentOpt(bookItem.id)?.title }} -
                {{ getCurrentOpt(bookItem.id).features[0].title }}
              </span>
            </div>
            <span>
              {{
                Number(
                  getRatePlanForPlan(bookItem.id).totalAmountBeforeTaxRate
                ).toLocaleString(undefined, {
                  maximumFractionDigits: 0
                })
              }}

              <span>{{ currency }}</span>
            </span>
          </div>

          <!-- <div class="flex justify-between my-3" v-if="offerDiscountBooking > 0">
          <span class="text-secondary-700">{{ $t('content.offers_discount') }}</span>

          <span class="text-[#AD0033]">
            {{
              offerDiscountBooking.toLocaleString(undefined, {
                maximumFractionDigits: 0
              })
            }}
            {{ currency }}</span
          >
        </div> -->

          <div class="flex justify-between my-3">
            <span class="text-secondary-700"
              >{{ unit?.ratePlans[0]?.count_days }} {{ $t('labels.night') }}</span
            >
            <span>
              {{ unit?.ratePlans[0]?.totalAmountBeforeTaxRate }}
              {{ currency }}</span
            >
          </div>

          <div
            class="flex justify-between my-3"
            v-if="unit?.ratePlans[0]?.offer_discount"
          >
            <span class="text-secondary-700">{{ $t('content.offers_discount') }}</span>

            <span class="text-[#AD0033]">
              {{
                unit?.ratePlans[0]?.offer_discount.toLocaleString(undefined, {
                  maximumFractionDigits: 0
                })
              }}
              {{ currency }}</span
            >
          </div>

          <div
            class="flex justify-between my-3"
            v-if="unit?.ratePlans[0]?.coupon_discount"
          >
            <span class="text-secondary-700">{{ $t('content.coupon_for_you') }}</span>

            <span class="text-[#AD0033]">
              {{
                unit?.ratePlans[0]?.coupon_discount.toLocaleString(undefined, {
                  maximumFractionDigits: 0
                })
              }}
              {{ currency }}</span
            >
          </div>

          <div
            class="flex justify-between my-3"
            v-if="unit.ratePlans[0]?.total_taxes > 0"
          >
            <span class="text-secondary-700">{{ $t('content.taxes_all') }}</span>
            <span>
              {{ unit.ratePlans[0]?.total_taxes }}
              {{ currency }}</span
            >
          </div>

          <div class="flex justify-between my-3 pt-2">
            <p class="md:text-lg text-[16px]">{{ $t('content.total') }}</p>
            <p class="md:text-lg text-[16px]">
              {{ unit.ratePlans[0]?.totalAmountAfterTaxRate }}
              {{ currency }}
            </p>
          </div>
          <!-- <div>
          <button
            class="w-full text-center p-4 text-light bg-primary hover:bg-primary/90 rounded-md text-xs md:text-[15px] font-bold cursor-pointer transition ease-in duration-300"
          >
            {{ $t('content.continue_payment') }}
          </button>
        </div> -->
        </div>
      </div>
    </div>
    <book-payment-card
      :newbook="{
        ...payload,
        ratePlans: unit.ratePlan,
        children: props.children,
        currency: currency_code,
        adults: props.adults
      }"
      :amount="total"
      :unit="unit"
      :couponValue="couponValue"
    ></book-payment-card>
  </div>
</template>

<style>
  .vc-header {
    direction: ltr;
  }

  .dp__input,
  .dp__input {
    padding: 8px 3px 6px 12px !important;
  }

  /* :disabled {
    background: white;
  } */
</style>
