<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex items-center gap-1 w-full">
      <h3 class="text-xl font-bold text-primary_dark">طلبات خاصه</h3>
      <span class="text-textLightGray"
        >( غير مضمون وقد يتم تطبيق رسوم إضافية )</span
      >
    </div>
    <Textarea class="resize-none" placeholder="لديك طلبات اخري !" />
  </div>
</template>

<script setup>
import Textarea from "../ui/textarea/Textarea.vue";

</script>
