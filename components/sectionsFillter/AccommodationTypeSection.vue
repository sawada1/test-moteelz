<template>
  <div class="my-4">
    <label class="block text-[20px] font-[500] mb-2">{{ title }}</label>
    <div class="flex flex-wrap gap-[8px]">
      <div
        v-for="(filter, index) in currentFilter"
        :key="index"
        class="mb-1 flex my-[8px] flex-row"
      >
        <div
          @click="selectedFacility(filter)"
          :class="[
            'filter-items px-2 py-1 flex justify-center items-center text-sm gap-3 rounded-xl cursor-pointer',
            isItemActive(filter.key) ? 'active' : 'bg-[#FDFDFD] border border-[#E9E9E9]'
          ]"
        >
          <NuxtImg
            class="w-[35px] pointer-events-none"
            src="https://s3-alpha-sig.figma.com/img/1069/9011/a11349ff5119ac4f6c6b244104dd847d?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h0~UIzJ7QyXWOqiTmliQ-i1tzxr-IW5Dqz4OVvja-IzRQETLe2q-AWLNaoBLQb7-L99f98Tl0Ig36HhNJB7qFwsYMdl4aH2YKFVEfCnPXtUlgbisROVlmytVJqazCneeCpQE3hPmF21cXWQfuqZXi2aMrmvAqx9DTaCqYlV5muEkRG54p8VgRaB2WiJuNq0lbDl-baCZ1nl3DEJMsU5qkMNYSxKqFg1z4WDFwaSeRebyqu02kh-eFYljuALaxQaD-Z5VvZZhpsCBhRvCoE50AytySzV~zYkZeOcliNErU~6gSgGFsP-nvSejyOJlb5T5IJgaXa1K07AAdcwzc9~Wig__"
            alt=""
            v-if="filterType === 'unitType'"
          />
          <span class="text-xs pointer-events-none">
            {{ filter.name }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="underline text-primary mt-4 text-left"
      v-if="visibleAccommodationTypes.length >= 10"
      @click="increaseAndDecrease"
    >
      {{
        currentFilter.length != visibleAccommodationTypes.length
          ? $t("content.load_more")
          : $t("fillter.showLess")
      }}
    </div>
  </div>
</template>


<script setup>
import { useFilter } from "@/stores/hotels/hotelsFilter";
import { storeToRefs } from "pinia";
import { ref, computed, watch, toRefs } from "vue";

const props = defineProps({
  filterType: {
    type: String,
    default: "facility",
  },
  title: {
    type: String,
  },
  visibleAccommodationTypes: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(["updateHotelFacilities", "updateHotelTypes"]);
const limit = ref(10);
const currentFilter = ref([]);

const { visibleAccommodationTypes } = toRefs(props);
const { active_facilities, active_unit_types } = storeToRefs(useFilter());

// Watch the visibleAccommodationTypes prop and update the currentFilter
watch(
  () => visibleAccommodationTypes.value,
  (val) => {
    const arr = [...val];
    currentFilter.value = arr.splice(0, limit.value);
  },
  { immediate: true }
);

// Determine the active list based on filterType
const activeList = computed(() =>
  props.filterType === "facility" ? active_facilities.value : active_unit_types.value
);

// Check if an item is active
const isItemActive = (key) => activeList.value.includes(key);

// Toggle the active state of an item
const selectedFacility = (filter) => {
  const activeIndex = activeList.value.indexOf(filter.key);

  if (activeIndex === -1) {
    activeList.value.push(filter.key);
  } else {
    activeList.value.splice(activeIndex, 1);
  }

  // Emit the updated state
  if (props.filterType === "facility") {
    emits("updateHotelFacilities", activeList.value);
  } else if (props.filterType === "unitType") {
    emits("updateHotelTypes", activeList.value);
  }
};

// Toggle between showing more/less items
const increaseAndDecrease = () => {
  if (currentFilter.value.length != visibleAccommodationTypes.value.length) {
    currentFilter.value = visibleAccommodationTypes.value;
  } else {
    const arr = [...visibleAccommodationTypes.value];
    currentFilter.value = arr.splice(0, limit.value);
  }
};
</script>


<style scoped lang="scss">
.filter-items {
  &.active {
    @apply bg-[#F1EDFF]  border text-[#875FFF] !important;
    border: 1px dashed;
  }
}
  .checked {
      background-color: #875fff; /* Active background color */
    }
</style>
