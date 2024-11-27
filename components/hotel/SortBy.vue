<script setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchStore } from "@/stores/hotels/search";
import { useFilter } from "@/stores/hotels/hotelsFilter";
import { storeToRefs } from "pinia";

const props = defineProps({
  hotelsNum: {
    type: Number,
  },
});
  const useFilterStore = useFilter();
const { active_sort } = storeToRefs(useFilter());
const { sort,events_completed } = storeToRefs(useSearchStore());

const selectSortBy = (val) => {
  console.log(val);
};
const selectedValue = ref("");
watch(
  () => selectedValue.value,
 async (val) => {
  active_sort.value = val
     await useFilterStore.handleFilterApi(false);

  }
);
</script>

<template>
  <div
    class="h-[100%]"
    :class="`${!events_completed ? 'opacity-[0.5] pointer-events-none' : ''}  `"
  >
    <Select v-model="selectedValue" class="h-[100%]" dir="ltr text-right" style="height:100%">
      <SelectTrigger class="py-[25px]">
        <SelectValue :placeholder="$t('content.sortby')" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            :value="item"
            @select="selectSortBy"
            v-for="item in sort"
            :key="item.key"
          >
            {{ $t(`content.${item}`) }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
