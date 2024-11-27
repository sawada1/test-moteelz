<template>
  <div>
    <div class="minmax-inputs">
      <h1 class="text-[15px] font-bold  !m-[15px_0px] bg-[#FDFDFD] border rounded-lg uppercase border-[#E9E9E9] px-5 py-2">
        {{ sliderMinValue }} {{ $t("fillter.currency") }}
      </h1>
      <h1 class="text-[15px] font-bold  !m-[15px_0px] bg-[#FDFDFD] border rounded-lg uppercase border-[#E9E9E9] px-5 py-2">
        {{ sliderMaxValue }} {{ $t("fillter.currency") }}
      </h1>
    </div>
    <div
      ref="slider"
      class="custom-slider minmax flex flex-row rtl:flex-row ltr:flex-row"
    >
      <div
        class="minmax-indicator rtl:before:right-[var(--progressLeft)] rtl:before:left-[var(--progressRight)] ltr:before:left-[var(--progressLeft)] ltr:before:right-[var(--progressRight)]"
      ></div>
    {{ min }}
    <!-- {{ max }} -->
      <input
        ref="inputMin"
        type="range"
        name="min"
        id="min"
        :min="min"
        :max="max"
        :value="sliderMinValue"
        :step="step"
        @input="onInput"
        @change="onMouseUp"
      />
      <input
        ref="inputMax"
        type="range"
        name="max"
        id="max"
        :min="min"
        :max="max"
        :value="sliderMaxValue"
        :step="step"
        @input="onInput"
        @change="onMouseUp"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";

const { min, max, step, minValue, maxValue } = defineProps({
  min: {
    type: Number,
    default: 20,
  },
  max: {
    type: Number,
    default: 1000,
  },
  step: {
    type: Number,
    default: 1,
  },
  minValue: {
    type: Number,
    default: 1000,
  },
  maxValue: {
    type: Number,
    default: 3000,
  },
});

const emit = defineEmits(["update:minValue", "update:maxValue"]);

const slider = ref(null);
const inputMin = ref(null);
const inputMax = ref(null);
const sliderMinValue = ref(minValue);
const sliderMaxValue = ref(maxValue);
watch(()=>[minValue,maxValue],(val)=>{
  console.log(val,'prices');
  
})
const getPercent = (value, min, max) => {
  return ((value - min) / (max - min)) * 100;
};

const sliderDifference = computed(() => {
  return Math.abs(sliderMaxValue.value - sliderMinValue.value);
});

const setCSSProps = (left, right) => {
  slider.value.style.setProperty("--progressLeft", `${left}%`);
  slider.value.style.setProperty("--progressRight", `${right}%`);
};

watchEffect(() => {
  if (slider.value) {
    const leftPercent = getPercent(sliderMinValue.value, min, max);
    const rightPercent = 100 - getPercent(sliderMaxValue.value, min, max);
    setCSSProps(leftPercent, rightPercent);
  }
});

const onInput = ({ target }) => {
  if (target.name === "min") {
    target.value > sliderMaxValue.value
      ? (target.value = sliderMaxValue.value)
      : (sliderMinValue.value = parseFloat(target.value));
  }

  if (target.name === "max") {
    target.value < sliderMinValue.value
      ? (target.value = sliderMinValue.value)
      : (sliderMaxValue.value = parseFloat(target.value));
  }
};

const onMouseUp = () => {
  emit("update:minValue", [sliderMinValue.value, sliderMaxValue.value]);
};
</script>

<style lang="scss" scoped>
:root {
  --vt-c-white: #ffffff;
  --vt-c-white-soft: #f8f8f8;
  --vt-c-white-mute: #f2f2f2;

  --vt-c-black: #181818;
  --vt-c-black-soft: #222222;
  --vt-c-black-mute: #282828;

  --vt-c-indigo: #2c3e50;

  --vt-c-divider-light-1: rgba(60, 60, 60, 0.29);
  --vt-c-divider-light-2: rgba(60, 60, 60, 0.12);
  --vt-c-divider-dark-1: rgba(84, 84, 84, 0.65);
  --vt-c-divider-dark-2: rgba(84, 84, 84, 0.48);

  --vt-c-text-light-1: var(--vt-c-indigo);
  --vt-c-text-light-2: rgba(60, 60, 60, 0.66);
  --vt-c-text-dark-1: var(--vt-c-white);
  --vt-c-text-dark-2: rgba(235, 235, 235, 0.64);
}

