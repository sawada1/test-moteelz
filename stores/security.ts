import { defineStore } from "pinia";
import { User, SignUpPayload, AuthResponse } from "@/types/auth";
import { Method, useApi } from "@/composables/api";
import { useNotification } from '@kyvg/vue3-notification'
import { logOutLogic } from '../composables/logout'

export const useSecurityStore = defineStore("security", {

    state: () => ({
        devices: [],
        forceApiCall: false,
    }),

    getters: {
    },

    actions: {

        async getOutFromDevice(id: number) {
            // const { notify } = useNotification();
            //  const { locale, t } = useI18n();

            const response = await useApi(`/api/v1/account/logout-device/${id}`, Method.POST);

            if (response.statusCode <= 201) {
                // notify({
                //     duration: 5000,
                //     type: 'success',
                //     title: '',
                //     text: t('logedOut3')
                // });
                this.getDevices()
            }
            else {
                this.error = response.error || "failed";
                return false;
            }

        },
        async getOutFromAllDevice() {
            console.log('dsdsdsdsdsdsd');
            
            const { logoutFunction } = logOutLogic();

            const response = await useApi(`/api/v1/account/logout-all-devices`, Method.POST);

            if (response.statusCode <= 201) {
             
                logoutFunction();

            }
            else {
                this.error = response.error || "failed";
                return false;
            }

        },

        async getDevices() {
            // // Optionally, reset the flag to ensure it's fresh on every page reload
            // if (this.forceApiCall) {
            //     this.devices = []; // Clear the stored devices if forced
            // }
            // if (this.devices.length === 0 || this.forceApiCall) {
            //     const { logoutFunction } = logOutLogic();
            //     const response = await useApi("/api/v1/account/user/devices", Method.GET, undefined);
            //     console.log(response);
            //     if (response.statusCode == 401) {
            //         this.$reset();
            //         console.log("getDevices calledssssssssssssssssss")
            //         logoutFunction();
            //         this.devices = [];
            //     }
            //     if (response.data) {
            //         this.devices = response.data;
            //     }
            //     // Set the flag to false after API call to prevent repeated forced calls
            //     this.forceApiCall = false;
            // }

                     const { logoutFunction } = logOutLogic();
                const response = await useApi("/api/v1/account/user/devices", Method.GET, undefined);
                console.log(response);
                if (response.statusCode == 401) {
                    this.$reset();
                    console.log("getDevices calledssssssssssssssssss")
                    logoutFunction();
                    this.devices = [];
                }
                if (response.data) {
                    this.devices = response.data?.data;
                }

        },
    },
    persist: {
        enabled: true,
    },
});
