<template>
    <div class="container">
        books
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

watch(
  () => route.params.id,
  async (newId) => {
    console.log(newId);
  }
);
</script>