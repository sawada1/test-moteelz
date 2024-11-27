<script setup lang="ts">
  // import AppNotifications from '~/components/AppNotifications.vue'
  // import { useAddHostStore } from '~/stores/addHosting'

  // import { Modal, Ripple, initTE } from 'tw-elements'

  const store = ref()

  const { t } = useI18n()
  const localePath = useLocalePath()
  const Moteelz = t('app.title')
  const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: 'id',
    addSeoAttributes: true
  })

  onMounted(() => {
    // initTE({ Modal, Ripple })
  })

  const detelsPage = () => {
    store.clearAdd()
    navigateTo(localePath('/hosting/units'))
  }
</script>

<template>
  <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
    <Head>
      <Title>{{ Moteelz }}</Title>
      <template v-for="link in head.link" :key="link.id">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>

    <Body class="font body">
      <div
        class="flex flex-row fixed parent-nav top-0 left-0 right-0 z-50 content-center items-center bg-light user-select-none mx-auto"
      >
        <nav class="w-full pb-2 pt-4 content-center items-center" id="nav">
          <div
            class="md:px-6 ps-4 container flex justify-between space-between items-center content-center"
          >
            <NuxtLink :to="localePath('/')">
              <NuxtImg
                src="/img/logo.png"
                class="py-4 w-[120px] h-[50px] logo"
                :alt="$t('app.title')"
              />
            </NuxtLink>

            <div class="flex justify-between space-y-2">
              <!-- <NuxtLink :to="localePath(`/hosting/units`)" class="flex  flex-row items-center  px-2 py-1
                         border  border-red-600    rounded-2xl  hover:bg-desc ">

                            <span class="px-2 text-red-600  font-semibold  md:text-lg  text-md "> خروج </span>
                        </NuxtLink> -->
              <button
                class="flex flex-row items-center px-2 py-1 border border-red-600 rounded-lg hover:bg-desc"
                data-te-toggle="modal"
                data-te-target="#exampleModalCenter"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <span class="px-2 text-red-600 md:py-1 font-semibold md:text-lg text-lg">
                  {{ $t(`hosting.btnCloseAdd`) }}
                </span>
              </button>

              <!-- <button type="button"
                            class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                           >
                            Vertically centered modal
                        </button> -->

              <!--Vertically centered modal-->

              <div
                data-te-modal-init
                class="fixed left-0 top-0 hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                id="exampleModalCenter"
                tabindex="-1"
                aria-labelledby="exampleModalCenterTitle"
                aria-modal="true"
                role="dialog"
              >
                <div
                  data-te-modal-dialog-ref
                  class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
                >
                  <div
                    class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600"
                  >
                    <div
                      class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50"
                    >
                      <!--Modal title-->
                      <h5
                        class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                        id="exampleModalCenterTitle"
                      >
                        {{ $t(`hosting.titleAlertCloseAdd`) }}
                      </h5>
                      <!--Close button-->
                      <button
                        type="button"
                        class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-te-modal-dismiss
                        aria-label="Close"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <!--Modal body-->
                    <div class="relative p-4">
                      <p>
                        {{ $t(`hosting.bodyAlertCloseAdd`) }}

                        .
                      </p>
                    </div>

                    <!--Modal footer-->
                    <div
                      class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50"
                    >
                      <button
                        type="button"
                        class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                        data-te-modal-dismiss
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        {{ $t(`content.cancel`) }}
                      </button>
                      <!-- <button @click="detelsPage" type="button"
                      class="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      data-te-modal-dismiss data-te-ripple-init data-te-ripple-color="light">
                      {{ $t(`content.okApply`) }}
                    </button> -->
                      <button
                        @click="detelsPage"
                        type="button"
                        class="flex flex-row items-center bg-[#AB0053] text-light md:px-6 px-4 py-[4px] md:py-[4px] border border-bg-[#AB0053] rounded-md shadow-md"
                        data-te-modal-dismiss
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        {{ $t(`content.okApply`) }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <main class="min-h-screen">
        <slot />
      </main>

      <div
        v-if="store.isShowFooter"
        class="flex flex-col fixed parent-nav min-h-[100px] bottom-0 left-0 right-0 z-50 content-center items-center bg-light border-desc border-t-2 user-select-none mx-auto w-full"
      >
        <div
          v-if="store.selectAdd == 1"
          :class="!store.isCreateUnit ? 'grid grid-cols-4 ' : 'grid grid-cols-5'"
          class="w-full h-[6px] gap-x-3"
        >
          <template v-if="!store.isCreateUnit">
            <div
              :class="store.stepCurrent > 1 ? 'bg-[#AB0053] ' : 'bg-[#dddddd]'"
              class="col-span-1 md:h-[10px] h-[6px]"
            ></div>
            <div
              :class="store.stepCurrent > 2 ? 'bg-[#AB0053] ' : 'bg-[#dddddd]'"
              class="col-span-1 md:h-[10px] h-[6px]"
            ></div>
            <div
              :class="store.stepCurrent > 3 ? 'bg-[#AB0053] ' : ' bg-[#dddddd]'"
              class="col-span-1 md:h-[10px] h-[6px]"
            ></div>
            <div
              :class="store.stepCurrent > 4 ? 'bg-[#AB0053] ' : ' bg-[#dddddd]'"
              class="col-span-1 md:h-[10px] h-[6px]"
            ></div>
            <!-- <div :class="store.stepCurrent > 5 ? 'bg-[#AB0053] ' : ' bg-[#dddddd]'" class="col-span-1 md:h-[10px] h-[6px]"></div> -->
          </template>

          <template v-if="store.isCreateUnit">
            <div
              :class="store.stepCurrent > 6 ? 'bg-[#AB0053] ' : 'bg-[#dddddd] '"
              class="col-span-1 md:h-[10px] h-[6px]"
            ></div>
            <div
              :class="store.stepCurrent > 7 ? 'bg-[#AB0053] ' : 'bg-[#dddddd] '"
              class="col-span-1 md:h-[10px] h-[6px]"
            ></div>
            <div
              :class="store.stepCurrent > 8 ? 'bg-[#AB0053] ' : 'bg-[#dddddd] '"
              class="col-span-1 md:h-[10px] h-[6px]"
            ></div>
            <div
              :class="store.stepCurrent > 9 ? 'bg-[#AB0053] ' : 'bg-[#dddddd] '"
              class="col-span-1 md:h-[10px] h-[6px]"
            ></div>
            <div
              :class="store.stepCurrent > 10 ? 'bg-[#AB0053] ' : ' bg-[#dddddd]'"
              class="col-span-1 md:h-[10px] h-[6px]"
            ></div>
          </template>
        </div>

        <div v-else class="w-full h-[6px] grid grid-cols-9 gap-x-3">
          <div
            :class="store.stepCurrent > 1 ? 'bg-[#AB0053] ' : 'bg-[#dddddd]'"
            class="col-span-1 md:h-[10px] h-[6px]"
          ></div>
          <div
            :class="store.stepCurrent > 12 ? 'bg-[#AB0053] ' : 'bg-[#dddddd]'"
            class="col-span-1 md:h-[10px] h-[6px]"
          ></div>
          <div
            :class="store.stepCurrent > 13 ? 'bg-[#AB0053] ' : ' bg-[#dddddd]'"
            class="col-span-1 md:h-[10px] h-[6px]"
          ></div>
          <div
            :class="store.stepCurrent > 14 ? 'bg-[#AB0053] ' : ' bg-[#dddddd]'"
            class="col-span-1 md:h-[10px] h-[6px]"
          ></div>
          <div
            :class="store.stepCurrent > 15 ? 'bg-[#AB0053] ' : ' bg-[#dddddd]'"
            class="col-span-1 md:h-[10px] h-[6px]"
          ></div>
          <div
            :class="store.stepCurrent > 16 ? 'bg-[#AB0053] ' : 'bg-[#dddddd] '"
            class="col-span-1 md:h-[10px] h-[6px]"
          ></div>
          <div
            :class="store.stepCurrent > 17 ? 'bg-[#AB0053] ' : 'bg-[#dddddd] '"
            class="col-span-1 md:h-[10px] h-[6px]"
          ></div>
          <div
            :class="store.stepCurrent > 18 ? 'bg-[#AB0053] ' : 'bg-[#dddddd] '"
            class="col-span-1 md:h-[10px] h-[6px]"
          ></div>
          <div
            :class="store.stepCurrent > 19 ? 'bg-[#AB0053] ' : 'bg-[#dddddd] '"
            class="col-span-1 md:h-[10px] h-[6px]"
          ></div>
          <!-- <div :class="store.stepCurrent > 19 ? 'bg-[#AB0053] ' : 'bg-[#dddddd] '" class="col-span-1  md:h-[10px] h-[6px] "></div> -->
        </div>

        <div
          class="w-full pb-5 pt-4 md:px-6 ps-4 container flex justify-between space-between items-center content-center"
        >
          <div class="flex justify-between">
            <!-- <button v-if="store.btnBack" @click="store.backStep" class="flex bg-[#D9D9D9] rounded-lg decoration-solid flex-row items-center px-3 py-1 hover:border hover:border-dark/50 hover:rounded-lg hover:shadow-sm hover:bg-desc">
            <span class="px-2 font-bold text-[1.5rem] text-black">
              {{ $t(`content.back`) }}
            </span>
          </button> -->

            <button
              v-if="store.btnBack"
              @click="store.backStep"
              class="flex border border-black bg-desc rounded-md decoration-solid flex-row items-center md:px-6 px-4 py-[2px] md:py-[3px] hover:border hover:border-dark/50 hover:rounded-md hover:shadow-sm hover:bg-desc"
            >
              <span class="px-2 font-bold md:text-[1.5rem] text-[1.4rem] text-black">
                {{ $t(`content.back`) }}
              </span>
            </button>
          </div>

          <div class="flex justify-between">
            <button
              v-if="store.btnNuxt"
              :class="
                store.btnNuxtLoading == true
                  ? ' opacity-60 cursor-not-allowed'
                  : 'hover:bg-[#cb136c] cursor-pointer'
              "
              :disabled="store.btnNuxtLoading == true"
              @click="store.nuxtStep"
              class="flex flex-row items-center bg-[#AB0053] text-light md:px-6 px-4 py-[2px] md:py-[4px] border border-bg-[#AB0053] rounded-md shadow-md"
            >
              <span class="px-2 font-bold md:text-[1.5rem] text-[1.4rem]">
                {{ $t(`content.next`) }}
              </span>
            </button>

            <!-- <button v-if="store.btnNuxt" :class="store.btnNuxtLoading == true ? 'bg-desc text-dark ' : ' bg-[#AB0053] text-light'" :disabled="store.btnNuxtLoading == true" @click="store.nuxtStep" class="flex flex-row items-center  md:px-4 px-3 py-[4px] md:py-[6px]
                         border border-bg-[#AB0053]      rounded-lg shadow-md   hover:bg-desc   hover:text-dark">
            <span class="px-2  font-bold text-[1.5rem] ">
              {{ $t(`content.next`) }}
            </span>
          </button> -->
          </div>
        </div>
      </div>
    </Body>
  </Html>

  <!-- <AppNotifications /> -->
</template>

<style>
  .z-\[1040\] {
    z-index: 50;
  }

  .undefined {
    z-index: 0 !important;
  }

  .min-h-screen {
    min-height: 50vh !important;
    /* // min-height: auto; */
  }
</style>
