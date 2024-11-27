<template>
  <div
    class="w-full h-[12rem] md:h-[24rem] rounded-md relative text-justify text-white"
  >
    <div class="w-[40%]">
      <NuxtImg
        class="w-1/4 object-cover rounded-e-md h-[100%] absolute end-0"
        src="/img/3cd2a441ec5d6e30fe376f4424508370.png"
        alt="alt text"
      />
    </div>
    <div class="w-[60%]">
      <NuxtImg
        class="w-3/4 rounded-s-md object-cover h-[100%] absolute start-0"
        src="/img/banners/e5008144b49bb825e2c2cfca35c8753e.png"
        alt="alt text"
      />
    </div>
    <div class="w-[30%]">
      <NuxtImg
        class="absolute end-1/4 h-[50%] md:h-[70%] bottom-0"
        src="/img/mobile.png"
        alt="alt text"
      />
    </div>
    <h1
      class="font-medium text-md md:text-3xl w-2/3 md:w-1/4 start-10 md:start-16 font-IBMPlexSansArabic text-white text-start absolute top-10 md:top-20"
    >
      {{ $t("partner.downloadApp") }}
    </h1>
    <div class="absolute md:start-16 bottom-8 md:bottom-30 start-14">
      <div class="flex justify-between flex-row">
        <NuxtImg
          class="w-[110px] h-[44px] md:w-[168px] md:h-[70px] cursor-pointer hover:scale-105"
          src="/img/about/google-play-badge.png"
          alt="alt text"
        />
        <NuxtImg
          class="w-[110px] h-[44px] md:w-[168px] md:h-[70px] cursor-pointer hover:scale-105"
          src="/img/about/app-store-badge.png"
          alt="alt text"
        />
      </div>
    </div>
  </div>
</template>
