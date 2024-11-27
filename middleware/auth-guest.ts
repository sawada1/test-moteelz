// import { defineNuxtRouteMiddleware, navigateTo, useLocalePath } from '#imports';
// import { useAuthStore } from '@/stores/auth';

// export default defineNuxtRouteMiddleware((to, from) => {
//   const authStore = useAuthStore();
//   const localePath = useLocalePath();  // Helper to get locale-specific paths

//   // Check if user is authenticated
//   if (authStore.isAuthenticated) {
//     return navigateTo(localePath('/dashboard')); // Redirect to locale-specific root path (e.g., '/en/', '/ar/')
//   }
// });
