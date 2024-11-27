<template>
  <div class="mb-4">
    <label class="block text-lg font-semibold mb-2">{{ $t('fillter.BookingAdvantages') }}</label>
    <div v-for="(benefit, index) in bookingBenefits" :key="index" class="mb-1 flex justify-between items-center">
      <CustomCheckbox :label="benefit.label" :value="benefit.key" v-model="localBookingBenefits" />
      <span class="text-gray-500 ">({{ benefit.count }})</span>
    </div>
  </div>
</template>

<script>
import CustomCheckbox from './CustomCheckbox.vue';

export default {
  components: { CustomCheckbox },
  props: {
    bookingBenefits: Array
  },
  data() {
    return {
      localBookingBenefits: []
    }
  },
  watch: {
    localBookingBenefits(newVal) {
      console.log('sadsa')
      this.$emit('updateBookingBenefits', newVal);
    }
  }
}
</script>

<style scoped>
</style>
