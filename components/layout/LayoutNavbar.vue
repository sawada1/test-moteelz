<template>
  <div>
    <div class="!z-[5555555]  relative"

      >
                          <!-- Auth Modal -->
    <AuthPopUP v-if="authStore.showModal" :show="authStore.showModal" @close="authStore.showModal = false"/>

    <!-- Navbar -->
     <div class="p-3 navbar-main " :class="{ 'bg-white': router.name != `${locale == 'ar' ? 'index___ar' : 'index___en'}` , 'fixedd': activeNav  , 'scrolll': scrollNav }" style="z-index: 555555555;">
       <nav class="container  main-navbar-container z-50" >
         <div class="items flex items-center justify-center xl:justify-between lg:justify-between ">
           <!-- <button class="hidden bar-icon w-[56px] h-[56px] bg-white border-[1px] rounded-[10px]  border-primary flex items-center justify-center">
                  <IconBar></IconBar>
               </button> -->
           <div class="links-container flex items-center gap-10">
             <nuxt-link class="text-[#161B33] font-medium !w-fit text-[18px]" :to="localePath('/')">
             
               <NuxtImg
              src="/img/Logo-new.png"
              class="w-48"
              alt="Moteelz"
            />
             </nuxt-link>
             <div class="links flex items-center gap-5">
               <nuxt-link class="text-[#161B33] font-medium text-[18px]" :to="localePath('/')">
                 {{ $t('header.home') }}
               </nuxt-link>
               <nuxt-link class="text-[#161B33] font-medium text-[18px]" :to="localePath('/offers')">
                 {{ $t('header.offers') }}
               </nuxt-link>
               <!-- <nuxt-link class="text-[#161B33] font-medium text-[18px]" :to="localePath('/hotels')">
                 {{ $t('header.units') }}
               </nuxt-link> -->
               <!-- <nuxt-link class="text-[#161B33] font-medium text-[18px]" :to="localePath('/works')">
                 للأعمال
               </nuxt-link> -->
               <nuxt-link class="text-[#161B33] font-medium text-[18px]" :to="localePath('/wallet')">
                 {{ $t('header.wallet') }}
               </nuxt-link>
             </div>
           </div>

           <div class="actions-container links-container flex items-center gap-5">
             <button @click="changeLang()"
               class="lang w-[45px] h-[45px] border-[1px] rounded-[10px] cursor-pointer  border-primary flex items-center justify-center">
               <!-- <IconNav2></IconNav2> -->
                   <div v-if="locale === 'en'">
         <!-- <NuxtImg src="/img/ar.webp" width="32" height="28" class="object-cover" /> -->
         <span class="text-primary text-[20px] font-bold uppercase"> AR </span>
       </div>
       <div v-else>
         <!-- <NuxtImg src="/img/en.png" width="32" height="28" class="object-cover" /> -->
         <span class="text-primary text-[20px] font-medium uppercase"> EN </span>
       </div>
             </button>
            <div class="flex items-center gap-5">

              <!-- <button class="w-[150px] bg-burgundy h-[45px] flex items-center rounded-[10px] justify-center gap-2">
                <IconNav1></IconNav1>
                <span class="text-white text-[16px] mt-1"> أضف عقارك </span>
              </button> -->
                    <button v-if="!isAuthenticated" @click.prevent="handleAuthClick()"
                    class="w-[150px] h-[45px] bg-primary flex items-center rounded-[10px] justify-center gap-2">
                    <IconNav3></IconNav3>
                    <span class="text-white text-[16px] mt-1">   {{ $t('header.login') }}</span>
                  </button>

               <!-- <Dialog>
                 <DialogTrigger as-child>
                   <button v-if="!isAuthenticated" @click.prevent="handleAuthClick()"
                     class="w-[150px] h-[45px] bg-primary flex items-center rounded-[10px] justify-center gap-2">
                     <IconNav3></IconNav3>
                     <span class="text-white text-[16px] mt-1">   تسجيل الدخول  </span>
                   </button>
                 </DialogTrigger>
                 <DialogContent
                   class="sm:max-w-[425px] overflow-scroll grid-rows-[auto_minmax(0,1fr)_auto] p-0  bg-[#FBFBFB] z-[99999999999]">
                   <AuthModal />
                 </DialogContent>
               </Dialog> -->

            </div>
             <div v-if="isAuthenticated" class="flex items-center gap-5">
               <button
               class="lang w-[45px] h-[45px] border-[1px] rounded-[10px] cursor-pointer  border-primary flex items-center justify-center">
               <NuxtImg :src="authStore.user?.profileImage" class="w-full h-full rounded-[8px]"></NuxtImg>

             </button>
               <DropdownMenu>
                 <DropdownMenuTrigger as-child>
                   <Button class="min-w-[150px] h-[45px] bg-primary flex items-center rounded-[10px] justify-center gap-2">
                     <IconNav3></IconNav3>
                     <span class="text-white text-[16px] mt-1">  {{ $t('header.hi') }}  {{ authStore.user?.firstName }} </span>
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent class="w-56 navbar-dashboard !z-[55555] bg-white mt-3" style="box-shadow: 0px 0px 40.4px 0px #0000000A;">
                   <div class="user py-2 px-3 flex items-center   gap-3">
                     <div class="text flex flex-col  gap-1">
                       <h4 class="text-[#161B33] font-bold text-[14px]"> {{ authStore.user?.firstName }} {{ authStore.user?.second_name }}  </h4>
                       <p class="text-[#9E9E9E] text-[11px]"> {{ authStore.user?.email }} </p>
                     </div>
                     <div class="image w-[40px] h-[40px] rounded-[50%] border-[2px] border-primary">
                       <NuxtImg :src="authStore.user?.profileImage" class="w-full h-full rounded-[50%]"></NuxtImg>
                     </div>
                   </div>
                   <DropdownMenuSeparator class="bg-[#d4d4d4] mt-2" />
                   <div class="links flex flex-col py-2 px-3 rtl:text-right ltr:text-left gap-1">
                     <DropdownMenuCheckboxItem>
                       <nuxt-link
                       :to="localePath('/dashboard')"
                         class="link text-[#7B7B7B] flex items-center gap-2 hover:text-primary cursor-pointer hover:bg-[#865FFD12] py-2 px-2 rounded-[8px] ">
                         <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path fill-rule="evenodd" clip-rule="evenodd"
                             d="M7.00004 0.9375C6.05521 0.9375 5.14907 1.31283 4.48097 1.98093C3.81288 2.64903 3.43754 3.55517 3.43754 4.5C3.43754 5.44483 3.81288 6.35097 4.48097 7.01907C5.14907 7.68717 6.05521 8.0625 7.00004 8.0625C7.94488 8.0625 8.85101 7.68717 9.51911 7.01907C10.1872 6.35097 10.5625 5.44483 10.5625 4.5C10.5625 3.55517 10.1872 2.64903 9.51911 1.98093C8.85101 1.31283 7.94488 0.9375 7.00004 0.9375ZM4.56254 4.5C4.56254 3.85353 4.81935 3.23355 5.27647 2.77643C5.73359 2.31931 6.35358 2.0625 7.00004 2.0625C7.64651 2.0625 8.26649 2.31931 8.72361 2.77643C9.18073 3.23355 9.43754 3.85353 9.43754 4.5C9.43754 5.14647 9.18073 5.76645 8.72361 6.22357C8.26649 6.68069 7.64651 6.9375 7.00004 6.9375C6.35358 6.9375 5.73359 6.68069 5.27647 6.22357C4.81935 5.76645 4.56254 5.14647 4.56254 4.5ZM7.00004 9.1875C5.26529 9.1875 3.66629 9.582 2.48204 10.248C1.31504 10.905 0.437542 11.8995 0.437542 13.125V13.2015C0.436792 14.073 0.436042 15.1665 1.39529 15.948C1.86704 16.332 2.52779 16.6058 3.42029 16.7858C4.31429 16.9673 5.48054 17.0625 7.00004 17.0625C8.51954 17.0625 9.68504 16.9673 10.5805 16.7858C11.473 16.6058 12.133 16.332 12.6055 15.948C13.5648 15.1665 13.5633 14.073 13.5625 13.2015V13.125C13.5625 11.8995 12.685 10.905 11.5188 10.248C10.3338 9.582 8.73554 9.1875 7.00004 9.1875ZM1.56254 13.125C1.56254 12.4867 2.02904 11.7937 3.03329 11.229C4.02029 10.674 5.42129 10.3125 7.00079 10.3125C8.57879 10.3125 9.97979 10.674 10.9668 11.229C11.9718 11.7937 12.4375 12.4867 12.4375 13.125C12.4375 14.106 12.4075 14.658 11.8945 15.075C11.617 15.3015 11.152 15.5227 10.357 15.6832C9.56429 15.8437 8.48054 15.9375 7.00004 15.9375C5.51954 15.9375 4.43504 15.8437 3.64304 15.6832C2.84804 15.5227 2.38304 15.3015 2.10554 15.0758C1.59254 14.658 1.56254 14.106 1.56254 13.125Z"
                             fill="#7B7B7B" />
                         </svg>
                         <span class=" text-[13px]"> {{ $t('content.profile') }} </span>
                       </nuxt-link>
                     </DropdownMenuCheckboxItem>
                     <DropdownMenuCheckboxItem>
                       <NuxtLink
                       :to="localePath('/dashboard/booking')"
                       class="link text-[#7B7B7B] flex items-center gap-2   hover:text-primary cursor-pointer hover:bg-[#865FFD12] py-2 px-2 rounded-[8px] ">
                       <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path
                           d="M12.75 10.5C12.9489 10.5 13.1397 10.421 13.2803 10.2803C13.421 10.1397 13.5 9.94891 13.5 9.75C13.5 9.55109 13.421 9.36032 13.2803 9.21967C13.1397 9.07902 12.9489 9 12.75 9C12.5511 9 12.3603 9.07902 12.2197 9.21967C12.079 9.36032 12 9.55109 12 9.75C12 9.94891 12.079 10.1397 12.2197 10.2803C12.3603 10.421 12.5511 10.5 12.75 10.5ZM12.75 13.5C12.9489 13.5 13.1397 13.421 13.2803 13.2803C13.421 13.1397 13.5 12.9489 13.5 12.75C13.5 12.5511 13.421 12.3603 13.2803 12.2197C13.1397 12.079 12.9489 12 12.75 12C12.5511 12 12.3603 12.079 12.2197 12.2197C12.079 12.3603 12 12.5511 12 12.75C12 12.9489 12.079 13.1397 12.2197 13.2803C12.3603 13.421 12.5511 13.5 12.75 13.5ZM9.75 9.75C9.75 9.94891 9.67098 10.1397 9.53033 10.2803C9.38968 10.421 9.19891 10.5 9 10.5C8.80109 10.5 8.61032 10.421 8.46967 10.2803C8.32902 10.1397 8.25 9.94891 8.25 9.75C8.25 9.55109 8.32902 9.36032 8.46967 9.21967C8.61032 9.07902 8.80109 9 9 9C9.19891 9 9.38968 9.07902 9.53033 9.21967C9.67098 9.36032 9.75 9.55109 9.75 9.75ZM9.75 12.75C9.75 12.9489 9.67098 13.1397 9.53033 13.2803C9.38968 13.421 9.19891 13.5 9 13.5C8.80109 13.5 8.61032 13.421 8.46967 13.2803C8.32902 13.1397 8.25 12.9489 8.25 12.75C8.25 12.5511 8.32902 12.3603 8.46967 12.2197C8.61032 12.079 8.80109 12 9 12C9.19891 12 9.38968 12.079 9.53033 12.2197C9.67098 12.3603 9.75 12.5511 9.75 12.75ZM5.25 10.5C5.44891 10.5 5.63968 10.421 5.78033 10.2803C5.92098 10.1397 6 9.94891 6 9.75C6 9.55109 5.92098 9.36032 5.78033 9.21967C5.63968 9.07902 5.44891 9 5.25 9C5.05109 9 4.86032 9.07902 4.71967 9.21967C4.57902 9.36032 4.5 9.55109 4.5 9.75C4.5 9.94891 4.57902 10.1397 4.71967 10.2803C4.86032 10.421 5.05109 10.5 5.25 10.5ZM5.25 13.5C5.44891 13.5 5.63968 13.421 5.78033 13.2803C5.92098 13.1397 6 12.9489 6 12.75C6 12.5511 5.92098 12.3603 5.78033 12.2197C5.63968 12.079 5.44891 12 5.25 12C5.05109 12 4.86032 12.079 4.71967 12.2197C4.57902 12.3603 4.5 12.5511 4.5 12.75C4.5 12.9489 4.57902 13.1397 4.71967 13.2803C4.86032 13.421 5.05109 13.5 5.25 13.5Z"
                           fill="#7B7B7B" />
                         <path fill-rule="evenodd" clip-rule="evenodd"
                           d="M5.24925 1.3125C5.39843 1.3125 5.54151 1.37176 5.647 1.47725C5.75249 1.58274 5.81175 1.72582 5.81175 1.875V2.44725C6.30825 2.4375 6.855 2.4375 7.4565 2.4375H10.5412C11.1435 2.4375 11.6902 2.4375 12.1867 2.44725V1.875C12.1867 1.72582 12.246 1.58274 12.3515 1.47725C12.457 1.37176 12.6001 1.3125 12.7492 1.3125C12.8984 1.3125 13.0415 1.37176 13.147 1.47725C13.2525 1.58274 13.3118 1.72582 13.3118 1.875V2.49525C13.5068 2.51025 13.6915 2.52925 13.866 2.55225C14.745 2.67075 15.4567 2.91975 16.0185 3.48075C16.5795 4.0425 16.8285 4.75425 16.947 5.63325C17.0618 6.48825 17.0618 7.5795 17.0618 8.958V10.542C17.0618 11.9205 17.0618 13.0125 16.947 13.8668C16.8285 14.7458 16.5795 15.4575 16.0185 16.0192C15.4567 16.5802 14.745 16.8293 13.866 16.9478C13.011 17.0625 11.9197 17.0625 10.5412 17.0625H7.458C6.0795 17.0625 4.9875 17.0625 4.13325 16.9478C3.25425 16.8293 2.5425 16.5802 1.98075 16.0192C1.41975 15.4575 1.17075 14.7458 1.05225 13.8668C0.9375 13.0118 0.9375 11.9205 0.9375 10.542V8.958C0.9375 7.5795 0.9375 6.4875 1.05225 5.63325C1.17075 4.75425 1.41975 4.0425 1.98075 3.48075C2.5425 2.91975 3.25425 2.67075 4.13325 2.55225C4.30825 2.52925 4.493 2.51025 4.6875 2.49525V1.875C4.6875 1.72595 4.74666 1.58299 4.85199 1.47752C4.95731 1.37205 5.1002 1.3127 5.24925 1.3125ZM4.28175 3.6675C3.528 3.76875 3.093 3.95925 2.77575 4.2765C2.4585 4.59375 2.268 5.02875 2.16675 5.7825C2.14975 5.91 2.13525 6.04475 2.12325 6.18675H15.8752C15.8632 6.04475 15.8488 5.90975 15.8318 5.78175C15.7305 5.028 15.54 4.593 15.2228 4.27575C14.9055 3.9585 14.4705 3.768 13.716 3.66675C12.9458 3.56325 11.9295 3.56175 10.4992 3.56175H7.49925C6.069 3.56175 5.0535 3.564 4.28175 3.6675ZM2.06175 9C2.06175 8.3595 2.06175 7.80225 2.0715 7.3125H15.927C15.9368 7.80225 15.9368 8.3595 15.9368 9V10.5C15.9368 11.9303 15.9353 12.9465 15.8318 13.7175C15.7305 14.4713 15.54 14.9062 15.2228 15.2235C14.9055 15.5408 14.4705 15.7313 13.716 15.8325C12.9458 15.936 11.9295 15.9375 10.4992 15.9375H7.49925C6.069 15.9375 5.0535 15.936 4.28175 15.8325C3.528 15.7313 3.093 15.5408 2.77575 15.2235C2.4585 14.9062 2.268 14.4712 2.16675 13.7167C2.06325 12.9465 2.06175 11.9303 2.06175 10.5V9Z"
                           fill="#7B7B7B" />
                       </svg>
                       <span class=" text-[13px]"> {{ $t('content.booking') }} </span>
                      </NuxtLink>
                     </DropdownMenuCheckboxItem>
                     <DropdownMenuCheckboxItem>
                       <NuxtLink
                       :to="localePath('/dashboard/wallet')"
                       class="link text-[#7B7B7B] flex items-center gap-2  hover:text-primary cursor-pointer hover:bg-[#865FFD12] py-2 px-2 rounded-[8px] ">
                       <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path
                           d="M14.25 9C14.25 9.19891 14.171 9.38968 14.0303 9.53033C13.8897 9.67098 13.6989 9.75 13.5 9.75C13.3011 9.75 13.1103 9.67098 12.9697 9.53033C12.829 9.38968 12.75 9.19891 12.75 9C12.75 8.80109 12.829 8.61032 12.9697 8.46967C13.1103 8.32902 13.3011 8.25 13.5 8.25C13.6989 8.25 13.8897 8.32902 14.0303 8.46967C14.171 8.61032 14.25 8.80109 14.25 9Z"
                           fill="#7B7B7B" />
                         <path fill-rule="evenodd" clip-rule="evenodd"
                           d="M7.458 2.4375H9.792C11.1705 2.4375 12.2625 2.4375 13.1168 2.55225C13.9958 2.67075 14.7075 2.91975 15.2692 3.48075C15.9622 4.1745 16.1835 5.103 16.2638 6.30825C16.6965 6.498 17.0235 6.90075 17.0588 7.41075C17.0625 7.4565 17.0625 7.50525 17.0625 7.55025V10.4497C17.0625 10.4948 17.0625 10.5435 17.0595 10.5885C17.0235 11.0985 16.6965 11.502 16.2638 11.6925C16.1835 12.897 15.9622 13.8255 15.2692 14.5192C14.7075 15.0802 13.9958 15.3293 13.1168 15.4478C12.2618 15.5625 11.1705 15.5625 9.792 15.5625H7.458C6.0795 15.5625 4.9875 15.5625 4.13325 15.4478C3.25425 15.3293 2.5425 15.0802 1.98075 14.5192C1.41975 13.9575 1.17075 13.2458 1.05225 12.3668C0.9375 11.5118 0.9375 10.4205 0.9375 9.042V8.958C0.9375 7.5795 0.9375 6.4875 1.05225 5.63325C1.17075 4.75425 1.41975 4.0425 1.98075 3.48075C2.5425 2.91975 3.25425 2.67075 4.13325 2.55225C4.98825 2.4375 6.0795 2.4375 7.458 2.4375ZM15.126 11.8125H13.6725C12.0637 11.8125 10.6867 10.5915 10.6867 9C10.6867 7.4085 12.0638 6.1875 13.6718 6.1875H15.1252C15.0398 5.18175 14.847 4.65 14.4728 4.2765C14.1555 3.95925 13.7205 3.76875 12.966 3.6675C12.1958 3.564 11.1795 3.5625 9.74925 3.5625H7.49925C6.069 3.5625 5.0535 3.564 4.28175 3.6675C3.528 3.76875 3.093 3.95925 2.77575 4.2765C2.4585 4.59375 2.26875 5.02875 2.1675 5.7825C2.064 6.5535 2.0625 7.569 2.0625 8.99925C2.0625 10.4295 2.064 11.4457 2.1675 12.2167C2.26875 12.9705 2.45925 13.4055 2.7765 13.7228C3.09375 14.04 3.52875 14.2305 4.28325 14.3317C5.05425 14.4352 6.06975 14.4368 7.5 14.4368H9.75C11.1803 14.4368 12.1965 14.4352 12.9675 14.3317C13.7213 14.2305 14.1562 14.04 14.4735 13.7228C14.8478 13.3493 15.0405 12.8182 15.126 11.8117M3.9375 6C3.9375 5.85082 3.99676 5.70774 4.10225 5.60225C4.20774 5.49676 4.35082 5.4375 4.5 5.4375H7.5C7.64918 5.4375 7.79226 5.49676 7.89775 5.60225C8.00324 5.70774 8.0625 5.85082 8.0625 6C8.0625 6.14918 8.00324 6.29226 7.89775 6.39775C7.79226 6.50324 7.64918 6.5625 7.5 6.5625H4.5C4.35082 6.5625 4.20774 6.50324 4.10225 6.39775C3.99676 6.29226 3.9375 6.14918 3.9375 6ZM15.693 7.3125H13.6725C12.6045 7.3125 11.8117 8.10675 11.8117 9C11.8117 9.89325 12.6045 10.6875 13.6718 10.6875H15.7103C15.8647 10.6777 15.9315 10.5735 15.9368 10.5105V7.4895C15.9315 7.4265 15.8647 7.32225 15.7103 7.31325L15.693 7.3125Z"
                           fill="#7B7B7B" />
                       </svg>
                       <span class=" text-[13px]"> {{ $t('header.wallet') }} </span>

                       </NuxtLink>
                     </DropdownMenuCheckboxItem>
                     <DropdownMenuCheckboxItem>
                       <NuxtLink
                       :to="localePath('/dashboard/favourite')"
                       class="link text-[#7B7B7B] flex items-center gap-2   hover:text-primary cursor-pointer hover:bg-[#865FFD12] py-2 px-2 rounded-[8px] ">
                       <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path fill-rule="evenodd" clip-rule="evenodd"
                           d="M4.218 3.31799C2.97375 3.88649 2.0625 5.23949 2.0625 6.85274C2.0625 8.50049 2.7375 9.77099 3.7035 10.86C4.50075 11.757 5.46525 12.501 6.40575 13.2255C6.62975 13.398 6.851 13.57 7.0695 13.7415C7.464 14.0527 7.81575 14.325 8.1555 14.5237C8.49525 14.7225 8.7675 14.8125 9 14.8125C9.2325 14.8125 9.5055 14.7225 9.8445 14.5237C10.1842 14.325 10.536 14.0527 10.9305 13.7415C11.149 13.5695 11.3702 13.3977 11.5942 13.2262C12.5347 12.5002 13.4993 11.757 14.2965 10.86C15.2633 9.77099 15.9375 8.50049 15.9375 6.85274C15.9375 5.24024 15.0262 3.88649 13.782 3.31799C12.573 2.76524 10.9485 2.91149 9.405 4.51574C9.35253 4.57018 9.28962 4.61348 9.22003 4.64306C9.15045 4.67264 9.07561 4.68788 9 4.68788C8.92439 4.68788 8.84955 4.67264 8.77997 4.64306C8.71038 4.61348 8.64747 4.57018 8.595 4.51574C7.0515 2.91149 5.427 2.76524 4.218 3.31799ZM9 3.34499C7.266 1.79249 5.32425 1.57499 3.75 2.29424C2.0895 3.05549 0.9375 4.81949 0.9375 6.85349C0.9375 8.85224 1.77 10.3777 2.86275 11.6077C3.73725 12.5925 4.8075 13.4167 5.75325 14.1442C5.96825 14.3092 6.17475 14.4697 6.37275 14.6257C6.7575 14.9287 7.17 15.2512 7.58775 15.4957C8.0055 15.7402 8.4825 15.9382 9 15.9382C9.5175 15.9382 9.9945 15.7395 10.4123 15.4957C10.8308 15.2512 11.2425 14.9287 11.6273 14.6257C11.8253 14.4697 12.0318 14.3092 12.2467 14.1442C13.1918 13.4167 14.2628 12.5917 15.1373 11.6077C16.23 10.3777 17.0625 8.85224 17.0625 6.85349C17.0625 4.81949 15.9113 3.05549 14.25 2.29574C12.6757 1.57574 10.734 1.79324 9 3.34499Z"
                           fill="#7B7B7B" />
                       </svg>
                       <span class=" text-[13px]"> {{ $t('content.saved_units') }} </span>
                       </NuxtLink>
                     </DropdownMenuCheckboxItem>
                     <DropdownMenuCheckboxItem>
                       <NuxtLink
                       :to="localePath('/dashboard/security')"
                       class="link text-[#7B7B7B] flex items-center gap-2  hover:text-primary cursor-pointer hover:bg-[#865FFD12] py-2 px-2 rounded-[8px] ">
                       <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path fill-rule="evenodd" clip-rule="evenodd"
                           d="M9 5.4375C8.40971 5.4375 7.83437 5.62323 7.3555 5.96838C6.87663 6.31353 6.5185 6.80061 6.33183 7.36061C6.14516 7.92061 6.13942 8.52515 6.31543 9.0886C6.49144 9.65204 6.84026 10.1458 7.3125 10.5V11.25C7.3125 11.9745 7.9005 12.5625 8.625 12.5625H9.375C9.7231 12.5625 10.0569 12.4242 10.3031 12.1781C10.5492 11.9319 10.6875 11.5981 10.6875 11.25V10.5C11.1597 10.1458 11.5086 9.65204 11.6846 9.0886C11.8606 8.52515 11.8548 7.92061 11.6682 7.36061C11.4815 6.80061 11.1234 6.31353 10.6445 5.96838C10.1656 5.62323 9.59029 5.4375 9 5.4375ZM7.3125 8.25C7.31261 7.95377 7.3907 7.66279 7.53892 7.40631C7.68714 7.14983 7.90026 6.93689 8.15686 6.78888C8.41346 6.64087 8.7045 6.56302 9.00073 6.56315C9.29696 6.56328 9.58793 6.64138 9.84441 6.78961C10.1009 6.93784 10.3138 7.15097 10.4618 7.40758C10.6098 7.66419 10.6876 7.95523 10.6875 8.25146C10.6874 8.54769 10.6092 8.83866 10.461 9.09513C10.3128 9.35159 10.0996 9.56452 9.843 9.7125C9.75769 9.76193 9.68686 9.83292 9.63763 9.91835C9.5884 10.0038 9.56249 10.1006 9.5625 10.1993V11.25C9.5625 11.2997 9.54275 11.3474 9.50758 11.3826C9.47242 11.4177 9.42473 11.4375 9.375 11.4375H8.625C8.57527 11.4375 8.52758 11.4177 8.49242 11.3826C8.45725 11.3474 8.4375 11.2997 8.4375 11.25V10.1993C8.43764 10.1005 8.41179 10.0035 8.36255 9.91792C8.31332 9.83235 8.24242 9.76125 8.157 9.71175C7.90028 9.56371 7.68707 9.35067 7.53882 9.09407C7.39058 8.83747 7.31252 8.54635 7.3125 8.25Z"
                           fill="#7B7B7B" />
                         <path fill-rule="evenodd" clip-rule="evenodd"
                           d="M9 0.9375C8.29725 0.9375 7.62525 1.16775 6.54225 1.53825L5.997 1.72575C4.88625 2.10525 4.02825 2.39925 3.41475 2.64825C3.10575 2.7735 2.8395 2.89575 2.62575 3.0195C2.4195 3.1395 2.21325 3.28875 2.073 3.489C1.93425 3.68625 1.86225 3.92925 1.81725 4.164C1.77 4.407 1.74225 4.69875 1.7235 5.034C1.6875 5.6985 1.6875 6.6105 1.6875 7.7925V8.99325C1.6875 13.569 5.1435 15.7628 7.1985 16.6613L7.21875 16.6695C7.47375 16.7812 7.71375 16.8855 7.989 16.956C8.27925 17.031 8.58825 17.0625 9 17.0625C9.4125 17.0625 9.72 17.031 10.011 16.956C10.2863 16.8855 10.5262 16.7812 10.7805 16.6695L10.8015 16.6613C12.8565 15.7628 16.3125 13.569 16.3125 8.99325V7.7925C16.3125 6.6105 16.3125 5.6985 16.2765 5.03325C16.2641 4.74153 16.2328 4.45092 16.1827 4.16325C16.1377 3.92925 16.0657 3.68625 15.9277 3.48825C15.7867 3.28875 15.5805 3.1395 15.3743 3.0195C15.1195 2.87887 14.856 2.75487 14.5853 2.64825C13.9718 2.39925 13.1137 2.10525 12.003 1.72575L11.4578 1.53825C10.3748 1.16775 9.70275 0.9375 9 0.9375ZM6.81 2.6355C8.02125 2.2215 8.5065 2.0625 9 2.0625C9.4935 2.0625 9.97875 2.2215 11.19 2.6355L11.619 2.7825C12.7537 3.171 13.581 3.4545 14.1615 3.69C14.4517 3.8085 14.6617 3.9075 14.8095 3.993C14.8815 4.035 14.9335 4.06975 14.9655 4.09725C14.994 4.11975 15.0053 4.13325 15.0068 4.13475C15.0166 4.15239 15.0246 4.17099 15.0308 4.19025C15.0458 4.23125 15.0615 4.29325 15.078 4.37625C15.1195 4.61374 15.1445 4.85381 15.153 5.09475C15.1875 5.7255 15.1875 6.606 15.1875 7.81275V8.99325C15.1875 12.8752 12.285 14.7855 10.3507 15.63C10.0725 15.7515 9.91125 15.8205 9.732 15.8663C9.561 15.9105 9.3525 15.9375 9 15.9375C8.6475 15.9375 8.439 15.9105 8.268 15.8663C8.088 15.8213 7.9275 15.7515 7.64925 15.63C5.71425 14.7855 2.8125 12.8745 2.8125 8.99325V7.81275C2.8125 6.606 2.8125 5.7255 2.847 5.09475C2.85547 4.85381 2.88053 4.61374 2.922 4.37625C2.938 4.29325 2.95375 4.23125 2.96925 4.19025C2.98275 4.15275 2.99175 4.13775 2.99325 4.13475C3.00581 4.121 3.01962 4.10844 3.0345 4.09725C3.0665 4.06975 3.1185 4.03475 3.1905 3.99225C3.33825 3.90675 3.54825 3.8085 3.8385 3.69075C4.419 3.4545 5.24625 3.171 6.381 2.78325L6.81 2.6355Z"
                           fill="#7B7B7B" />
                       </svg>
                       <span class=" text-[13px]"> {{ $t('content.security1') }} </span>

                     </NuxtLink>
                     </DropdownMenuCheckboxItem>




                   </div>
                   <DropdownMenuSeparator class="bg-[#d4d4d4] mt-2" />
                   <div class="w-full flex items-center px-4 py-2 justify-center">
                     <button @click="handleSignOut" class="transition-all duration-300 bg-red-600 hover:bg-white hover:text-black hover:border h-[40px] rounded-[10px] text-white text-[12px] font-bold w-full">
                       {{ $t('content.logout') }}
                     </button>
                   </div>
                 </DropdownMenuContent>
               </DropdownMenu>
             </div>
           </div>
           <!-- <button class="hidden bar-icon w-[56px] h-[56px] bg-white border-[1px] rounded-[10px]  border-primary flex items-center justify-center">
                  <IconNav3 color="primary"></IconNav3>
               </button> -->
         </div>

       </nav>

     </div>

      <div class="nav-mobile fixed w-[100vw] bg-white pt-3 pb-1 px-5 bottom-0">
        <div class="links flex items-center justify-around">
          <nuxt-link :to="localePath('/')" class="link flex flex-col gap-1 items-center">
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.5098 5.01L14.5498 3.05C13.1498 1.65 10.8498 1.65 9.44977 3.05L7.48977 5.01C7.09977 5.4 7.09977 6.04 7.48977 6.43L11.2998 10.24C11.6898 10.63 12.3198 10.63 12.7098 10.24L16.5198 6.43C16.8998 6.04 16.8998 5.4 16.5098 5.01Z"
                fill="#6B697E"></path>
              <path data-v-922cfbec=""
                d="M5.01 7.49172L3.05 9.45172C1.65 10.8517 1.65 13.1517 3.05 14.5517L5.01 16.5117C5.4 16.9017 6.03 16.9017 6.42 16.5117L10.23 12.7017C10.62 12.3117 10.62 11.6817 10.23 11.2917L6.43 7.49172C6.04 7.10172 5.4 7.10172 5.01 7.49172Z"
                fill="#6B697E"></path>
              <path data-v-922cfbec=""
                d="M20.9491 9.45172L18.9891 7.49172C18.5991 7.10172 17.9691 7.10172 17.5791 7.49172L13.7691 11.3017C13.3791 11.6917 13.3791 12.3217 13.7691 12.7117L17.5791 16.5217C17.9691 16.9117 18.5991 16.9117 18.9891 16.5217L20.9491 14.5617C22.3491 13.1517 22.3491 10.8517 20.9491 9.45172Z"
                fill="#6B697E"></path>
              <path data-v-922cfbec=""
                d="M7.48907 18.9891L9.44907 20.9491C10.8491 22.3491 13.1491 22.3491 14.5491 20.9491L16.5091 18.9891C16.8991 18.5991 16.8991 17.9691 16.5091 17.5791L12.6991 13.7691C12.3091 13.3791 11.6791 13.3791 11.2891 13.7691L7.47907 17.5791C7.09907 17.9591 7.09907 18.5991 7.48907 18.9891Z"
                fill="#6B697E"></path>
            </svg>
            <span class="text-[#6B697E]"> {{ $t('header.home') }} </span>

          </nuxt-link>
          <nuxt-link :to="localePath('/wallet')" class="link flex flex-col gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6B697E">
              <path
                d="M240-160q-66 0-113-47T80-320v-320q0-66 47-113t113-47h480q66 0 113 47t47 113v320q0 66-47 113t-113 47H240Zm0-480h480q22 0 42 5t38 16v-21q0-33-23.5-56.5T720-720H240q-33 0-56.5 23.5T160-640v21q18-11 38-16t42-5Zm-74 130 445 108q9 2 18 0t17-8l139-116q-11-15-28-24.5t-37-9.5H240q-26 0-45.5 13.5T166-510Z">
              </path>
            </svg>
            <span class="text-[#6B697E]"> {{ $t('header.wallet') }} </span>

          </nuxt-link>
          <div @click="settingsCheck = true" class="link flex flex-col gap-1 items-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6B697E">
              <path
                d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z">
              </path>
            </svg>
            <span class="text-[#6B697E]"> {{ $t('content.settingss') }} </span>

          </div>
        </div>
      </div>


    </div>
    <div v-if="settingsCheck" class="settings-container fixed top-0 w-[100vw] h-[100vh] z-[555555555] bg-[#f9f7ff]">
      <div class="head flex items-center justify-between py-5 px-4">
        <span class="font-bold text-[18px]"> {{ $t('header.the_account') }} </span>
        <svg @click="settingsCheck = false" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px"
          viewBox="0 0 24 24" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill="#765cf1" />
        </svg>

      </div>
      <div class="links h-[100vh] overflow-y-auto mx-4 ">
        <!-- <div class="border-b-[#dad9de] pb-3 border-b-[1px] ">
          <button @click="settingsCheck = false" class="bg-burgundy w-full text-white py-2 rounded-md"> اضف عقارك
            +</button>
        </div> -->
        <div class="mt-4 flex flex-col gap-5 border-b-[#dad9de] pb-3 border-b-[1px] ">
          <div @click="changeLang()" class="link flex items-center justify-between">
            <div>
              <span class="text-[#6B697E] font-semibold"> {{ $t('content.changeLang') }} </span>
            </div>
            <svg data-v-922cfbec="" class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" height="18px"
              viewBox="0 -960 960 960" width="18px" fill="#6B697E">
              <path data-v-922cfbec="" d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"></path>
            </svg>
          </div>
          <nuxt-link v-if="!isAuthenticated" :to="localePath('/')" @click.stop="handleAuthClick(),  settingsCheck = false"
            class="link flex items-center justify-between">
            <div>
              <span class="text-[#6B697E] font-semibold"> {{ $t('header.login') }}</span>
            </div>
            <svg data-v-922cfbec="" class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" height="18px"
              viewBox="0 -960 960 960" width="18px" fill="#6B697E">
              <path data-v-922cfbec="" d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"></path>
            </svg>
          </nuxt-link>
          <nuxt-link v-if="isAuthenticated" :to="localePath('/dashboard')" @click="settingsCheck = false"
            class="link flex items-center justify-between">
            <div>
              <span class="text-[#6B697E] font-semibold"> {{ $t('content.profile') }} </span>
            </div>
            <svg data-v-922cfbec="" class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" height="18px"
              viewBox="0 -960 960 960" width="18px" fill="#6B697E">
              <path data-v-922cfbec="" d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"></path>
            </svg>
          </nuxt-link>
          <nuxt-link v-if="isAuthenticated" :to="localePath('/dashboard/wallet')" @click="settingsCheck = false"
            class="link flex items-center justify-between">
            <div>
              <span class="text-[#6B697E] font-semibold"> {{ $t('header.wallet') }} </span>
            </div>
            <svg data-v-922cfbec="" class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" height="18px"
              viewBox="0 -960 960 960" width="18px" fill="#6B697E">
              <path data-v-922cfbec="" d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"></path>
            </svg>
          </nuxt-link>
          <nuxt-link v-if="isAuthenticated" :to="localePath('/dashboard/booking')" @click="settingsCheck = false"
            class="link flex items-center justify-between">
            <div>
              <span class="text-[#6B697E] font-semibold"> {{ $t('content.booking') }} </span>
            </div>
            <svg data-v-922cfbec="" class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" height="18px"
              viewBox="0 -960 960 960" width="18px" fill="#6B697E">
              <path data-v-922cfbec="" d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"></path>
            </svg>
          </nuxt-link>
          <!-- <nuxt-link v-if="isAuthenticated" :to="localePath('/dashboard/favourite')" @click="settingsCheck = false"
            class="link flex items-center justify-between">
            <div>
              <span class="text-[#6B697E] font-semibold"> {{ $t('content.saved_units') }} </span>
            </div>
            <svg data-v-922cfbec="" class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" height="18px"
              viewBox="0 -960 960 960" width="18px" fill="#6B697E">
              <path data-v-922cfbec="" d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"></path>
            </svg>
          </nuxt-link> -->


        </div>
        <div class="mt-4 flex flex-col gap-5 border-b-[#dad9de] pb-3 border-b-[1px] ">
          <nuxt-link :to="localePath('/offers')" @click="settingsCheck = false"
            class="link flex items-center justify-between">
            <div>
              <span class="text-[#6B697E] font-semibold"> {{ $t('header.offers') }} </span>
            </div>
            <svg data-v-922cfbec="" class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" height="18px"
              viewBox="0 -960 960 960" width="18px" fill="#6B697E">
              <path data-v-922cfbec="" d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"></path>
            </svg>
          </nuxt-link>
          <nuxt-link :to="localePath('/about')" @click="settingsCheck = false"
            class="link flex items-center justify-between">
            <div>
              <span class="text-[#6B697E] font-semibold"> {{ $t('footer.linkAbout') }} </span>
            </div>
            <svg data-v-922cfbec="" class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" height="18px"
              viewBox="0 -960 960 960" width="18px" fill="#6B697E">
              <path data-v-922cfbec="" d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"></path>
            </svg>
          </nuxt-link>
          <nuxt-link :to="localePath('/terms')" @click="settingsCheck = false"
            class="link flex items-center justify-between">
            <div>
              <span class="text-[#6B697E] font-semibold"> {{ $t('footer.terms_and_conditions') }} </span>
            </div>
            <svg data-v-922cfbec="" class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" height="18px"
              viewBox="0 -960 960 960" width="18px" fill="#6B697E">
              <path data-v-922cfbec="" d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"></path>
            </svg>
          </nuxt-link>


        </div>
        <div class="mt-4 flex flex-col gap-5 border-b-[#dad9de] pb-3 border-b-[1px] ">
          <nuxt-link :to="localePath('/policy')" @click="settingsCheck = false"
            class="link flex items-center justify-between">
            <div>
              <span class="text-[#6B697E] font-semibold"> {{ $t('footer.linkPrivacyPolicy') }} </span>
            </div>
            <svg data-v-922cfbec="" class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" height="18px"
              viewBox="0 -960 960 960" width="18px" fill="#6B697E">
              <path data-v-922cfbec="" d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"></path>
            </svg>
          </nuxt-link>
          <nuxt-link :to="localePath('/about')" @click="settingsCheck = false"
            class="link flex items-center justify-between">
            <div>
              <span class="text-[#6B697E] font-semibold"> {{ $t('footer.support') }}</span>
            </div>
            <svg data-v-922cfbec="" class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" height="18px"
              viewBox="0 -960 960 960" width="18px" fill="#6B697E">
              <path data-v-922cfbec="" d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"></path>
            </svg>
          </nuxt-link>
          <div class="flex items-center justify-around mt-3">
            <IconSnapChat></IconSnapChat>
            <IconFaceBook></IconFaceBook>
            <IconInsta></IconInsta>
            <IconLinkedn></IconLinkedn>
            <IconTiktok></IconTiktok>
          </div>


        </div>

        <div class="mail flex items-start gap-2 mt-3 justify-center">
          <IconMail></IconMail>
          <span class="text-primary"> support@moteelz.com </span>
        </div>
        <div v-if="isAuthenticated" class="border-t-[#dad9de] pt-1">
           <button @click="handleSignOut" class="bg-primary h-[40px] rounded-[10px] text-white text-[12px] font-bold w-full"> {{$t('content.logout')}} </button>
        </div>

      </div>
    </div>


    <CommonSearch1Mobile></CommonSearch1Mobile>
    <CommonSearch3Mobile></CommonSearch3Mobile>
    

  </div>
