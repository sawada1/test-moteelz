<template>
  <div class="col-span-12 flex gap-4 items-center justify-end">
    <div
      class="px-8 py-3 rounded-lg transition-all transition-duration-300 flex items-center gap-2 cursor-pointer"
      :class="
        !rowShow ? 'bg-[#F1EDFF] text-[#875FFF]' : 'bg-[#FDFDFD] text-[#6F6F6F]'
      "
      @click="changeDisplayData(false)"
    >
     <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 256 256"
      >
        <path
          :fill="!rowShow ? '#875FFF' : '#6F6F6F'"
          d="M76 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16m52-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16m68 32a16 16 0 1 0-16-16a16 16 0 0 0 16 16M60 112a16 16 0 1 0 16 16a16 16 0 0 0-16-16m68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16m68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16M60 180a16 16 0 1 0 16 16a16 16 0 0 0-16-16m68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16m68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16"
        />
      </svg>
      <span class="mt-1">
        {{ $t("content.list") }}
      </span>
    </div>
    <div
      class="px-8 py-3 rounded-lg transition-all transition-duration-300 flex items-center gap-2 cursor-pointer"
      :class="
        rowShow ? 'bg-[#F1EDFF] text-[#875FFF]' : 'bg-[#FDFDFD] text-[#6F6F6F]'
      " 
      @click="changeDisplayData(true)"
    >
     <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          :fill="rowShow ? '#875FFF' : '#6F6F6F'"
          d="M10 19q-.425 0-.712-.288T9 18t.288-.712T10 17h10q.425 0 .713.288T21 18t-.288.713T20 19zm0-6q-.425 0-.712-.288T9 12t.288-.712T10 11h10q.425 0 .713.288T21 12t-.288.713T20 13zm0-6q-.425 0-.712-.288T9 6t.288-.712T10 5h10q.425 0 .713.288T21 6t-.288.713T20 7zM5 20q-.825 0-1.412-.587T3 18t.588-1.412T5 16t1.413.588T7 18t-.587 1.413T5 20m0-6q-.825 0-1.412-.587T3 12t.588-1.412T5 10t1.413.588T7 12t-.587 1.413T5 14m0-6q-.825 0-1.412-.587T3 6t.588-1.412T5 4t1.413.588T7 6t-.587 1.413T5 8"
        />
      </svg>
    
      

      <span class="mt-1">
        {{ $t("content.column") }}
      </span>
    </div>
  </div>
</template>
<script setup>
import { watch } from "vue";
const props = defineProps({
  row: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["changeDisplayData"]);
const rowShow = ref(false);
const {row} = toRefs(props)
watch(
  () =>row.value,
  (val) => {
    rowShow.value = val;
  }
);
const changeDisplayData = (val) => {
  rowShow.vlue = val;
  emits("changeDisplayData", val);
};
</script>
