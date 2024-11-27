<template>
  <div class="flex flex-row w-full">
    <!-- handle action if user is logged in -->
    <div class="w-full flex flex-col gap-4" v-if="isLogin">
      <!-- <div class="flex flex-row items-center">
        <NuxtImg
          v-if="false"
          :src="user.avatar"
          class="h-16 w-16 rounded-full border shadow-10 md:order-1 order-last"
        />
        <div class="flex w-full items-center gap-4 justify-between">
          <span class="text-xl font-bold text-primary_dark">
            {{ $t('content.welcome_back', { name: user.name }) }}
          </span>


          <div class="md:flex hidden">
            <button
              class="text-primary underline text-sm"
              @click="navigateTo(localePath('/dashboard/profile'))"
            >
              {{ $t('content.update_data') }}
            </button>
          </div>
        </div>
      </div> -->

      <!-- <div class="md:hidden flex flex-row mt-4 px-2 gap-x-3 w-full items-center">
        <div class="flex items-center justify-center gap-x-1">
          <Icon name="mdi:person-outline" class="h-5 w-5 text-gray-600" />
          <span class="text-sm text-gray-600">
            {{ user.name }}
          </span>
        </div>
        <div class="flex items-center justify-center gap-x-1">
          <Icon name="mdi:phone-outline" class="h-5 w-5 text-gray-600" />
          <span class="text-sm text-gray-600" dir="ltr">
            {{ user.mobile }}
          </span>
        </div>
      </div>
      <div class="md:hidden flex flex-row mt-3 px-2 gap-x-3 w-full items-center">
        <div class="flex items-center justify-center gap-x-1">
          <Icon name="mdi:mail-outline" class="h-5 w-5 text-gray-600" />
          <span class="text-sm text-gray-600">
            {{ user.email }}
          </span>
        </div>
      </div> -->
      <div class="flex items-center gap-4 flex-wrap">
        <span class="text-xl font-bold text-primary_dark">
          {{ $t('content.welcome_back', { name: user.name }) }}
        </span>

        <button
          class="text-primary underline text-sm"
          @click="navigateTo(localePath('/dashboard/profile'))"
        >
          {{ $t('content.update_data') }}
        </button>
      </div>

      <div class="flex gap-4 flex-col w-full mb-4">
        <!-- <div class="flex items-center gap-2">
          <span
            ><input
              @change="handleChangeIsGuests"
              class="cursor-pointer accent-primary"
              type="checkbox"
          /></span>
          <span>{{ $t('content.bookingForSomeOne') }}</span>
        </div> -->

      </div>

      <div class="flex flex-col gap-4 w-full mb-8">
          <div class="text-xl font-bold text-primary_dark">
            {{ $t('content.guests_info') }}
          </div>
          <!-- <div class="grid md:grid-cols-2 gap-4 grid-cols-1">
            <div
              class="flex flex-col gap-2 col-span-1"
              v-for="(item, index) in unit.bedrooms"
              :key="index"
            >
              <labe class="md:text-md text-sm"
                >{{ $t('content.guest_full_name') }} {{ index + 1 }}</labe
              >
              <input
                type="text"
                class="rounded-lg w-full text-start p-2 border border-bg-gray-200 text-dark focus:border-primary focus:outline-none"
              />
            </div>
          </div> -->

          <guests-data
            v-for="(opt, index) in storeBooking.bookings.adults"
            :key="index"
            v-model:guestsData="storeBooking.bookings.guestData"
            :availableOptions="availableOptions"
          />
        </div>

    </div>
    <!-- ############################## -->
    <div class="flex flex-row w-full" v-else>
      <div class="flex gap-4 flex-col w-full mb-4">
        <!-- <div class="flex items-center gap-2">
          <span
            ><input
              @change="handleChangeIsGuests"
              class="cursor-pointer accent-primary"
              type="checkbox"
          /></span>
          <span>{{ $t('content.bookingForSomeOne') }}</span>
        </div> -->
        <div class="flex flex-col gap-4 w-full">
          <div class="text-xl font-bold text-primary_dark">
            {{ $t('content.guests_info') }}
          </div>
          <!-- <div class="grid md:grid-cols-2 gap-4 grid-cols-1">
            <div
              class="flex flex-col gap-2 col-span-1"
              v-for="(item, index) in unit.bedrooms"
              :key="index"
            >
              <labe class="md:text-md text-sm"
                >{{ $t('content.guest_full_name') }} {{ index + 1 }}</labe
              >
              <input
                type="text"
                class="rounded-lg w-full text-start p-2 border border-bg-gray-200 text-dark focus:border-primary focus:outline-none"
              />
            </div>
          </div> -->

          <guests-data
            v-for="(opt, index) in storeBooking.bookings.adults"
            :key="index"
            v-model:guestsData="storeBooking.bookings.guestData"
            :availableOptions="availableOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
  import { VueTelInput } from 'vue-tel-input'
  import 'vue-tel-input/vue-tel-input.css'
  import GuestsData from '../../../components/units/details/GuestsData.vue'
  const { t, locale } = useI18n()
  import { POSITION, useToast } from 'vue-toastification'

  const validNumber = ref(null)
  const step = ref('check')
  const isloading = ref(false)
  const user = useCookie('user')
  const token = useCookie('token')
  const localePath = useLocalePath()
  const intervalId = ref('')
  const timer = ref(0)
  const toast = useToast()

  import { useBookings } from '~/stores/booking'

  const storeBooking = useBookings()

  // const isGuests = ref(false)

  // Define your props
  const props = defineProps({
    unit: {
      type: Object,
      required: true
    },
    availableOptions: {
      type: Object,
      required: true
    }
  })

  // const handleChangeIsGuests = (e) => {
  //   isGuests.value = e.target.checked
  // }

  const isLogin = computed(() => {
    return token.value ? true : false
  })
  const validateNumber = (number) => {
    validNumber.value = number.valid
  }

  const requestOTP = async () => {
    try {
      if (isloading.value) return
      startTimer()
      isloading.value = true
      let identifier = phone_number.value
      const { data, error } = await useApiFetch('/auth2/request_otp', {
        body: {
          email: identifier,
          newAccount: false
        }
      })

      if (error.value) {
        toast.error(error.value, {
          timeout: 4000,
          position: POSITION.BOTTOM_CENTER
        })
        isloading.value = false
      }
      if (data.value?.data?.user_id) {
        step.value = 'otp'
        isloading.value = false
      } else {
        step.value = 'register'
        isloading.value = false
      }
    } catch (error) {
      console.log(error)
      isloading.value = false
    }
  }

  const authUser = async () => {
    try {
      await useApiFetch('/auth/user', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token.value }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const verifyOTP = async () => {
    try {
      isloading.value = true

      const dataBody = {
        email: phone_number.value,
        otp: otp.value
      }
      const { error, data } = await useApiFetch('/auth2/verify_otp', {
        body: dataBody
      })
      if (data.value) {
        user.value = data.value?.data.user
        token.value = data.value?.data?.token

        if (token.value) {
          localStorage.setItem('authToken', token.value)
        }

        if (data.value?.data?.user) {
          await nextTick()
          useEvent('authLogin', user.value)
        }
        await authUser()
      }
      if (error.value) {
        toast.error(error.value, {
          timeout: 4000,
          position: POSITION.BOTTOM_CENTER
        })
      }
      if (step.value === 'register') {
        const { error, data } = await useApiFetch('/auth/changeUserInfo', {
          headers: { Authorization: 'Bearer ' + token.value },
          body: {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value
          }
        })
        if (data.value) {
          if (data.value?.data == 'done') {
            toast.success(t('content.saved'), {
              timeout: 4000,
              position: POSITION.BOTTOM_CENTER
            })
          }
          user.value = data.value?.data.user
          token.value = data.value?.data?.token

          if (token.value) {
            localStorage.setItem('authToken', token.value)
          }

          if (data.value?.data?.user) {
            await nextTick()
            useEvent('authLogin', user.value)
          }
        }
        if (error.value) {
          toast.error(error.value, {
            timeout: 4000,
            position: POSITION.BOTTOM_CENTER
          })
        }
      }

      // if (error.value) {
      //   errors.value = [[t('content.otp_error')]]
      // }

      isloading.value = false
    } catch (error) {
      console.log(error)
      isloading.value = false
    }
  }

  const startTimer = () => {
    timer.value = 60 // Set the initial timer value in seconds
    intervalId.value = setInterval(() => {
      if (timer.value > 0) {
        timer.value-- // Decrement the timer value by 1 second
      } else {
        clearInterval(intervalId.value) // Clear the interval when the timer reaches 0
        intervalId.value = null
      }
    }, 1000) // Run the timer every 1 second (1000 milliseconds)
  }

  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const phone_number = ref('')
  const otp = ref('')
</script>

<style scoped>
  .vue-tel-input {
    border-radius: 0.5rem !important;
    border: 1px solid rgb(229 231 235) !important;
    width: 100%;
  }
  .vti__input {
    border-radius: 0.5rem !important;
  }
  .vue-tel-input:focus-within {
    box-shadow: none !important;
    border-color: #765cf1 !important;
  }
</style>
