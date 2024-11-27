<template>
  <div class="flex flex-col gap-4 mb-8">
    <span class="text-xl font-bold text-primary_dark">{{
      $t("content.travelerData")
    }}</span>
    <form class="w-full space-y-4">
      <!-- Cardholder's Name -->
      <div class="grid md:grid-cols-2 grid-cols-1 w-full gap-4">
        <FormField v-slot="{ componentField }" name="firstName">
          <FormItem>
            <FormLabel class="font-bold text-textColor flex items-center gap-1">
              <span class="text-textColor font-bold md:text-base text-sm">
                {{ $t("content.first_name") }}
              </span>
              <span class="text-error font-bold md:text-base text-sm">*</span>
            </FormLabel>

            <FormControl>
              <Input
                type="text"
                :placeholder="$t('content.first_name_placeholder')"
                v-bind="componentField"
                v-model="formData.firstName"
                class="border border-bg_lightgray focus:border-primary focus-visible:ring-0"
              />
            </FormControl>
            <FormMessage class="text-error" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="lastName">
          <FormItem>
            <FormLabel class="font-bold text-textColor flex items-center gap-1">
              <span class="text-textColor font-bold md:text-base text-sm">
                {{ $t("content.last_name") }}
              </span>
              <span class="text-error font-bold md:text-base text-sm">*</span>
            </FormLabel>

            <FormControl>
              <Input
                type="text"
                :placeholder="$t('content.last_name_placeholder')"
                v-bind="componentField"
                v-model="formData.lastName"
                class="border border-bg_lightgray focus:border-primary focus-visible:ring-0"
              />
            </FormControl>
            <FormMessage class="text-error" />
          </FormItem>
        </FormField>
      </div>

      <div class="grid md:grid-cols-2 grid-cols-1 w-full gap-4">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel class="font-bold text-textColor flex items-center gap-1">
              <span class="text-textColor font-bold md:text-base text-sm">
                {{ $t("content.email") }}
              </span>
              <span class="text-error font-bold md:text-base text-sm">*</span>
            </FormLabel>

            <FormControl>
              <Input
                type="text"
                :placeholder="$t('content.email_placeholder')"
                v-bind="componentField"
                v-model="formData.email"
                class="border border-bg_lightgray focus:border-primary focus-visible:ring-0"
              />
            </FormControl>
            <FormMessage class="text-error" />
          </FormItem>
        </FormField>

        <FormField name="phone">
          <FormItem>
            <FormLabel class="font-bold text-textColor flex items-center gap-1">
              <span class="text-textColor font-bold md:text-base text-sm">
                {{ $t("content.contact_phone_number") }}
              </span>
              <span class="text-error font-bold md:text-base text-sm">*</span>
            </FormLabel>

            <FormControl>
              <PhoneInputComponent
                :mobile="formData.phoneNumber"
                :countryCode="formData.countryCode"
                @update:countryCode="formData.countryCode = $event"
                @update:mobile="formData.phoneNumber = $event"
                :placeholder="$t('content.contact_phone_number')"
                width="w-[30%]"
              />
            </FormControl>
          </FormItem>
        </FormField>
      </div>

      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          v-model="isBookingForAnother"
          @change="handleBookingOption"
        />
        <b>{{ $t("content.bookingForSomeOne") }}</b>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PhoneInputComponent from "@/components/form/PhoneInputComponent.vue";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const authStore = useAuthStore();

const isBookingForAnother = ref(false);

const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  countryCode: "",
});

// Define Zod schema for validation
const schema = toTypedSchema(
  z.object({
    firstName: z
      .string({
        required_error: t("content.first_name_placeholder"),
        invalid_type_error: t("content.first_name_placeholder"),
      })
      .nonempty({ message: t("content.first_name_placeholder") })
      .min(5, { message: t("content.first_name_placeholder") }),
    lastName: z
      .string({
        required_error: t("content.last_name_placeholder"),
        invalid_type_error: t("content.last_name_placeholder"),
      })
      .nonempty({ message: t("content.last_name_placeholder") })
      .min(5, { message: t("content.last_name_placeholder") }),
    email: z
      .string({
        required_error: t("content.email_placeholder"),
        invalid_type_error: t("content.email_placeholder"),
      })
      .nonempty({ message: t("content.email_placeholder") })
      .min(5, { message: t("content.email_placeholder") }),
    phoneNumber: z
      .string({
        required_error: t("content.enter_phone_number"),
        invalid_type_error: t("content.enter_phone_number"),
      })
      .nonempty({ message: t("content.enter_phone_number") })
      .min(5, { message: t("content.enter_phone_number") }),
  })
);

const { handleSubmit } = useForm({
  validationSchema: schema,
});

// Reactive error state
// const errors = reactive({
//   firstName: "",
//   lastName: "",
//   email: "",
//   phoneNumber: "",
// });

const validateForm = handleSubmit(async (values) => {
  // Returns the validated form data
  return values;
});

const handleBookingOption = () => {
  if (isBookingForAnother.value) {
    formData.firstName = "";
    formData.lastName = "";
    formData.email = "";
    formData.phoneNumber = "";
    formData.countryCode = "";
  } else {
    formData.firstName = authStore.user.firstName || "";
    formData.lastName = authStore.user.lastName || "";
    formData.email = authStore.user.email || "";
    formData.phoneNumber = authStore.user.phone || "";
  }
};

defineExpose({ validateForm });

onMounted(() => {
  if (!isBookingForAnother.value) {
    handleBookingOption();
  }
});
</script>
