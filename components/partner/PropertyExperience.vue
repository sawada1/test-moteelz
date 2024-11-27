<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <h3 class="font-bold text-xl text-primary">
        {{ $t("partner.sectionOneTitle") }}
      </h3>
      <div
        class="grid rounded-md grid-cols-2 gap-4 md:gap-6 md:grid-cols-4 justify-between"
      >
        <Feature
          class=""
          v-for="item in features"
          :id="item.id"
          :key="item.id"
          :img="item.image"
          :title="item.title"
          :description="item.description"
        />
      </div>
    </div>

    <div
      class="rounded-md grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 my-10"
    >
      <div class="flex flex-col">
        <h1
          class="font-medium text-[18px] md:text-[22px] mb-10 text-primary text-center md:text-start"
        >
          {{ $t("partner.sectionSecondTitle") }}
        </h1>
        <RentStep
          v-for="step in steps"
          :key="step.id"
          :id="step.id"
          :title="step.description"
          :img="step.image"
        />
      </div>
      <div class="rounded-md">
        <NuxtImg
          class="h-56 md:h-80 w-full rounded-md object-cover items-center text-center hidden md:block"
          src="/img/banners/handsome-man-with-dish-dasha-working-his-business-office-dubai.jpg"
          alt="alt text"
        />
      </div>
    </div>

    <PartnerFooter />
  </div>
</template>

<script setup>
import Feature from "./Feature";
import RentStep from "./RentStep.vue";
import PartnerFooter from "./PartnerFooter"
const { t } = useI18n();
import { ref } from "vue";

const features = ref([
  {
    id: 1,
    title: t("partner.features.manage_reservations.title"),
    description: t("partner.features.manage_reservations.description"),
    image: "/img/addproperty/7.svg",
  },
  {
    id: 2,
    title: t("partner.features.manage_rooms.title"),
    description: t("partner.features.manage_rooms.description"),
    image: "/img/addproperty/1.svg",
  },
  {
    id: 3,
    title: t("partner.features.gateway.title"),
    description: t("partner.features.gateway.description"),
    image: "/img/addproperty/2.svg",
  },
  {
    id: 4,
    title: t("partner.features.calendar.title"),
    description: t("partner.features.calendar.description"),
    image: "/img/addproperty/15.svg",
  },
  {
    id: 5,
    title: t("partner.features.private_app.title"),
    description: t("partner.features.private_app.description"),
    image: "/img/addproperty/8.svg",
  },
  {
    id: 6,
    title: t("partner.features.many_properties.title"),
    description: t("partner.features.many_properties.description"),
    image: "/img/addproperty/10.svg",
  },
  {
    id: 7,
    title: t("partner.features.quick_payment.title"),
    description: t("partner.features.quick_payment.description"),
    image: "/img/addproperty/9.svg",
  },
  {
    id: 8,
    title: t("partner.features.more_guests.title"),
    description: t("partner.features.more_guests.description"),
    image: "/img/addproperty/3.svg",
  },
]);

const steps = ref([
  {
    id: 1,
    description: t("partner.steps.one.description"),
    image: "/img/addproperty/13.svg",
  },
  {
    id: 2,
    description: t("partner.steps.two.description"),
    image: "/img/addproperty/12.svg",
  },
  {
    id: 3,

    description: t("partner.steps.three.description"),
    image: "/img/addproperty/14.svg",
  },
]);
</script>
