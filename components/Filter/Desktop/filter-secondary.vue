<template>
  <div class="grid grid-cols-12 w-full gap-2 select-none lg:hidden">
    <div class="lg:col-span-4 col-span-12">
      <button
        class="border rounded-md border-dark/20 text-dark/70 w-full h-full py-2 px-1 outline-none"
        @click="modalToggle()"
      >
        <div class="flex flex-row w-full items-center justify-center gap-x-1">
          <Icon name="mdi:tune" class="w-[20px] h-[20px]" />
          <span
            class="text-[14px] font-medium text-gray-900 dark:text-gray-300"
          >
            {{ $t("content.filter") }}
          </span>
        </div>
      </button>
    </div>
    <div class="lg:col-span-8 col-span-12">
      <div class="border border-dark/20 text-dark/70 rounded-lg py-2 px-1">
        <label class="inline-flex items-center cursor-pointer">
          <span
            class="me-1 text-[14px] font-medium text-gray-900 dark:text-gray-300"
          >
            {{ $t("content.view_price_before_tax") }}
          </span>
          <input
            type="checkbox"
            value=""
            class="sr-only peer"
            v-model="taxFlag"
          />
          <div
            class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
          ></div>
        </label>
      </div>
    </div>
  </div>
  <Modal
    v-model="modalFlag"
    class="pt-20 mx-[-20px]"
    :title="$t('content.filterResults')"
    icon="mdi:tune"
  >
    <div class="flex flex-row w-full h-screen select-none">
      <div class="flex flex-col w-full h-[80%] overflow-y-scroll p-4">
        <fillter class="!max-w-[100%]" />
      </div>
    </div>
  </Modal>
</template>

<script setup>
import Modal from "~/components/shared/Modal.vue";
import fillter from "../../Fillter.vue";
import { useFilterUnits } from "~/stores/hotels/filter";

const filterStore = useFilterUnits();
const filteredTypes = ref([]);
const filteredFeatures = ref([]);
const selectedPriceRange = ref([1000, 4000]);
const guestsRooms = ref({ bedrooms: 1, beds: 1, persons: 1, bathrooms: 1 });
const priceRange = ref({ from: 0, to: 10000 });
const modalFlag = ref(false);
const route = useRoute();

const props = defineProps({
  taxFlag: Boolean,
});
const emit = defineEmits("update:taxFlag");

const taxFlag = computed({
  get() {
    return props.taxFlag;
  },
  set(taxFlag) {
    emit("update:taxFlag", taxFlag);
  },
});
console.log(emit);
const modalToggle = () => {
  modalFlag.value = !modalFlag.value;
};

onMounted(() => {
  filteredTypes.value = filterStore.filter.unitTypes;
  filteredFeatures.value = filterStore.filter.features;
  guestsRooms.value.bedrooms = filterStore.filter.bedrooms;
  guestsRooms.value.persons = filterStore.filter.capacity;
});
const resetSecondFilter = () => {
  filteredTypes.value = [];
  taxFlag.value = false;
  selectedPriceRange.value = [1000, 4000];
  guestsRooms.value = { bedrooms: 1, beds: 1, persons: 1, bathrooms: 1 };
  filteredFeatures.value = [];
};
const searchAllWithSecondFilter = () => {
  filterStore.filter.unitTypes = filteredTypes.value;
  filterStore.filter.features = filteredFeatures.value;
  filterStore.filter.bedrooms = guestsRooms.value.bedrooms;
  filterStore.filter.capacity = guestsRooms.value.persons;

  modalToggle();
  filterStore.isLoadingFirst = true;
  route.path.includes("/units/") ? (filterStore.filter.packages = "") : null;
  filterStore.units = [];
  filterStore.scrollPaginate = 0;
  filterStore.getUnitsByFilterDate();
};
</script>
