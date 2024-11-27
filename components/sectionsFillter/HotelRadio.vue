<template>
  <div class="my-4">
    <label class="block text-[20px] font-[500] mb-4">{{ title }}</label>
    <RadioGroup v-model="active_nonRefundable" :default-value="1"
    :dir="locale === 'en' ? 'ltr':'rtl'"
    >
      <div
        class="flex items-center gap-2 space-x-2"
        v-for="(item, index) in visibleAccommodationTypes"
        :key="index"
      >
        <RadioGroupItem :id="item.label" :value="item.key" />
        <Label class="text-[#383838] text-[16px]" :for="item.label">{{ item.label }}</Label>
      </div>
    </RadioGroup>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from "vue";
import { useFilter } from "@/stores/hotels/hotelsFilter";
import { storeToRefs } from "pinia";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {useI18n} from "vue-i18n"
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  visibleAccommodationTypes: {
    type: Array,
    required: true,
  },
  filterType: {
    tpye: String,
  },
});
const {locale} = useI18n()
const {  active_nonRefundable } = storeToRefs(useFilter());

// Determine the active list based on filterType
</script>

<style scoped lang="scss"></style>
