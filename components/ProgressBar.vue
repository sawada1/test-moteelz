<template>
  <div class="progress-bar-wrapper">
    <div class="progress-bar" :style="{ width: progress + '%' }">
      <span class="progress-text">{{ Math.round(progress) }}%</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const progress = ref(0)  // Reactive progress value

// Method to set the progress (0 to 100)
const setProgress = (value) => {
  if (value >= 0 && value <= 100) {
    progress.value = value
  }
}

// Optionally, expose this function to the parent component via the `ref`
defineExpose({ setProgress })
</script>

<style scoped>
.progress-bar-wrapper {
  width: 100%;
  height: 10px;
  background-color: #f3f3f3;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: #4caf50;
  width: 0;
  transition: width 0.3s ease;
  position: relative;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
}
</style>
