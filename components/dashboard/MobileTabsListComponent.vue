<script lang="ts" setup>
import IconBookingDashboard from '@/components/icon/IconBookingDashboard.vue';
import IconFavDashboard from '@/components/icon/IconFavDashboard.vue';
import IconSecurityDashboard from '@/components/icon/IconSecurityDashboard.vue';
import IconTakeImage from '@/components/icon/IconTakeImage.vue';
import IconUserDashboard from '@/components/icon/IconUserDashboard.vue';
import IconWalletDashboard from '@/components/icon/IconWalletDashboard.vue';
import Separator from '@/components/ui/separator/Separator.vue';

import { ref, onMounted } from 'vue';
import ProfilePictureCompponent from './ProfilePictureComponent.vue';

const fileInput = ref<HTMLInputElement | null>(null);
const profileImage = ref<string | null>(null);

// Default placeholder image if no profile image is set
const defaultImage = 'https://via.placeholder.com/150'; // Replace with your default image URL

// Function to trigger file input
const uploadImage = () => {
    fileInput.value?.click();
};

// Handle image selection from file input
const handleFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
                profileImage.value = e.target.result as string;
            }
        };
        reader.readAsDataURL(file);
    }
};

// Placeholder for capturing image from webcam (optional)
const takePhoto = () => {
    // Implement webcam functionality here
};

// Remove the profile image
const removeImage = () => {
    profileImage.value = null;
};

const activeTab = ref<string>('account');

// Handle tab change
const changeValue = (newValue: string) => {
    activeTab.value = newValue;

};
onMounted(() => activeTab.value = 'account')
</script>
<template>
        <TabsList
                class="text-[#7B7B7B] flex flex-col justify-start ltr:items-start rtl:items-end w-50 h-fit py-2 bg-white rounded-2xl">
                <ProfilePictureCompponent></ProfilePictureCompponent>
          
                <Separator class="bg-[#F1F1F1] border-dashed mt-3" label="" />
                <TabsTrigger @click="changeValue('account')"
                    class="w-full group inline-flex ltr:justify-start rtl:justify-end p-2 text-gray-800 focus:bg-[#F4F2FB] focus:text-primary ltr:focus:border-l-4 rtl:focus:border-r-4 rtl:focus:border-l-0 focus:border-primary rounded"
                    :class="activeTab === 'account' ? '!bg-[#F4F2FB] !text-primary  rtl:border-r-4 ltr:border-l-0 border-primary': ''"
                    value="account">
                    <div class="flex rtl:flex-row-reverse ltr:flex-row items-center">
                        <IconUserDashboard :fill="activeTab === 'account' ? '#875FFF' : '#7B7B7B'" width="15"
                            height="15"></IconUserDashboard>
                        <span class="text-xs">الملف الشخصي</span>
                    </div>

                </TabsTrigger>
                <TabsTrigger @click="changeValue('booking')"
                    class="w-full group inline-flex ltr:justify-start rtl:justify-end p-2 text-gray-800 focus:bg-[#F4F2FB] focus:text-primary ltr:focus:border-l-4 rtl:focus:border-r-4 rtl:focus:border-l-0 focus:border-primary rounded"
                    :class="activeTab === 'booking' ? '!bg-[#F4F2FB] !text-primary  rtl:border-r-4 ltr:border-l-0 border-primary': ''"
                    value="booking">
                    <div class="flex rtl:flex-row-reverse ltr:flex-row items-center">
                        <IconBookingDashboard :fill="activeTab === 'booking' ? '#875FFF' : '#7B7B7B'" width="15"
                            height="15"></IconBookingDashboard>
                        <span class="text-xs">الحجوزات</span>
                    </div>

                </TabsTrigger>
                <TabsTrigger @click="changeValue('wallet')"
                    class="w-full flex ltr:justify-start rtl:justify-end p-2 text-gray-800 focus:bg-[#F4F2FB] focus:text-primary ltr:focus:border-l-4 rtl:focus:border-r-4 rtl:focus:border-l-0 focus:border-primary rounded"
                    :class="activeTab === 'wallet' ? 'bg-[#F4F2FB] text-primary  rtl:border-r-4 ltr:border-l-0 border-primary': ''"
                    value="wallet">
                    <div class="flex rtl:flex-row-reverse ltr:flex-row items-center">
                        <IconWalletDashboard :fill="activeTab === 'wallet' ? '#875FFF' : '#7B7B7B'" width="15"
                            height="15"></IconWalletDashboard>
                        <span class="text-xs">المحفظة</span>
                    </div>
                </TabsTrigger>
                <TabsTrigger @click="changeValue('favorite')"
                    class="w-full flex ltr:justify-start rtl:justify-end p-2 text-gray-800 focus:bg-[#F4F2FB] focus:text-primary ltr:focus:border-l-4 rtl:focus:border-r-4 rtl:focus:border-l-0 focus:border-primary rounded"
                    :class="activeTab === 'favorite' ? 'bg-[#F4F2FB] text-primary  rtl:border-r-4 ltr:border-l-0 border-primary': ''"
                    value="favorite">
                    <div class="flex rtl:flex-row-reverse ltr:flex-row items-center">
                        <IconFavDashboard :fill="activeTab === 'favorite' ? '#875FFF' : '#7B7B7B'" width="15"
                            height="15"></IconFavDashboard>
                        <span class="text-xs">المفضلة</span>
                    </div>
                </TabsTrigger>
                <TabsTrigger @click="changeValue('devices')"
                    class="w-full flex ltr:justify-start rtl:justify-end p-2 text-gray-800 focus:bg-[#F4F2FB] focus:text-primary ltr:focus:border-l-4 rtl:focus:border-r-4 rtl:focus:border-l-0 focus:border-primary rounded"
                    :class="activeTab === 'devices' ? 'bg-[#F4F2FB] text-primary  rtl:border-r-4 ltr:border-l-0 border-primary': ''"
                    value="devices">
                    <div class="flex rtl:flex-row-reverse ltr:flex-row items-center">
                        <IconSecurityDashboard :fill="activeTab === 'devices' ? '#875FFF' : '#7B7B7B'" width="15"
                            height="15"></IconSecurityDashboard>
                        <span class="text-xs">تسجيل الدخول والأمان</span>
                    </div>

                </TabsTrigger>
                <Separator class="bg-[#F1F1F1] border-dashed mt-3 m-2" label="" />
                <Button class="w-full text-xs text-white">تسجيل الخروج</Button>
            </TabsList>
</template>