<template>
  <div>
    <!-- navbar component  -->
    <NuxtLoadingIndicator />
    <LayoutNavbar></LayoutNavbar>
    <slot></slot>
    <Toaster />

    <network v-if="checkInt"></network>
    <!-- footer component  -->
    <Footer></Footer>
  </div>
</template>
<script setup>
import Footer from "@/components/footer/Footer.vue";
import LayoutNavbar from "@/components/layout/LayoutNavbar.vue";
import network from "@/components/animations/network.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
const { locale, setLocale } = useI18n();
const checkInt = ref(false);
const handleOffline = () => {
  checkInt.value = true;
};
const handleOnline = () => {
  checkInt.value = false;
};


onBeforeMount(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
   locale.value = localStorage.getItem('preferredLang') ? localStorage.getItem('preferredLang') : 'ar'
  useHead({
        htmlAttrs: {
          lang: locale.value == 'en' ? "en" : "ar",
          dir: locale.value == "en" ? "ltr" : "rtl",
        },
      });
})


</script>
<style lang=""></style>
