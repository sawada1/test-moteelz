<template>
  <div>
    <div
      class="fixed right-[50%] translate-x-[50%] bottom-[75px] z-50 flex md:hidden justify-center items-center px-4 py-2 gap-2 rounded-3xl border border-[white] bg-primary w-fit mx-auto mt-4"
    >
      <div class="flex justify-center items-center gap-1">
        <div
          class="flex justify-center items-center gap-1"
          v-if="!searchStore.MAP"
          @click="openMapFunction"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#fff"
              stroke-width="2"
              d="M15 15h4l3 7H2l3-7h4m4-7a1 1 0 1 1-2 0a1 1 0 0 1 2 0M6 8c0 5 6 10 6 10s6-5 6-10c0-3.417-2.686-6-6-6S6 4.583 6 8Z"
            />
          </svg>
          <span class="text-white text-sm">
            {{ $t("content.btnMap") }}
          </span>
        </div>
        <div
          v-else
          class="flex justify-center items-center gap-1 flex-1"
          @click="searchStore.MAP = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              fill-rule="evenodd"
              d="M10.948 1.25h2.104c.899 0 1.648 0 2.242.08c.628.084 1.195.27 1.65.725c.456.456.642 1.023.726 1.65c.08.595.08 1.345.08 2.243V7.25c.577 0 1.065.005 1.469.046c.473.048.913.153 1.309.417c.3.201.558.459.759.76c.264.395.369.835.417 1.308c.046.452.046 1.011.046 1.68v9.789H22a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1 0-1.5h.25v-9.788c0-.67 0-1.229.046-1.681c.048-.473.153-.913.417-1.309c.201-.3.459-.558.76-.759c.395-.264.835-.369 1.308-.417c.404-.041.892-.045 1.469-.046V5.948c0-.898 0-1.648.08-2.242c.084-.628.27-1.195.725-1.65c.456-.456 1.023-.642 1.65-.726c.595-.08 1.345-.08 2.243-.08M6.25 8.75c-.583 0-.994.005-1.317.038c-.355.036-.519.1-.627.173a1.3 1.3 0 0 0-.345.345c-.073.108-.137.272-.173.627c-.037.367-.038.85-.038 1.567v9.75h2.5zm1.5 12.5h3.5V19a.75.75 0 0 1 1.5 0v2.25h3.5V6c0-.964-.002-1.612-.067-2.095c-.062-.461-.169-.659-.3-.789s-.327-.237-.788-.3c-.483-.064-1.131-.066-2.095-.066h-2c-.964 0-1.612.002-2.095.067c-.461.062-.659.169-.789.3s-.237.327-.3.788C7.753 4.388 7.75 5.036 7.75 6zm10 0h2.5V11.5c0-.718 0-1.2-.038-1.567c-.036-.355-.1-.519-.173-.627a1.3 1.3 0 0 0-.344-.345c-.109-.073-.273-.137-.628-.173c-.323-.033-.734-.037-1.317-.038zM9.25 5a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 9.25 5m0 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 9.25 8m0 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m0 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-white text-xs text-nowrap">
            {{ $t("content.view_all_units") }}
          </span>
        </div>
      </div>
      <div
        class=" rtl:border-r-[white] rtl:border-r rtl:pr-2 ltr:border-l-[white] ltr:border-l ltr:pl-2"

        @click="updateModalFilters"
      >
        <div class="flex justify-center items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path
              d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"
            />
          </svg>
          <span class="text-white text-sm">
            {{ $t("content.filter") }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useSearchStore } from "@/stores/hotels/search";
const searchStore = useSearchStore();
const emits = defineEmits(['updateModalFilterStatus','openMap'])
const updateModalFilters = ()=>{
  emits('updateModalFilterStatus',true)
}
const openMapFunction = ()=>{
  emits('openMap',true)
}
</script>
