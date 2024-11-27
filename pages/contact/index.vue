<script setup lang="ts">
import IconLoadingSubmit from '@/components/icon/IconLoadingSubmit.vue';
import IconUploadFile from '@/components/icon/IconUploadFile.vue';
import Button from '@/components/ui/button/Button.vue';
import { VueTelInput } from 'vue3-tel-input';
import 'vue3-tel-input/dist/vue3-tel-input.css';
import ContactBox from '@/components/contact-us/ContactBox.vue';
import { ref , onMounted} from 'vue';
import PhoneInputComponent from '@/components/form/PhoneInputComponent.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
import SelectValue from '@/components/ui/select/SelectValue.vue';
import { useApi, Method } from '@/composables/api';
import { useContactFormStore } from '@/stores/contactFormStore'; // Import the contact form store
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';  
const localePath = useLocalePath();
const { t } = useI18n();
useHead({
  title: t('content.contact_us'),
  meta: [
    { name: 'description', content: t('') }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: '' } ]
})  
const authStore = useAuthStore()
const mobile = ref('');
const countryCode = ref('+966');
const fullNumber = ref('');
const thankYouMessage = ref(false);
// Initialize the contact form store
const contactFormStore = useContactFormStore();
const {
  formData,
  files,
  isDragOver,
  isLoading,
} = storeToRefs(contactFormStore);

const location = {
  latitude: 24.766198458941307,
  longitude: 46.68082711411638
};
 // تعيين الاسم الافتراضي عند تحميل المكون
watch(() => {
  if (authStore.isAuthenticated) {
    formData.value.name = authStore.user.firstName + ' ' + authStore.user.lastName;
    formData.value.mobile = authStore.user.phone.slice(3, 13);
  }
});
// Mock data for inquiry types
const inquiryTypes = ['content.product_inquiry', 'content.technical_support', 'content.billing_inquiry']; // Inquiry options available
 // Computed property for getting the selected inquiry type's label
const selectedInquiryTypeLabel = computed(() => {
  if (formData.value.type && Number(formData.value.type) > 0) {
    return inquiryTypes[Number(formData.value.type) - 1];
  }
  return 'content.Select_an_inquiry_type'; // Default message if nothing is selected
});
// Methods to handle file drag & drop
const handleDragOver = () => {
  contactFormStore.handleDragOver();
};

const handleDragLeave = () => {
  contactFormStore.handleDragLeave();
};

const handleDrop = (event: DragEvent) => {
  contactFormStore.handleDrop(event);
};

 
const previewUrl = ref<string | null>(null); // رابط المعاينة للملف

// دالة تغيير الملف
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0]; // اختيار أول ملف فقط
    contactFormStore.addFiles(target.files);

    // إعداد FileReader لعرض معاينة الملف
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        previewUrl.value = e.target.result as string; // تعيين رابط المعاينة
      }
    };
    reader.readAsDataURL(file); // قراءة الملف كـ data URL (مناسب للصور)
  }
};

// Form submission handler
const handleSubmit = async () => {
  await contactFormStore.submitForm();
  if (contactFormStore.successMessage = true) {
     thankYouMessage.value = ref(true)
  }
};
</script>

