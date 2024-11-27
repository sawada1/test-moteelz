<script lang="ts" setup>
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from "@/components/ui/pin-input";
import pending from "@/components/core/pending.vue";
import IconSecurityAlert from "@/components/icon/IconSecurityAlert.vue";
import LayoutProfile from "@/components/layout/LayoutProfile.vue";
import { ref, onMounted, watchEffect } from "vue";
import { useAuthStore } from "@/stores/auth";
import { date } from "zod";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import PhoneInputComponent from "@/components/form/PhoneInputComponent.vue";
import { Slash } from "lucide-vue-next";

const { toast } = useToast();
const phoneInput = ref<HTMLInputElement | null>(null);
const mobile = ref("");

const fullNumber = ref("");
const countryCode = computed(() => {
  return "+" + phone.value.slice(0, 3); // Get the first 4 characters
});
// Reinitialize intl-tel-input when the route changes
watchEffect(() => {
  if (phoneInput.value) {
    const { $initIntlTelInput } = useNuxtApp();
    $initIntlTelInput(phoneInput.value);
  }
});

const value = ref<string[]>([]); // Holds the value of the entered PIN
const account = ref(true);
const forgotPassword = ref(false); // Tracks whether the user clicked "I forgot password"
const codeVerified = ref(false); // Tracks whether the verification code is correct
const verificationCode = ref(""); // Stores the current entered verification code
const correctCode = "1234"; // The correct code for validation (usually from backend)

const authStore = useAuthStore();

const user = authStore.user;
// This function will be called when the user completes the PIN input
const handleComplete = (enteredPin: string[]) => {
  const pin = enteredPin.join(""); // Join array into a string
  console.log("Entered PIN:", pin); // Log the entered PIN value

  // Validate the entered PIN with the correct code
  if (pin === correctCode) {
    codeVerified.value = true; // Set as verified if correct
    console.log("Code verified successfully!");
  } else {
    codeVerified.value = false; // Code is incorrect
    alert("Incorrect verification code");
  }
};

// This function starts the "forgot password" flow
const resetPasswordFlow = () => {
  forgotPassword.value = true;
};
// Initialize reactive properties with the user’s profile data
const firstName = ref(authStore.user?.first_name || "");
const secondName = ref(authStore.user?.second_name || "");
const lastName = ref(authStore.user?.last_name || "");
const email = ref(authStore.user?.email || "");
const phone = ref(authStore.user?.phone || "");
const gender = ref(authStore.user?.gender || "");
const dateOfBirth = ref(authStore.user?.dateOfBirth || "");
// Use onMounted to ensure user profile is loaded
onMounted(async () => {
  await authStore.loadUserProfile();
});

watchEffect(() => {
  if (phoneInput.value) {
    const { $initIntlTelInput } = useNuxtApp();
    $initIntlTelInput(phoneInput.value);
  }
});

