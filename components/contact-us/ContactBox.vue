<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  }
});
</script>
<template>
        <div
        class="hover:bg-[#886CE4] hover:drop-shadow-2xl relative hover:bottom-11 !transition-all ease-in-out duration-75  group flex flex-col bg-white w-full justify-center items-center gap-10 rounded-[25px] p-5 ">
        <div class=" bg-[#F7F5FC] rounded-full p-5 w-fit ">
            <img :src="`/icons/${iconName}.svg`" alt="icon" />

        </div>
        <span class="text-[#AC0054] group-hover:text-white text-2xl font-semibold">{{$t(`${title}`)}}</span>
        <span class="text-[#696871] group-hover:text-white">{{details}}</span>
      </div>
</template>