<template>
  <BannerComponent bgName="bg-about-bg" title="content.contact_us" />
  
  <!-- Contact Details Section -->
  <div class="container">
    <div class="flex flex-col md:flex-row justify-center items-center gap-10 mt-20">
      <a href="tel:+966593090185" class="w-full">
        <ContactBox title="content.talk_to_us" details="966593090185+" iconName="icon-contact-phone"></ContactBox>
      </a>
      <a href="mailto:support@moteelz.com" class="w-full">

        <ContactBox title="content.email" details="support@moteelz.com" iconName="icon-contact-mail"></ContactBox>
      </a>
      <NuxtLink class="w-full" :to="`https://www.google.com/maps?q=${location.latitude},${location.longitude}`" target="_blank">
        <ContactBox title="content.location" details="الرياض 12467، المملكة العربية السعودية" iconName="icon-contact-location"></ContactBox>
      </NuxtLink>

    </div>
  </div>
  <!-- Contact Form Section -->
  <div  class="relative z-10 overflow-hidden my-16 page">
    <div class="container mt-8">
      <div class="relative max-w-2xl mx-auto bg-white py-10">
        <!-- Success Alert Message -->
        <div v-if="thankYouMessage" class="col-span-5 rounded-md  p-4 ">
          <div class="flex bg-primary-50 p-4">
            <div class="flex-shrink-0">
              <svg class="h-7 w-7 text-pink-400 me-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-medium text-pink-800">{{ $t('content.message_sent_successfully') }}</h3>
              <div class="mt-2 text-sm text-pink-700">
                <p>{{ $t('content.will_reviewed_and_get_back_soon') }}</p>
              </div>
            </div>
          </div>

          <NuxtLink :to="localePath('/')" class="underline text-center self-center w-full">
            <Button class="text-white mt-2 mx-auto" >العوده الى الرئيسيه</Button>
          </NuxtLink> 
        </div>

        <!-- Form Heading -->
        <div v-if="!thankYouMessage" class="px-4 py-6 sm:px-6 lg:px-8 pb-5 text-start">
          <div class="max-w-lg px-5">
            <h2 class="text-2xl text-center md:text-start font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              <span class="inline-block pb-4 px-2 text-primary">{{ $t('content.contact_us') }}</span>
            </h2>
            <p class="mt-1 text-center md:text-start font-bold text-lg leading-7 text-gray-500">
              {{ $t('business.applyOnForm') }}
            </p>
          </div>
         
        </div>

        <!-- Contact Form -->
        <div v-if="!thankYouMessage" class="bg-white mt-6 lg:mt-0 px-4 sm:px-6 lg:col-span-3 lg:px-8 xl:pl-12">
          <div class="max-w-lg mx-auto lg:max-w-none">
            <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-y-6">
              <!-- Name and Email -->
              <div class="flex flex-col md:flex-row w-full gap-5">
                <div class="w-full">
                  <label for="full-name">{{ $t('content.name') }}</label>
                  <Input v-model="formData.name" type="text" name="full-name" id="full-name" autocomplete="name"
                         class="border mt-2 block focus:outline-none w-full shadow-sm py-3 px-4 placeholder-[#B0B0B0] focus:border-primary border-[#EBEBEB] rounded-md"
                         required :placeholder="$t('content.name')"  />
                </div>
                <div class="w-full">
                  <label for="email">{{ $t('content.email') }}</label>
                  <Input v-model="formData.email" id="email" name="email" type="email" autocomplete="email"
                         class="border mt-2 block w-full shadow-sm focus:outline-none py-3 px-4 placeholder-[#B0B0B0] focus:ring-primary focus:border-primary border-[#EBEBEB] rounded-md"
                         required :placeholder="$t('content.email_placeholder')" />
                </div>
              </div>
              
              <!-- Mobile and Inquiry Type -->
              <div class="flex flex-col md:flex-row w-full gap-5">
                <div class="w-full">
                  <label for="mobile">{{ $t('content.phone_number') }}</label>
                  <PhoneInputComponent 
                  width="w-[50%]"
       :countryCode="countryCode"           
      v-model:mobile="formData.mobile" 
      @update:fullNumber="formData.fullNumber = $event" 
      :placeholder="$t('content.phone_number')"  
    />
 
                </div>
                <div class="w-full">
                  <label for="inquiryType">{{ $t('content.type_of_inquiry') }}</label>
                  <Select default-value="sfvd" v-model="formData.type" id="inquiryType" class="border mt-2 block w-full shadow-sm py-3 px-4 !placeholder-[#B0B0B0] focus:ring-primary focus:border-primary border-[#EBEBEB] rounded-md" required>
                    <SelectTrigger class="text-[#B0B0B0]"  value="0">
                                <SelectValue>{{ $t(selectedInquiryTypeLabel)  }}</SelectValue>
                    </SelectTrigger>
                    <SelectContent >
                      <SelectGroup >
                        <SelectItem v-for="(item, index) in inquiryTypes" :key="index" :value="(index + 1).toString()">{{ $t(item) }}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <!-- Subject and Message -->
              <div>
                <div class="w-full">
                  <label for="subject">{{ $t('content.subject') }}</label>
                  <Input v-model="formData.subject" id="subject" name="subject" type="text" :placeholder="$t('content.subject')"
                         class="border mt-2 block w-full shadow-sm focus:outline-none py-3 px-4 placeholder-gray-500 focus:ring-primary focus:border-primary border-[#EBEBEB] rounded-md"
                         required />
                </div>
              </div>
              <div>
                <label for="message">{{ $t('content.message') }}</label>
                <Textarea v-model="formData.message" id="message" name="message" rows="4"
                          class="mt-2 block w-full focus:ring-0 !focus:outline-none shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-primary focus:border-primary border border-[#EBEBEB] rounded-md"
                          :placeholder="`${$t('content.message')} ...`" required maxlength="800"></Textarea>
              </div>
              
              <!-- File Upload -->
              <div class="flex flex-col">
                <label for="dropzoneFile">{{ $t('content.Booking_details') }}</label>
                <div class="drop-area bg-primary bg-opacity-[0.1] mt-2 rounded-xl h-100"
                     @dragover.prevent="handleDragOver"
                     @dragenter.prevent="handleDragOver"
                     @dragleave="handleDragLeave"
                     @drop.prevent="handleDrop"
                     :class="{ 'drag-over': isDragOver }"
                     @click="$refs.fileInput.click()">
                  <IconUploadFile />
                  <span class="text-primary font-semibold text-sm">{{ $t('content.Choose_file') }}<span class="text-black">، {{ $t('content.drag_and_drop') }}</span></span>
                  <p class="text-[#9D9D9D] text-xs">{{ $t('content.Maximum_file_size') }}</p>
                  <input type="file" ref="fileInput" @change="handleFileChange" accept="image/png, image/jpeg" hidden />
                </div>
                <ul>
                  <li v-for="file in files" :key="file.name">{{ file.name }}</li>
                  <img :src="previewUrl" class="w-32 rounded-xl">
                </ul>
              </div>
              
              <!-- Submit Button -->
              <div class="w-full flex justify-end">
                <Button type="submit" class="bg-primary/80 text-light inline-flex justify-center py-3 px-6 border-transparent shadow-lg text-base font-medium rounded-md hover:bg-primary focus:outline-none transition-colors">
                  <IconLoadingSubmit v-if="isLoading" />
                  <template v-else> {{ $t('content.send') }} </template>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drop-area {
  border: 1px dashed #886CE4;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}
.drop-area.drag-over {
  background-color: #f0f0f0;
  border-color: #666;
}

h2 {
  color: #111827;
}

p,
.contact-items {
  color: #2c333c;
}

.text-pink-400 {
  color: rgb(74 222 128);
}

.bg-primary-50 {
  background-color: rgb(240 253 244);
}

.text-pink-700 {
  color: rgb(21 128 61);
}

.text-pink-800 {
  color: rgb(22 101 52);
}
</style>