</template>
<script setup lang="ts">
import { ref, computed,watch } from 'vue';
import { useRouter } from 'vue-router'; // Make sure this is imported correctly
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';
import AuthPopUP from '@/components/card/AuthPopUp.vue';
import { Button } from '@/components/ui/button'
import AuthModal from '../card/AuthModal.vue';
import { generalStore } from '@/stores/general'
let store = generalStore();

let activeNav = ref(false);
let scrollNav = ref(false);
const localePath = useLocalePath();
const { locale, setLocale } = useI18n();
const settingsCheck = ref(false);
let router = useRouter();
const authStore = useAuthStore();
const showModal = ref(false);
const isAuthenticated = computed(() => authStore.isAuthenticated);

// Watcher for User Authentication
watch(isAuthenticated, (newValue) => {
  console.log("Authentication status changed:", newValue);
  // Optionally handle additional logic when authentication state changes
});
const handleAuthClick = () => {
  if (!isAuthenticated.value) {
    authStore.showModal = true; // Show the login modal
  } else {
    // Redirect to the localized user dashboard
    const localizedDashboardPath = localePath('/dashboard');
    router.push(localizedDashboardPath);
  }
};

const handleSignOut = () => {
  authStore.signOut();
  router.push(localePath('/'));

}

const changeLang = async () => {
  const newLang = locale.value === 'en' ? 'ar' : 'en';

  // Update locale and store preference in localStorage
  locale.value = newLang;
  localStorage.setItem('preferredLang', newLang);
  setLocale(newLang);

  // Update HTML language and direction attributes
  useHead({
    htmlAttrs: {
      lang: newLang,
      dir: newLang === 'ar' ? 'rtl' : 'ltr',
    },
  });

  // Redirect to the language-specific route
  const route = useRoute();
  const newPath = localePath({ path: route.path });
  await navigateTo({
    path: newPath,
    query: route.query,
  });
};


onMounted(() => {
  window.addEventListener("scroll", function () {
      scrollNav.value = true;
    if (this.window.scrollY >= 200) {
      activeNav.value = true;
      scrollNav.value = false;
    } else if (window.scrollY == 0) {
      activeNav.value = false;
      scrollNav.value = false;
    }
  });
});


</script>
<style lang="scss">


</style>