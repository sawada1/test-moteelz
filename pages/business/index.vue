<script lang="ts" setup>
import BusinessInfoSection from '@/components/business/BusinessInfoSection.vue';
import { ref, computed } from 'vue';

const infoSectionData = ref([
  {
    id: 1,
    title: 'business.booking.title',
    description: 'business.booking.paragraph',
    reversDirection: false,
    isApp: false,
    btnText: 'business.booking.buttonText',
    imageSrc: '/img/business/employees.png',
  },
  {
    id: 2,
    title: 'business.portfolio.title',
    description: 'business.portfolio.paragraph',
    reversDirection: true,
    isApp: false,
    btnText: 'business.portfolio.buttonText',
    imageSrc: '/img/business/wallet.png',
  },
  {
    id: 3,
    title: 'business.private_portfolio.title',
    description: 'business.private_portfolio.paragraph',
    reversDirection: false,
    isApp: false,
    btnText: 'business.private_portfolio.buttonText',
    imageSrc: '/img/business/wallet-create.png',
  },
  {
    id: 4,
    title: 'business.mobileAppNormalUsers.title',
    description: 'business.mobileAppNormalUsers.desc',
    reversDirection: true,
    isApp: true,
    imageSrc: '/img/business/app-banner.webp',
  },
  {
    id: 5,
    title: 'business.techSupport.title',
    description: 'business.techSupport.desc',
    reversDirection: false,
    isApp: false,
    btnText: 'header.contact_us',
    imageSrc: '/img/business/support-banner.svg',
  },
]);

const firstSection = computed(() => infoSectionData.value.slice(0, 3));
const remainingSection = computed(() => infoSectionData.value.slice(3));
</script>

<template>
  <div class="container space-y-10">
    <div class="flex flex-row md:rounded-lg overflow-hidden relative">
      <NuxtImg
        src="/img/business/main-banner.webp"
        class="h-[24rem] md:h-[34rem] w-full object-cover"
      />
      <div
        class="bg-gradient-to-l from-primary/80 to-[#9e191930] absolute flex items-center top-0 w-full h-full text-white"
      >
        <div
          class="flex flex-row w-full justify-between h-[50%] items-center md:px-20 px-9"
        >
          <div class="flex-col w-full flex gap-y-5">
            <span class="md:text-6xl text-4xl">
              {{ $t('business.mainTitle') }}
            </span>
            <span class="md:text-2xl text-md">
              <p>
                {{ $t('business.mainPara1') }}
              </p>
              <p>
                {{ $t('business.mainPara2') }}
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Render the first three sections -->
    <div class="container md:px-14">
      <div v-for="section in firstSection" :key="section.id" class="mt-5">
        <BusinessInfoSection
          :appSec="section.isApp"
          :direction="section.direction"
          :title="section.title"
          :description="section.description"
          :btnText="section.btnText"
          :imageSrc="section.imageSrc"
          :reversDirection="section.reversDirection"
        />
      </div>

      <div class="md:px-16 px-5">
        <NuxtImg
        src="/img/business/second-banner.png"
        class="h-fit w-full object-cover my-10"
        alt="Divider Image"
      />
      </div>


      <!-- Render the remaining sections -->
      <div v-for="section in remainingSection" :key="section.id" class="mt-5">
        <BusinessInfoSection
          :appSec="section.isApp"
          :direction="section.direction"
          :title="section.title"
          :description="section.description"
          :btnText="section.btnText"
          :imageSrc="section.imageSrc"
          :reversDirection="section.reversDirection"
        />
      </div>
    </div>
  </div>
</template>
