<script lang="ts" setup>
import { useFilterUnits } from "~/stores/hotels/filter";

const store = useFilterUnits();

const handleCategorySelected = async (arg: string, value: number) => {
  store.filter.categorySelectedName = arg;

  store.filter.category = value;

  store.filtersCounter();

  // await store.filtering()

  // store.activeMenu = ""
};
</script>

<template>
  <ul
    class="flex flex-col gap-1 text-xs md:text-sm font-medium justify-center text-center"
  >
    <li class="flex min-w-[200px] text-start p-1 cursor-pointer">
      <label>
        <input
          @change="handleCategorySelected($t('content.all'), 0)"
          aria-labelledby="categories"
          class="me-2"
          v-model="store.filter.category"
          type="radio"
          :value="0"
        />
        <span id="categories" class="w-full font-bold cursor-pointer">
          {{ $t("content.all") }}
        </span>
      </label>
    </li>
    <li
      class="flex min-w-[200px] text-start p-1 cursor-pointer"
      v-for="(t, i) in store.filterAssets.categories"
      :key="i"
    >
      <label :for="t.name">
        <input
          @change="handleCategorySelected(t.name, t.id)"
          :aria-labelledby="t.name"
          class="me-2 border"
          v-model="store.filter.category"
          type="radio"
          :id="t.name"
          :value="t.id"
        />
        <span :id="t.name" class="w-full font-bold text-start">
          {{ t.name }}
        </span>
      </label>
    </li>
    <li class="flex min-w-[200px] text-start p-1 cursor-pointer">
      <label>
        <input
          @change="handleCategorySelected($t('content.offers'), 99)"
          aria-labelledby="offers"
          class="me-2"
          v-model="store.filter.category"
          type="radio"
          :value="99"
          @click.stop
        />
        <span id="offers" class="w-full font-bold cursor-pointer">
          {{ $t("content.offers") }}
        </span>
      </label>
    </li>
  </ul>
</template>
