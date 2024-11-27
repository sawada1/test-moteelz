<template>
  <div v-if="show" class="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
    <header class="md:hidden bg-primary w-full h-[60px] flex items-center justify-between px-2">
      <span class="text-white">{{ $t("header.login") }}</span>
      <button @click="$emit('close')" class="text-red-500">
        <IconBackMobile height="20px"></IconBackMobile>
      </button>
    </header>
    <div
      class="bg-white h-[100%] md:h-auto flex flex-col space-y-10 md:space-y-2 items-center p-6 rounded-lg shadow-lg w-screen md:w-96">
      <button @click="$emit('close')" class="hidden md:block mt-4 text-red-500 self-start">
        <IconClose height="20px"></IconClose>
      </button>
      <h2 class="my-2 text-2xl font-bold text-primary_dark">
        {{ isNewUser ? "Register" : t("content.titleLogin") }}
      </h2>
      <span class="text-[#6b7280]">
        {{
          needsOnboarding
            ? t("content.plz_enter_the_following_details")
            : isOtpSent
              ? t("content.enter_otp")
              : t("content.spanTitleLogin")
        }}
      </span>
      <!-- OTP Verification -->
      <div v-if="!isVerified && !needsOnboarding" class="mt-5">
        <form v-if="!isOtpSent" @submit.prevent="handleSendOtp" class="flex flex-col gap-2">
          <label for="mobile">{{ t('content.phone_number') }}</label>
          <div class="flex flex-col gap-5 justify-center items-center">
            <div class="flex justify-center items-center">

              <PhoneInputComponent width="w-[50%]" :countryCode="countryCode" :mobile="mobile"
                :placeholder="'Enter your phone number'" @update:countryCode="countryCode = $event"
                @update:mobile="mobile = $event" @update:fullNumber="fullNumber = $event" />
            </div>
            <span class="text-[#6b7280]">{{ t('content.spanFooterLogin') }}</span>
            <Button class="w-full text-white font-semibold text-lg" type="submit"
              :disabled="authStore.loading || !mobile || timer > 0">
              {{ timer > 0 ? `${t('content.resend_in')} ${timer}s` : t('content.mobile_otp_verification') }}
            </Button>
          </div>
        </form>

        <div v-else class="w-[100vw] md:w-full text-center space-y-3 px-2">
          <p class="text-[#9A9CAE] text-xs">
            {{ $t('content.enter_otp_we_sent') + mobile }}
          </p>
          <PinInput id="otp" class="flex justify-center" v-model="value" placeholder="○" @complete="handleComplete">
            <PinInputGroup class="gap-5 justify-center">
              <PinInputInput v-for="(id, index) in 4" :key="id" :index="index"
                class="border-2 border-[#B4B4B4] rounded outline-none focus:!ring-0 focus:border-primary placeholder:text-center" />
            </PinInputGroup>
          </PinInput>
          <p class="px-2">
            {{ $t("content.didnt_receive_code") }}
            <span v-if="timer === 0" class="text-primary cursor-pointer" @click="handleSendOtp">{{ $t("content.resend")
              }}</span>
            <span v-else class="text-primary">00:{{ timer < 10 ? "0" : "" }}{{ timer }}</span>
          </p>
          <Button class="w-full text-white" type="submit" :disabled="authStore.loading" @click="handleVerifyOtp">
            {{
              authStore.loading
                ? "..."
                : authStore.success
                  ? t("content.Verified")
                  : t("content.verify")
            }}
          </Button>
        </div>
      </div>
      <!-- Onboarding Form if onboarding is required -->
      <div v-if="isVerified && needsOnboarding">
        <form @submit.prevent="handleCompleteOnboarding" class="flex flex-col gap-5 mt-5">
          <div class="flex w-full gap-2">
            <FormField name="firstName">
              <FormItem>
                <FormControl>
                  <Input type="text" id="first_name" :placeholder="t('content.first_name')" v-model="firstName" />
                </FormControl>
                <FormMessage />
                <p class="text-red-500" v-if="firstNameError">
                  {{ firstNameError }}
                </p>
              </FormItem>
            </FormField>
            <FormField name="secondName">
              <FormItem>
                <FormControl>
                  <Input type="text" id="second_name" :placeholder="t('content.mid_name')" v-model="secondName" />
                </FormControl>
                <FormMessage />
                <p class="text-red-500" v-if="secondNameError">
                  {{ secondNameError }}
                </p>
              </FormItem>
            </FormField>
            <FormField name="lastName">
              <FormItem>
                <FormControl>
                  <Input type="text" id="last_name" :placeholder="t('content.last_name')" v-model="lastName" />
                </FormControl>
                <FormMessage />
                <p class="text-red-500" v-if="lastNameError">
                  {{ lastNameError }}
                </p>
              </FormItem>
            </FormField>
          </div>
          <!-- commented the email part as requested  -->
          <!-- <FormField name="email">
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  id="email"
                  :placeholder="t('content.email')"
                  v-model="email"
                />
              </FormControl>
              <FormMessage />
              <p class="text-red-500" v-if="emailError">{{ emailError }}</p>
            </FormItem>
          </FormField> -->
          <div class="flex w-full gap-2">
            <FormField name="gender">
              <FormItem>
                <Select id="gender" v-model="gender">
                  <SelectTrigger class="text-center">
                    <SelectValue :placeholder="t('content.gender')" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="male">{{
                        t("content.male")
                      }}</SelectItem>
                      <SelectItem value="female">{{
                        t("content.female")
                      }}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
                <p class="text-red-500" v-if="genderError">{{ genderError }}</p>
              </FormItem>
            </FormField>
            <FormField name="dateOfBirth">
              <FormItem>
                <FormControl>
                  <Input type="date" :max="maxDate" id="date_of_birth" placeholder="تاريخ الميلاد"
                    v-model="dateOfBirth" />
                </FormControl>
                <FormMessage />
                <p class="text-red-500" v-if="dateOfBirthError">
                  {{ dateOfBirthError }}
                </p>
              </FormItem>
            </FormField>
          </div>
          <Button class="text-white" type="submit" :disabled="authStore.loading">{{ t("content.combRegisterUser")
            }}</Button>
        </form>
      </div>
      <p v-if="authStore.error" class="text-red-500">{{ authStore.error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { FormField } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from "@/components/ui/pin-input";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import CountriesFlagIcons from "../icon/CountriesFlagIcons.vue";
import FormMessage from "../ui/form/FormMessage.vue";
import PhoneInputComponent from "../form/PhoneInputComponent.vue";
import IconBar from "../icon/IconBar.vue";
import IconBackMobile from "../icon/IconBackMobile.vue";

// Define reactive state in the parent
const fullNumber = ref("");
const { t, locale } = useI18n();
const props = defineProps<{ show: boolean }>();
const emit = defineEmits(["close"]);
const authStore = useAuthStore();
const router = useRouter();
const value = ref<string[]>([]);
const mobile = ref("");
const countryCode = ref("+966");
const otp = ref("");
const isOtpSent = ref(false);
const isVerified = ref(false);
const needsOnboarding = ref(false);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const countriesCode = ref([]);
const localePath = useLocalePath();
const timer = ref(0);
let intervalId: any;

watch(locale, (newLocale) => {
  console.log(`Locale changed to: ${newLocale}`);
});

onMounted(async () => {
  const success = await authStore.getCountryCodes();
  if (success) {
    countriesCode.value = authStore.countryCodes;
  } else {
    console.error("Failed to fetch country codes:", authStore.error);
  }
});

const startTimer = () => {
  timer.value = 45; // Set the initial timer value in seconds
  intervalId = setInterval(() => {
    if (timer.value > 0) {
      timer.value--; // Decrement the timer value by 1 second
    } else {
      clearInterval(intervalId); // Clear the interval when the timer reaches 0
    }
  }, 1000); // Run the timer every 1 second
};

const handleComplete = (enteredPin: string[]) => {
  otp.value = enteredPin.join("");
};

const handleSendOtp = async () => {
  const fullMobileNumber = countryCode.value + mobile.value;
  const success = await authStore.sendOtp({ phone: fullMobileNumber });

  if (success) {
    isOtpSent.value = true;
    startTimer(); // Start the timer after sending OTP successfully
  } else {
    // The error will be displayed through `authStore.error`
    console.error("Failed to send OTP:", authStore.error);
  }
};


const handleVerifyOtp = async () => {
  const fullMobileNumber = countryCode.value + mobile.value;
  authStore.loading = true;

  try {
    const success = await authStore.verifyOtp(fullMobileNumber, otp.value);
    authStore.loading = false;
    authStore.success = success;

    if (success) {
      await authStore.loadUserProfile();
      isVerified.value = true;
      needsOnboarding.value = authStore.on_boarding !== "complete";
      if (!needsOnboarding.value) {
        emit("close");
      }
    }
  } catch (error) {
    authStore.loading = false;
    console.error("An error occurred during OTP verification:", error);
  }
};

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  secondName: yup.string().required("Second name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email"),
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 15)), "Date of birth must be at least 15 years ago"),
});

const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 15)).toISOString().split("T")[0];

const { handleSubmit } = useForm({ validationSchema: schema });
const { value: firstName, errorMessage: firstNameError } =
  useField("firstName");
const { value: secondName, errorMessage: secondNameError } =
  useField("secondName");
const { value: lastName, errorMessage: lastNameError } = useField("lastName");
const { value: email, errorMessage: emailError } = useField("email");
const { value: gender, errorMessage: genderError } = useField("gender");
const { value: dateOfBirth, errorMessage: dateOfBirthError } =
  useField("dateOfBirth");

const handleCompleteOnboarding = handleSubmit(async (values) => {
  const payload = {
    first_name: values.firstName,
    second_name: values.secondName,
    last_name: values.lastName,
    gender: values.gender,
    email: values.email,
    on_boarding: "complete",
    date_of_birth: values.dateOfBirth,
  };

  const success = await authStore.completeOnboarding(payload);
  needsOnboarding.value = !success;
  if (success) {
    emit("close");
    router.push(localePath("/dashboard"));
  }
});
</script>

<style scoped>
/* Add any necessary styles */
</style>
