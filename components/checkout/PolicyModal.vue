<template>
  <Dialog>
    <DialogTrigger as-child>
      <!-- <button
        @click.stop="openModal()"
        class="w-[150px] h-[45px] bg-primary flex items-center rounded-[10px] justify-center gap-2"
      > -->
      <span
        class="w-4 h-4 cursor-pointer rounded-full border border-textLightGray flex items-center justify-center"
      >
        <small class="text-textLightGray text-xs">?</small>
      </span>
    </DialogTrigger>

    <DialogContent>
      <div class="p-4">
        <h3 class="text-lg font-bold text-textColor mb-4">
          {{ $t('content.rentalCancellation') }}
        </h3>
        <div v-if="checkOutStore.preBookDetails.cancellationPolicy">
          <p class="text-gray-600 mb-2">
            <span class="font-semibold text-textColor">{{ $t('content.date') }} :</span>
            {{ formatReadableDate(checkOutStore.preBookDetails.cancellationPolicy.date) }}
          </p>
          <div
            v-for="(policy, index) in checkOutStore.preBookDetails.cancellationPolicy.policies"
            :key="index"
            class="p-4 mb-4 flex flex-col gap-2"
          >
            <p class="text-textColor">
              <span class="font-semibold">{{ $t('content.type') }} :</span> {{ policy.type }}
            </p>
            <p class="text-textColor">
              <span class="font-semibold">{{ $t('content.date') }} :</span>
              {{ formatReadableDate(policy.date) }}
            </p>
            <p class="text-textColor">
              <span class="font-semibold">{{ $t('content.offer_value') }} :</span>
              {{ policy.charge.value }} {{ policy.charge.currency }}
            </p>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { formatReadableDate } from "@/lib/utils";
import { useCheckout } from "@/stores/checkout";

const checkOutStore = useCheckout();
</script>
