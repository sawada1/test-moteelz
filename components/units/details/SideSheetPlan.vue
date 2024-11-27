  
<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    plan: {
        type: Object,
        default: () => ({})
    },
    hotel: {
        type: Object,
        default: () => ({})
    }
})
const emit = defineEmits(['update:show'])

const isOpen = ref(props.show)

watch(() => props.show, (newVal) => {
    isOpen.value = newVal
})

const close = () => {
    emit('update:show', false)
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }



</script>


<template>
    <div v-if="isOpen" class="fixed inset-0 overflow-hidden flex" style="z-index: 100;">
        <!-- Overlay -->
        <div @click="close" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300">

      
          <!-- Sidebar Content -->
        </div>
        <section :class="[
            'absolute inset-y-0 rtl:left-0 ltr:right-0 max-w-full flex ',
            isOpen ? 'transition-transform translate-x-0' : 'transition-transform translate-x-full'
        ]">
            <div class="w-screen max-w-md h-full flex flex-col justify-between pt-6 bg-white shadow-xl">
                <!-- Sidebar Header -->
                <div class="flex items-center justify-between  shadow-lg pb-4 px-4">
                    <h2 class="text-xl font-semibold text-black">
                        تفاصيل الخطة
                    </h2>
                    <button @click="close" class="text-gray-500 hover:text-gray-700">
                        <span class="sr-only">Close</span>
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <!-- Sidebar Content -->
                <div class="my-8  h-[85vh] overflow-auto">
                    <div class="px-4 w-full">
                        <div class="unit-entry_and_exit_policy mt-6 mx-[10px]">
                            <!-- unit entry_and_exit_policy -->
                            <div>
                              <div class="flex-row font-semibold text-base md:ms-0 ms-2 mb-2">
                              </div>
                              <div class="text-[18px] font-bold mb-4 text-[#333333]"> {{ $t('content.entry_and_exit_policy') }} </div>

            
                              <div class="p-1 w-full">
                                <p class="text-justify md:mx-0 mx-4 text-[#191721] text-[12px]">
                                  {{ hotel?.entry_police1 }}
                                </p>
                              </div>
                            </div>
                          </div>
                        <div class="flex flex-col my-[20px]">
                            <div class="text-[18px] font-bold mb-4 text-[#333333]"> {{ $t('content.cancellation_policy') }}</div>
                            <div class="p-1 w-full">
                                <p class="text-justify md:mx-0 mx-4 mb-[10px] text-[#191721] text-[12px]">
                                  {{ hotel?.cancel_police1 }}
                                </p>
                              </div>
                            <div class="text-[14px] flex items-center my-1 bg-[#eaf5eb] w-fit p-[5px_7px] rounded-[10px] mb-[10px]">
                                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" width="24px" height="24px"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#EAF5EB"></path><path d="M15.4375 9.81274L11.0625 14.1875L8.875 12.0002" stroke="#319E37" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                <span class="px-[5px] text-[#535353]" dir="rtl" lang="ar">
                                     <!-- مستردة قبل {{ formatDate(plan.cancelPolicy.before_deadline_date) }} -->
                                  </span>           
                                                      
                            </div>
                            <!-- <div class="text-[14px] flex items-center my-1 bg-[#fdf3f4] w-fit p-[5px_7px] rounded-[10px] mb-[30px]">
                                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" width="24px" height="24px">
                                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#FDF3F4"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M15.1661 9.54105C15.3613 9.34579 15.3613 9.02921 15.1661 8.83395C14.9708 8.63868 14.6542 8.63868 14.4589 8.83395L12 11.2929L9.54105 8.83395C9.34579 8.63868 9.02921 8.63868 8.83395 8.83395C8.63868 9.02921 8.63868 9.34579 8.83395 9.54105L11.2929 12L8.83395 14.4589C8.63868 14.6542 8.63868 14.9708 8.83395 15.1661C9.02921 15.3613 9.34579 15.3613 9.54105 15.1661L12 12.7071L14.4589 15.1661C14.6542 15.3613 14.9708 15.3613 15.1661 15.1661C15.3613 14.9708 15.3613 14.6542 15.1661 14.4589L12.7071 12L15.1661 9.54105Z"
                                        fill="#EF4550"></path>
                                </svg>
                                <span class="px-[5px] text-[#535353]" dir="rtl" lang="ar">
                                    غير مستردة بعد {{ formatDate(plan.cancelPolicy.after_deadline_date) }}
                                  </span>           
                                                      
                            </div> -->
                            
                        </div>
                        <div class="relative p-8 w-full max-w-md mx-auto text-right hidden">
                            <!-- الخطوط العمودية المتقطعة -->
                            <div class="absolute right-4 top-0 h-full border-r-2 border-dashed border-red-400"></div>
                            <div class="absolute right-4 top-0 h-[47%] border-r-2 border-[green]"></div>
                        
                            <!-- النقطة الأولى -->
                            <div class="relative mb-16 flex items-center">
                              <div class="absolute right-[-21px] top-[5px] h-3 w-3 bg-green rounded-full"></div>
                              <div class="ml-8 w-full">
                                <p class="text-gray-600 text-right">06 أغسطس</p>
                                <p class="text-[12px] text-gray-500">تاريخ الحجز</p>
                                <div class="m-[20px_20px] mb-[0] p-[22px] border rounded-lg">
                                  <p class="mt-2 text-sm text-gray-500 text-center">استرداد كامل</p>
                                  <p class="text-xs text-gray-400 text-center">لن يتم محاسبتك</p>
                                </div>
                              </div>
                            </div>
                            
                            <!-- النقطة الثانية -->
                            <div class="relative mb-16 flex items-center">
                              <div class="absolute right-[-21px] top-[5px] h-3 w-3 bg-red-500 rounded-full"></div>
                              <div class="ml-8 w-full">
                                <p class="text-gray-600 text-right">16 أغسطس</p>
                                <p class="text-[12px] text-gray-500">12:00 صباحاً</p>

                                <div class="m-[20px_20px] mb-[0] p-[22px] border rounded-lg">
                                  <p class="text-[16px] text-gray-500 text-center">غير مسترد</p>
                                  <p class="text-xs mt-[2px] text-red-500 text-center">سيتم خصم المبلغ كاملاً: <span class="font-bold">215 $</span></p>
                                </div>
                              </div>
                            </div>
                        
                            <!-- النقطة الثالثة -->
                            <div class="relative flex items-center">
                              <div class="absolute right-[-21px] top-[5px] h-3 w-3 bg-red-500 rounded-full"></div>
                              <div class="ml-8 w-full">
                                <p class="text-gray-600 text-right">20 أغسطس</p>
                                <p class="text-[12px] text-gray-500">وقت تسجيل الوصول</p>
                              </div>
                            </div>
                          </div>
                        </div>

                </div>
                <!-- Sidebar Footer -->
                <div class="pt-6 pb-4 px-4 w-full  border-t-2   shadow-lg flex flex-row h-[9-vh] justify-between items-center ">
                    <div class="text-lg flex flex-col">
                        <span class="text-[#191721] text-[12px]">ابتداء من</span>
                        <span class="font-bold text-[20px] text-[#191721]">
                            {{
                                plan.price_day_final
                            }}
                            {{ $t('content.' + `${plan?.currency}`) }}
                        </span>
                    </div>
                    <button @click="close" class="flex justify-center items-center bg-primary text-white rounded-md text-sm p-2 gap-1">
                        اضهر الخيارات
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>


  