<template>
  <div class="flex group" :class="locale === 'ar' ? 'flex-row' : 'flex-row-reverse'">
    <FormField name="phone">
      <FormItem class="w-full">
        <FormControl>
          <Input
            :disabled="isDisabled"
            :placeholder="placeholder"
            id="phone"
            v-model="mobile"
            @input="updateMobile($event.target.value)"
            required
            class="border-t border-b border-r rounded-l-none  flex items-center focus:outline-none w-full shadow-sm px-2 py-2 placeholder-[#B0B0B0] group-focus-within:border-primary border-[#EBEBEB] rounded-md"
            ref="phoneInput"
            type="tel"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Select v-model="countryCode" class="outline-0  group-focus-within:border-primary" @update:modelValue="updateCountryCode" >
      <SelectTrigger :class="width " class="border-l rounded-e-none !border-e-0 outline-0 group-focus-within:border-primary px-2 py-5 focus:outline-0">
        <SelectValue class="p-0 flex items-center gap-2">
          {{ countryCode }}
          <CountriesFlagIcons :countryCode="countryFlag" class="w-5 h-5" />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            v-for="country in countriesCode"
            :key="country.id"
            :value="country.phone_key"
          >
            <div class="flex flex-row gap-5 justify-end">
              <CountriesFlagIcons :countryCode="country.code" class="w-5 h-5" />
              <span>{{ locale === 'ar' ? country.name_ar : country.name_en }}</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';
import CountriesFlagIcons from '../icon/CountriesFlagIcons.vue';

const props = defineProps<{
  width?: string;
  isDisabled?: boolean;
  countryCode: string;
  mobile: string;
  countriesCode?: Array<{ id: number; phone_key: string; code: string; name_ar: string; name_en: string }>;
  locale?: string;
  placeholder?: string;
}>();

const emit = defineEmits([
  "update:countryCode",
  "update:mobile",
  "update:fullNumber",
]);

const { locale } = useI18n();

const mobile = ref(props.mobile);
const countryCode = ref(props.countryCode);
const countriesCode = ref(props.countriesCode || []);
const countryFlag = ref('');

// Update the country flag whenever the countryCode changes
const updateCountryFlag = () => {
  const selectedCountry = countriesCode.value.find(country => country.phone_key === countryCode.value);
  if (selectedCountry) {
    countryFlag.value = selectedCountry.code;
  }
};

// Watch the countryCode for changes and update the flag accordingly
watch(countryCode, () => {
  updateCountryFlag();
});

const authStore = useAuthStore();

onMounted(async () => {
  if (countriesCode.value.length === 0) {
    const success = await authStore.getCountryCodes();

    if (success) {
      countriesCode.value = authStore.countryCodes;
    } else {
      console.error("Failed to fetch country codes:", authStore.error);
    }
  }

  // Set the initial country flag when the component mounts
  updateCountryFlag();
});

const updateCountryCode = (value: string) => {
  countryCode.value = value;
  emit('update:countryCode', value);
  emit('update:fullNumber', `${value}${mobile.value}`);
  updateCountryFlag(); // Update the country flag after changing the country code
};

const updateMobile = (value: string) => {
  mobile.value = value;
  emit('update:mobile', value);
  emit('update:fullNumber', `${countryCode.value}${value}`);
};
</script>

<style scoped>
/* Add any necessary styles */
</style>
