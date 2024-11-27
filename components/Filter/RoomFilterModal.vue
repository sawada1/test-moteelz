<script setup lang="ts">
import { useFilterUnits } from "~/stores/hotels/filter";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const storeFilter = useFilterUnits();

const closeModal = () => {
  // Close the modal
};

const applyFilters = () => {
  // Apply the selected filters
  // and close the modal
};

// Your existing room filter setup code goes here
// Copy and paste the script section from your original filterRooms2.vue component

type ageOpt = { label: string; value: any };
type roomOpt = { adult?: number; child: number; children: any[] };
const age = ref<ageOpt | null>(null);
const ages = ref<ageOpt[]>([]);
const agesArr = ref<any[]>([]);

const roomsArr = ref<roomOpt[]>([]);

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

const selectedRoomCount = ref(1);

onMounted(() => {
  const agesCount = 11;
  for (let i = 0; i < agesCount; i++) {
    ages.value.push({
      label: `${i + 1} ${
        [1, 2, 11].includes(i + 1) ? t("age.year") : t("age.years")
      }`,
      value: i + 1,
    });
  }
  age.value = ages.value[4];

  ageRequired.value = ageRequiredOpts.value[0];

  if (storeFilter.filter.rooms.length > 0) {
    storeFilter.filter.rooms.forEach((d: any) => {
      roomsArr.value.push({
        adult: d.adult,
        child: d.child,
        children: [],
      });
    });
  } else {
    roomsArr.value.push({
      adult: 1,
      child: 0,
      children: [],
    });
  }

  handleRooms();
});

const updateRoomCount = (count) => {
  selectedRoomCount.value = count;
  storeFilter.filter.room_count = count;
  roomsArr.value = [];
  for (let i = 0; i < count; i++) {
    roomsArr.value.push({
      adult: 1,
      child: 0,
      children: [],
    });
  }
  handleRooms();
};

const handlRoomsPluse = async () => {
  if (storeFilter.filter.room_count < 5) {
    storeFilter.filter.room_count += 1;

    roomsArr.value.push({
      adult: 1,
      child: 0,
      children: [],
    });
    handleRooms();
  }
};
const removeRomeOne = async (index: number) => {
  if (storeFilter.filter.room_count > 1) {
    storeFilter.filter.room_count -= 1;
    roomsArr.value.splice(index, 1);
    handleRooms();
  }
};

const handleRooms = async () => {
  let adult = 0;
  let child = 0;
  roomsArr.value.forEach((d: any) => {
    adult += Number(d.adult) ?? 0;
    let newVal = Number(d.child) ?? 0;
    child += newVal;
    let oldChilds = 0;
    if (d.children) {
      oldChilds = d.children.length ?? 0;
    }
    let childArr = d.children;
    if (newVal > oldChilds) {
      const diff = newVal - oldChilds;
      for (let i = 0; i < diff; i++) {
        childArr.push(1);
      }
    } else if (newVal < oldChilds) {
      const diff = oldChilds - newVal;
      for (let i = 0; i < diff; i++) {
        childArr.pop();
      }
    }

    d.children = childArr;
  });

  storeFilter.filter.adult_count = adult;
  storeFilter.filter.child_count = child;
  storeFilter.filter.room_count = roomsArr.value.length;
  storeFilter.filter.rooms = roomsArr.value;
  let age_child = [];
  for (let i = 0; i < storeFilter.filter.room_count; i++) {
    age_child.push(roomsArr.value[i].children);
  }
  storeFilter.filter.children_age = age_child;
  storeFilter.setRoomText(t);
  console.log(roomsArr.value);
};
// ... (copy and paste the rest of the script section from filterRooms2.vue)
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold">{{ $t("filter.filterRooms") }}</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div
        class="max-full w-[100%] md:w-[90%] md:flex flex-row hidden justify-start my-1 md:mx-0 mx-1 items-start pb-2 pt-2"
      >
        <!-- <div class="text-sm  ps-[15%] ">

    {{ $t('filter.adultAges') }}
</div>
<div class=" mx-2 text-sm  ps-10 ">

    {{ $t('filter.childAges') }}
