<template>
  <div>
    <div
      v-if="hasErrors"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong class="font-bold">Validation Error:</strong>
      <ul class="mt-2 list-disc list-inside">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ errors: Array<string> }>()
const hasErrors = computed(() => props.errors && props.errors.length > 0)
</script>

<style>
</style>

