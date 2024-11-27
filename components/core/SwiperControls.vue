<script setup lang="ts">
  const swiper = useSwiper()
</script>

<template>
  <div class="controls cursor-pointer">
    <button @click="swiper.slideNext()" class="next">N</button>
    <button @click="swiper.slidePrev()" class="prev mx-2">P</button>
  </div>
</template>

<style lang="scss">
  .controls {
    position: absolute;
    top: 0 !important;
    left: 0 !important;
    bottom: unset !important;
    z-index: 100;
  }

  .next,
  .prev {
    position: relative;
    width: 45px;
    height: 45px;
    background-color: var(--dark);
    border-radius: 5px;
    overflow: hidden;

    &::after,
    &::before {
      content: '' !important;
      position: absolute !important;
      width: 100% !important;
      height: 100% !important;
      top: 0px !important;
      left: 0px !important;
    }

    &::after {
      background: url('/img/arrow.svg') center / 40% 40% no-repeat !important;
    }

    &::before {
      background: var(--primary);
      // linear-gradient(
      //   263.35deg,
      //   #060606 -13.03%,
      //   #00ff4e -13.03%,
      //   #006f22 -13.02%,
      //   #00ff4e 99.99%,
      //   #ffffff 100%
      // );
      transform: scale(0);
      border-radius: 5px;
      transition: all 0.2s linear;
    }

    &:hover {
      &::before {
        transform: scale(1);
      }

      &::after {
        background: url('/img/black_arrow.svg') center / 40% 40% no-repeat !important;
      }
    }
  }

  .prev {
    left: 0 !important;
  }

  .next {
    right: 0 !important;
  }

  .prev::after {
    transform: rotate(180deg);
  }

  @media (max-width: 768px) {
    .next,
    .prev {
      width: 35px;
      height: 35px;
    }
  }
</style>
