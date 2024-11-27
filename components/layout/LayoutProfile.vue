<script lang="ts" setup>
import ProfilePictureComponent from '../dashboard/ProfilePictureComponent.vue';
import { useRouter, useRoute } from 'vue-router'; // Import both router and route
import Sheet from '../ui/sheet/Sheet.vue';
import SheetTrigger from '../ui/sheet/SheetTrigger.vue';
import SheetContent from '../ui/sheet/SheetContent.vue';
import { ref, onMounted, onUnmounted , computed} from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useLocalePath } from '#i18n'; // Import useLocalePath from Nuxt i18n
const { t } = useI18n();
useHead({
  title: t('header.dashboard'),
  meta: [
    { name: 'description', content: t('') }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: '' } ]
}) 
 
// Get router and route instances
const router = useRouter();
const route = useRoute(); // Use route to access current route information

// Import and use localePath
const localePath = useLocalePath(); // Correctly initialize localePath using useLocalePath()

const settingsCheck = ref(false);
const authStore = useAuthStore();
const screenWidth = ref<number | null>(null);

function updateScreenWidth() {
  if (typeof window !== 'undefined') {
    screenWidth.value = window.innerWidth;
  }
}

// Watch for component mount/unmount
onMounted(() => {
  updateScreenWidth(); // Set initial screen width on mount
  window.addEventListener('resize', updateScreenWidth); // Listen for screen resize
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth); // Clean up on component unmount
});

// Handle SignOut
const handleSignOut = () => {
  authStore.signOut();
  router.push(localePath('/')); // Redirect to the home route using localized path
};
 

// Helper to determine if the current route exactly matches the provided path
const isExactActiveLink = (targetPath: string) => computed(() => {
  console.log('Current Path:', route.path, 'Target Path:', targetPath); // Debugging output
  return route.path === targetPath;
});

// Helper to determine if the current route starts with the provided path but is not exactly the root
const isSubRouteActive = (targetPath: string) => computed(() => {
  console.log('Checking sub-route for:', targetPath, 'Current Path:', route.path); // Debugging output
  return route.path.startsWith(targetPath) && route.path !== targetPath;
});

watchEffect(() => {
    console.log('User not authenticated, waiting 5 seconds before redirecting to home...');
    setTimeout(() => {
      if (!authStore.isAuthenticated) {
      console.log('Redirecting to home after 5 seconds...');
      router.push(localePath('/')); // Redirect to home page after 5 seconds
    }
    }, 1000); // 5000 milliseconds = 5 seconds
});

</script>


<template>
   <div class="md:p-5 md:mt-5 flex flex-col md:flex-row gap-2 md:gap-10">

    <div class="text-[#7B7B7B] hidden md:flex flex-col md:justify-start items-start md:px-2 md:py-2 w-96 bg-white rounded-2xl">
      <ProfilePictureComponent />

      <Separator class="bg-[#F1F1F1] border-dashed mt-3" label="" />
      <div class="w-full">
    <!-- Dashboard Link - Exact Match Only -->
    <NuxtLink
      :to="localePath('/dashboard/')"
      :class="isExactActiveLink(localePath('/dashboard/')).value ? '!bg-[#F4F2FB] !text-primary border-s-4 border-primary' : ''"
      class="flex px-4 py-5 items-center w-full rounded hover:bg-[#f4f2fb7d] hover:transition-all duration-500 hover:text-primary"
    >
      <IconUserDashboard :fill="isExactActiveLink(localePath('/dashboard/')).value ? '#875FFF' : '#7B7B7B'" width="15" height="15" />
      <span>{{ $t('content.user_info') }}</span>
    </NuxtLink>

    <!-- Favorite Link -->
    <NuxtLink
      :to="localePath('/dashboard/booking')"
      :class="isExactActiveLink(localePath('/dashboard/booking')).value ? '!bg-[#F4F2FB] !text-primary border-s-4 border-primary' : ''"
      class="flex px-4 py-5 items-center w-full rounded hover:bg-[#f4f2fb7d] hover:transition-all duration-500 hover:text-primary"
    >
      <IconBookingDashboard :fill="isExactActiveLink(localePath('/dashboard/booking')).value ? '#875FFF' : '#7B7B7B'" width="15" height="15" />
      <span>{{ $t('content.booking') }}</span>
    </NuxtLink>

    <!-- Wallet Link -->
    <NuxtLink
      :to="localePath('/dashboard/wallet')"
      :class="isExactActiveLink(localePath('/dashboard/wallet')).value ? '!bg-[#F4F2FB] !text-primary border-s-4 border-primary' : ''"
      class="flex px-4 py-5 items-center w-full rounded hover:bg-[#f4f2fb7d] hover:transition-all duration-500 hover:text-primary"
    >
      <IconWalletDashboard :fill="isExactActiveLink(localePath('/dashboard/wallet')).value ? '#875FFF' : '#7B7B7B'" width="15" height="15" />
      <span>{{ $t('header.wallet') }}</span>
    </NuxtLink>
    <!-- Wallet Link -->
    <NuxtLink
      :to="localePath('/dashboard/favourite')"
      :class="isExactActiveLink(localePath('/dashboard/favourite')).value ? '!bg-[#F4F2FB] !text-primary border-s-4 border-primary' : ''"
      class="hover:bg-[#f4f2fb7d] hover:transition-all duration-500 hover:text-primary flex px-4 py-5 items-center w-full rounded"
    >
      <IconFavDashboard :fill="isExactActiveLink(localePath('/dashboard/favourite')).value ? '#875FFF' : '#7B7B7B'" width="15" height="15" />
      <span>{{ $t('content.saved_units') }}</span>
    </NuxtLink>

    <!-- Security Link -->
    <NuxtLink
      :to="localePath('/dashboard/security')"
      :class="isExactActiveLink(localePath('/dashboard/security')).value ? '!bg-[#F4F2FB] !text-primary border-s-4 border-primary' : ''"
      class="flex px-4 py-5 items-center w-full rounded hover:bg-[#f4f2fb7d] hover:transition-all duration-500 hover:text-primary"
    >
      <IconSecurityDashboard :fill="isExactActiveLink(localePath('/dashboard/security')).value ? '#875FFF' : '#7B7B7B'" width="15" height="15" />
      <span>{{ $t('content.loginAndSecurity') }}</span>
    </NuxtLink>

    <Button @click="handleSignOut" class=" transition-all duration-300 bg-red-600 hover:bg-white hover:text-black hover:border w-full text-xs text-white">
      {{ $t('content.logout') }}
    </Button>
  </div>
    </div>
    <Sheet>
      <div class="md:hidden">
        <header class="md:hidden bg-primary w-full h-[60px] flex items-center justify-between px-2">
          <SheetTrigger class="w-fit" as-child>
      <Button variant="outline">
      <IconProfileHamburger />
      </Button>
    </SheetTrigger>
        <span class="text-white items-center">{{ $t('header.dashboard') }}</span>
        <span class="text-white items-center"></span>
  
