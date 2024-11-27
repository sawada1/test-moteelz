<template>
  <div class="flex flex-col gap-4">
    <!-- <h3 class="text-xl font-bold text-primary_dark">السياسات والشروط</h3>
    <div class="flex flex-col gap-2">
      <h4 class="text-lg font-bold text-textColor">سياسة الالغاء</h4>
      <span class="text-textLightGray text-sm"
        >يمكن إلغاء التسجيل وإرجاع المبلغ المدفوع (6926.91) للمشتركين في
        (2024/08/14) من الفجر</span
      >
    </div> -->

    <!-- <h3 class="text-xl font-bold text-primary_dark">
      {{ $t("content.hotelData") }}
    </h3>
    <div class="flex flex-col gap-2">
      <span class="text-textLightGray text-sm">{{
        checkOutStore?.hotelDetails?.hotelDescriptions[0]?.description_full
      }}</span>
    </div> -->

    <!-- <div class="flex flex-col gap-2">
      <h4 class="text-lg font-bold text-textColor">رسوم اختيارية</h4>
      <span class="text-textLightGray text-sm"
        >تقوم المنشأة السياحية بفرض الرسوم ومبالغ التأمين التالية في وقت تقديم
        الخدمة، أو تسجيل الوصول، أو إنهاء إجراءات المغادرة.</span
      >
      <div class="flex flex-col gap-1 px-2">
        <div
          class="flex items-center gap-2"
          v-for="(item, index) in policies"
          :key="index"
        >
          <span class="w-1 h-1 bg-textLightGray rounded-full flex-none"></span>
          <span class="text-textLightGray text-sm">{{ item.name }}</span>
        </div>
      </div>
    </div> -->

    <div class="flex flex-col gap-1 px-2">
      <div
        class="flex flex-col gap-2"
        v-for="(item, index) in checkOutStore?.preBookDetails?.remarks"
        :key="index"
      >
        <div class="flex items-center gap-1">
          <span class="w-1 h-1 bg-textColor rounded-full flex-none"></span>
          <span class="text-textColor text-lg font-bold">{{ item.name }}</span>
        </div>
        <div
          class="flex flex-col gap-2 p-2"
          v-for="(desc, i) in item.list"
          :key="i"
        >
          <span>{{ desc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// const policies = ref([
//   {
//     name: "رسوم فطور بوفيه :75 ريال سعودي للبالغين، و155 ريال سعودي للأطفال (تقريبًا)",
//   },
//   {
//     name: "رسم خدمة التوصيل المكوكية من وإلى المطار: 300 ريال سعودي للسيارة (والحد الأقصى للإشغال 4)",
//   },
//   { name: "رسوم ركوب الحافلة من وإلى المطار للطفل: 0 ريال سعودي" },
//   { name: "رسم تنظيف الغرف: 0 ريال سعودي" },
//   { name: "رسوم السرير القابل للطي: 100.0 ريال سعودي في اليوم" },
// ]);

import { useCheckout } from "@/stores/checkout";

const checkOutStore = useCheckout();
</script>