</div> -->
      </div>

      <div
        v-for="(count, index) in roomsArr"
        :key="index"
        :class="index < 3 ? 'border-b ' : ''"
        class="max-full w-[100%] md:w-[90%] md:flex flex-col hidden justify-start my-1 md:mx-0 mx-1 items-start pb-4"
      >
        <div class="w-full flex flex-row justify-start items-start">
          <div class="text-start py-2 px-1 flex items-center md:min-w-[100px]">
            <NuxtImg
              src="/img/units/bed.svg"
              alt="feature.name"
              class="md:h-5 h-4 md:w-5 w-4 md:me-2 me-1"
            />
            {{ $t("content.room") }} {{ index + 1 }}
          </div>

          <div
            class="max-full flex justify-between my-2 md:px-2 px-1 md:min-w-[120px]"
          >
            <div class="flex flex-col">
              {{ $t("content.adult_count") }}

              <select
                @change="handleRooms"
                v-model="roomsArr[index].adult"
                class="bg-white rounded outline-none w-[30px] md:w-[50px] font-medium text-center cursor-pointer"
              >
                <option selected :value="null">0</option>
                <option
                  v-for="room in [1, 2, 3, 4, 5, 6, 7, 8]"
                  :key="room"
                  class="text-sm md:text-base"
                >
                  {{ room }}
                </option>
              </select>
            </div>
          </div>

          <div
            class="max-full flex justify-between my-2 md:px-2 px-1 md:min-w-[120px]"
          >
            <div class="flex flex-col">
              {{ $t("content.child_count") }}
              <select
                @change="handleRooms"
                v-model="roomsArr[index].child"
                class="bg-white rounded outline-none w-[30px] md:w-[50px] font-medium text-center cursor-pointer"
              >
                <option selected :value="0">0</option>
                <option
                  v-for="room in [1, 2, 3, 4, 5, 6, 7, 8]"
                  :key="room"
                  class="text-sm md:text-base"
                >
                  {{ room }}
                </option>
              </select>
            </div>
          </div>

          <div
            class="max-full flex-none md:flex hidden justify-end items-end my-2 md:px-2 px-1"
          >
            <button v-if="index > 0" class="text-xl font-black">
              <Icon
                name="mdi:close"
                @click="removeRomeOne(index)"
                class="md:w-8 md:h-8 w-6 h-6 object-contain md:p-2 rounded-full text-primary bg-primary/5 shadow-sm"
              />
            </button>
          </div>
        </div>

        <div
          class="max-full w-full flex-auto flex flex-row flex-wrap items-center justify-start gap-2 mt-3 px-3"
        >
          <div
            v-for="(count, iCh) in roomsArr[index].children"
            :key="ich"
            class="relative"
            v-if="roomsArr[index].children.length > 0"
          >
            <select
              type="text"
              class="rounded-lg peer m-0 text-start block h-[38px] w-full border-[1px] border-solid bg-primary/5 bg-clip-padding p-1 leading-tight text-dark transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.825rem] focus:text-dark focus:outline-none peer-focus:text-dark dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-dark dark:peer-focus:text-dark [&:not(:placeholder-shown)]:pb-[0.625rem]"
              :placeholder="$t('filter.min1Year')"
              v-model="roomsArr[index].children[iCh]"
              required
            >
              <option selected :value="0">
                {{ $t("filter.min1Year") }}
              </option>
              <option v-for="op in ages" :value="op.value" :key="op.value">
                {{ op.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div
        v-for="(count, index) in roomsArr"
        :key="index"
        :class="index < 3 ? 'border-b ' : ''"
        class="max-full w-[100%] md:w-[90%] flex flex-col justify-start my-1 md:mx-0 mx-1 items-start pb-4 md:hidden"
      >
        <div class="w-full flex flex-row justify-start items-start">
          <div class="text-start py-2 px-2 flex items-center min-w-[70px]">
            <NuxtImg
              src="/img/units/bed.svg"
              alt="feature.name"
              class="md:h-5 h-4 md:w-5 w-4 md:me-2 me-1"
            />
            {{ $t("content.room") }} {{ index + 1 }}
          </div>

          <div class="max-full flex justify-between my-2 px-2 min-w-[70px]">
            <div>
              {{ $t("content.adult_count") }}

              <select
                @change="handleRooms"
                v-model="roomsArr[index].adult"
                class="bg-white rounded outline-none w-[30px] md:w-[50px] font-medium text-center cursor-pointer"
              >
                <option selected :value="null">0</option>
                <option
                  v-for="room in [1, 2, 3, 4, 5, 6, 7, 8]"
                  :key="room"
                  class="text-sm md:text-base"
                >
                  {{ room }}
                </option>
              </select>
            </div>
          </div>

          <div class="max-full flex justify-between my-2 px-2 min-w-[80px]">
            {{ $t("content.child_count") }}
            <div>
              <select
                @change="handleRooms"
                v-model="roomsArr[index].child"
                class="bg-white rounded outline-none w-[30px] md:w-[50px] font-medium text-center cursor-pointer"
              >
                <option selected :value="0">0</option>
                <option
                  v-for="room in [1, 2, 3, 4, 5, 6, 7, 8]"
                  :key="room"
                  class="text-sm md:text-base"
                >
                  {{ room }}
                </option>
              </select>
            </div>
          </div>

          <div
            class="max-full flex-none md:hidden flex justify-end items-end my-2 md:px-2 px-1"
          >
            <button v-if="index > 0" class="text-xl font-black">
              <Icon
                name="mdi:close"
                @click="removeRomeOne(index)"
                class="md:w-8 md:h-8 w-6 h-6 object-contain md:p-2 rounded-full text-primary bg-primary/5 shadow-sm"
              />
            </button>
          </div>
        </div>

        <div
          class="max-full w-full flex-auto flex flex-row flex-wrap items-center justify-start gap-2 mt-3 px-3"
        >
          <div
            v-for="(count, iCh) in roomsArr[index].children"
            :key="ich"
            class="relative min-w-[45%] px-2"
            v-if="roomsArr[index].children.length > 0"
          >
            <select
              type="text"
              class="rounded-lg peer m-0 text-start block h-[38px] w-full border-[1px] border-solid bg-primary/5 bg-clip-padding p-1 leading-tight text-dark transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.825rem] focus:text-dark focus:outline-none peer-focus:text-dark dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-dark dark:peer-focus:text-dark [&:not(:placeholder-shown)]:pb-[0.625rem]"
              :placeholder="$t('filter.min1Year')"
              v-model="roomsArr[index].children[iCh]"
              required
            >
              <option selected :value="0">
                {{ $t("filter.min1Year") }}
              </option>
              <option v-for="op in ages" :value="op.value" :key="op.value">
                {{ op.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div
        v-if="storeFilter.filter.room_count <= 3"
        class="max-full w-[90%] grid grid-cols-1 justify-between md:my-2 my-1 md:mx-0 mx-1"
      >
        <div class="max-full w-full flex justify-start my-2 md:ps-4">
          <div>
            <button class="text-xl font-black">
              <Icon
                name="mdi:plus"
                @click="handlRoomsPluse()"
                class="w-6 h-6 object-contain rounded-full text-light bg-primary shadow-sm"
              />
            </button>
          </div>
          <span
            @click="handlRoomsPluse()"
            class="pb-1 pt-1 px-2 text-primary text-sm font-bold"
          >
            {{ $t("filter.btnAddRoom") }}
          </span>
        </div>
      </div>
      <div
        v-for="(count, index) in roomsArr"
        :key="index"
        :class="index < 3 ? 'border-b ' : ''"
        class="max-full w-[100%] md:w-[90%] md:flex flex-col hidden justify-start my-1 md:mx-0 mx-1 items-start pb-4"
      >
        <!-- Room filter code -->
      </div>

      <div class="mt-4 flex justify-between">
        <button
          @click="closeModal"
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded"
        >
          {{ $t("common.cancel") }}
        </button>
        <button
          @click="applyFilters"
          class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {{ $t("common.apply") }}
        </button>
      </div>
    </div>
  </div>
</template>
