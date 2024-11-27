<template>
  <footer class="border-t border-primaryLight pt-8 text-footerTextColor hidden xl:block">
    <div class="max-w-7xl mx-auto z-20 relative">
      <div
        class="grid md:grid-cols-[repeat(16,_minmax(0,_1fr))] grid-cols-1 gap-x-2 md:gap-x-1 md:gap-y-1 gap-y-12 py-15 md:pb-3 bp-1 md:ps-0 ps-6 footer-top text-center md:text-start"
      >
        <div
          class="flex flex-col content-center col-span-4 items-center gap-3 px-4 text-center md:text-start"
        >
          <a
            :href="localePath('/')"
            class="inline-block relative m-auto md:ltr:ml-0 md:rtl:mr-0 me-auto mb-[8px]"
            title="Moteelz"
          >
            <NuxtImg
              src="/img/Logo-new.png"
              class="w-52 h-full"
              alt="Moteelz"
            />
          </a>
          <div class="flex flex-col w-full items-start sm:items-center">
            <p
              class="text-footerTextColor relative flex items-center justify-center"
            >
              {{ $t("content.company_name") }} ( {{ $t("app.title") }} )
            </p>
          </div>

          <div class="flex items-center md:items-start w-fit md:w-full my-2">
            <ul class="list-none flex gap-4">
              <li
                class="transition duration-500 transform hover:-translate-y-1 ease-in-out rounded-full flex justify-center items-center"
              >
                <a href="https://www.snapchat.com/add/moteelz" target="_blank">
                  <SnapchatIcon />
                </a>
              </li>
              <li
                class="transition duration-500 transform hover:-translate-y-1 ease-in-out rounded-full flex justify-center items-center"
              >
                <a href="https://www.facebook.com/moteelz/" target="_blank">
                  <FacebookIcon />
                </a>
              </li>
              <li
                class="transition duration-500 transform hover:-translate-y-1 ease-in-out rounded-full flex justify-center items-center"
              >
                <a href="https://www.instagram.com/moteelz/" target="_blank">
                  <InstagramIcon />
                </a>
              </li>
              <!-- <li
                class="transition duration-500 ease-in-out rounded-full flex justify-center items-center"
              >
                <a
                  href="https://www.linkedin.com/company/moteelz"
                  target="_blank"
                  class="mt-[5px]"
                >
                  <i
                    class="fa-brands fa-linkedin text-[#1d1c41] text-[20px]"
                  ></i>
                </a>
              </li> -->
              <li
                class="transition duration-500 transform hover:-translate-y-1 ease-in-out rounded-full flex justify-center items-center"
              >
                <a href="https://www.tiktok.com/@moteelz" target="_blank">
                  <TiktokIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="md:col-span-8 col-span-4 flex flex-col md:content-center md:items-center md:px-0 px-4"
        >
          <div class="w-full grid grid-cols-2">
            <div
              class="col-span-1 flex md:justify-center sm:justify-center md:content-center md:items-center"
            >
              <ul class="flex flex-col gap-2 w-fit">
                <li>
                  <h3 class="mb-2 font-bold text-primary_dark text-xl">
                    {{ $t("footer.pages") }}
                  </h3>
                </li>
                <li
                  class=""
                  v-for="item in [
                    {
                      title: $t(`footer.linkAbout`),
                      link: localePath('/about'),
                    },
                    {
                      title: $t(`footer.linkWallet`),
                      link: localePath('/wallet'),
                    },
                    {
                      title: $t(`content.offers`),
                      link: localePath('/offers'),
                    },
                    {
                      title: $t(`footer.become_partner`),
                      link: localePath('/partner'),
                    },
                  ]"
                  :key="item.title"
                >
                  <NuxtLink
                    :href="item.link"
                    :title="item.title"
                    class="text-footerTextColor hover:text-primary transition duration-500 ease-in-out"
                    :class="localePath(item.link) === $route.path ? 'text-primary' : ''"
                    >{{ item.title }}</NuxtLink
                  >
                </li>
              </ul>
            </div>

            <div
              class="col-span-1 flex md:justify-center sm:justify-center md:content-center md:items-center"
            >
              <ul class="flex flex-col gap-2 w-fit">
                <li>
                  <h3 class="mb-2 font-bold text-primary_dark text-xl">
                    {{ $t("footer.links_intersted") }}
                  </h3>
                </li>
                <li
                  v-for="item in [
                    {
                      title: $t(`footer.linkBusiness`),
                      link: localePath('/business'),
                    },
                    {
                      title: $t('footer.terms_and_conditions'),
                      link: localePath('/terms') + '',
                    },
                    {
                      title: $t('footer.linkPrivacyPolicy'),
                      link: localePath('/policy') + '',
                    },

                    {
                      title: $t(`footer.support`),
                      link: localePath('/contact'),
                    },
                  ]"
                  :key="item.title"
                >
                  <NuxtLink
                    :href="item.link"
                    :title="item.title"
                    class="text-footerTextColor hover:text-primary transition duration-500 ease-in-out"
                    :class="localePath(item.link) === $route.path ? 'text-primary' : ''"
                    >{{ item.title }}</NuxtLink
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col content-center md:col-span-4 col-span-4 items-center md:items-start gap-3 px-4"
        >
          <div
            class="flex flex-col justify-center items-center w-full md:w-auto"
          >
            <h3 class="mb-2 font-bold text-primary_dark text-xl">
              {{ $t("footer.get_help") }}
            </h3>
            <ul>
              <li>
                <a href="mai:#" class="flex items-center gap-2">
                  <MailIcon />
                  <span class="text-footerTextColor">support@moteelz.com</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="flex flex-col w-full items-center md:items-start">
            <div>
              <h3 class="mb-2 font-bold text-primary_dark text-xl">
                {{ $t("footer.we_accept") }}
              </h3>
              <PaymentAcceptIcons />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full flex justify-center items-center border-t border-primaryLight text-center text-footerTextColor text-sm p-4"
    >
      <p dir="ltr">©2024 Moteelz. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import TiktokIcon from "./footerIcon/TiktokIcon.vue";
import FacebookIcon from "./footerIcon/FacebookIcon.vue";
import SnapchatIcon from "./footerIcon/SnapchatIcon.vue";
import InstagramIcon from "./footerIcon/InstagramIcon.vue";
import MailIcon from "./footerIcon/MailIcon.vue";
import PaymentAcceptIcons from "./footerIcon/PaymentAcceptIcons.vue";
</script>
