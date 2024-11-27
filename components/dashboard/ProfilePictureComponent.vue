<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useProfileImageStore } from '@/stores/profileImage';
import { useAuthStore } from '@/stores/auth';
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useToast } from "@/components/ui/toast/use-toast";

// Import stores
const authStore = useAuthStore();
const store = useProfileImageStore(); // Create an instance of the store
const { toast } = useToast();

// Ensure the profile is loaded when the component mounts
const loadingProfile = ref(true);

onMounted(async () => {
  if (!authStore.user) {
    console.log("Loading user profile...");
    await authStore.loadUserProfile();
    console.log("User profile loaded:", authStore.user);
  }
  loadingProfile.value = false; // Set loading to false after loading the profile
});

// Computed property to access the user's first name
const userName = computed(() => {
  if (loadingProfile.value) return 'Loading...';
  return authStore.user?.firstName || 'Guest';
});

const profileImage = computed(() => {
  if (loadingProfile.value) return 'Loading...';
  return authStore.user?.profileImage || 'Guest';
});

// File input reference
const fileInput = ref<HTMLInputElement | null>(null);

// Handle file selection
const onFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    const success = await store.handleImageSelect(file);
    if (success) {
      await store.uploadImage();
      toast({
        title: "لقد تم تحديث الصوره بنجاح",
      });
      // Update the user profile image in the auth store
      await authStore.loadUserProfile(); // Reload user profile to get the updated image
    }
  }

  // Reset input
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// Trigger file input click
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Handle image removal
const handleRemoveImage = async () => {
  const success = await store.removeImage();
  if (success) {
    toast({
      title: "تمت إزالة الصورة بنجاح",
    });
    // Update the user profile to reflect the removed image
    await authStore.loadUserProfile();
  }
};

// Watch if the user profile changes to log it (debugging)
watch(() => authStore.user, (newUser) => {
  console.log("User profile updated:", newUser);
});

// Set mobile layout flag
const isMobile = ref(process.client ? window.innerWidth <= 768 : false);
</script>


<template>
  <div class="flex flex-col bg-white py-4 rounded   justify-center md:!flex-col gap-[5px] items-center">
    <div class="relative flex flex-row">
      <!-- Remove Button -->
      <button
     
        @click="handleRremoveImage"
        class="absolute top-2 z-40 rtl:-left-1 ltr:-right-1 bg-white text-[#99A1B7] border-[#DBDFE9] border-[1.2px] h-5 w-5 text-[16px] rounded-full"
        title="Remove image"
      >
        &times;
      </button>

      <!-- Image Container -->
      <div class="relative flex flex-col rounded-full justify-start items-start overflow-hidden">
        <img
          :width="isMobile ? 80 : 100"
          :height="isMobile ? 70 : 100"
          :src="profileImage"
          class="w-30 h-30 rounded-full aspect-square object-cover border-2 border-spacing-3 border-primary"
        />

        <!-- Hidden File Input -->
        <input
          type="file"
          ref="fileInput"
          accept="image/*"
          class="hidden"
          @change="onFileChange"
        />

        <!-- Upload Button -->
        <button
          @click="triggerFileInput"
          class="absolute bottom-0 right-0 flex justify-center items-center h-7 bg-[#51405B45] w-full"
          :disabled="store.isUploading"
        >
          <IconTakeImage width="15" height="15" />
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <p v-if="store.error" class="text-red-500 text-sm mt-2">
      {{ store.error }}
    </p>

    <!-- Loading State -->
    <div v-if="store.isUploading" class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
      <span class="text-white">Uploading...</span>
    </div>

    <!-- User Name Display -->
    <span class="text-black font-semibold text-base">{{ userName }}</span>
  </div>
</template>
