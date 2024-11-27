<script lang="ts" setup>
import { ref } from 'vue';
import {
    PinInput,
    PinInputGroup,
    PinInputInput,
} from '@/components/ui/pin-input';
import IconSecurityAlert from '@/components/icon/IconSecurityAlert.vue';

const value = ref<string[]>([]); // Holds the value of the entered PIN
const account = ref(true);
const forgotPassword = ref(false); // Tracks whether the user clicked "I forgot password"
const codeVerified = ref(false);   // Tracks whether the verification code is correct
const verificationCode = ref('');  // Stores the current entered verification code
const correctCode = '1234';        // The correct code for validation (usually from backend)

// This function will be called when the user completes the PIN input
const handleComplete = (enteredPin: string[]) => {
    const pin = enteredPin.join('');  // Join array into a string
    console.log('Entered PIN:', pin); // Log the entered PIN value

    // Validate the entered PIN with the correct code
    if (pin === correctCode) {
        codeVerified.value = true; // Set as verified if correct
        console.log('Code verified successfully!');
    } else {
        codeVerified.value = false; // Code is incorrect
        alert('Incorrect verification code');
    }
};

// This function starts the "forgot password" flow
const resetPasswordFlow = () => {
    forgotPassword.value = true;
};
definePageMeta({
  layout: 'profile'
})
</script>