</header>

      <ProfilePictureComponent></ProfilePictureComponent>
      </div>


    <SheetContent>
      <SheetHeader>

        <div class="text-[#7B7B7B] mt-20 flex flex-col md:justify-start items-start md:ps-2 md:py-2 w-full bg-white rounded-2xl">


      <Separator class="bg-[#F1F1F1] border-dashed mt-3" label="" />
      <div class="w-full">
       <!-- Dashboard Link - Exact Match Only -->
    <NuxtLink
      :to="localePath('/dashboard/')"
      :class="isExactActiveLink(localePath('/dashboard/')).value ? '!bg-[#F4F2FB] !text-primary border-s-4 border-primary' : ''"
      class="flex px-4 py-5 items-center w-full rounded"
    >
      <IconUserDashboard :fill="isExactActiveLink(localePath('/dashboard/')).value ? '#875FFF' : '#7B7B7B'" width="15" height="15" />
      <span>{{ $t('content.user_info') }}</span>
    </NuxtLink>

    <!-- Favorite Link -->
    <NuxtLink
      :to="localePath('/dashboard/booking')"
      :class="isExactActiveLink(localePath('/dashboard/booking')).value ? '!bg-[#F4F2FB] !text-primary border-s-4 border-primary' : ''"
      class="flex px-4 py-5 items-center w-full rounded"
    >
      <IconBookingDashboard :fill="isExactActiveLink(localePath('/dashboard/booking')).value ? '#875FFF' : '#7B7B7B'" width="15" height="15" />
      <span>{{ $t('content.booking') }}</span>
    </NuxtLink>

    <!-- Wallet Link -->
    <NuxtLink
      :to="localePath('/dashboard/wallet')"
      :class="isExactActiveLink(localePath('/dashboard/wallet')).value ? '!bg-[#F4F2FB] !text-primary border-s-4 border-primary' : ''"
      class="flex px-4 py-5 items-center w-full rounded"
    >
      <IconWalletDashboard :fill="isExactActiveLink(localePath('/dashboard/wallet')).value ? '#875FFF' : '#7B7B7B'" width="15" height="15" />
      <span>{{ $t('header.wallet') }}</span>
    </NuxtLink>
    <!-- Wallet Link -->
    <NuxtLink
      :to="localePath('/dashboard/favourite')"
      :class="isExactActiveLink(localePath('/dashboard/favourite')).value ? '!bg-[#F4F2FB] !text-primary border-s-4 border-primary' : ''"
      class="flex px-4 py-5 items-center w-full rounded"
    >
      <IconFavDashboard :fill="isExactActiveLink(localePath('/dashboard/fav')).value ? '#875FFF' : '#7B7B7B'" width="15" height="15" />
      <span>{{ $t('content.saved_units') }}</span>
    </NuxtLink>

    <!-- Security Link -->
    <NuxtLink
      :to="localePath('/dashboard/security')"
      :class="isExactActiveLink(localePath('/dashboard/security')).value ? '!bg-[#F4F2FB] !text-primary border-s-4 border-primary' : ''"
      class="flex px-4 py-5 items-center w-full rounded"
    >
      <IconSecurityDashboard :fill="isExactActiveLink(localePath('/dashboard/security')).value ? '#875FFF' : '#7B7B7B'" width="15" height="15" />
      <span>{{ $t('content.loginAndSecurity') }}</span>
    </NuxtLink>

    <Button @click="handleSignOut" class="bg-red-600 w-full text-xs text-white">
      {{ $t('content.logout') }}
    </Button></div>
    </div>
      </SheetHeader>

    </SheetContent>
  </Sheet>
    <div class="bg-white  w-full mb-20 rounded-2xl">
      <slot />
    </div>


  </div>
</template>