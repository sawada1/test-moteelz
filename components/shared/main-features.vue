<template>
  <div
    class="grid sm:grid-cols-3 md:grid-cols-6 grid-cols-4 md:grid-rows-1 grid-rows-2 md:text-[12px] text-[11px] gap-x-2 md:gap-x-0 gap-y-3 md:mx-0 mx-1 border rounded p-2 md:p-3"
  >
    <div
      v-for="(feature, i) in features"
      :key="i"
      class="flex flex-row md:flex-col items-center md:bg-transparent bg-dark/5 rounded-lg md:p-0 p-[6px] w-full"
      v-show="['uuid-10', 6, 7].includes(feature.id)"
    >
      <div class="md:flex-row flex-col flex md:items-end items-center w-full">
        <Icon
          v-if="feature.icon"
          :name="feature.icon"
          class="md:h-5 h-4 md:w-5 w-4 md:me-2 text-primary"
        />
         <NuxtImg
          v-else
          :src="feature.image"
          :alt="feature.name"
          class="md:h-5 h-4 md:w-5 w-4 md:me-2"
        />

        <div
          v-if="feature.name"
          class="flex items-center md:text-[15px] text-xs mt-2 text-center text-nowrap"
        >
          {{ feature.value }}
          {{ feature.name }}
        </div>
      </div>
    </div>
    <div class="flex-row items-center md:col-span-6 col-span-4 border-b w-full"></div>
    <div class="flex-row items-center md:col-span-6 col-span-4">
      <div class="flex flex-wrap w-full justify-start">
        <div v-for="(group, key) in groupedData" :key="key" class="mb-4">
          <div class="!text-lg w-full mx-3 flex items-center justify-start">
             <NuxtImg
            class="pe-1 h-6 w-6"
              v-if="mainFeaturesScheme[groupedData[key][0].feature_category_id]"
              :src="mainFeaturesScheme[groupedData[key][0].feature_category_id]"
            />
            {{ key }}
          </div>
          <div
            class="w-full mx-3 flex items-center justify-start"
            v-for="item in group.filter((ft) => !['uuid-10', 6, 7].includes(ft.id))"
            :key="item.id"
          >
            <Icon name="mdi:check" class="text-gray-500 h-5 w-5 pe-1" />
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  bedrooms: Number,
  capacity: Number,
  bathrooms: Number,
  square_area: Number,
  floor_number: Number,
  rest_features: {
    type: Array,
    default: []
  }
})
const { t, locale } = useI18n()
const mainFeaturesScheme = {
  0: '/img/units/general-features.svg',
  1: '/img/units/building.svg',
  2: '',
  3: '/img/units/wc.svg',
  4: '/img/units/tent.svg',
  5: '/img/units/weather.svg',
  6: '/img/units/entertainment.svg',
  7: '/img/units/room-specs.svg',
}
const features = ref([])
onMounted(() => {
  if (props.bathrooms) {
    features.value.push({
      id: 'uuid-10',
      name: t('content.bedrooms'),
      image: '/img/units/bed.svg',
      value: props.bathrooms
    })
  }

  if (props.capacity) {
    features.value.push({
      id: 'uuid-10',
      name: t('content.persons'),
      image: '/img/units/person.svg',
      value: props.capacity
    })
  }

  if (props.capacity) {
    features.value.push({
      id: 'uuid-10',
      name: t('content.bathrooms'),
      image: '/img/units/bath.svg',
      value: props.capacity
    })
  }

  if (props.square_area) {
    features.value.push({
      id: 'uuid-10',
      name: t('content.space'),
      image: '/img/units/area.svg',
      value: props.square_area
    })
  }

  if (props.floor_number) {
    features.value.push({
      id: 'uuid-10',
      name: t('content.floor'),
      image: '/img/units/floor.png',
      value: props.floor_number
    })
  }
  if (props.rest_features.length) {

    features.value.push(...props.rest_features)
  }
  features.value.sort((a, b) => a.feature_category_id - b.feature_category_id)
})

const groupedData = computed(() => {
  const grouped = {}
  features.value.forEach((item) => {
    if (item.feature_category_id !== undefined) {
      if (item.feature_category_id == null) {
        item.feature_category_id = '0'
      }

      if (!grouped[item.featureCategory.name]) {
        grouped[item.featureCategory.name] = []
      }
      grouped[item.featureCategory.name].push(item)
    }
  })
  return grouped
})
</script>
