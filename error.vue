<template>
    <div>
        <div>
            <section class="bg-white flex items-center justify-center min-h-[100vh]">
    <div class="py-8 flex container flex-col items-center gap-10 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 mt-[]">
        <img src="/logo.png" class="w-[330px] " alt="">
        <Vue3Lottie :animation-data="error404"  :height="400" :width="400" />
        <div class="mx-auto max-w-screen-sm text-center">
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white"> {{ $t('missing1') }} </p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400"> {{ $t('missing2') }} </p>
            <nuxt-link :to="localePath('/')">
                <Button class="text-white mt-4"> {{ $t('backHome') }} </Button>
            </nuxt-link>
        </div>   
    </div>
</section>
        </div>
    </div>
</template>
<script setup>
defineProps(["error"]);
import { Vue3Lottie } from "vue3-lottie";
import error404 from "../assets/animations/error404.json";
const localePath = useLocalePath();
</script>
<style lang="">
    
</style>