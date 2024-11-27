<template>
    <div class="h-screen inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white flex flex-col items-center p-6 rounded-lg shadow-lg w-96">
        <button @click="$emit('close')" class="mt-4 text-red-500 self-start">
          <IconClose height="20px"></IconClose>
        </button>
        <h2 class="my-2 text-2xl font-bold text-primary_dark">{{ isNewUser ? 'Register' : $t('content.titleLogin') }}</h2>
        <span class="text-[#6b7280]"> {{ needsOnboarding ? $t('content.plz_enter_the_following_details') : isOtpSent ? $t('content.enter_otp') : $t('content.spanTitleLogin') }} </span>
        <!-- OTP Verification -->
        <div v-if="!isVerified && !needsOnboarding" class="mt-5">
          <form v-if="!isOtpSent" @submit.prevent="handleSendOtp" class="flex flex-col gap-2">
            <label for="mobile">{{$t('content.phone_number')}}</label>
            <div class=" flex flex-col gap-5 justify-center items-center">
              <div class=" flex justify-center items-center">
                <div class="flex" >
                  <Select v-model="countryCode"  class="outline-0 focus:border-primary ">
                    <SelectTrigger :class="locale === 'ar'? 'border-e rounded-s-none !border-s-0': 'border-s rounded-e-none !border-e-0'" class="w-[50%]  outline-0 focus:border-primary  px-2 py-5 focus:outline-0  ">
                      <SelectValue class="p-0">
                        {{ countryCode }}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent class="">
                      <SelectGroup class="">
                        <SelectItem class="" v-for="country in countriesCode" :key="country.id"
                          :value="country.phone_key">
                          <div class="flex flex-row gap-5 justify-end-end">
                            <!-- <CountriesFlagIcons :countryCode="country?.code" class="w-5 h-5" /> -->
                            <span>{{ country.name_ar }}</span>
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
              </Select>
                  <FormField name="phone" class="">
                    <FormItem>
                      <FormControl>
  
                        <input :placeholder="$t('content.mobile_number')" id="phone" v-model="mobile" required
   
                          class="border-t border-b border-e rounded-s-none !border-s-0 flex items-center  focus:outline-none w-full shadow-sm px-2 py-2 placeholder-[#B0B0B0]  focus:border-primary border-[#EBEBEB] rounded-md"
                          ref="phoneInput" type="tel" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </div>
              </div>
              <span class="text-[#6b7280]">{{ $t('content.spanFooterLogin') }}</span>
  
  
  
  
  
              <Button class="w-full text-white font-semibold text-lg" type="submit" :disabled="authStore.loading || !mobile">{{$t('content.mobile_otp_verification')}}</Button>
            </div>
  
          </form>
  
          <!-- <form v-else @submit.prevent="handleVerifyOtp">
            <div class=" flex flex-col gap-5 justify-center items-center">
              <label for="otp" class="">ادخل الرمز لاكمال التسجيل</label>
              <FormField name="phone">
                <FormItem>
                  <FormControl>
                    <input id="otp" v-model="otp" required
                      class="border flex items-center  focus:outline-none w-full shadow-sm px-2 py-2 placeholder-[#B0B0B0]  focus:border-primary border-[#EBEBEB] rounded-md"
                      ref="phoneInput" type="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
  
  
              <Button class="w-full text-white" type="submit" :disabled="authStore.loading">Verify OTP</Button>
  
            </div>
          </form> -->
          <div v-else class="w-[100vw] md:w-full mt-5">
                  <PinInput id="otp" class="flex justify-center" v-model="value" placeholder="○" @complete="handleComplete">
                  <PinInputGroup class="gap-5 justify-center">
                      <PinInputInput v-for="(id, index) in 4" :key="id" :index="index"
                          class=" border-2 border-[#B4B4B4] rounded outline-none focus:!ring-0 focus:border-primary placeholder:text-center" />
                  </PinInputGroup>
              </PinInput>
              <Button class="w-full text-white mt-5" type="submit" :disabled="authStore.loading" @click="handleVerifyOtp">{{authStore.loading ? '...' : authStore.success ?  $t('content.Verified') : $t('content.verify')}}</Button>
  
              </div>
  
          <p v-if="authStore.error" class="text-red-500">{{ authStore.error }}</p>
        </div>
  
        <!-- Onboarding Form if onboarding is required -->
        <div v-if="isVerified && needsOnboarding">
      <form @submit.prevent="handleCompleteOnboarding" class="flex flex-col gap-5 mt-5">
        <div class="flex w-full gap-2">
          <!-- First Name Field with Error Message -->
          <FormField name="firstName">
            <FormItem>
              <FormControl>
                <Input type="text" id="first_name" :placeholder="$t('content.first_name')" v-model="firstName" />
              </FormControl>
              <p class="text-red-500" v-if="firstNameError">{{ firstNameError }}</p>
            </FormItem>
          </FormField>
  
          <!-- Second Name Field with Error Message -->
          <FormField name="secondName">
            <FormItem>
              <FormControl>
                <Input type="text" id="second_name" :placeholder="$t('content.mid_name')" v-model="secondName" />
              </FormControl>
              <p class="text-red-500" v-if="secondNameError">{{ secondNameError }}</p>
            </FormItem>
          </FormField>
  
          <!-- Last Name Field with Error Message -->
          <FormField name="lastName">
            <FormItem>
              <FormControl>
                <Input type="text" id="last_name" :placeholder="$t('content.last_name')" v-model="lastName" />
              </FormControl>
              <p class="text-red-500" v-if="lastNameError">{{ lastNameError }}</p>
            </FormItem>
          </FormField>
        </div>
  
        <!-- Email Field with Error Message -->
        <FormField name="email">
          <FormItem>
            <FormControl>
              <Input type="email" id="email" :placeholder="$t('content.email')" v-model="email" />
            </FormControl>
            <p class="text-red-500" v-if="emailError">{{ emailError }}</p>
          </FormItem>
        </FormField>
  
        <div class="flex w-full gap-2">
          <!-- Gender Field with Error Message -->
          <FormField name="gender">
            <FormItem>
              <Select id="gender" v-model="gender">
                <SelectTrigger class="text-center">
                  <SelectValue :placeholder="$t('content.gender')" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">{{ $t('content.male') }}</SelectItem>
                    <SelectItem value="female">{{ $t('content.female') }}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p class="text-red-500" v-if="genderError">{{ genderError }}</p>
            </FormItem>
          </FormField>
  
          <!-- Date of Birth Field with Error Message -->
          <FormField name="dateOfBirth">
            <FormItem>
              <FormControl>
                <Input type="date" id="date_of_birth" placeholder="تاريخ الميلاد" v-model="dateOfBirth" />
              </FormControl>
              <p class="text-red-500" v-if="dateOfBirthError">{{ dateOfBirthError }}</p>
            </FormItem>
          </FormField>
        </div>
  
        <Button class="text-white" type="submit" :disabled="authStore.loading">{{ $t('content.combRegisterUser') }}</Button>
      </form>
    </div>
  
        <p v-if="authStore.error" class="text-red-500">{{ authStore.error }}</p>
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';
  import { FormField } from '@/components/ui/form';
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
  import {
      PinInput,
      PinInputGroup,
      PinInputInput,
  } from '@/components/ui/pin-input';
  import { useForm, useField } from 'vee-validate';
  import * as yup from 'yup';
  import CountriesFlagIcons from '@/components/icon/CountriesFlagIcons.vue';


  const { locale } = useI18n();
  const props = defineProps<{ show: boolean }>();
  const emit = defineEmits(['close']);
  const authStore = useAuthStore();
  const router = useRouter();
  const value = ref<string[]>([]);
  // State variables
  const mobile = ref('');
  const countryCode = ref('+966');
  const otp = ref('');
   
  const isOtpSent = ref(false);
  const isVerified = ref(false);
  const needsOnboarding = ref(false);
  const isAuthenticated = computed(() => authStore.isAuthenticated);
  const countriesCode = ref([]);
  const localePath = useLocalePath();
  
  // Watch for changes in the `locale`
  watch(locale, (newLocale) => {
    // This function will be called whenever `locale` changes
    console.log(`Locale changed to: ${newLocale}`);
  });
  
  // Fetch country codes when the component mounts
  onMounted(async () => {
    const success = await authStore.getCountryCodes();
    if (success) {
      countriesCode.value = authStore.countryCodes;
    } else {
      console.error("Failed to fetch country codes:", authStore.error);
    }
  
      // Add an event listener to watch for locale changes
      const langObserver = new MutationObserver(() => {
      locale.value = document.documentElement.lang;
    });
  
    // Observe changes to the `lang` attribute on the `<html>` element
    langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
  });
  const handleComplete = (enteredPin: string[]) => {
      const pin = enteredPin.join('');  // Join array into a string
      console.log('Entered PIN:', pin); 
      otp.value = pin;  // Assign the string to otp.value
  };
  // Handle Send OTP
  const handleSendOtp = async () => {
    const fullMobileNumber = countryCode.value + mobile.value;
    const success = await authStore.sendOtp({ phone: fullMobileNumber });
    if (success) {
      isOtpSent.value = true;
    } else {
      console.error("Failed to send OTP:", authStore.error);
    }
  };
  
  const handleVerifyOtp = async () => {
    const fullMobileNumber = countryCode.value + mobile.value;
  
    // Set loading to true to indicate the process has started
    authStore.loading = true;
  
    try {
      // Attempt to verify OTP
      const success = await authStore.verifyOtp(fullMobileNumber, otp.value);
  
      // Set loading to false once the response is received
      authStore.loading = false;
  
      if (success) {
        // Set success to true if verification was successful
        authStore.success = true;
  
        // Load the user profile to update the store and reflect the latest onboarding state
        await authStore.loadUserProfile();
  
        // Update the verified and onboarding state flags
        isVerified.value = true;
  
        // Update the onboarding requirement flag based on the `on_boarding` value
        if (authStore.on_boarding === "complete") {
          needsOnboarding.value = false;
          emit('close');
          router.push(localePath('/dashboard'));
        } else {
          needsOnboarding.value = true;
        }
      } else {
        // If verification fails, set success to false and show error (if any)
        authStore.success = false;
        console.error("OTP verification failed:", authStore.error || "No error message provided");
      }
    } catch (error) {
      // Handle unexpected errors during the OTP verification process
      authStore.loading = false;
      authStore.success = false;
      console.error("An unexpected error occurred during OTP verification:", error);
    }
  };
  // Define validation schema
  const schema = yup.object({
    firstName: yup.string().required('First name is required'),
    secondName: yup.string().required('Second name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    gender: yup.string().required('Gender is required'),
    dateOfBirth: yup.date().required('Date of birth is required'),
  });
  
  // Use VeeValidate's `useForm` to apply the schema
  const { handleSubmit } = useForm({
    validationSchema: schema,
  });
  
  // Fields with `useField` to handle values and errors
  const { value: firstName, errorMessage: firstNameError } = useField('firstName');
  const { value: secondName, errorMessage: secondNameError } = useField('secondName');
  const { value: lastName, errorMessage: lastNameError } = useField('lastName');
  const { value: email, errorMessage: emailError } = useField('email');
  const { value: gender, errorMessage: genderError } = useField('gender');
  const { value: dateOfBirth, errorMessage: dateOfBirthError } = useField('dateOfBirth');
  
  // Handle form submission with validation
  const handleCompleteOnboarding = handleSubmit(async (values) => {
    const payload = {
      first_name: values.firstName,
      second_name: values.secondName,
      last_name: values.lastName,
      gender: values.gender,
      email: values.email,
      on_boarding: 'complete',
      date_of_birth: values.dateOfBirth,
    };
  
    const success = await authStore.completeOnboarding(payload);
  
    if (success) {
      needsOnboarding.value = false;
      emit('close');
      router.push('/dashboard');
    } else {
      console.error("Onboarding completion failed:", authStore.error || "No error message provided");
    }
  });
  
  
  </script>
  
  
  <style scoped>
  /* Add any necessary styles */
  </style>
  