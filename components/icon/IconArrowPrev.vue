<template>
    <div>
        <svg :width="width" :height="height" viewBox="0 0 119 126" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_434_798)">
                <path
                    d="M56 83C69.234 83 80 72.234 80 59C80 45.766 69.234 35 56 35C42.766 35 32 45.766 32 59C32 72.234 42.766 83 56 83ZM48.586 57.586L58.586 47.586C58.976 47.196 59.488 47 60 47C60.512 47 61.0241 47.196 61.4141 47.586C62.196 48.368 62.196 49.632 61.4141 50.414L52.828 59L61.414 67.586C62.1959 68.368 62.1959 69.632 61.414 70.414C60.632 71.1959 59.368 71.1959 58.586 70.414L48.586 60.4139C47.804 59.632 47.804 58.368 48.586 57.586Z"
                    fill="#FEFEFE" />
            </g>
            <defs>
                <filter id="filter0_d_434_798" x="-6.6" y="0.400002" width="125.2" height="125.2"
                    filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="19.3" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_434_798" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_434_798" result="shape" />
                </filter>
            </defs>
        </svg>
    </div>
</template>
<script setup>
const props = defineProps({
    width:{
        type:String,
        default:'119'
    },
    height:{
        type:String,
        default:'126'
    },
})
</script>