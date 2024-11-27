<template>
   <label class="custom-checkbox flex items-center space-x-2">
    <input
      type="checkbox"
      :checked="isChecked"
      @change="handleChange"
      class="hidden-checkbox w-[20px] h-[20px]"
    />
    <span class="checkmark" :class="{ 'unchecked': disabled }">
      <NuxtImg src="/img/check-mark.png" />
    </span>
    <span class="text-[#383838] text-[16px]">{{ label }}</span>
  </label>
</template>

<script setup>
import { defineProps, computed, defineEmits } from "vue";
import { useFilterUnits } from "~/stores/hotels/filter";
import { useFilter } from "@/stores/hotels/hotelsFilter";
const useFilterStore = useFilter();

const props = defineProps({
  label: String,
  value: [String, Number, Boolean],
  modelValue: Array,
  name: String,
  dubelid: String,
  disabled: {
    type: Boolean,
    defult: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isChecked = computed(() => {
  return useFilterStore.checked_filter.includes(
    props.dubelid == "stars" ? props.value * 1000 : props.value
  );
});

const handleChange = (event) => {
  const checked = event.target.checked;
  const value = props.value;
  let updatedModelValue = [...props.modelValue];

  if (checked) {
    // إذا كانت checkbox غير مفعلة، أضف القيمة
    if (!useFilterStore.checked_filter.includes(value)) {
      if (props.dubelid == "stars") {
        useFilterStore.checked_filter.push(value * 1000);
      } else {
        useFilterStore.checked_filter.push(value);
      }
      updatedModelValue.push(value);
    }
  } else {
    // إذا كانت checkbox مفعلة، أزل
    let index = -1;
    if (props.dubelid == "stars") {
      index = useFilterStore.checked_filter.indexOf(value * 1000);
      if (index !== -1) {
        useFilterStore.checked_filter.splice(index, 1);
      }
    } else {
      index = useFilterStore.checked_filter.indexOf(value);
      if (index !== -1) {
        useFilterStore.checked_filter.splice(index, 1);
      }
    }

    updatedModelValue.push(value);
  }
  console.log(useFilterStore.checked_filter);

  emit("update:modelValue", updatedModelValue);
};
</script>
<style scoped lang="scss">
.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  .hidden-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .checkmark {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #eee;
    border-radius: 4px;
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;

    &.disabled {
      cursor: not-allowed !important;
      pointer-events: none !important;
    }

    &.unchecked {
      background-color: #eee; /* Default background when unchecked */
      img {
        display: none; /* Hide the checkmark image */
      }
    }

    img {
      z-index: 99;
      position: relative;
      width: 10px;
      height: 10px;
      margin: 0;
      padding: 0;
    }
  }

  .hidden-checkbox:checked + .checkmark:not(.unchecked) {
    background-color: #875fff;

    img {
      display: block; /* Show the checkmark image */
    }
  }
}
</style>
