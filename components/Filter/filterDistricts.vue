<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useFilterUnits } from "~/stores/hotels/filter";
import VueMultiselect from "vue-multiselect";

const store = useFilterUnits();
const props = defineProps({
  city_id: { type: String, default: "0" },
  country_id: { type: String, default: "0" },
  from: { type: String, default: "city" },
});

const selectedDistricts = ref(store.filter.districtId);

// Add an "All" option
const allOption = { id: "all", name: useI18n().t("content.all") };
const options = computed(() => [
  allOption,
  ...store.cityDistrictsFilter.filter(
    (item) => item.city_id == Number(store.filter.city_id)
  ),
]);
let isUpdatingFromWatch = false;
watch(selectedDistricts, (newVal, oldVal) => {
  if (isUpdatingFromWatch) {
    isUpdatingFromWatch = false;
    return;
  }
  if (newVal.includes(allOption) && oldVal.length < newVal.length) {
    selectedDistricts.value = [allOption];
    isUpdatingFromWatch = true;
  } else if (newVal.length > 1) {
    isUpdatingFromWatch = true;
    selectedDistricts.value = newVal.filter(
      (item: any) => item.id != allOption.id
    );
  }
  store.filter.districtId = selectedDistricts.value?.filter(
    (item: any) => item.id != allOption.id
  );
});
</script>

<template>
  <div class="min-h-12 md:h-full">
    <div
      class="relative flex h-full px-2 curser-pointer rounded-md justify-center items-center md:border-t-none border-t md:rtl:border-r md:ltr:border-l border-2xl border-lg border-dark/10 border-y md:shadow-none bg-light md:rtl:rounded-r-2xl md:ltr:rounded-l-2xl border-lg"
      :class="{
        'md:rounded-b-2xl  ': from != 'city',
        'md:py-3  ': from == 'city',
      }"
    >
      <VueMultiselect
        track-by="id"
        label="name"
        :show-labels="false"
        :placeholder="$t('content.filterDistract')"
        :value="selectedDistricts"
        v-model="selectedDistricts"
        :multiple="true"
        :options="options"
      >
        <template v-slot:noResult>{{ $t("content.filterDistract") }}</template>
        <template v-slot:noOptions>{{ $t("content.no_destract") }}</template>
        <template v-slot:placeholder
          >{{ $t("content.filterDistract") }}
          <Icon name="mdi:magnify" class="w-5 me-2 h-5 object-contain"
        /></template>
      </VueMultiselect>
    </div>
  </div>
</template>

<!-- ... existing style ... -->

<style>
.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: #fff;
  line-height: 1;
  --tw-bg-opacity: 1;
  background-color: rgb(118 92 241 / 1) !important;

  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}
.multiselect__tag-icon::after {
  content: "×";
  font-size: 14px;
  color: #fff !important;
}
</style>
