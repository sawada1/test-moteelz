<template>
    <div>
        <div  data-aos="zoom-in-up"  class="h-full rounded-xl box w-full col-span-1 relative cursor-pointer my-2">
            <div class="flex flex-col justify-between rounded-lg  card_wallet bg-white h-full">
              <div class="relative h-auto border-1 border-stroke p-4">

                <NuxtImg v-if="product?.wallet_image" class="border-1 border-stroke pg-dark w-full rounded-lg h-[200px]" width="100" height="60"
                  style="background-size: cover" :src="product?.wallet_image" placeholder="/placeholder.webp">
                </NuxtImg>
                <NuxtImg v-else class="border-1 border-stroke pg-dark w-full rounded-lg h-[200px]" width="100" height="60"
                   src="/" placeholder="/placeholder.webp">
                </NuxtImg>


              </div>
                
              <div class="flex flex-col justify-around shadow-pricing h-full">
                <div class="font-semibold flex flex-col gap-2 px-4 py-2 h-full">
                  <div class="flex justify-between flex-col xl:flex-row lg:flex-row md:flex-row xl:items-center lg:items-center md:items-center items-start">
                    <div class="flex items-center gap-1">
                      <span class="text-[#8B8B8B] font-medium text-[14px]">{{ $t('content.night_counts') }} :</span>
                      <span class="flex items-center text-[#2D3263] gap-2"><span> {{ product?.numbers_of_days[0] }} </span><span>{{ $t('labels.nights') }}</span></span>
                    </div>
  
                    <span class="flex items-center  gap-1">
                      <span class="text-[#8B8B8B] font-medium text-[14px]">{{ $t('content.price') }} :</span>
                      <div class="flex items-center gap-1">
                        <span class="text-primary"> {{ product?.price    }} </span>
                        <span class="text-primary">{{ $t('fillter.currency') }}</span>
                      </div>
                    </span>

                  </div>

                  <div class="flex flex-col gap-3 mt-2 h-[73px]">
                    <div v-for="feature in product?.features_favorites?.slice(0 , 3)" :key="feature" class="flex items-start gap-2">
                      <div class="flex items-start gap-2 w-full">
                        <span>
                          <IconConfirmed />
                        </span>
                        <span class="text-xs line-clamp-1"> {{ feature?.name }} </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex h-full">
                    <NuxtLink :to="localePath(`/wallet/wallet-details/${product?.id}`)"
                      class="block bg-primary self-end w-full rounded-lg border border-stroke p-2 text-center text-sm font-medium transition hover:border-primary hover:bg-primary hover:text-white text-white">
                      {{ $t('content.buy_now') }}
                    </NuxtLink>
                  </div>
                </div>

              </div>
            </div>

          </div>
    </div>
</template>
<script setup>
const { locale } = useI18n();
const localePath = useLocalePath();

let props = defineProps({
  product: {
    required: true,
    type: Object,
  },
  
});
</script>
<style lang="">
    
</style>