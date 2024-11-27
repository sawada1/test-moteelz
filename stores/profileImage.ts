import { defineStore } from "pinia";
import { Method, useApi } from "@/composables/api";
import { ErrorOr } from '@/types/ErrorOr';

interface ProfileImageState {
  imageFile: File | null;
  previewUrl: string | null;
  isUploading: boolean;
  error: string | null; 
  success: boolean;
}

export const useProfileImageStore = defineStore('profileImage', {
  state: (): ProfileImageState => ({
    imageFile: null,
    previewUrl: null,
    isUploading: false,
    error: null,
    success: false,
  }),

  actions: {
    async uploadImage() {
      if (!this.imageFile) {
        this.error = "No image file selected.";
        return false;
      }

      this.isUploading = true;
      this.error = null;

      try {
        const formData = new FormData();
        formData.append('profile_picture', this.imageFile);

        const result: ErrorOr<any> = await useApi<any>(
          '/api/v1/account/profile-picture',
          Method.POST,
          formData,
          undefined,
          'ar'
        );

        if (result.error) {
          this.error = result.error;
          console.error('API Error:', result.error);
          return false;
        }

        if (result.data) {
          console.log('Profile picture updated successfully');
          this.success = true;
          return true;
        }
      } catch (error) {
        this.error = 'Unexpected error occurred during upload';
        console.error('Unexpected error:', error);
        return false;
      } finally {
        this.isUploading = false;
      }
    },

    async handleImageSelect(file: File) {
      try {
        if (!file.type.startsWith('image/')) {
          throw new Error('Please select an image file');
        }
  
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
          throw new Error('Image must be less than 5MB');
        }
  
        if (this.previewUrl) {
          URL.revokeObjectURL(this.previewUrl);
        }
  
        this.previewUrl = URL.createObjectURL(file);
        this.imageFile = file;
        this.error = null;
  
        return true;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error processing image';
        return false;
      }
    },

    // Add a new action to remove the image
    async removeImage() {
      try {
        const result: ErrorOr<any> = await useApi<any>(
          '/api/v1/account/remove-profile-picture', // Adjust API endpoint as per your backend setup
          Method.DELETE,
          undefined, // No request body
          undefined,
          'ar'
        );

        if (result.error) {
          this.error = result.error;
          console.error('Error removing image:', result.error);
          return false;
        }

        // Successfully removed the image
        this.imageFile = null;
        this.previewUrl = null;
        this.success = false;
        this.error = null;
        console.log('Image removed successfully');
        return true;
      } catch (error) {
        this.error = 'Unexpected error occurred while removing image';
        console.error('Unexpected error:', error);
        return false;
      }
    },
  },
});
