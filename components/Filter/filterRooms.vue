<script lang="ts" setup>
import { useFilterUnits } from "~/stores/hotels/filter";
import FilterCategory from "~/components/Filter/filterCategory.vue";
const { t, locale } = useI18n();

type ageOpt = { label: string; value: any };
const age = ref<ageOpt | null>(null);
const ages = ref<ageOpt[]>([]);
const agesArr = ref<any[]>([]);

const ageRequiredOpts = ref<ageOpt[]>([
  {
    label: `${t("age.age_required")}`,
    value: 1,
  },
  {
    label: `${t("age.age_not_required")}`,
    value: 2,
  },
]);
const ageRequired = ref<ageOpt | null>(null);

onMounted(() => {
  const agesCount = 13;
  for (let i = 0; i < agesCount; i++) {
    ages.value.push({
      label: `${i + 1} ${
        [1, 2, 11, 12, 13].includes(i + 1) ? t("age.year") : t("age.years")
      }`,
      value: i + 1,
    });
  }

  age.value = ages.value[4];
  ageRequired.value = ageRequiredOpts.value[0];
});
const store = useFilterUnits();
const handlAdultsCount = async (arg: string) => {
  if (arg == "-" && store.filter.adult_count > 1) {
    store.filter.adult_count -= 1;
    store.filter.capacity -= 1;
  } else if (arg == "+" && store.filter.capacity < 10) {
    store.filter.adult_count += 1;
    store.filter.capacity += 1;
  }
  if (store.filter.capacity / store.filter.bedrooms > 2) {
    handleRoom("+");
  }
};
const handlChildrenCount = async (arg: string) => {
  if (arg == "-" && store.filter.child_count >= 1) {
    store.filter.child_count -= 1;
    store.filter.capacity -= 1;
  } else if (arg == "+" && store.filter.capacity < 10) {
    store.filter.child_count += 1;
    store.filter.capacity += 1;
  }
  if (store.filter.capacity / store.filter.bedrooms > 2) {
    handleRoom("+");
  }
};
const handleCapacity = async (arg: string) => {
  if (arg == "-") {
    store.filter.capacity =
      store.filter.capacity <= 1 ? 1 : store.filter.capacity - 1;
  } else if (arg == "+") {
    store.filter.capacity =
      store.filter.capacity >= 10 ? 10 : store.filter.capacity + 1;
  }
  if (store.filter.capacity / store.filter.bedrooms > 2) {
    handleRoom("+");
  }
  //THEN FILTER
  store.filtersCounter();
  // if (!store.isOpenFilterModel) {
  //   store.handleSearch(t)
  // }
  //  await filtering()
};

const handleRoom = async (arg: string) => {
  if (arg == "-") {
    store.filter.bedrooms =
      store.filter.bedrooms <= 1 ? 1 : store.filter.bedrooms - 1;
  } else if (arg == "+") {
    store.filter.bedrooms =
      store.filter.bedrooms >= 5 ? 5 : store.filter.bedrooms + 1;
  }
  //THEN FILTER
  store.filtersCounter();
  // if (!store.isOpenFilterModel) {
  //   store.handleSearch(t)
  // }
};
watch(
  () => store.filter.child_count,
  (newVal, oldVal) => {
    if (newVal > oldVal) {
      const diff = newVal - oldVal;
      for (let i = 0; i < diff; i++) {
        agesArr.value.push(ages.value[4]);
      }
    } else if (newVal < oldVal) {
      const diff = oldVal - newVal;
      for (let i = 0; i < diff; i++) {
        agesArr.value.pop();
      }
    }
  },
  { deep: true }
);
</script>

<template>
  <div
    class="max-full grid grid-cols-3 justify-between md:my-2 my-1 md:mx-0 mx-1"
  >
    <div class="text-start py-2 flex items-center">
      {{ $t("content.adult_count") }}
    </div>
    <div class="max-full col-span-2 flex justify-between my-2">
      <div>
        <button class="text-xl font-black">
          <Icon
            name="mdi:plus"
            @click="handlAdultsCount('+')"
            class="w-9 h-9 object-contain p-2 rounded-full text-primary shadow-sm"
          />
        </button>
      </div>
      <div>
        <input
          type="text"
          class="md:w-32 w-28 text-center h-full"
          readonly
          aria-labelledby="guestsAndRooms"
          v-model="store.filter.adult_count"
        />
      </div>
      <button class="text-xl font-black">
        <Icon
          name="mdi:minus"
          @click="handlAdultsCount('-')"
          class="w-9 h-9 object-contain p-2 rounded-full text-primary bg-primary/5 shadow-sm"
        />
      </button>
    </div>
  </div>
  <div
    class="max-full grid grid-cols-3 justify-between md:my-2 my-1 md:mx-0 mx-1"
  >
    <div class="text-start py-2 flex items-center">
      {{ $t("content.child_count") }}
    </div>
    <div class="max-full col-span-2 flex justify-between my-2">
      <div>
        <button class="text-xl font-black">
          <Icon
            name="mdi:plus"
            @click="handlChildrenCount('+')"
            class="w-9 h-9 object-contain p-2 rounded-full text-primary bg-primary/5 shadow-sm"
          />
        </button>
      </div>
      <div>
        <input
          type="text"
          class="md:w-32 w-28 text-center h-full"
          readonly
          aria-labelledby="guestsAndRooms"
          v-model="store.filter.child_count"
        />
      </div>
      <button class="text-xl font-black">
        <Icon
          name="mdi:minus"
          @click="handlChildrenCount('-')"
          class="w-9 h-9 object-contain p-2 rounded-full text-primary bg-primary/5 shadow-sm"
        />
      </button>
    </div>
    <div
      class="max-full col-span-3 grid grid-cols-3 items-center justify-start gap-2 mt-3"
    >
      <div
        v-for="(count, index) in store.filter.child_count"
        :key="count"
        class="relative col-span-1"
      >
        <select
          type="text"
          class="rounded-lg peer m-0 text-start block h-[38px] w-full border-[1px] border-solid bg-primary/5 bg-clip-padding p-1 leading-tight text-dark transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.825rem] focus:text-dark focus:outline-none peer-focus:text-dark dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-dark dark:peer-focus:text-dark [&:not(:placeholder-shown)]:pb-[0.625rem]"
          id="age"
          placeholder=""
          v-model="agesArr[index]"
          required
          :disabled="store.filter.child_count < 1"
        >
          <option v-for="op in ages" :value="op" :key="op.value">
            {{ op.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
  <div
    class="max-full grid grid-cols-3 justify-between md:mb-2 mb-1 md:mx-0 mx-1"
  >
    <div class="text-start py-2 flex items-center">
      {{ $t("content.bedrooms") }}
    </div>
    <div class="max-full col-span-2 flex justify-between my-2">
      <div>
        <button class="text-xl font-black">
          <Icon
            name="mdi:plus"
            @click="handleRoom('+')"
            class="w-9 h-9 object-contain p-2 rounded-full text-primary bg-primary/5 shadow-sm"
          />
        </button>
      </div>
      <div>
        <input
          type="text"
          class="md:w-32 w-28 text-center h-full"
          readonly
          aria-labelledby="guestsAndRooms"
          v-model="store.filter.bedrooms"
        />
      </div>
      <button class="text-xl font-black">
        <Icon
          name="mdi:minus"
          @click="handleRoom('-')"
          class="w-9 h-9 object-contain p-2 rounded-full text-primary bg-primary/5 shadow-sm"
        />
      </button>
    </div>
  </div>
</template>