<template>
    <span>الملف الشخصي</span>
    <div class="flex justify-center items-center">
        <div class="bg-white rounded-full px-5 py-1 flex gap-2">
            <span @click="account = false" :class="!account ? 'bg-primary text-white' : 'border-primary border'"
                class="cursor-pointer rounded-full px-5 py-2 text-sm"> تغيير كلمة المرور</span>
            <span @click="account = true" :class="account ? 'bg-primary text-white' : 'border-primary border'"
                class=" cursor-pointer rounded-full px-5 py-2 text-sm">البيانات الشخصيه</span>

        </div>

    </div>
    <div v-if="account" class="">
        <div class="flex gap-5 justify-center w-full mt-5">

            <div class="flex flex-col items-end w-full gap-3">
                <label for="name" class="text-sm">الاسم الاول</label>
                <Input
                    class="border  block focus:outline-none w-full shadow-sm px-2 py-2 placeholder-[#B0B0B0]   focus:border-primary border-[#EBEBEB] rounded-md"
                    id="name" type="text" placeholder="الاسم الاول" required />
            </div>
            <div class="flex flex-col items-end w-full gap-3 ">
                <label class="text-sm" for="name">الاسم الاخير</label>
                <Input
                    class="border outline-none  block focus:!outline-none w-full shadow-sm px-2 py-2 placeholder-[#B0B0B0]   focus:border-primary border-[#EBEBEB] rounded-md"
                    id="name" type="text" placeholder="الاسم الاخير" required />
            </div>

        </div>
        <div class="flex gap-5 justify-center w-full mt-5">
            <div class="flex flex-col w-full gap-3 "> <label class="text-sm" for="name">البريد الالكتروني</label>
                <Input
                    class="border flex items-center  focus:outline-none w-full shadow-sm px-2 py-2 placeholder-[#B0B0B0]   focus:border-primary border-[#EBEBEB] rounded-md"
                    id="name" type="email" placeholder="اكتب عنوان بريدك الالكتورني" required />
            </div>
            <div class="flex flex-col w-full gap-3">
                <label class="text-sm" for="mobile">{{ $t('content.phone_number') }}</label>

                <vue-tel-input defaultCountry="sa" required
                    class="!border-[1px] text-start focus:outline-none  w-full shadow-sm py-2 px-4 placeholder-[#B0B0B0] focus:ring-primary focus:!border-primary !border-[#EBEBEB] !rounded-md"
                    mode="international"></vue-tel-input>
            </div>
        </div>
        <div class="w-full flex">
            <Button class="text-white mt-5 self-end">حفظ التغيرات </Button>
        </div>
    </div>
    <div v-if="!account" class="flex flex-col gap-5 mt-5">
        <div v-if="!forgotPassword && !codeVerified" class="">
            <div class="flex flex-col">
                <label for="old-password">كلمة المرور القديمه</label>
                <Input type="password" id="old-password"
                    class="!border-[1px] text-start focus:outline-none  w-full shadow-sm py-2 px-4 placeholder-[#B0B0B0] focus:ring-primary focus:!border-primary !border-[#EBEBEB] !rounded-md outline-none focus:!ring-0" />
                <span @click="resetPasswordFlow" id="forgot-password"
                    class="text-primary text-xs underline cursor-pointer">هل نسيت كلمة المرور؟</span>
            </div>
            <div class="flex ltr:flex-row gap-5 rtl:flex-row-reverse">
                <div class="flex flex-col w-full">
                    <label for="old-password">كلمة المرور الجديده</label>
                    <Input type="password" id="old-password"
                        class="!border-[1px] text-start focus:outline-none  w-full shadow-sm py-2 px-4 placeholder-[#B0B0B0] focus:ring-primary focus:!border-primary !border-[#EBEBEB] !rounded-md outline-none focus:!ring-0" />
                </div>
                <div class="flex flex-col w-full">
                    <label for="old-password">تاكيد كلمة المرور الجديده</label>
                    <Input type="password" id="old-password"
                        class="!border-[1px] text-start focus:outline-none  w-full shadow-sm py-2 px-4 placeholder-[#B0B0B0] focus:ring-primary focus:!border-primary !border-[#EBEBEB] !rounded-md outline-none focus:!ring-0" />
                </div>
            </div>
            <div class="w-full flex">
                <Button class="text-white">حفظ التغيرات</Button>
            </div>
        </div>

       <!-- Code Verification Section (If forgot password clicked) -->
    <div v-if="forgotPassword && !codeVerified" class="flex flex-col gap-5 mt-5">
        <div class="flex justify-center">
            <div
                class="flex flex-row-reverse px-5 py-2 justify-center items-center w-fit gap-4 bg-[#C59A000A] border-[1px] border-[#C59A00] rounded">
                <IconSecurityAlert></IconSecurityAlert>
                <div class="">
                    <span class="text-sm">تحقق من بريدك الإلكتروني</span>
                    <p class="text-[#9A9CAE] text-xs">تم إرسال بريد إلكتروني إليك يحتوي على تعليمات مفصلة حول كيفية إعادة تعيين كلمة المرور الخاصة بك.</p>
                </div>
            </div>
        </div>
        
        <div class="flex flex-col items-center gap-4 justify-center">
            <span class="font-semibold text-lg">التحقق</span>
            <p class="text-[#9A9CAE] text-xs">أدخل الرمز المكون من 4 أرقام الذي أرسلناه للتو إلى@52****</p>

            <!-- Pin Input -->
            <PinInput id="pin-input" v-model="value" placeholder="○" @complete="handleComplete">
                <PinInputGroup class="gap-5">
                    <PinInputInput v-for="(id, index) in 4" :key="id" :index="index"
                        class=" border-2 border-[#B4B4B4] rounded outline-none focus:!ring-0 focus:border-primary" />
                </PinInputGroup>
            </PinInput>
            
            <!-- Show an error message if the code is incorrect -->
            <span v-if="!codeVerified && value.length === 4" class="text-red-500 text-xs">Incorrect verification code</span>
            
            <!-- Submit Button -->
            <Button @click="handleComplete(value)" class="text-white w-32">إدخل</Button>

            <span>إعادة إرسال الرمز:<span class="text-primary"> 00:45</span></span>
        </div>
    </div>

        <!-- New Password and Confirm Password (If code is verified) -->
        <div v-if="codeVerified" class="flex flex-col gap-5 mt-5">
            <div class="flex flex-col">
                <label for="new-password">كلمة المرور الجديده</label>
                <Input type="password" id="new-password"
                    class="!border-[1px] text-start focus:outline-none w-full shadow-sm py-2 px-4 placeholder-[#B0B0B0] focus:ring-primary focus:!border-primary !border-[#EBEBEB] !rounded-md outline-none focus:!ring-0" />
            </div>
            <div class="flex flex-col">
                <label for="confirm-password">تاكيد كلمة المرور الجديده</label>
                <Input type="password" id="confirm-password"
                    class="!border-[1px] text-start focus:outline-none w-full shadow-sm py-2 px-4 placeholder-[#B0B0B0] focus:ring-primary focus:!border-primary !border-[#EBEBEB] !rounded-md outline-none focus:!ring-0" />
            </div>
            <div class="w-full flex">
                <Button class="text-white">حفظ التغيرات</Button>
            </div>
        </div>
    </div>
</template>