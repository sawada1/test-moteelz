<template>
  <div class="my-4">
    <label class="block text-[20px] font-[500] mb-4">{{ title }}</label>
    <div
      v-for="(item, index) in [0, 1, 2, 3, 4, 5]"
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
            :value="item"
            :disabled="!visibleAccommodationTypes[`${item}`]"

          />
          <span
            class="checkmark"
            :class="[isItemActive(item) ? 'checked' : 'unchecked']"
          >
            <NuxtImg src="/img/check-mark.png" v-if="isItemActive(item)" />
          </span>

          <div class="flex">
            <span
              class="text-yellow-500 text-[18px] px-[2px]"
              v-for="i in item"
              :key="i"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.653 7.28236C15.9679 6.97543 16.0791 6.52497 15.9432 6.10623C15.8071 5.68749 15.4524 5.38857 15.0167 5.32513L11.1426 4.76222C10.9776 4.73819 10.835 4.6347 10.7613 4.48508L9.02933 0.974952C8.83486 0.580559 8.44014 0.335464 8.00025 0.335464C7.56069 0.335464 7.16597 0.580559 6.9715 0.974952L5.23918 4.4854C5.16549 4.63502 5.0226 4.73851 4.8576 4.76254L0.983514 5.32545C0.548111 5.38857 0.193125 5.68781 0.056962 6.10655C-0.0788811 6.52529 0.0322923 6.97575 0.34723 7.28268L3.15027 10.0149C3.26978 10.1315 3.32456 10.2994 3.29637 10.4635L2.6351 14.3215C2.57647 14.6611 2.66553 14.9915 2.88532 15.2519C3.22685 15.6579 3.82308 15.7815 4.29981 15.531L7.76445 13.7093C7.90926 13.6333 8.09156 13.634 8.23606 13.7093L11.701 15.531C11.8695 15.6197 12.0493 15.6646 12.2348 15.6646C12.5734 15.6646 12.8944 15.514 13.1152 15.2519C13.3353 14.9915 13.424 14.6605 13.3654 14.3215L12.7038 10.4635C12.6756 10.2991 12.7304 10.1315 12.8499 10.0149L15.653 7.28236Z"
                  fill="#DDB163"
                />
              </svg>
            </span>
          </div>
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
const { active_stars } = storeToRefs(useFilter());

// const activeList = ref([]);
const activeList = computed(() =>active_stars.value);
// Check if an item is active
const isItemActive = (key) => activeList.value.includes(key);

// Toggle the active state of an item
const toggleItem = (filter) => {
  const activeIndex = active_stars.value.indexOf(filter);

  if (activeIndex === -1) {
    activeList.value.push(filter);
  } else {
    activeList.value.splice(activeIndex, 1);
  }

  active_stars.value = activeList.value;
};
const selectedItems = ref([]); // Array to hold selected keys
const { visibleAccommodationTypes } = toRefs(props);

const checkStarAvaliable = (key)=>{
  return visibleAccommodationTypes.value.includes(key)
}
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
