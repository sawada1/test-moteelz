<template>
  <div class="flex w-full mt-3">
    <div class="flex flex-col w-full">
      <div class="flex flex-row">
        <span class="mb-1 font-bold md:text-lg text-sm">
          {{ $t('content.guestsAndRooms') }} :
        </span>
      </div>
      <div class="flex flex-row w-full mt-[-5px] justify-start md:ps-10">
        <div class="flex flex-col w-full mx-3 md:w-[60%]">
          <div
            class="flex flex-row justify-between pt-1 md:pt-2"
            v-for="item in initalArray"
            :key="item.id"
          >
            <div class="flex flex-col md:text-[16px] text-[14px]">
              {{ $t(item.name) }}
            </div>
            <div class="flex flex-col md:w-[60%] w-[40%]">
              <div class="grid grid-cols-3 w-full">
                <button
                  class="col-span-1 flex items-center justify-center cursor-pointer"
                  @click="changeValue('minus', item)"
                >
                  <Icon
                    name="mdi:minus"
                    class="border rounded-full h-5 w-5 md:h-6 md:w-6 border-dark/60 text-dark/70"
                  />
                </button>
                <div class="col-span-1 flex items-center justify-center text-[14px]">
                  {{ item.value }}
                </div>
                <button
                  class="col-span-1 flex items-center justify-center cursor-pointer"
                  @click="changeValue('add', item)"
                >
                  <Icon
                    name="mdi:plus"
                    class="border rounded-full h-5 w-5 md:h-6 md:w-6 border-dark/60 text-dark/70"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    guestsRooms: Object
  })

  const emit = defineEmits(['update:guestsRooms'])

  const guestsRooms = computed({
    get() {
      return props.guestsRooms
    },
    set(guestsRooms) {
      emit('update:guestsRooms', guestsRooms)
    }
  })

  const initalArray = ref([
    {
      id: 1,
      name: 'content.bedrooms',
      value: 1
    },
    {
      id: 2,
      name: 'content.beds',
      value: 1
    },
    {
      id: 3,
      name: 'content.thePersons',
      value: 1
    },
    {
      id: 4,
      name: 'content.bathrooms',
      value: 1
    }
  ])
  watch(initalArray.value, (newVal, oldVal) => {
    if (newVal && guestsRooms && guestsRooms !== undefined) {
      newVal.forEach((item) => {
        switch (item.id) {
          case 1:
            guestsRooms.value.bedrooms = item.value
            break
          case 2:
            guestsRooms.value.beds = item.value
            break
          case 3:
            guestsRooms.value.persons = item.value
            break
          case 4:
            guestsRooms.value.bathrooms = item.value
            break

          default:
            break
        }
      })
    }
  })
  const changeValue = (flag: string, item: any) => {
    if (flag == 'add') {
      initalArray.value.forEach((arrItem) => {
        if (arrItem.id === item.id) {

          if (arrItem.value < 10) {
            arrItem.value += 1
          }

          if(arrItem.id === 3) {
            if (arrItem.value / initalArray.value[0].value > 2) {
              initalArray.value[0].value++
            }
          }
        }
      })
    }
    if (flag == 'minus') {
      initalArray.value.forEach((arrItem) => {
        if (arrItem.id === item.id) {
          if (arrItem.value !== 1) {
            arrItem.value -= 1
          }
        }
      })
    }
  }
  onMounted(() => {
    initalArray.value.forEach((item) => {
      switch (item.id) {
        case 1:
          item.value = guestsRooms.value.bedrooms
          break
        case 2:
          item.value = guestsRooms.value.beds
          break
        case 3:
          item.value = guestsRooms.value.persons
          break
        case 4:
          item.value = guestsRooms.value.bathrooms
          break

        default:
          break
      }
    })
  })
  watch(guestsRooms, (newVal, oldVal) => {
    initalArray.value.forEach((item) => {
      switch (item.id) {
        case 1:
          item.value = guestsRooms.value.bedrooms
          break
        case 2:
          item.value = guestsRooms.value.beds
          break
        case 3:
          item.value = guestsRooms.value.persons
          break
        case 4:
          item.value = guestsRooms.value.bathrooms
          break

        default:
          break
      }
    })
  })
</script>
