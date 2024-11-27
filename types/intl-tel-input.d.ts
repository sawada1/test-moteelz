declare module '#app' {
    interface NuxtApp {
      $initIntlTelInput: (inputElement: HTMLInputElement) => intlTelInput.Plugin;
    }
  }
  
  declare module 'vue' {
    interface ComponentCustomProperties {
      $initIntlTelInput: (inputElement: HTMLInputElement) => intlTelInput.Plugin;
    }
  }
  
  export {};