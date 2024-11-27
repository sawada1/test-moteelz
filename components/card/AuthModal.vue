<!-- this modal is for signup and sign in with email and password, not active now -->
<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { Separator } from "@/components/ui/separator";
import IconApple from "../icon/IconApple.vue";
import IconGoogle from "../icon/IconGoogle.vue";
import Iconfacbook from "../icon/Iconfacbook.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { FormField } from "../ui/form";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import Toaster from '@/components/ui/toast/Toaster.vue'
import { onMounted, watchEffect  } from 'vue';

const phoneInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (phoneInput.value) {
    const { $initIntlTelInput } = useNuxtApp();
    $initIntlTelInput(phoneInput.value);
  }
});

// Reinitialize intl-tel-input when the route changes
watchEffect(() => {
  if (phoneInput.value) {
    const { $initIntlTelInput } = useNuxtApp();
    $initIntlTelInput(phoneInput.value);
  }
});

const { toast } = useToast();
const authStore = useAuthStore();
const router = useRouter();
const login = ref(false);

// Form validation schema
const signupSchema = toTypedSchema(
  z.object({
    firstName: z.string().min(1, "الاسم الأول مطلوب"),
    lastName: z.string().min(1, "الاسم الأخير مطلوب"),
    email: z
      .string()
      .email("عنوان البريد الإلكتروني غير صالح")
      .min(1, "البريد الإلكتروني مطلوب"),
    phone: z.string().min(1, "رقم الهاتف مطلوب"),
    password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  })
);

const loginSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .email("عنوان البريد الإلكتروني غير صالح")
      .min(1, "البريد الإلكتروني مطلوب"),
    password: z.string().min(1, "كلمة المرور مطلوبة"),
  })
);

// Use the form validation schema
const signupForm = useForm({
  validationSchema: signupSchema,
});

const loginForm = useForm({
  validationSchema: loginSchema,
});

// Handlers
const handleSignUp = signupForm.handleSubmit(async (values) => {

  const success = await authStore.signUp({
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    phone: values.phone,
  });

  if (success) {
    toast({
      title: "تم إنشاء الحساب بنجاح",
      description: "مرحباً بك في تطبيقنا",
    });
    router.push("/dashboard");
  } else if (authStore.error) {
    toast({
      variant: "destructive",
      title: "خطأ",
      description: authStore.error,
    });
  }
});

const handleLogin = loginForm.handleSubmit(async (values) => {
  const success = await authStore.signIn({
    email: values.email,
    password: values.password,
  });

  if (success) {
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "مرحباً بعودتك",
    });
    router.push("/dashboard");
  } else if (authStore.error) {
    toast({
      variant: "destructive",
      title: "خطأ",
      description: authStore.error,
    });
  }
});
</script>

