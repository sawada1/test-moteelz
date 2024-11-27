import intlTelInput from 'intl-tel-input';
import ar from 'intl-tel-input/i18n/ar'; // Arabic localization
import 'intl-tel-input/build/css/intlTelInput.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('initIntlTelInput', (inputElement: HTMLInputElement) => {
    return intlTelInput(inputElement, {
      initialCountry: 'eg',
      i18n: ar,
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js', // CDN for utils
    });
  });
});