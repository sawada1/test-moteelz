<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
useHead({
  title: t('content.terms_and_conditions'),
  meta: [
    { name: 'description', content: t('') }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: '' } ]
})

interface AccordionItemType {
  value: string;
  title: string;
  content: string;
}



// Computed property to handle dynamic translation
const termsAndConditionsText = computed(() => {
  return t('content.terms_and_conditions_alert', { siteName: '<span class="text-primary">Moteelz.com</span>' });
});

const accordionItems = ref<AccordionItemType[]>([
  { value: 'item-1', title: 'content.if_customer_cancel', content: '<span class="font-bold my-5">هل يمكنني حجز غرفة واحدة أو أكثر لمجموعة من الأشخاص؟</span><li>يمكنك حجز 8 غرف كحد أقصى من خلال الموقع الإلكتروني </li><li>قم بزيارة موقع موتيلز وأدخل التفاصيل (مثل اسم الفندق او المدينة) التي تبحث عنها في مربع البحث عن الفنادق</li><span class="font-bold my-5">هل يمكنني الحجز في مكان الاقامة لقضاء يوم واحد فقط؟</span><li>لا يمكنك ذلك، يجب أن يكون الحجز لليلة واحدة على الأقل. نحن لا ندعم حالياً خدمة حجز مرافق الفندق مثل قاعات الاجتماعات، قاعات المؤتمرات، مركز الأعمال أو أي مرافق أخرى.</li>' },
  { value: 'item-2', title: 'تأكيد الحجز', content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.' },
  { value: 'item-3', title: 'الأسعار', content: 'Yes! You can use the transition prop to configure the animation.' },
  { value: 'item-4', title: 'البحث', content: 'Yes! You can use the transition prop to configure the animation.' },
  { value: 'item-5', title: 'احجز الآن، وادفع الآن', content: 'Yes! You can use the transition prop to configure the animation.' },
  { value: 'item-6', title: 'احجز الآن، وادفع لاحقاً', content: 'Yes! You can use the transition prop to configure the animation.' },
  { value: 'item-7', title: 'الغرف', content: 'Yes! You can use the transition prop to configure the animation.' },
  { value: 'item-8', title: 'المرافق', content: 'Yes! You can use the transition prop to configure the animation.' },
])

const defaultValue = ref(accordionItems.value[0])



</script>

<template>
  <div class="mb-20">
    <BannerComponent bgName="bg-terms-bg" title="content.terms_and_conditions" />
    <div class="md:text-center px-5 text-justify mt-10 leading-relaxed md:px-40">
      <p class="text-black" v-html="termsAndConditionsText"></p>
    </div>
    <div class="container px-5 md:px-10">
      <!-- this is ready for api data -->
      <!-- <Accordion type="single" class="w-full mt-5" collapsible :default-value="accordionItems.values[0]">
            <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
                <AccordionTrigger class="flex text-start text-[#2D3263] items-center justify-between w-full p-5 rtl:text-right 
                        text-gray-500 bg-white focus:text-primary text-xl font-bold focus:border-primary rounded-xl focus:ring-1
                        focus:ring-primary dark:focus:ring-gray-800 dark:border-gray-700
                        dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3
                        focus:bg-[#F4F2FB]">{{ $t(`${item.title}`) }}</AccordionTrigger>
                <AccordionContent  class="p-5 m-2 bg-white rounded-xl border  border-[#EAEAEA] dark:border-gray-700 dark:bg-gray-900">
                    <p v-html="item.content"></p>
         </AccordionContent>
            </AccordionItem>
        </Accordion> -->
      <Accordion type="single" class="w-full mt-5" collapsible :default-value="accordionItems.values[0]">
        <AccordionItem value="1">
          <AccordionTrigger class="flex text-start text-[#2D3263] items-center justify-between w-full p-5 rtl:text-right 
                        text-gray-500 bg-white focus:text-primary text-xl font-bold focus:border-primary rounded-xl focus:ring-1
                        focus:ring-primary dark:focus:ring-gray-800 dark:border-gray-700
                        dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3
                        focus:bg-[#F4F2FB]">{{ $t('content.if_customer_cancel') }}</AccordionTrigger>
          <AccordionContent
            class="p-5 m-2 bg-white rounded-xl border  border-[#EAEAEA] dark:border-gray-700 dark:bg-gray-900">
            <div class="mt-4 ps-7 leading-7">
              <p class="mb-2">
                {{ $t('content.if_customer_cancel_condition') }}
              </p>
              <p class="mb-4">
                {{ $t('content.if_customer_cancel_condition_responsible') + ':' }}
              </p>
              <ul class="space-y-2 ps-4">
                <li>{{ $t('content.condition_responsible1') }}</li>
                <li>{{ $t('content.condition_responsible2') }}</li>
                <li>{{ $t('content.condition_responsible3') }}</li>
                <li>{{ $t('content.condition_responsible4') }}</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger class="flex text-start text-[#2D3263] items-center justify-between w-full p-5 rtl:text-right 
                        text-gray-500 bg-white focus:text-primary text-xl font-bold focus:border-primary rounded-xl focus:ring-1
                        focus:ring-primary dark:focus:ring-gray-800 dark:border-gray-700
                        dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3
                        focus:bg-[#F4F2FB]">{{ $t('content.privacy_policy') }}</AccordionTrigger>
          <AccordionContent
            class="p-5 m-2 bg-white rounded-xl border  border-[#EAEAEA] dark:border-gray-700 dark:bg-gray-900">
            <div class="">
              <h5 class="text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                  class="w-5 inline-block me-2">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>{{ $t('content.data_we_collect') }}</span>
              </h5>
              <div class="mt-4 ps-7 leading-7">
                <p class="mb-4">{{ $t('content.collected_data_desc') + ':' }}</p>
                <ul class="space-y-2 ps-4">
                  <li>{{ $t('content.collected_data_type1') }}</li>
                  <li>{{ $t('content.collected_data_type2') }}</li>
                  <li>{{ $t('content.collected_data_type3') }}</li>
                  <li>{{ $t('content.collected_data_type4') }}</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger class="flex text-start text-[#2D3263] items-center justify-between w-full p-5 rtl:text-right 
                        text-gray-500 bg-white focus:text-primary text-xl font-bold focus:border-primary rounded-xl focus:ring-1
                        focus:ring-primary dark:focus:ring-gray-800 dark:border-gray-700
                        dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3
                        focus:bg-[#F4F2FB]">{{ $t('content.when_we_collect_info') }}</AccordionTrigger>
          <AccordionContent
            class="p-5 m-2 bg-white rounded-xl border  border-[#EAEAEA] dark:border-gray-700 dark:bg-gray-900">
            <div class="">

              <div class="">
                <h5 class="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                    class="w-5 inline-block me-2">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span>{{ $t('content.why_we_collect_info') }}</span>
                </h5>
                <div class="mt-4 ps-7 leading-7">
                  <p class="mb-4">{{ $t('content.we_collect_info_for') + ': ' }}</p>
                  <ul class="space-y-2 ps-4">
                    <li>{{ $t('content.collect_info_reason1') }}</li>
                    <li>{{ $t('content.collect_info_reason2') }}</li>
                    <li>{{ $t('content.collect_info_reason3') }}</li>
                    <li>{{ $t('content.collect_info_reason4') }}</li>
                    <li>{{ $t('content.collect_info_reason5') }}</li>
                    <li>{{ $t('content.collect_info_reason6') }}</li>
                    <li>{{ $t('content.collect_info_reason7') }}</li>
                    <li>{{ $t('content.collect_info_reason8') }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="4">
          <AccordionTrigger class="flex text-start text-[#2D3263] items-center justify-between w-full p-5 rtl:text-right 
                        text-gray-500 bg-white focus:text-primary text-xl font-bold focus:border-primary rounded-xl focus:ring-1
                        focus:ring-primary dark:focus:ring-gray-800 dark:border-gray-700
                        dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3
                        focus:bg-[#F4F2FB]">{{ $t('content.the_basic_rols') }}</AccordionTrigger>
          <AccordionContent
            class="p-5 m-2 bg-white rounded-xl border  border-[#EAEAEA] dark:border-gray-700 dark:bg-gray-900">
            <div class="">
              <h5 class="text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                  class="w-5 inline-block me-2">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>{{ $t('content.follow_motelz_rols') }}</span>
              </h5>
              <div class="mt-4 ps-7 leading-7">
                <p class="mb-2">
                  <strong>{{ $t('content.motelz_rol_title1') + ': ' }}</strong>
                  {{ $t('content.motelz_rol_desc1') }}
                </p>

                <p class="mb-2">
                  <strong>{{ $t('content.motelz_rol_title2') + ': ' }}</strong>
                  {{ $t('content.motelz_rol_desc2') }}
                </p>
                <p class="mb-2">
                  <strong>{{ $t('content.motelz_rol_title3') + ': ' }}</strong>
                  {{ $t('content.motelz_rol_desc3') }}
                </p>
                <p class="mb-2">
                  <strong>{{ $t('content.motelz_rol_title4') + ': ' }}</strong>
                  {{ $t('content.motelz_rol_desc4') }}
                </p>
                <p class="mb-2">
                  <strong>{{ $t('content.motelz_rol_title5') + ': ' }}</strong>
                  {{ $t('content.motelz_rol_desc5') }}
                </p>
                <p class="mb-2">
                  <strong>{{ $t('content.motelz_rols_title6') + ': ' }}</strong>
                  {{ $t('content.motelz_rols_desc6') }}
                </p>
                <p class="mb-2">
                  <strong>{{ $t('content.motelz_rols_title7') + ': ' }}</strong>
                  {{ $t('content.motelz_rols_desc7') }}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="5">
          <AccordionTrigger class="flex text-start text-[#2D3263] items-center justify-between w-full p-5 rtl:text-right 
                        text-gray-500 bg-white focus:text-primary text-xl font-bold focus:border-primary rounded-xl focus:ring-1
                        focus:ring-primary dark:focus:ring-gray-800 dark:border-gray-700
                        dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3
                        focus:bg-[#F4F2FB]">{{ $t('content.contact_motelz_for_any_problems') }}</AccordionTrigger>
          <AccordionContent
            class="p-5 m-2 bg-white rounded-xl border  border-[#EAEAEA] dark:border-gray-700 dark:bg-gray-900">
            <div class="">
              <h5 class="text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                  class="w-5 inline-block me-2">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>{{ $t('content.follow_motelz_rols') }}</span>
              </h5>
              <div class="mt-4 ps-7 leading-7">
                <p>{{ $t('content.contact_motelz_for_any_problems_desc') }}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>


</template>