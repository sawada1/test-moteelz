<script lang="ts" setup>
import { useFilterUnits } from "~/stores/hotels/filter";
import RoomFilterModal from "./RoomFilterModal.vue";
const { t, locale } = useI18n();
const storeFilter = useFilterUnits();
const currentWidth = ref(window.innerWidth);
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

// Function to decrease adult count
const decreaseAdultCount = (index: number): void => {
  const room = roomsArr.value[index];
  if (room && room.adult !== undefined && room.adult > 0) {
    room.adult--;
    handleRooms(); // Update the filter after decreasing the count
  }
};

// Function to increase adult count
const increaseAdultCount = (index: number): void => {
  const room = roomsArr.value[index];
  if (room && room.adult !== undefined && room.adult < 8) {
    room.adult++;
    handleRooms(); // Update the filter after increasing the count
  }
};

// Function to decrease child count
const decreaseChildCount = (index: number): void => {
  if (roomsArr.value[index].child > 0) {
    roomsArr.value[index].child--;
    handleRooms();
  }
};

// Function to increase child count
const increaseChildCount = (index: number): void => {
  if (roomsArr.value[index].child < 8) {
    roomsArr.value[index].child++;
    handleRooms(); // Update the filter after increasing the count
  }
};

// Reactive variables for device width and height
const width = ref(window.innerWidth);
const height = ref(window.innerHeight);

// Update the width and height when the window is resized
const updateDimensions = () => {
  width.value = window.innerWidth;
  height.value = window.innerHeight;
};

onMounted(() => {
  // Set the initial dimensions
  updateDimensions();

  // Add resize event listener
  window.addEventListener("resize", updateDimensions);
});

onUnmounted(() => {
  // Remove resize event listener on component unmount
  window.removeEventListener("resize", updateDimensions);
});
const route = useRoute();
const localePath = useLocalePath();
// Function to return Tailwind classes based on dimensions
const deviceClasses = computed(() => {
  if (height.value <= 600) {
    if (route.path.includes("hotels")) {
      return "max-h-[380px]";
    }
    return "max-h-[470px]";
  } else if (height.value >= 610) {
    if (route.path.includes("hotels")) {
      return "max-h-[380px]";
    }
    return "max-h-[550px]";
  } else {
    return "";
  }
});

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

const selectedRooms = ref(1); // Default selected value

const handleRoomsDropdown = () => {
  const selectedCount = selectedRooms.value;

  if (selectedCount <= 5) {
    storeFilter.filter.room_count = selectedCount;
    roomsArr.value = [];

    // Populate roomsArr based on selectedCount
    for (let i = 0; i < selectedCount; i++) {
      roomsArr.value.push({
        adult: 1,
        child: 0,
        children: [],
      });
    }

    handleRooms();
  }
};
onMounted(() => {
  if (route.query.room_count) {
    selectedRooms.value = Number(route.query.room_count);
  }
});
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
  // console.log(storeFilter.filter.adult_count,storeFilter.filter.child_count,'rooms');

  storeFilter.filter.room_count = roomsArr.value.length;
  storeFilter.filter.rooms = roomsArr.value;
  let age_child = [];
  for (let i = 0; i < storeFilter.filter.room_count; i++) {
    age_child.push(roomsArr.value[i].children);
  }
  storeFilter.filter.children_age = age_child;
  storeFilter.setRoomText(t);
  console.log(roomsArr.value);

  // let adult = 0
  // let child = 0
  // roomsArr.value.forEach((room: roomOpt) => {
  //     adult += room.adult ?? 0
  //     child += room.child ?? 0
  //     while (room.ages_child.length < room.child) {
  //         room.ages_child.push(ages.value[0]) // Set default age value
  //     }
  //     room.ages_child = room.ages_child.slice(0, room.child)
  // })
  // storeFilter.filter.adult_count = adult
  // storeFilter.filter.child_count = child
  // storeFilter.filter.room_count = roomsArr.value.length
  // storeFilter.filter.rooms = roomsArr.value
  // storeFilter.setRoomText(t)
};