<template>
    <DialogHeader class="p-6 pb-0 text-center flex flex-col">
        <DialogTitle class="text-center text-black font-bold">{{ login ? 'اهلا بعودتك !' : 'اهلا بك !' }}</DialogTitle>
        <span class="text-sm text-center">أدخل بياناتك لإنشاء حساب</span>
        <!-- <span class="text-sm text-center">أدخل بياناتك لإنشاء حساب</span> -->
    </DialogHeader>

    <div class="flex justify-center items-center">
        <div class="bg-white rounded-full px-5 py-1 flex gap-2">
            <span @click="login = false" :class="!login ? 'bg-primary text-white' : 'border-primary border'"
                class="cursor-pointer rounded-full px-5 py-[2px] text-sm">إنشاء حساب</span>
            <span @click="login = true" :class="login ? 'bg-primary text-white' : 'border-primary border'"
                class="cursor-pointer rounded-full px-5 py-[2px] text-sm">تسجيل الدخول</span>
        </div>
    </div>

    <div v-if="!login" class="" >
        <form class="space-y-2 px-6 pt-1" @submit.prevent="handleSignUp">
            <div class="flex gap-5">
                <!-- First Name -->

                <div>
                    <label for="FirstName" class="text-sm">الاسم الاول</label> <!-- Booking Number -->
                    <FormField name="firstName">
                        <FormItem>
                            <FormControl>
                                <Input v-model="signupForm.values.firstName"
                                    class="border h-8 block focus:outline-none w-full shadow-sm placeholder-[#B0B0B0] focus:border-primary border-[#EBEBEB] rounded-md"
                                    type="text" placeholder="الاسم الاول" />
                                    <Toaster />
                                </FormControl>
                            <FormMessage class="text-error" />
                        </FormItem>
                    </FormField>



                </div>

                <!-- Last Name -->
                <div>
                    <label for="lastName" class="text-sm">الاسم الاخير</label>
                    <FormField name="lastName">
                        <FormItem>
                            <FormControl>
                                <Input v-model="signupForm.values.lastName"
                                    class="border h-8 block focus:outline-none w-full shadow-sm placeholder-[#B0B0B0] focus:border-primary border-[#EBEBEB] rounded-md"
                                    type="text" placeholder="الاسم الاخير" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>
            </div>

            <!-- Email -->
            <div>
                <label for="email" class="text-sm">البريد الالكتروني</label>

                <FormField name="email">
                    <FormItem>
                        <FormControl>
                            <Input v-model="signupForm.values.email"
                                class="border h-8 block focus:outline-none w-full shadow-sm placeholder-[#B0B0B0] focus:border-primary border-[#EBEBEB] rounded-md"
                                type="email" placeholder="اكتب عنوان بريدك الالكتورني" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>

            <!-- Phone Number -->
            <div class="w-full bg-white">
                <label for="phone" class="text-sm">{{ $t('content.phone_number') }}</label>
                <FormField name="phone">
                    <FormItem>
                        <FormControl>
                            <input id="phone" class="border flex items-center  focus:outline-none w-full shadow-sm px-2 py-2 placeholder-[#B0B0B0]  focus:border-primary border-[#EBEBEB] rounded-md" ref="phoneInput" type="tel" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>

            <!-- Password -->
            <div>
                <label for="password" class="text-sm">كلمة المرور</label>
                <FormField name="password">
                    <FormItem>
                        <FormControl>
                            <Input v-model="signupForm.values.password"
                                class="border h-8 block focus:outline-none w-full shadow-sm placeholder-[#B0B0B0] focus:border-primary border-[#EBEBEB] rounded-md"
                                type="password" placeholder="كلمة المرور" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>


            </div>

            <!-- Submit Button -->
            <Button :disabled="authStore.loading" class="w-full text-white" type="submit">{{ authStore.loading ? 'جاري التحميل...' : 'تسجيل الدخول' }}</Button>
        </form>

        <div class="px-5">
            <Separator class="bg-[#BCBCBC] mt-3" label="Or" />
        </div>

        <div class="px-5 flex justify-center gap-4 py-3">
            <div class="bg-white rounded py-2 px-5">
                <IconApple width="20" height="20" />
            </div>
            <div class="bg-white rounded py-2 px-5">
                <IconGoogle width="20" height="20" />
            </div>
            <div class="bg-white rounded py-2 px-5">
                <Iconfacbook width="20" height="20" />
            </div>
        </div>
    </div>

    <div v-if="login">
        <form class="space-y-4 p-6 pt-0" @submit.prevent="handleLogin">
            <div>
                <label for="email" class="text-sm">البريد الالكتروني</label>
                <Input v-model="loginForm.values.email"
                    class="border block focus:outline-none w-full shadow-sm px-2 py-2 placeholder-[#B0B0B0] focus:border-primary border-[#EBEBEB] rounded-md"
                    type="email" placeholder="اكتب عنوان بريدك الالكتورني" />
            </div>

            <div>
                <label for="password" class="text-sm">كلمة المرور</label>
                <Input v-model="loginForm.values.password"
                    class="border block focus:outline-none w-full shadow-sm px-2 py-2 placeholder-[#B0B0B0] focus:border-primary border-[#EBEBEB] rounded-md"
                    type="password" />
            </div>

            <!-- Submit Button -->
            <Button :disabled="authStore.loading" class="w-full text-white" type="submit">{{ authStore.loading ? 'جاري التحميل...' : 'تسجيل الدخول' }}</Button>
        </form>

        <div class="px-5">
            <Separator class="bg-[#BCBCBC]" label="Or" />
        </div>

        <div class="px-5 flex justify-center gap-4 py-3">
            <div class="bg-white rounded py-2 px-5">
                <IconApple />
            </div>
            <div class="bg-white rounded py-2 px-5">
                <IconGoogle />
            </div>
            <div class="bg-white rounded py-2 px-5">
                <Iconfacbook />
            </div>
        </div>
    </div>
</template>
