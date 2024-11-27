<script setup lang="ts">
  // import AppNotifications from '~/components/AppNotifications.vue'
  // import { useSettings } from '~/stores/settings'

  const store = ref()
  store.getSettings()

  const { t } = useI18n()

  // const urlWhatsapp = 'https://api.whatsapp.com/send?phone='+number.value
  const urlWhatsapp = 'https://api.whatsapp.com/send?phone=966593090185'
  const Moteelz = t('app.title')
  const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: 'id',
    addSeoAttributes: true
  })

  var hide = ref(true)
  onMounted(() => {
    hide.value = false
  })
</script>

<template>
  <div v-if="!hide">
    <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
      <Head>
        <Title>{{ Moteelz }}</Title>
        <template v-for="link in head.link" :key="link.id">
          <Link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
        </template>
      </Head>

      <Body class="font body">
        <HostingHeader />
        <main class="min-h-screen">
          <slot />
        </main>

        <HostingFooter />
        <!-- <HomeFooter /> -->
      </Body>
    </Html>

    <!-- <AppNotifications /> -->
  </div>
</template>

<style lang="scss">
  .min-h-screen {
    min-height: 50vh !important;
    // min-height: auto;
  }
</style>
