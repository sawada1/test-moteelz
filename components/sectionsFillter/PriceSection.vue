<template>
  <div>
    <label class="block text-[20px] font-[500]">{{
      $t("fillter.price")
    }}</label>
    <div class="flex items-center justify-between">
      <h1
        class="text-[13px] !m-[15px_0px] bg-[#FDFDFD] border rounded-lg uppercase border-[#E9E9E9] px-3 py-2"
      >
        {{ internalRangeValues[1] }} {{ $t("fillter.currency") }}
      </h1>
      <h1
        class="text-[13px] !m-[15px_0px] bg-[#FDFDFD] border rounded-lg uppercase border-[#E9E9E9] px-3 py-2"
      >
        {{ internalRangeValues[0] }} {{ $t("fillter.currency") }}
      </h1>
    </div>
    <!-- {{internalRangeValues}} -->
    <Slider
      :default-value="internalRangeValues"
      :max="max"
      :step="100"
      :range="true"
      v-model="internalRangeValues"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Slider } from "@/components/ui/slider"; // Make sure the Slider component is compatible
import { useFilter } from "@/stores/hotels/hotelsFilter";
import { storeToRefs } from "pinia";

// Props
const props = defineProps({
  price: {
    type: Object,
    required: true,
  },
});
const { active_price,resetPrice } = storeToRefs(useFilter());
// Reactive variables
const min = ref(1000); // Minimum range value
const max = ref(3000); // Maximum range value
const internalRangeValues = ref([1000, 3000]); // Initialize range values

// Sync `internalRangeValues` with incoming prop data
watch(
  () => props.price,
  (newPrice) => {
    console.log(newPrice , 'filter price');
    
    // if (active_price.value.length > 0) {
    //   //This because if we close the filter component in the sm screen the value of price will be gone so i have to check the price is avaliable in state or no 
    //   internalRangeValues.value = [
    //     active_price.value[0] || newPrice.min,
    //     active_price.value[1] || newPrice.max,
    //   ];
    //   console.log(active_price.value.length);
      
      
    // } else {
      //   console.log(internalRangeValues.value);
      // }
      internalRangeValues.value = [
        newPrice.min || min.value,
        newPrice.max || max.value,
      ];

    min.value = newPrice.min || min.value; 
    max.value = newPrice.max || max.value; 
      console.log(max.value , newPrice.max);

  },
  { immediate: true }
);
watch(()=>resetPrice.value , (val)=>{
  if(val){
     internalRangeValues.value = [
        props.price.min || min.value,
        props.price.max || max.value,
      ];
      console.log(internalRangeValues.value);
      
      resetPrice.value = false
  }
})
// Validate `internalRangeValues` whenever it changes
watch(
  internalRangeValues,
  (newValues) => {
    // Ensure the minimum value is not less than `min`
    if (newValues[0] < min.value) {
      internalRangeValues.value[0] = min.value;
    }
    // Ensure the maximum value does not exceed `max`
    if (newValues[1] > max.value) {
      internalRangeValues.value[1] = max.value;
    }
    active_price.value = internalRangeValues.value;
  },
  { deep: true }
);
</script>
