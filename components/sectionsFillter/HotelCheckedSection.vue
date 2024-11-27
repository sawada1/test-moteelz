<template>
  <div class="my-4">
    <label class="block text-[20px] font-[500] mb-4">{{ title }}</label>
    <div
      v-for="(item, index) in visibleAccommodationTypes"
      :key="index"
      class="mb-1 flex items-center gap-2 my-[12px]"
    >
      <div class="flex items-center">
        <label class="custom-checkbox flex items-center space-x-2">
          <input
            type="checkbox"
            @change="toggleItem(item)"
            class="hidden-checkbox w-[20px] h-[20px]"
            v-model="selectedItems"
            :value="item.key"
          />
          <span
            class="checkmark"
            :class="[isItemActive(item.key) ? 'checked' : 'unchecked']"
          >
            <NuxtImg
              src="/img/check-mark.png"
              v-if="isItemActive(item.key)"
            />
          </span>
          
          <span class="text-[#383838] text-[16px]">{{ item.label  === 'UNKNOWN' ? 'OTHER' : item.label}}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from "vue";
import { useFilter } from "@/stores/hotels/hotelsFilter";
import { storeToRefs } from "pinia";

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
const { active_borads, active_nonRefundable } = storeToRefs(useFilter());

// Determine the active list based on filterType
const activeList = computed(() =>
  props.filterType === "filteredBoard"
    ? active_borads.value
    : active_nonRefundable.value
);

// Check if an item is active
const isItemActive = (key) => activeList.value.includes(key);

// Toggle the active state of an item
const toggleItem = (filter) => {
  const activeIndex = activeList.value.indexOf(filter.key);

  if (activeIndex === -1) {
    activeList.value.push(filter.key);
  } else {
    activeList.value.splice(activeIndex, 1);
  }

  // Emit the updated state
  if (props.filterType === "filteredBoard") {
    // emits("updatefilteredBoard", activeList.value);
    active_borads.value = activeList.value
  } else if (props.filterType === "filteredNonRefundable") {
    // emits("updateHotelTypes", activeList.value);
    active_nonRefundable.value = activeList.value

  }
};
const selectedItems = ref([]); // Array to hold selected keys
const { visibleAccommodationTypes } = toRefs(props);


watch(
  () => selectedItems.value,
  (newVal) => {
    // You can add any logic that needs to run when selectedItems changes.
  }
);
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
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    &.checked {
      background-color: #875fff; /* Active background color */
    }

    &.unchecked {
      background-color: #eee; /* Inactive background color */
    }

    img {
      z-index: 99999;
      position: relative;
      width: 10px;
      height: 10px;
      margin: 0;
      padding: 0;
    }
  }
}
</style>
