<template>
  <div class="relative w-full rounded-xl overflow-hidden">
    <img src="../../assets/images/add-property.png" />
    <div class="absolute top-1/2 right-0 px-4 w-1/2 flex flex-col gap-4">
      <h3 class="text-white text-3xl font-bold">
        اجذب المزيد من الضيوف واجعل عقارك وجهة مفضلة لزوار موتيلز .
      </h3>
      <nuxt-link
        :to="localePath('/partner')"
        class="w-[150px] bg-burgundy h-[45px] flex items-center rounded-[10px] justify-center gap-2"
      >
        <span class="text-white text-[16px] mt-1"> أضف عقارك </span>
      </nuxt-link>
    </div>
  </div>
</template>
