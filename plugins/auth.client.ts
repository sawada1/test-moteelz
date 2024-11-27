import { defineNuxtPlugin } from '#app';
import { useAuthStore } from '@/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
  // This code will run on client-side only
  if (process.client) {
    const authStore = useAuthStore();
    authStore.initializeAuth(); // Initialize the auth state
  }
});