/* semantic color variables for this project */
:root {
  --color-background: var(--vt-c-white);
  --color-background-soft: var(--vt-c-white-soft);
  --color-background-mute: var(--vt-c-white-mute);

  --color-border: var(--vt-c-divider-light-2);
  --color-border-hover: var(--vt-c-divider-light-1);

  --color-heading: var(--vt-c-text-light-1);
  --color-text: var(--vt-c-text-light-1);

  --section-gap: 160px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--vt-c-black);
    --color-background-soft: var(--vt-c-black-soft);
    --color-background-mute: var(--vt-c-black-mute);

    --color-border: var(--vt-c-divider-dark-2);
    --color-border-hover: var(--vt-c-divider-dark-1);

    --color-heading: var(--vt-c-text-dark-1);
    --color-text: var(--vt-c-text-dark-2);
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

body {
  min-height: 100vh;
  color: var(--color-text);
  background: var(--color-background);
  transition: color 0.5s, background-color 0.5s;
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: #dc8400;
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(27, 74%, 50%, 0.2);
  }
}

.slider-cont {
  width: 300px;
}

.custom-slider {
  --trackHeight: 8px;
  --thumbRadius: 0rem;
}

/* style the input element with type "range" */
.custom-slider input[type="range"] {
  position: relative;
  appearance: none;
  background: none;
  border-radius: 999px;
  z-index: 0;
  height: 100%;
  pointer-events: none;
}

/* ::before element to replace the slider track */
.custom-slider input[type="range"]::before {
  content: "";
  display: block;
  position: absolute;
  width: var(--ProgressPercent, 100%);
  height: 100%;
  background: #f5c000;
  border-radius: 2px;
}

/* `::-webkit-slider-runnable-track` targets the track (background) of a range slider in chrome and safari browsers. */
.custom-slider input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  background: #cfed0b;
  height: var(--trackHeight);
  border-radius: 2px;
}

.custom-slider input[type="range"]::-webkit-slider-thumb {
  position: relative;
  width: 15px;
  height: 15px;
  margin-top: calc((var(--trackHeight) - 15px) / 2);
  background: #875FFF;
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
  cursor: pointer;
}

/* `::-moz-range-track` targets the track (background) of a range slider in Mozilla Firefox. */
.custom-slider.default input[type="range"]::-moz-range-track {
  appearance: none;
  background: #0f4eba;
  height: var(--trackHeight);
  border-radius: 999px;
}

.custom-slider input[type="range"]::-moz-range-thumb {
  position: relative;
  box-sizing: border-box;
  width: var(--thumbRadius);
  height: var(--thumbRadius);
  margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
  background: #157d5e;
  border: 1px solid #00a370;
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
}

.custom-slider.minmax {
  position: relative;
  height: 5px;
  background: #EEF2F5;
  border-radius: 5px;
  margin: 5px 0px 35px 0px;
  --progressLeft: 0%;
  --progressRight: 0%;
}

.custom-slider .minmax-indicator {
  position: absolute;
  height: 100%;
  pointer-events: none;
  left: var(--thumbRadius);
  right: var(--thumbRadius);
}

.custom-slider .minmax-indicator::before {
  content: "";
  position: absolute;
  background: #765beb;
  height: 100%;
}
.custom-slider.minmax input[type="range"] {
  position: absolute;
  width: calc(100% - var(--thumbRadius));
}

.custom-slider.minmax input[type="range"][name="max"] {
  left: var(--thumbRadius);
}

.custom-slider.minmax input[type="range"]::-webkit-slider-runnable-track {
  background: none;
}

.custom-slider.minmax input[type="range"]::before {
  display: none;
}

.minmax-inputs {
  display: flex;
  justify-content: space-between;
}

.minmax-inputs input {
  width: 50px;
}
</style>
