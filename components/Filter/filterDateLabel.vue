<script lang="ts" setup>
import { useFilterUnits } from "~/stores/hotels/filter";

const store = useFilterUnits();
const handleClose = async (checkType: "start" | "end") => {
  if (checkType == "end") {
    store.filter.dateEndStr = "";
  } else {
    store.filter.dateStartStr = "";
  }
  store.setFilterStorage();
  await store.filtering();
  store.activeMenu = "";
};
</script>

<template>
  <div class="flex gap-1 items-center h-full ltr:pr-1 rtl:pl-1">
    <Icon
      name="mdi:calendar-range"
      class="w-7 mx-2 h-7 text-primary object-contain cursor-pointer"
      v-on:click="store.activeMenu = 'check_in'"
    />
    <div
      class="flex flex-col h-full cursor-pointer grow px-1 md:p-1 hover:bg-desc border-primary rounded-lg"
      :class="{ 'bg-desc border-primary': store.activeMenu == 'check_in' }"
      v-on:click="store.activeMenu = 'check_in'"
    >
      <label
        v-if="store.filter.dateStartStr"
        for="dateStartStr"
        class="text-xs text-dark/70"
      >
        {{ $t("content.checkIn") }}
      </label>
      <div class="flex" :class="{ 'm-auto': store.filter.dateStartStr == '' }">
        <input
          :placeholder="$t('content.checkIn')"
          type="text"
          v-model="store.filter.dateStartStr"
          readonly
          id="dateStartStr"
          class="w-full text-sm md:text-md bg-[transparent] focus:outline-none cursor-pointer h-full"
        />
        <Icon
          v-if="!!store.filter.dateStartStr || store.activeMenu == 'check_in'"
          name="mdi:close"
          class="w-7 mx-2 h-7 text-primary object-contain cursor-pointer"
          v-on:click.stop="handleClose('start')"
        />
      </div>
    </div>
  </div>

  <div
    class="flex items-center h-full rtl:border-r ltr:border-l border-dark/10 ltr:pl-1 rtl:pr-1"
  >
    <div
      class="flex flex-col grow px-1 md:p-1 cursor-pointer hover:bg-desc border-primary rounded-lg h-full"
      v-on:click="store.activeMenu = 'check_out'"
      :class="{ 'bg-desc border-primary': store.activeMenu == 'check_out' }"
    >
      <label
        v-if="store.filter.dateEndStr"
        for="dateEndStr"
        class="text-xs text-dark/70"
        >{{ $t("content.checkOut") }}</label
      >
      <div class="flex" :class="{ 'm-auto': store.filter.dateEndStr == '' }">
        <input
          :placeholder="$t('content.checkOut')"
          type="text"
          v-model="store.filter.dateEndStr"
          readonly
          id="dateEndStr"
          class="w-full bg-[transparent] h-full focus:outline-none cursor-pointer text-sm md:text-md"
        />
        <Icon
          v-if="!!store.filter.dateEndStr || store.activeMenu == 'check_out'"
          name="mdi:close"
          class="w-7 mx-2 h-7 text-primary object-contain cursor-pointer"
          v-on:click.stop="handleClose('end')"
        />
      </div>
    </div>
  </div>
</template>
