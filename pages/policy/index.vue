<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { usePolicyStore } from '@/stores/policyStore';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const policyData = usePolicyStore();
// Set the default value to the first tab's title
const defaultValue = policyData.taps.length > 0 ? policyData.taps[0].title : '';
const defaultValueEn = policyData.tapsEnglish.length > 0 ? policyData.tapsEnglish[0].title : '';

</script>

<template>
    <div class="bg-[#FBFBFB] mb-20">
        <BannerComponent bgName="bg-policy-bg" title="content.privacy_policy" />
        <div class="hidden md:block container">
            <Tabs class="flex gap-10 mt-10 flex-row-reverse rtl:flex-row md:gap-10 md:mt-20"
                :default-value="locale === 'ar' ? defaultValue : defaultValueEn">
                <div class="w-full">
                    <TabsContent class="tab-content col-span-2 bg-white p-2 rounded"
                        v-for="tap in locale === 'ar' ? policyData.taps : policyData.tapsEnglish" :key="tap.id"
                        :value="tap.title">
                        <div class="p-4" :class="locale === 'ar' ? 'text-end' : 'text-start'" v-html="tap.content">
                        </div>
                    </TabsContent>
                </div>
                <TabsList class="flex flex-col w-96 bg-white justify-start"
                    :default-value="locale === 'ar' ? defaultValue : defaultValueEn">
                    <TabsTrigger
                        class="w-full font-bold text-end p-5 text-gray-800 data-[state=active]:bg-[#eeebfa] data-[state=active]:text-[#875FFF]   data-[state=active]:border-primary rounded"
                        :class="locale === 'ar' ? 'data-[state=active]:border-r-4 data-[state=active]:border-l-0' : 'data-[state=active]:border-l-4'"
                        v-for="tap in locale === 'ar' ? policyData.taps : policyData.tapsEnglish" :key="tap.value"
                        :value="tap.title">
                        {{ tap.title }}
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>

        <Accordion type="single" class="block md:hidden w-full mt-5 px-3" collapsible
            :default-value="locale === 'ar' ? defaultValue : defaultValueEn">
            <AccordionItem v-for="tap in locale === 'ar' ? policyData.taps : policyData.tapsEnglish" :key="tap.id"
                :value="tap.title">
                <AccordionTrigger class="flex text-[#2D3263] items-center justify-between w-full p-5 rtl:text-right 
                        text-gray-500 bg-white focus:text-primary text-xl font-bold focus:border-primary rounded-xl focus:ring-1
                        focus:ring-primary dark:focus:ring-gray-800 dark:border-gray-700
                        dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3
                        focus:bg-[#F4F2FB]">{{ tap.title }}</AccordionTrigger>
                <AccordionContent
                    class="p-5 m-2 bg-white rounded border border-[#EAEAEA] dark:border-gray-700 dark:bg-gray-900">
                    <div v-html="tap.content"></div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
</template>
