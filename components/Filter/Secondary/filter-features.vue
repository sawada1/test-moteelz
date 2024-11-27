<template>
  <div class="flex w-full">
    <div class="flex flex-col w-full p-2">
      <div class="flex flex-row">
        <span class="mb-1 font-bold md:text-lg text-sm">
          {{ $t("content.features") }} :
        </span>
      </div>
      <div class="flex flex-row w-full">
        <div class="grid grid-cols-3 w-full items-center mx-1 md:mx-10">
          <div
            class="col-span-1 w-full md:w-fit flex items-center gap-x-2 cursor-pointer"
            v-for="item in Features"
            :key="item.id"
            @click="toggleItem(item.id)"
          >
            <input
              type="checkbox"
              class="accent-primary my-2 cursor-pointer"
              v-model="item.is_selected"
            />
            <label class="md:text-[16px] text-[12px] cursor-pointer">
              {{ item.name }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFilterUnits } from "~/stores/hotels/filter";
const store = useFilterUnits();

const props = defineProps({
  filteredFeatures: Array,
});

const Features = ref([]);

const emit = defineEmits(["update:filteredFeatures"]);
const toggleItem = (itemId: number) => {
  if (!itemId) {
    return;
  }

  if (!filteredFeatures.value?.includes(itemId)) {
    Features.value.forEach((item) => {
      if (item.id === itemId) {
        item.is_selected = true;
      }
    });
    filteredFeatures.value?.push(itemId);
  } else if (filteredFeatures.value?.includes(itemId)) {
    const itemIndex = filteredFeatures.value.findIndex((i) => i === itemId);
    filteredFeatures.value.splice(itemIndex, 1);
    Features.value.forEach((item) => {
      if (item.id === itemId) {
        item.is_selected = false;
      }
    });
  }
};
const filteredFeatures = computed({
  get() {
    return props.filteredFeatures;
  },
  set(filteredFeatures) {
    emit("update:filteredFeatures", filteredFeatures);
  },
});
onMounted(() => {
  Features.value = store.filterAssets.Features;
  if (Features !== undefined) {
    Features.value.forEach((feat) => {
      feat.is_selected = false;
    });
  }

  Features.value.forEach((item) => {
    if (!filteredFeatures.value?.includes(item.id)) {
      item.is_selected = false;
    } else if (filteredFeatures.value?.includes(item.id)) {
      item.is_selected = true;
    }
  });
});
watch(filteredFeatures, (newVal, oldVal) => {
  if (newVal.length < 1) {
    Features.value.forEach((item) => {
      item.is_selected = false;
    });
  }
});
</script>
