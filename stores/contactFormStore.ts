import { defineStore } from 'pinia';
import { useApi, Method } from '@/composables/api';

interface ContactFormState {
  formData: {
    name: string;
    email: string;
    mobile: string;
    inquiry: string;
    subject: string;
    message: string;
  };
  loading: boolean;
  successMessage: boolean | null;
  errors: string[];
  files: File[];
  isDragOver: boolean;
}

export const useContactFormStore = defineStore('contactForm', {
  state: (): ContactFormState => ({
    formData: {
      name: '',
      email: '',
      mobile: '',
      inquiry: '',
      subject: '',
      message: '',
    },
    loading: false,
    successMessage: null,
    errors: [],
    files: [],
    isDragOver: false,
  }),

  getters: {
    hasErrors: (state) => state.errors.length > 0,
    isSubmitting: (state) => state.loading,
  },

  actions: {
    validateForm() {
      this.errors = [];
      if (!this.formData.name) this.errors.push("The name field is required.");
      if (!this.formData.email) this.errors.push("The email field is required.");
      if (!this.formData.mobile) this.errors.push("The mobile field is required.");
      if (!this.formData.subject) this.errors.push("The subject field is required.");
      if (!this.formData.message) this.errors.push("The message field is required.");
      return this.errors.length === 0;
    },

    resetForm() {
      this.formData = {
        name: '',
        email: '',
        mobile: '',
        inquiry: '',
        subject: '',
        message: '',
      };
      this.files = [];
      this.successMessage = null;
    },

    addFiles(fileList: FileList) {
      for (let i = 0; i < fileList.length; i++) {
        this.files.push(fileList[i]);
      }
    },

    handleDrop(event: DragEvent) {
      const droppedFiles = event.dataTransfer?.files;
      if (droppedFiles) {
        this.addFiles(droppedFiles);
      }
      this.isDragOver = false;
    },

    handleDragOver() {
      this.isDragOver = true;
    },

    handleDragLeave() {
      this.isDragOver = false;
    },

    async submitForm() {
      if (!this.validateForm()) {
        console.error("Validation failed:", this.errors);
        return;
      }

      this.loading = true;
      const payload = new FormData();

      Object.keys(this.formData).forEach(key => {
        const value = this.formData[key as keyof typeof this.formData];
        if (value) payload.append(key, value);
      });
      this.files.forEach((file, index) => {
        payload.append(`files[${index}]`, file);
      });

      try {
        const response = await useApi('/api/v1/contact-us/support-form', Method.POST, payload);

        if (response.data) {
          this.successMessage = true;
          console.log(this.successMessage);
          this.resetForm();
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);
        } else {
          this.errors = response.error ? [response.error] : ['Unknown error occurred'];
          console.error('Form submission failed:', this.errors);
        }
      } catch (error) {
        this.errors = ['An error occurred during submission.'];
        console.error('Unexpected error:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
