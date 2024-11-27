<template>

  <TransitionRoot appear  :show="show" as="template">
    <Dialog as="div" @close="closeModal"  class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              dir="rtl"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                مدينه او الوحده
              </DialogTitle>
              <div class="mt-2">
                <input
              v-if="store.activeMenu === 'selectedLocation' "
              id="selectedLocation"
              class="block md:hidden outline-none w-[90%] px-1 sm:my-0 my-1 sm:pb-0 py-1.5 ps-2 rounded-md bg-transparent"
              ref="selectedLocation"
              v-model="searchInLocations"
              @change="(e) => (searchInLocations = e.target.value.trim())"
              style="box-shadow: 0 2px 4px rgb(135 95 255 / 25%);"
            />
                   <SharedSelectLocation
              v-model:district="district"
              v-model:city="city"
              v-model:country="country"
              v-model:unit="unit"
            />
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
const props = defineProps({
    show:{
        type:Boolean,
        default:false
    }
})
const emits = defineEmits(['close'])
const isOpen = ref(true)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

const country = ref(null)
  const city = ref(null)
  const unit = ref(null)
</script>
