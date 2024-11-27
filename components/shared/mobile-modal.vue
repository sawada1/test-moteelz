<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal'

interface Props {
  modelValue: boolean
  size: string
  title: string
  icon: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  size: 'medium',
  title: '',
  icon: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

const isVisible = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    isVisible.value = newVal
  }
)

const closeModal = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <VueFinalModal
    v-model="isVisible"
    :click-to-close="false"
    @update:model-value="(val) => $emit('update:modelValue', val)"
    class="flex justify-center items-center w-screen h-screen"
    :content-class="`relative w-full h-full bg-white flex flex-col overflow-hidden`"
  >
 
    <div class="relative w-full h-full bg-white">
 
      <header class="w-full bg-purple-600 text-white flex justify-end items-center p-4">
        <button
          class="mr-4"
          @click="closeModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        <h2 class="text-lg font-bold">{{ props.title }}</h2>
      </header>

      <!-- Main Content -->
      <div class="flex-grow overflow-auto p-4">
        <slot />
      </div>
    </div>
  </VueFinalModal>
</template>

<style scoped>
 
.fullscreen-modal {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: white;
  overflow: hidden;
}
</style>
