<script lang="ts" setup>
  import { useContact } from '~/composables/useContact'
  const { whatsapp } = useContact()

  const props = defineProps<{
    text?: string
    color?: boolean
    hide?: boolean
    border?: boolean
    prime?: boolean
  }>()
</script>

<template>
  <button
    @click="whatsapp"
    class="join px-12 py-4 cursor-pointer rounded font-bold flex justify-center items-center w-fit"
    :class="hide ? 'md:flex hidden' : ''"
  >
    <span> {{ text ? '' : $t('content.contact_us') }} </span>
  </button>
</template>

<style lang="scss">
  .join {
    background: linear-gradient(270deg, #34c8f6 0%, #0039a7 99.99%, #0039a7 100%);
    color: var(--light);
    transition: all 0.3s ease-in-out;

    &.social {
      background-color: transparent;
      color: var(--light);
    }

    &:hover {
      animation: rotateStorm 0.7s ease-in-out both;
    }
  }
</style>
