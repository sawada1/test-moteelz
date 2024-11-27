<script lang="ts" setup>
import { useFilterUnits } from "~/stores/hotels/filter";
import FilterCategory from "~/components/Filter/filterCategory.vue";

const store = useFilterUnits();
const filterPriceRange = async (typeSelected: number) => {
  store.filter.pricePer = typeSelected;
  store.filter.type_price = typeSelected;
  store.filtersCounter();
  store.filtering();
};
</script>

<template>
  <div class="px-1 py-4 min-w-[250px]">
    <h4 class="text-[14px] font-extrabold text-dark my-2">
      {{ $t("filterSearch.titlePrice") }}
    </h4>
    <div
      class="mb-6 mt-4 flex w-auto items-center justify-between border text-center border-primary/20 rounded-full h-[70px] mb-2 border-b border-primary/20"
    >
      <button
        @click="filterPriceRange(1)"
        :class="{ '!bg-primary text-light': store.filter.pricePer == 1 }"
        class="rtl:rounded-r-full ltr:rounded-l-full py-2 px-4 w-full inline-flex items-center justify-center text-xs text-center text-black capitalize bg-white rtl:border-l ltr:border-r border-primary/20 flex flex-col items-center justify-center h-full p-1"
      >
        <label class="pb-1 px-2 text-[12px] font-extrabold">
          {{ $t("content.priceTypeMine") }}
        </label>

        <label class="pb-1 px-2 text-[12px]">
          {{ $t("content.priceType50") }}
        </label>
      </button>

      <button
        @click="filterPriceRange(2)"
        :class="{ '!bg-primary text-light': store.filter.pricePer == 2 }"
        class="py-2 px-4 w-full inline-flex items-center justify-center text-xs text-center text-black capitalize bg-white flex flex-col items-center justify-center h-full p-1"
      >
        <label class="pb-1 px-2 text-[12px] font-extrabold">
          {{ $t("content.priceTypeMine") }}
        </label>

        <label class="pb-1 px-2 text-[12px]">
          {{ $t("content.priceType10") }}
        </label>
      </button>

      <button
        @click="filterPriceRange(3)"
        :class="{ '!bg-primary text-light': store.filter.pricePer == 3 }"
        class="py-2 px-4 w-full rtl:rounded-l-full ltr:rounded-r-full inline-flex items-center justify-center text-xs text-center text-black capitalize bg-white rtl:border-r ltr:border-l border-primary/20 flex flex-col items-center justify-center h-full p-2"
      >
        <label class="pb-1 px-2 text-[12px] font-extrabold">
          {{ $t("content.priceTypeMax") }}
        </label>

        <label class="pb-1 px-2 text-[12px] flex flex-row">
          {{ $t("content.priceType10") }}
        </label>
      </button>
    </div>
  </div>
</template>
