<script lang="ts" setup>
import { useFilterUnits } from '~/stores/hotels/filter'

const store = useFilterUnits()

const featureChange = async (closeIs = true) => {
  store.filtersCounter()
  // store.filtering(closeIs)
  // store.filtering()
  // store.activeMenu = ""
}
</script>

<template>
  <ul
    class="mx-4 py-5 grid grid-cols-2 text-[14px]"
    v-if="store.filterAssets.Features?.length"
  >
    <!-- <li
      class="flex justify-start items-center my-2 text-start"
      v-for="(feature, i) in store.filterAssets.Features"
      :key="i"
    >
      <input
        @change="featureChange()"
        :aria-labelledby="feature.name"
        class="me-1"
        type="checkbox"
        v-model="store.filter.features"
        :value="feature.id"
      />

      <span :id="feature.name" class="w-full text-md font-bold">{{ feature.name }}</span>
    </li> -->
  </ul>
</template>