// watch(
//     () => storeFilter.filter.child_count,
//     (newVal, oldVal) => {
//         if (newVal > oldVal) {
//             const diff = newVal - oldVal
//             for (let i = 0; i < diff; i++) {
//                 agesArr.value.push(ages.value[4])
//             }
//         } else if (newVal < oldVal) {
//             const diff = oldVal - newVal
//             for (let i = 0; i < diff; i++) {
//                 agesArr.value.pop()
//             }
//         }
//     },
//     { deep: true }
// )
</script>

<template>
  <div
    v-if="currentWidth > 768"
    class="max-full w-full flex justify-start items-center my-2 px-2 gap-5 md:ps-4 bg-[#F7F8FC]"
  >
    <span class="w-44 text-center">كم عدد الغرف :</span>
    <div class="relative w-full">
      <select
        v-model="selectedRooms"
        @change="handleRoomsDropdown"
        class="bg-white outline-none py-0 me-5 border-neutral-400 focus:border-neutral-400 focus:outline-0 focus:ring-0 w-[90%] font-medium text-center cursor-pointer"
        style="appearance: auto"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="5">6</option>
        <option value="5">7</option>
        <option value="5">8</option>
      </select>
    </div>
  </div>
  <div
    class="max-full w-[100%] md:w-[90%] md:flex flex-row hidden justify-start my-1 md:mx-0 mx-1 items-start"
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
    :class="index < 3 ? '' : ''"
    class="max-full w-[100%] ps-1 md:flex flex-col hidden justify-start my-1 md:mx-0 mx-1 items-start"
  >
    <div class="w-full flex flex-row gap-0 justify-stretch items-center">
      <div class="text-start py-2 px-1 flex items-center md:min-w-[100px]">
        <NuxtImg
          src="/img/units/bed.svg"
          alt="feature.name"
          class="md:h-5 h-4 md:w-5 w-4 md:me-2 me-1"
        />
        {{ $t("content.room") }} {{ index + 1 }} :
      </div>

      <div
        v-if="currentWidth > 600"
        class="max-full flex justify-stretch my-2 md:px-2 px-1 md:min-w-[120px]"
      >
        <div class="flex flex-col w-full">
          <span class="text-sm text-gray py-2 w-full">{{
            $t("content.adult_count")
          }}</span>

          <select
            @change="handleRooms"
            v-model="roomsArr[index].adult"
            style="appearance: auto"
            class="bg-white outline-none py-0 w-[30px] border-neutral-400 focus:border-neutral-400 focus:outline-0 focus:ring-0 md:w-full font-medium text-center cursor-pointer"
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
          <span>(12+) yrs </span>
        </div>
      </div>

      <div
        class="max-full flex justify-between 9 md:px-3 px-1 md:min-w-[120px]"
      >
        <div class="flex flex-col w-full">
          <span class="text-sm text-gray py-2">{{
            $t("content.child_count")
          }}</span>
          <select
            @change="handleRooms"
            v-model="roomsArr[index].child"
            style="appearance: auto"
            class="bg-white outline-none py-0 w-[30px] border-neutral-400 focus:border-neutral-400 focus:outline-0 focus:ring-0 md:w-full font-medium text-center cursor-pointer"
          >
            <option selected :value="1">1</option>
            <option
              v-for="room in [2, 3, 4, 5, 6, 7, 8]"
              :key="room"
              class="text-sm md:text-base"
            >
              {{ room }}
            </option>
          </select>
          <span>(1-12) yrs </span>
        </div>
      </div>
      <!-- 
            <div class="max-full  flex-none  md:flex hidden  justify-end items-end my-2 md:px-2 px-1">
                <button v-if="index > 0" class="text-xl font-black">
                    
                    <Icon name="mdi:close" @click="removeRomeOne(index)"
                        class="md:w-8 md:h-8 w-6 h-6 object-contain md:p-2 rounded-full text-primary bg-primary/5 shadow-sm" />
                </button>

            </div> -->
    </div>

    <div
      class="max-full w-full flex-auto flex flex-row flex-wrap items-center justify-start gap-2 mt-3 px-3"
    >
      <div
        v-for="(count, iCh) in roomsArr[index].children"
        :key="iCh"
        class="relative text-center"
        v-if="roomsArr[index].children.length > 0"
      >
        <span class="text-center">child {{ iCh + 1 }}</span>
        <select
          type="text"
          class="bg-white outline-none py-0 w-[30px] border-neutral-400 focus:border-neutral-400 focus:outline-0 focus:ring-0 md:w-full font-medium text-center cursor-pointer"
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
  <div :class="deviceClasses" class="w-full overflow-y-auto">
    <div
      v-for="(count, index) in roomsArr"
      :key="index"
      :class="index < 3 ? 'border-b ' : ''"
      class="w-[350px] md:w-[90%] flex flex-col justify-start my-1 md:mx-0 mx-1 items-center pb-4 md:hidden"
    >
      <div class="w-full flex md:flex-row flex-col justify-start items-start">
        <div class="text-start flex items-center min-w-[70px]">
          <NuxtImg
            src="/img/units/bed.svg"
            alt="feature.name"
            class="md:h-5 h-4 md:w-5 w-4 md:me-2 me-1"
          />
          {{ $t("content.room") }} {{ index + 1 }}
        </div>

        <div
          class="max-full flex justify-between my-2 px-2 w-full min-w-[70px]"
        >
          <div v-if="currentWidth < 600" class="flex flex-row w-full">
            <div class="flex flex-col gap-4 w-full">
              <span> {{ $t("content.adult_count") }}</span>
              <span> {{ $t("content.child_count") }}</span>
            </div>
            <div class="self-center flex flex-col gap-4">
              <div
                class="flex items-center justify-center bg-white rounded outline-none md:w-[80px] font-medium text-center"
              >
                <button
                  class="px-2 text-white text-sm md:text-base bg-slate-500 rounded-full"
                  @click="decreaseAdultCount(index)"
                  :disabled="roomsArr[index].adult <= 0"
                >
                  -
                </button>
                <span class="mx-2">{{ roomsArr[index].adult }}</span>
                <button
                  class="px-2 text-white text-sm md:text-base bg-slate-500 rounded-full"
                  @click="increaseAdultCount(index)"
                  :disabled="roomsArr[index].adult >= 8"
                >
                  +
                </button>
              </div>
              <div
                class="flex items-center justify-center bg-white rounded outline-none md:w-[80px] font-medium text-center"
              >
                <button
                  class="px-2 text-white text-sm md:text-base bg-slate-500 rounded-full"
                  @click="decreaseChildCount(index)"
                  :disabled="roomsArr[index].child <= 0"
                >
                  -
                </button>
                <span class="mx-2">{{ roomsArr[index].child }}</span>
                <button
                  class="px-2 text-white text-sm md:text-base bg-slate-500 rounded-full"
                  @click="increaseChildCount(index)"
                  :disabled="roomsArr[index].child >= 8"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div v-if="currentWidth > 700">
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
          v-if="currentWidth > 700"
          class="max-full flex justify-between my-2 px-2 min-w-[80px]"
        >
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
          class="max-full flex-none md:hidden flex justify-end items-start self-end my-2 md:px-2"
        >
          <button
            v-if="index > 0"
            class="text-xl font-black"
            @click="removeRomeOne(index)"
          >
            <span class="text-sm text-primary">remove room </span>
            <Icon
              name="mdi:close"
              class="md:w-8 md:h-8 w-3 h-3 object-contain md:p-2 rounded-full text-primary bg-primary/5 shadow-sm"
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
          <span>Child {{ iCh + 1 }}</span>
          <select
            type="text"
            class="rounded-lg peer m-0 text-start block border-[1px] border-solid bg-primary/5 bg-clip-padding p-1 leading-tight text-dark transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.825rem] focus:text-dark focus:outline-none peer-focus:text-dark dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-dark dark:peer-focus:text-dark [&:not(:placeholder-shown)]:pb-[0.625rem]"
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
  </div>
  <div
    v-if="storeFilter.filter.room_count <= 3"
    class="max-full w-[90%] grid grid-cols-1 justify-between md:my-2 my-1 md:mx-0 mx-1"
  >
    <div
      v-if="currentWidth < 600"
      class="max-full w-full flex justify-start my-2 md:ps-4"
    >
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
</template>
<style scoped></style>
