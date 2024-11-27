<script lang="ts" setup>
import { VueFinalModal } from "vue-final-modal";
interface Props {
  modelValue: boolean;
  size: string;
  title: string;
  icon: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  size: "medium",
  title: "",
  icon: "",
});
const emit = defineEmits<{
  (e: "update:modelValue", modelValue: boolean): void;
}>();
const isVisible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    isVisible.value = newVal;
  }
);
const modalSizeClasses = computed(() => {
  switch (props.size) {
    case "small":
      return "w-5/6  lg:w-2/6";
    case "large":
      return "w-full lg:w-4/5";
    default:
      return "w-5/6 lg:w-3/5"; // Default size classes
  }
});
</script>
<template>
  <VueFinalModal
    :click-to-close="false"
    v-model="isVisible"
    @update:model-value="(val) => $emit('update:modelValue', val)"
    class="flex justify-center items-center"
    :content-class="`filter-modal relative border-[1px] border-[#999] rounded-md pt-4 px-1 md:pt-0 md:px-0  flex flex-col max-h-full items-center ${modalSizeClasses}`"
  >
    <div
      class="relative rounded-md bg-white flex pt-16 md:pt-10 flex-col left-0 h-screen overflow-y-hidden overflow-x-hidden outline-none lg:my-8 lg:w-[55%] w-full max-h-[85vh] lg:max-h-[100vh]"
    >
      <ClientOnly>
        <div class="flex absolute top-[6px] w-full px-4">
          <h1 class="text-[#312B72] text-[32px] font-[400] my-0">
            {{ $t("content.filter") }}
          </h1>
          <button
            style="
              inset-inline-end: 6px;
              position: absolute;
              top: 6px;
              z-index: 9;
              border-radius: 50%;
              background-color: rgba(0, 0, 0, 0.32);
            "
            class="ml-auto p-1 group z-50 w-8 h-8 flex items-center justify-center"
            @click="$emit('update:modelValue', false)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z"
              />
            </svg>
          </button>
        </div>
      </ClientOnly>

      <div class="z-50">
        <slot />
      </div>
    </div>
  </VueFinalModal>
</template>

<style>
.filter-modal {
  position: fixed;
  top: 10vh;
  left: 20px;
  width: 90%;
  height: 80vh;
  background: white;
  z-index: 9999999999;
  transform: translateY(-5%);
}
</style>
