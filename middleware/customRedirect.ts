import { defineNuxtRouteMiddleware, useRoute, useNuxtApp, navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware(() => {
  const route = useRoute(); // Get the current route
  const { $i18n } = useNuxtApp(); // Access i18n instance

  // Check if the route is valid (ensure the name exists and it's not the home page)
  if (!route.name) {
    console.warn(`Invalid route detected: ${route.fullPath}`);
    const locale = $i18n.locale; // Get the current locale
    return navigateTo(`/${locale}`); // Redirect to the localized home page
  }

  console.log(`Route is valid: ${route.fullPath}`);
});
