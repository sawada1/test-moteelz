<template>
  <label class="switch">
    <!-- <span class="text-[15px]">{{ label }}</span>
    <input type="checkbox" :checked="modelValue" @change="toggleValue" />
    <span class="slider round"></span> -->
  </label>
</template>

<script setup>
// import { useFilterUnits } from '~/stores/hotels/filter'
// import { ref, defineProps, defineEmits } from 'vue'

// // استدعاء استخدام المتجر، إذا كان هناك حاجة لذلك
// const filterStore = useFilterUnits()

// // تعريف الخصائص
// const props = defineProps({
//   label: String,
//   modelValue: Boolean
// })

// // تعريف الأحداث
// const emit = defineEmits(['update:modelValue'])

// // تعريف طريقة تبديل القيمة
// const toggleValue = (event) => {
//   filterStore.filter.includeTaxes = event.target.checked
//   emit('update:modelValue', event.target.checked)
// }
</script>

<style scoped>
.switch {
  display: flex;
  align-items: center;
  gap: 20px;
}

.switch input {
  display: none;
}

.switch .slider {
  position: relative;
  width: 50px;
  height: 25px;
  background-color: #ccc;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.4s;
  position: relative;
}

.switch .slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.4s;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
}

.switch input:checked + .slider {
  background-color: #765BEB;
}

.switch input:checked + .slider:before {
  transform: translate(24px, -50%);
}

.slider.round {
  border-radius: 25px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
