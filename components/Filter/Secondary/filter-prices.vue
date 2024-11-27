<template>
  <div class="flex w-full overflow-hidden">
    <div class="flex flex-col w-full">
      <div class="flex flex-row">
        <span class="mb-1 font-bold md:text-lg text-sm">
          {{ $t('content.price_range') }} :
        </span>
      </div>
      <div class="flex flex-row w-full pt-1">
        <div class="border rounded-lg p-2 shadow">
          <label class="inline-flex items-center cursor-pointer">
            <span
              class="me-3 md:text-[16px] text-[14px] font-medium text-gray-900 dark:text-gray-300"
            >
              {{ $t('content.view_price_before_tax') }}
            </span>
            <input type="checkbox" value="" class="sr-only peer" v-model="taxFlag" />
            <div
              class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
            ></div>
          </label>
        </div>

        <!-- {{ props.taxFlag }} -->
        <!-- {{ props.priceRange }} -->
      </div>
      <div class="pt-7 px-6 md:px-20">
        <Slider
          v-model="selectedPriceRange"
          direction="rtl"
          class="slider-primary my-4"
          :min="priceRange.from"
          :max="priceRange.to"
          :step="2"
        />
      </div>
      <div
        class="flex flex-row w-full items-center md:justify-center justify-between gap-x-2"
      >
        <div class="flex flex-col">
          <div class="relative w-full">
            <input
              type="number"
              class="text-sm text-dark/70 rounded-lg peer m-0 text-start block md:h-[56px] h-[45px] w-full border-[1px] border-solid bg-[#e1e1e130] bg-clip-padding px-3 py-5 leading-tight text-dark transition duration-200 ease-linear placeholder:text-transparent focus:border-dark/20 focus:pb-[0.825rem] focus:pt-[1.825rem] focus:text-dark focus:outline-none peer-focus:text-dark dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-dark dark:peer-focus:text-dark [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
              id="minValue"
              placeholder=""
              autofocus
              v-model="selectedPriceRange[0]"
              required
            />
            <label
              for="minValue"
              class="pointer-events-none absolute ltr:left-0 rtl:right-0 top-0 origin-[0_0] border border-solid border-transparent p-3 text-neutral-400 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[1rem] peer-focus:scale-[0.85] peer-focus:text-dark/80 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[1rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-dark"
            >
              {{ $t('content.minValue') }}
            </label>
          </div>
        </div>
        <div class="text-dark/30 font-bold">-</div>

        <div class="flex flex-col">
          <div class="relative w-full">
            <input
              type="number"
              class="text-sm text-dark/70 rounded-lg peer m-0 text-start block md:h-[56px] h-[45px] w-full border-[1px] border-solid bg-[#e1e1e130] bg-clip-padding px-3 py-5 leading-tight text-dark transition duration-200 ease-linear placeholder:text-transparent focus:border-dark/20 focus:pb-[0.825rem] focus:pt-[1.825rem] focus:text-dark focus:outline-none peer-focus:text-dark dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-dark dark:peer-focus:text-dark [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
              id="maxValue"
              placeholder=""
              autofocus
              v-model="selectedPriceRange[1]"
              required
            />
            <label
              for="maxValue"
              class="pointer-events-none absolute ltr:left-0 rtl:right-0 top-0 origin-[0_0] border border-solid border-transparent p-3 text-neutral-400 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[1rem] peer-focus:scale-[0.85] peer-focus:text-dark/80 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[1rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-dark"
            >
              {{ $t('content.maxValue') }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css'
const store = useFilterUnits()
const props = defineProps({
  taxFlag: String,
  priceRange: Object,
  selectedPriceRange: Array
})

const emit = defineEmits([
  'update:taxFlag',
  'update:priceRange',
  'update:selectedPriceRange'
])

const selectedPriceRange = computed({
  get() {
    return props.selectedPriceRange
  },
  set(selectedPriceRange) {
    emit('update:selectedPriceRange', selectedPriceRange)
  }
})
const taxFlag = computed({
  get() {
    return props.taxFlag
  },
  set(taxFlag) {
    emit('update:taxFlag', taxFlag)
  }
})
const priceRange = computed({
  get() {
    return props.priceRange
  },
  set(priceRange) {
    emit('update:priceRange', priceRange)
  }
})

watch(
  () => selectedPriceRange.value,
  () => {
    store.filter.priceRange = `${selectedPriceRange.value[0]},${selectedPriceRange.value[1]}`
  },
  { deep: true }
)
</script>

<style scoped>
.slider-primary {
  --slider-connect-bg: #765beb;
  --slider-tooltip-bg: #765beb;
  --slider-handle-ring-color: #765beb2c;
}
</style>
