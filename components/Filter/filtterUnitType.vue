<script lang="ts" setup>
import { useFilterUnits } from "~/stores/hotels/filter";

const store = useFilterUnits();

const unitTypeChange = async (closeIs = true) => {
  store.filtersCounter();
  //  store.filtering(closeIs)
  //  store.filtering()
  // store.activeMenu = ""
};
</script>

<template>
  <ul
    v-if="store.filterAssets.unit_types?.length"
    class="mx-4 py-5 grid grid-cols-2 text-[14px]"
  >
    <li
      class="flex justify-start items-center my-2 text-start"
      v-for="(unit_type, i) in store.filterAssets.unit_types"
      :key="i"
    >
      <input
        @change="unitTypeChange(false)"
        :aria-labelledby="unit_type.name"
        class="me-1"
        type="checkbox"
        v-model="store.filter.unitTypes"
        :value="unit_type.id"
      />

      <span class="w-full font-bold">{{ unit_type.name }}</span>
    </li>
  </ul>
</template>
