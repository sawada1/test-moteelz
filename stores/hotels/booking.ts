export const useBookings = defineStore('booking', {
  state: () => ({
    bookings: {
      adults: 1,
      children: 0,
      unit_id: null,
      packagesSelected: null,
      reateSelected: null,
      reateSelected2: null,
      dateStart: '',
      dateEnd: '',
      guestData: [],
      roomsCount: 0,
      rooms: [],
      packageId: ''
    } as Booking
  }),

  actions: {
    resetBooking() {
      this.bookings.adults = 1
      this.bookings.children = 0
      this.bookings.roomsCount = 0
      this.bookings.rooms = []
      this.bookings.unit_id = null
      this.bookings.packagesSelected = null
      this.bookings.reateSelected = null
      this.bookings.reateSelected2 = null
      this.bookings.dateStart = ''
      this.bookings.dateEnd = ''
      this.bookings.guestData = []
    }
  },
  persist: true
})
