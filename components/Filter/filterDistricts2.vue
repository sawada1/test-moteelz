<script lang="ts" setup>
import { useFilterUnits } from "~/stores/hotels/filter";

const store = useFilterUnits();
</script>

<template>
  <div
    class="relative flex-auto px-4 py-2 min-[0px]:overflow-y-auto justify-center items-center"
  >
    <div
      v-if="store.cityDistrictsFilter.length"
      v-for="(t, i) in store.cityDistrictsFilter.filter(
        (dist) => dist.city_id == store.filter.city_id
      )"
      :key="i"
      class="w-full grid grid-cols-1 justify-between my-[2px]"
    >
      <div class="flex flex-row w-full text-dark py-2 justify-between">
        <div class="text-start w-full flex items-center">
          <!-- <Icon name="mdi:location" class="w-9 h-9 object-contain p-2  me-1 shadow-sm" /> -->
          <span class="text-dark">{{ t.name }}</span>
        </div>
        <div
          class="text-end w-full mx-2 flex flex-row text-dark justify-end items-center"
        >
          <input
            :aria-labelledby="t.name"
            class="me-1"
            type="checkbox"
            v-model="store.filter.districts"
            :value="t.id"
          />
        </div>
      </div>
    </div>

    <div v-else class="relative block w-full p-12 text-center">
      <span class="mt-2 block text-sm font-medium text-gray-900">
        {{ $t("content.no_destract") }}
      </span>
    </div>
  </div>
</template>
