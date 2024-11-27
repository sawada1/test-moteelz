<template>
  <Disclosure as="div" class="mt-2" v-slot="{ open }">
    <DisclosureButton
      class="flex items-center w-full justify-between rounded-lg bg-white px-4 py-4  text-left text-sm font-medium text-[#312B72] hover:bg-purple-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
    >
      <span class="text-[18px]">
        {{header}}
      </span>
      <!-- <ChevronUpIcon
        :class="open ? 'rotate-180 transform' : ''"
        class="h-5 w-5 text-purple-500"
      /> -->
      <svg xmlns="http://www.w3.org/2000/svg" v-if="!open" width="24" height="24" viewBox="0 0 24 24"><path fill="#875FFF" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" v-else width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#875FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 15l6-6l6 6"/></svg>
    </DisclosureButton>
    <DisclosurePanel class="px-3 pb-2 pt-4 text-sm text-gray-500 bg-white max-h-[450px] overflow-y-scroll">
        <slot />    
    </DisclosurePanel>
  </Disclosure>
</template>
<script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
  const props = defineProps({
    header:{
        type:String,
        default:''
    }
  })
</script>
