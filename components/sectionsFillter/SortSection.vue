<template>
  <div class="mb-4">
    <label class="block text-lg font-semibold mb-2">{{ $t('fillter.Sortby') }}</label>
    <div class="relative">
      <select :value="'choose'" @change="updateSortBy($event.target.value)" class="custom-select w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <option value="choose">{{ $t('fillter.Choose') }}</option>
        <option v-for="(type, index) in sortBy" :key="index" :value="type.key">{{ type.label }}</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"/></svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sortBy: String
  },
  methods: {
    updateSortBy(newSortBy) {
      this.$emit('updateSortBy', newSortBy);
    }
  }
}
</script>
<style scoped>
.custom-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2.5rem;
}

.custom-select::-ms-expand {
  display: none;
}

.custom-select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
}
</style>
