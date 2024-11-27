<template>
  <div class="col-span-1 rounded-lg shadow-customShadow flex flex-col gap-4">
    <div class="rounded-lg p-4 flex flex-col gap-4">
      <div class="w-full h-fit flex flex-col gap-8 justify-center items-center">
        <!-- Header -->
        <div class="font-bold text-lg md:text-2xl text-primary text-right w-full">
          {{ $t("content.theOrder") }}
        </div>

        <!-- Order Details -->
        <div class="flex flex-col gap-4 w-full">
          <!-- Nights and Price Calculation -->
          <div class="flex justify-between items-center">
            <span class="text-gray-500">
              {{ selectedNight }}
              {{ selectedNight <= 10 ? $t("labels.nights") : $t("content.night") }}
            </span>
            <span>{{ formattedPrice }}</span>
          </div>

          <!-- Tax Calculation (if applicable) -->
          <div class="flex justify-between items-center">
            <span class="text-gray-500">
              {{ $t("content.value_added_tax") }} ({{ tax_percent }}%)
            </span>
            <span>{{ formattedValueAddedTax }}</span>
          </div>

          <!-- Total Amount -->
          <div class="flex justify-between items-center">
            <span>{{ $t("content.total") }}</span>
            <span>{{ formattedTotalAmount }}</span>
          </div>
        </div>
      </div>

      <!-- Payment Component -->
      <Payment :nightCount="selectedNight" />
    </div>
  </div>
</template>

<script setup>
import Payment from "../checkout/Payment.vue";
import { defineProps, computed } from "vue";

const props = defineProps({
  selectedNight: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  tax_percent: {
    type: Number,
    default: 0,
  },
});

// Computed properties for values and formatting
const valueAddedTax = computed(() => {
  const taxRate = props.tax_percent / 100;
  return (props.selectedNight * props.price) * taxRate;
});

const totalAmount = computed(() => {
  return props.selectedNight * props.price + valueAddedTax.value;
});

const formattedPrice = computed(() =>
  new Intl.NumberFormat().format(props.selectedNight * props.price)
);

const formattedValueAddedTax = computed(() =>
  new Intl.NumberFormat().format(Math.ceil(valueAddedTax.value))
);

const formattedTotalAmount = computed(() =>
  new Intl.NumberFormat().format(Math.ceil(totalAmount.value))
);

</script>
