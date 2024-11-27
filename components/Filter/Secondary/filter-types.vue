<template>
  <div class="flex w-full">
    <div class="flex flex-col w-full p-2">
      <div class="flex flex-row">
        <span class="mb-1 font-bold md:text-lg text-sm">
          {{ $t('content.category') }} :
        </span>
      </div>
      <div class="flex flex-row w-full">
        <div class="grid grid-cols-3 w-full items-center md:mx-10 mx-1">
          <div
            class="col-span-1 w-full md:w-fit flex items-center gap-x-2 cursor-pointer"
            v-for="item in hostingTypes"
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
  const props = defineProps({
    filteredTypes: Array
  })

  const hostingTypes = ref([
    {
      id: 1,
      name: 'فندق',
      is_selected: false
    },
    {
      id: 2,
      name: 'شقة سكنية',
      is_selected: false
    },
    {
      id: 3,
      name: 'شقة مخدومة',
      is_selected: false
    },
    {
      id: 4,
      name: 'مبنى سكني',
      is_selected: false
    },
    {
      id: 5,
      name: 'غرفة مشتركة',
      is_selected: false
    },
    {
      id: 6,
      name: 'سكن موظفين',
      is_selected: false
    },
    {
      id: 7,
      name: 'برج',
      is_selected: false
    },
    {
      id: 8,
      name: 'سكن شباب',
      is_selected: false
    },
    {
      id: 9,
      name: 'شالية',
      is_selected: false
    }
  ])

  const emit = defineEmits(['update:filteredTypes'])
  const toggleItem = (itemId: number) => {
    if (!itemId) {
      return
    }

    if (!filteredTypes.value?.includes(itemId)) {
      hostingTypes.value.forEach((item) => {
        if (item.id === itemId) {
          item.is_selected = true
        }
      })
      filteredTypes.value?.push(itemId)
    } else if (filteredTypes.value?.includes(itemId)) {
      const itemIndex = filteredTypes.value.findIndex((i) => i === itemId)
      filteredTypes.value.splice(itemIndex, 1)
      hostingTypes.value.forEach((item) => {
        if (item.id === itemId) {
          item.is_selected = false
        }
      })
    }
  }
  const filteredTypes = computed({
    get() {
      return props.filteredTypes
    },
    set(filteredTypes) {
      emit('update:filteredTypes', filteredTypes)
    }
  })
  onMounted(() => {
    hostingTypes.value.forEach((item) => {
      if (!filteredTypes.value?.includes(item.id)) {
        item.is_selected = false
      } else if (filteredTypes.value?.includes(item.id)) {
        item.is_selected = true
      }
    })
  })
  watch(filteredTypes, (newVal, oldVal) => {
    if (newVal.length < 1) {
      hostingTypes.value.forEach((item) => {
        item.is_selected = false
      })
    }
  })
</script>