// Update profile function, sending only modified values
const updateProfile = async () => {
  const payload = {
    first_name:
      firstName.value !== authStore.user?.first_name
        ? firstName.value
        : authStore.user?.first_name,
    second_name:
      secondName.value !== authStore.user?.second_name
        ? secondName.value
        : authStore.user?.second_name,
    last_name:
      lastName.value !== authStore.user?.last_name
        ? lastName.value
        : authStore.user?.last_name,
    email:
      email.value !== authStore.user?.email
        ? email.value
        : authStore.user?.email,
    phone:
      phone.value !== authStore.user?.phone
        ? phone.value
        : authStore.user?.phone,
    // Always include non-editable fields
    gender:
      gender.value !== authStore.user?.gender
        ? gender.value
        : authStore.user?.gender,
    dateOfBirth:
      dateOfBirth.value !== authStore.user?.date_of_birth
        ? dateOfBirth.value
        : authStore.user?.date_of_birth,
  };
  const success = await authStore.updateAccount(payload);
  if (success) {
    toast({
      title: "لقد تم تحديث الملف الشخصي بنجاح.",
    });
  } else {
    toast({
      variant: "destructive",
      title: "عذرًا! حدث خطأ.",
      description: `Error: ${authStore.error || "Failed to update profile"}`,
    });
  }
};
</script>
<template>
  <LayoutProfile>
    <Breadcrumb class="mt-5 ms-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <NuxtLink to="/">{{ $t("header.home") }}</NuxtLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <NuxtLink to="/ar/dashboard">
            {{ $t("content.profile") }}
          </NuxtLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div v-if="!authStore?.user" class="grid place-items-center">
      <pending />
    </div>
    <div v-else class="md:p-10 p-5">
      <span class="">{{ $t("content.profile") }}</span>
      <div class="flex justify-center items-center">
        <div class="bg-white rounded-full px-5 py-1 flex flex-row gap-2">

          <span @click="account = true" :class="account ? 'bg-primary text-white' : 'border-primary border'"
            class=" cursor-pointer rounded-full md:px-5 py-2  px-2 text-center text-xs md:text-sm">{{
              $t('content.user_info')}} </span>
          <!-- <span @click="account = false" :class="!account ? 'bg-primary text-white' : 'border-primary border'"
                class="cursor-pointer rounded-full md:px-5 py-2  px-2 text-center text-xs md:text-sm">  {{ $t('content.change_password')}} </span> -->
        </div>
      </div>
      <div v-if="account" class="">
        <form action="" @submit.prevent="updateProfile">
          <div class="flex flex-col md:flex-row gap-5 justify-center w-full mt-5">
            <div class="flex flex-col  w-full gap-3">
              <label for="name" class="text-sm">{{ $t('content.first_name') }}</label>
              <Input
                class="border  block focus:outline-none w-full shadow-sm px-2 py-2 placeholder-[#B0B0B0]   focus:border-primary border-[#EBEBEB] rounded-md"
                id="name" type="text" :placeholder="authStore.user?.firstName" v-model="firstName" />
            </div>
            <div class="flex flex-col  w-full gap-3">
              <label for="name" class="text-sm">{{ $t('content.mid_name') }} </label>
              <Input
                class="border  block focus:outline-none w-full shadow-sm px-2 py-2 placeholder-[#B0B0B0]   focus:border-primary border-[#EBEBEB] rounded-md"
                id="name" type="text" :placeholder="authStore.user?.secondName" v-model="secondName" />
            </div>
            <div class="flex flex-col  w-full gap-3 ">
              <label class="text-sm" for="name"> {{ $t('content.last_name') }}</label>
              <Input
                class="border outline-none  block focus:!outline-none w-full shadow-sm px-2 py-2 placeholder-[#B0B0B0]   focus:border-primary border-[#EBEBEB] rounded-md"
                id="name" type="text" :placeholder="authStore.user?.lastName" v-model="lastName" />
            </div>
          </div>
          <div class="flex flex-col md:flex-row gap-5 justify-center w-full mt-5">

            <div class="flex flex-col  w-full gap-3">

              <label for="name" class="text-sm">{{ $t('content.gender') }}</label>
              <Select v-model="gender" class="text-center">
                <SelectTrigger class="w-full">
                  <SelectValue
                    :placeholder="authStore.user?.gender === 'male' ? $t('content.male') : $t('content.female')" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{{ $t('content.gender') }}</SelectLabel>
                    <SelectItem value="male" class="text-center">
                      {{ $t('content.male') }}
                    </SelectItem>
                    <SelectItem value="female">
                      {{ $t('content.female') }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div class="flex flex-col  w-full gap-3">
              <label for="date" class="text-sm"> {{ $t('content.date_of_birth') }} <span
                  class="text-xs text-textLightGray">{{ authStore.user?.dateOfBirth }}</span></label>
              <Input
                class="border  block focus:outline-none w-full shadow-sm px-2 py-2 placeholder-[#B0B0B0]   focus:border-primary border-[#EBEBEB] rounded-md"
                id="date" type="date" :placeholder="authStore.user?.dateOfBirth" v-model="dateOfBirth" />
            </div>
            <div class="flex flex-col  w-full gap-3">
              <label class="text-sm" for="mobile">{{ $t('content.phone_number') }}</label>
              <PhoneInputComponent :isDisabled="true" :countryCode="countryCode" :mobile="mobile"
                :placeholder="authStore.user?.phone" @update:countryCode="countryCode = $event"
                @update:mobile="mobile = $event" @update:fullNumber="fullNumber = $event" width="w-[30%]" />


            </div>
          </div>
          <div class="flex flex-col md:flex-row gap-5 justify-center w-full mt-5">
            <!-- <div class="flex flex-col w-full gap-3 "> <label class="text-sm" for="name">{{ $t('content.email')}} </label>
                <Input
                    class="border flex items-center  focus:outline-none w-full shadow-sm px-2 py-2 placeholder-[#B0B0B0]   focus:border-primary border-[#EBEBEB] rounded-md"
                    id="name" type="email" disabled :value="authStore.user?.email" :placeholder="authStore.user?.email" v-model="email"/>
            </div> -->
          </div>
          <div class="w-full flex justify-end">
            <Button type="submit"
              class="bg-green hover:bg-white hover:text-green hover:border hover:shadow-customShadow transition-all duration-600  text-white mt-5 w-full md:w-auto">{{
                $t('content.save_changes') }}</Button>
          </div>
        </form>
      </div>
      <div v-if="!account" class="flex flex-col gap-5 mt-5">
        <div v-if="!forgotPassword && !codeVerified" class="">
          <div class="flex flex-col">
            <label for="old-password">{{ $t("content.old_password") }}</label>
            <Input type="password" id="old-password"
              class="!border-[1px] text-start focus:outline-none w-full shadow-sm py-2 px-4 placeholder-[#B0B0B0] focus:ring-primary focus:!border-primary !border-[#EBEBEB] !rounded-md outline-none focus:!ring-0" />
            <span @click="resetPasswordFlow" id="forgot-password"
              class="text-primary text-xs underline cursor-pointer">{{ $t("content.forgot_your_password") }}</span>
          </div>
          <div class="flex flex-col md:flex-row gap-5 mt-5">
            <div class="flex flex-col w-full">
              <label for="old-password">{{ $t("content.new_password") }}</label>
              <Input type="password" id="old-password"
                class="!border-[1px] text-start focus:outline-none w-full shadow-sm py-2 px-4 placeholder-[#B0B0B0] focus:ring-primary focus:!border-primary !border-[#EBEBEB] !rounded-md outline-none focus:!ring-0" />
            </div>
            <div class="flex flex-col w-full">
              <label for="old-password">{{
                $t("content.confirm_password")
              }}</label>
              <Input type="password" id="old-password"
                class="!border-[1px] text-start focus:outline-none w-full shadow-sm py-2 px-4 placeholder-[#B0B0B0] focus:ring-primary focus:!border-primary !border-[#EBEBEB] !rounded-md outline-none focus:!ring-0" />
            </div>
          </div>
          <div class="w-full flex justify-end mt-5">
            <Button class="text-white w-full md:w-auto">{{ $t("content.save_changes") }}
            </Button>
          </div>
        </div>

        <!-- Code Verification Section (If forgot password clicked) -->
        <div v-show="!codeVerified && forgotPassword" class="flex flex-col gap-5 mt-5 w-full">
          <div class="flex justify-center w-full">
            <div
              class="flex flex-row-reverse px-5 py-2 justify-center items-center w-fit gap-4 bg-[#C59A000A] border-[1px] border-[#C59A00] rounded">
              <IconSecurityAlert></IconSecurityAlert>
              <div class="">
                <span class="text-sm">{{
                  $t("content.check_your_email")
                }}</span>
                <p class="text-[#9A9CAE] text-xs">
                  {{ $t("content.verification_email_sent") }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-center gap-4 justify-center">
            <span class="font-semibold text-lg">{{
              $t("content.verification")
            }}</span>
            <p class="text-[#9A9CAE] text-xs">
              <span>{{ $t("content.enter_otp_we_sent") }}</span>@52****
            </p>

            <div class="w-[100vw] md:w-full">
              <PinInput id="pin-input" class="flex justify-center" v-model="value" placeholder="○"
                @complete="handleComplete">
                <PinInputGroup class="gap-5 justify-center">
                  <PinInputInput v-for="(id, index) in 4" :key="id" :index="index"
                    class="border-2 border-[#B4B4B4] rounded outline-none focus:!ring-0 focus:border-primary placeholder:text-center" />
                </PinInputGroup>
              </PinInput>
            </div>
            <!-- Pin Input -->

            <!-- Show an error message if the code is incorrect -->
            <span v-if="!codeVerified && value.length === 4" class="text-red-500 text-xs">Incorrect verification
              code</span>

            <!-- Submit Button -->
            <Button @click="handleComplete(value)" class="text-white w-32">إدخل</Button>

            <span>إعادة إرسال الرمز:<span class="text-primary"> 00:45</span></span>
          </div>
        </div>
        <!-- New Password and Confirm Password (If code is verified) -->
        <div v-if="codeVerified" class="flex flex-col gap-5 mt-5">
          <div class="flex flex-col">
            <label for="new-password">{{ $t("content.new_password") }}</label>
            <Input type="password" id="new-password"
              class="!border-[1px] text-start focus:outline-none w-full shadow-sm py-2 px-4 placeholder-[#B0B0B0] focus:ring-primary focus:!border-primary !border-[#EBEBEB] !rounded-md outline-none focus:!ring-0" />
          </div>
          <div class="flex flex-col">
            <label for="confirm-password">{{
              $t("content.confirm_password")
            }}</label>
            <Input type="password" id="confirm-password"
              class="!border-[1px] text-start focus:outline-none w-full shadow-sm py-2 px-4 placeholder-[#B0B0B0] focus:ring-primary focus:!border-primary !border-[#EBEBEB] !rounded-md outline-none focus:!ring-0" />
          </div>
          <div class="w-full flex">
            <Button class="text-white">{{ $t("content.save_changes") }}</Button>
          </div>
        </div>
      </div>
    </div>
    <Toaster />
  </LayoutProfile>
</template>

<style scoped>
input {
  text-align: unset;
}
</style>
