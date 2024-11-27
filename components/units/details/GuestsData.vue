<template>
  <div class="grid grid-cols-2 gap-4 w-full">
    <div
      class="grid md:col-span-1 col-span-2 items-center gap-1"
      v-for="(i, index) in availableOptions[0]?.adults"
      :key="i"
    >
      <div class="md:text-md text-sm">
        {{ $t('content.rooms') }} ({{ index + 1 }}) : {{ availableOptions[0]?.title }} -
        {{ availableOptions[0]?.features[0]?.title }}
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label for="guest_full_name" class="font-bold">
          {{ $t('content.guest_full_name') }}<span class="text-error">*</span>
        </label>
        <input
          type="text"
          class="rounded-lg w-full text-start p-2 border border-bg-gray-200 text-dark focus:border-primary focus:outline-none"
          id="guest_full_name"
          v-model="guestsData[index]"
          required
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useBookings } from '~/stores/booking'

  const storeBooking = useBookings()

  const props = defineProps({
    guestsData: Array,
    availableOptions: Array
  })

  const emit = defineEmits(['update:guestsData'])

  const guestsData = computed({
    get() {
      return props.guestsData
    },
    set(value) {
      emit('update:guestsData', value)
    }
  })

  const getCurrentOpt = (id) => {
    const option = props.availableOptions.find((item) => item.id === id)
    return option
  }
</script>
