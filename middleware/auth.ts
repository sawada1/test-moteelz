// import { defineNuxtRouteMiddleware, navigateTo, useLocalePath } from '#app';
// import { useAuthStore } from '@/stores/auth';

// export default defineNuxtRouteMiddleware((to, from) => {
//   console.log('Running auth middleware');
//   const authStore = useAuthStore();
//   const localePath = useLocalePath();  // Helper to get locale-specific paths

//   // Check if user is authenticated
//   if (!authStore.isAuthenticated) {
//     return navigateTo(localePath('/')); // Redirect to locale-specific root path (e.g., '/en/', '/ar/')
//   }
// });