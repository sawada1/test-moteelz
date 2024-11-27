<script lang="ts" setup>
import { string } from 'zod';

const props = defineProps({
    countryCode : {
        type : string,
     
    },
 
})
</script>
<template>

        <NuxtImg width="20px" :src="'https://purecatamphetamine.github.io/country-flag-icons/3x2/'+props.countryCode+'.svg'" />

</template>