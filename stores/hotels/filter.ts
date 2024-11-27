import { defineStore } from 'pinia'
import { useApiFetch } from '~/composables/useApiFetch'
import { useApiAxios } from '~/composables/axios'
import { useRoute } from 'vue-router'
import { useNotification } from '@kyvg/vue3-notification'

const { notify } = useNotification()
// const config = useRuntimeConfig()

const route = useRoute()
function formatDateToDashedString(date: any) {
  // Extract year, month, and day components
  if (date) {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    // Months are zero-based, so add 1 to get the correct month
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()

    // Add leading zeros if necessary
    const formattedMonth = month < 10 ? '0' + month : month
    const formattedDay = day < 10 ? '0' + day : day

    // Concatenate components with dashes
    const dashedString = `${year}-${formattedMonth}-${formattedDay}`

    return dashedString
  }
}

interface UnitFilter {
  categorySelectedName: string
  city_id?: string
  unit?: object
  districtId?: any
  locationAddress?: any
  districts: District[]
  district: object
  country_id?: string
  country?: Country
  city?: City
  hotel?: String
  coupon?: String
  offer?: String
  start_date?: Date
  guestsAndRoomsInput: string
  location: string
  dateStartStr: string
  dateEndStr: string
  districtSelectedName: string
  inputDistrictName: string
  end_date?: Date
  pricePer: number
  filterCount: number
  selectDays: number
  price_range?: any
  type_price?: number
  capacity: number
  rooms: RoomFilter[]
  room_count: number
  adult_count: number
  child_count: number
  children_age: []
  priceRange: string
  bedrooms: number
  category: number
  features: Feature[]
  starHotel: StarHotel[]
  benefits: Benefits[]
  sortBy: string
  packages?: any
  onlyOffer?: boolean
  unitTypes: UnitType[]
  orderBySeed?: string
  packageId: string
}

interface Image {
  id: number
  is_main: boolean
  image_url: string
}

interface Feature {
  id: number
  name: string
  icon: string
}

interface StarHotel {
  id: number
  name: string
  icon: string
}

interface Benefits {
  id: number
  name: string
  icon: string
}

interface Price {
  code: string
  name: string
  price: number
  insurance: number | null
  original_price: number | null
}
interface Unit {
  id: string
  parent_unit_id: string
  unit_title: string
  unit_code: string
  unit_desc: string
  unit_lat: number
  unit_lng: number
  lat: number
  lng: number
  unit_map_url: string
  unit_address: string
  unit_floor_number: number | null
  unit_furnished: number
  unit_kitchen: number
  unit_parking: number
  unit_bedrooms: number
  unit_bathrooms: number
  unit_square_area: number
  unit_capacity: number
  hotel_name: string
  category_id: number
  category_name: string
  unit_type_id: number
  unit_types_name: string
  unit_types_icon: string
  country_code: string
  country_id: number
  country_currency: string
  country_name: string
  city_id: number
  city_name: string
  district_id: string
  district_name: string
  savedUnit: boolean
  images: Image[]
  features: Feature[]
  starHotel: StarHotel[]
  benefits: Benefits[]
  sortBy: string
  offers: any[] // Replace 'any' with the appropriate type if available
  prices: Price[]
}

export interface MapUnit {
  id: number
  unit_lat: number
  unit_lng: number
  min_price: number
  parents_units_count: number
  units: Unit[]
}

export interface SuggestionLocation {
  id: number
  name: string
  type: string
}

interface UnitType {
  id: number
  name: string
  icon: string
}

interface Feature {
  id: number
  name: string
  icon: string
}

interface Category {
  id: number
  name: string
  description: string
}

interface Center {
  lat: number
  lng: number
}

interface District {
  id: string
  name: string
  city_id: number
}

interface RoomFilter {
  id?: number | null
  adult?: number | null
  child?: number | null
}

export interface HostingType {
  id: string
  name: string
  image: string
}

export interface FilterAssets {
  min_price: number
  max_price: number
  unit_types: UnitType[]
  hosting_types: HostingType[]
  Terms: any[] // Replace 'any' with the appropriate type if available
  Features: Feature[]
  starHotel: StarHotel[]
  benefits: Benefits[]
  categories: Category[]
  sortBy: string
}

export const useFilterUnits = defineStore('filters', {
  state: () => ({
    filter: {
      districts: [],
      unitTypes: [],
      features: [],
      starHotel: [],
      benefits: [],
      priceRange: [],
      filterAssetsData: [],
      include_assets_filter: true,
      includeTaxes: false,
      coupon: '',
      offer: '',
      city_id: '',
      country_id: '',
      sortBy: '',
      checked_filter: [],
      filterCount: 1,
      bedrooms: 1,
      capacity: 1,
      adult_count: 1,
      child_count: 0,
      children_age: [],
      category: 0,
      selectDays: 30,
      dateStartStr: '',
      districtSelectedName: '',
      locationAddress: null,
      location: '',
      inputDistrictName: '',
      dateEndStr: '',
      hotel: '',
      guestsAndRoomsInput: '',
      categorySelectedName: 'all',
      pricePer: 0,
      packages: null,
      onlyOffer: false,
      room_count: 1,
      packageId: '',
      rooms: [{ adult: 1, child: 0 } as RoomFilter]
    } as any as UnitFilter,
    selectLocation: {
      country: '',
      city: '',
      district: '',
      hotel: ''
    } as Record<string, string>,
    meta: {},
    lins: {},
    activeMenu: '',
    expandedSection: '',
    filterCount: 0,
    filterAssets: {} as FilterAssets,
    units: [] as Unit[],
    price_hotelbeds: [],
    suggestionLocations: [] as SuggestionLocation[],
    unitsVisited: [] as string[],
    // markerUnitOpen: {} as MapUnit,
    // map_units: [] as MapUnit[],
    markerUnitOpen: {} as any,
    map_units: [] as any[],

    center: { lat: 24.71258066695867, lng: 46.674884506485 } as Center,
    cityDistricts: [] as District[],
    cityDistrictsFilter: [] as District[],
    selectedDiscretes: [],
    selectedCities: [],
    selectedCountries: [],
    selectedHotels: [],
    Map_COUNT_DATA: 0,
    scrollPaginate: 0,
    scrollLoading: true,
    MAP: false,
    isLoadingFilter: false,
    isLoadingFirst: false,
    pendingPaginate: true,
    pending: false,
    map_pending: false,
    infoWindowOpened: false,
    isMobile: false,
    isOpenMap: false,
    load_more_processing: false,
    isOpenFilterModel: false,
    selectedMarkerId: 0,
    localeValue: 'ar',
    formattedQuerySearch: '',
    errors: {},
    fromSearchSection: true,
    hotel_price_loader: false,
    price_processing: '',
    current_units: [] as Unit[],
    previousQuery: '',
    hotel_filter_loading: false,
    wallet_hotel_id: 1,
    wallet_hotels_search: [],
    selected_hotel_search: {},
    check_dates_availabe: true,
    unitIcones: []
  }),

  actions: {
    async filtering(closeIs = true) {
      // this.pending = true
      // this.scrollPaginate = 0
      // this.scrollLoading = true
      // this.pendingPaginate = false
      // this.units = []
      // await this.getUnitsByFilterDate()

      if (!this.isOpenFilterModel) {
        if (this.isOpenMap) {
          await this.getFilterMap()
        } else {
          this.pending = true
          this.scrollPaginate = 0
          this.scrollLoading = true
          this.pendingPaginate = false
          this.units = []
          this.price_hotelbeds = []
          await this.getUnitsByFilterDate()
        }
      }

      // await this.getUnitsByFilterDate()
      // pending.value = false
    },
    filtersCounter() {
      let count =
        this.filter.features.length +
        this.filter.unitTypes.length +
        this.filter.districts.length

      if (this.filter.pricePer != 0) {
        count += 1
      }
      if (this.filter.capacity != 0) {
        count += 1
      }
      if (this.filter.bedrooms != 0) {
        count += 1
      }
      this.filter.filterCount = count
    },

    async handleSearch(t: Function) {
      this.setRoomText(t)
      // searchToggle('destination')
      // await this.getUnitsByFilterDate()

      if (!this.isOpenFilterModel) {
        if (this.isOpenMap) {
          await this.getFilterMap()
        } else {
          this.pending = true
          this.scrollPaginate = 0
          this.scrollLoading = true
          this.pendingPaginate = false
          this.units = []
          this.price_hotelbeds = []

          this.setRoomText(t)

          await this.getUnitsByFilterDate()

          this.pending = false
          this.scrollLoading = false
          this.activeMenu = ''
        }
      }
    },

    setRoomText(t: Function) {
      if (this.filter.room_count > 0) {
        this.filter.guestsAndRoomsInput =
          this.filter.room_count + ' ' + t('content.rooms') + ' '
      } else {
        this.filter.room_count = 1
        this.filter.guestsAndRoomsInput = '1 ' + t('content.rooms')
      }

      if (this.filter.adult_count > 0) {
        this.filter.guestsAndRoomsInput =
          this.filter.guestsAndRoomsInput +
          ' , ' +
          this.filter.adult_count +
          ' ' +
          t('content.adults')
      } else {
        this.filter.adult_count = 1
        this.filter.guestsAndRoomsInput =
          this.filter.guestsAndRoomsInput + '  1 ' + t('content.adults')
      }

      if (this.filter.child_count > 0) {
        this.filter.guestsAndRoomsInput =
          this.filter.guestsAndRoomsInput +
          ' , ' +
          this.filter.child_count +
          ' ' +
          t('content.children')
      } else {
        this.filter.child_count = 0
        this.filter.guestsAndRoomsInput =
          this.filter.guestsAndRoomsInput + '  0 ' + t('content.children')
      }
    },
    async getUnitsByFilterDate(
      scrolling: boolean = false,
      process: boolean = true,
      search: boolean = false,
      processType: string = ''
    ) {
      this.scrollLoading = scrolling
      this.pending = true
      this.pendingPaginate = true
      if (
        (this.scrollLoading && !(this.units.length == 0 && this.scrollPaginate > 0)) ||
        this.scrollLoading == false
      ) {
        if (!search) {
          this.scrollPaginate++
        } else {
          this.scrollPaginate = 1
        }

        this.filter.districts = this.filter.districtId?.id
          ? [this.filter.districtId?.id.toString()]
          : this.filter.districtId?.length > 0
          ? this.filter.districtId.map((dist: any) => dist.id)
          : []

        if (window.location.pathname.indexOf('hotels') !== -1) {
          if (!this.load_more_processing && process) {
            this.getHotelFilters()
          }
          // this.getFilterAssets()
          this.load_more_processing = true
          return await this.getHotels(this.scrollPaginate, {
            ...this.filter,
            page: this.scrollPaginate,
            type_price: this.filter.pricePer,
            process,
            processType
            // package: (token.value) ? Number(filterPackageId.value) : "",
          })
            .then(async (res) => {
              if (this.MAP) {
                await this.getFilterMap()
              }
              return Promise.resolve(res)
            })
            .catch((e) => {
              this.isLoadingFirst = false

              this.scrollLoading = false
              return Promise.resolve(e)
            })
            .finally(async () => {
              this.pending = false
              this.pendingPaginate = false
              this.isLoadingFirst = false
              this.scrollLoading = false
              this.load_more_processing = false

              // await this.getpriceHotels(this.price_processing).finally(() => {
              //   this.hotel_price_loader = false
              // })
            })
        } else {
        }
      }
    },

    getUnitsFilterByMap() {
      if (!this.map_pending) {
        this.map_pending = true
        this.getFilterMap({})
      }
    },
    resetDataFilter(typeClear: string) {
      this.activeMenu = ''
      if (typeClear == 'check_in_out') {
        this.filter.dateStartStr = ''
        this.filter.dateEndStr = ''
        this.filter.start_date = undefined
        this.filter.end_date = undefined
      } else if (typeClear == 'guestsAndRooms') {
        this.filter.guestsAndRoomsInput = ''
        this.filter.bedrooms = 1
        this.filter.capacity = 1
        this.filter.adult_count = 1
        this.filter.child_count = 0
        this.fillter.children_age = []
        this.filter.room_count = 1
        this.filter.rooms = [{ child: 0, adult: 1 }]
      } else if (typeClear == 'category') {
        this.filter.categorySelectedName = 'All'
        this.filter.category = 0
      } else if (typeClear == 'price') {
        this.filter.pricePer = 0
        this.filter.type_price = 0
      } else if (typeClear == 'unit_type') {
        this.filter.unitTypes = []
        this.filter.unitTypes = []
      } else if (typeClear == 'features') {
        this.filter.features = []
      } else if (typeClear == 'districts') {
        // districtId.value = 0
        this.filter.districtSelectedName = ' '
        this.filter.districts = []
      } else {
        // districtId.value = 0
        this.filter.districtSelectedName = ' '
        // this.filter.dateStartStr = ''
        // this.filter.dateEndStr = ''
        // this.filter.start_date = undefined
        // this.filter.end_date = undefined
        // this.filter.guestsAndRoomsInput = ''
        this.filter.bedrooms = 1
        this.filter.capacity = 1
        // this.filter.adult_count = 1
        // this.filter.children_age = []
        // this.filter.child_count = 0
        // this.filter.room_count = 1
        // this.filter.rooms = [{ child: 0, adult: 1 }]

        this.filter.unitTypes = []
        this.filter.features = []
        this.filter.districts = []
        this.filter.priceRange = []
        this.filter.filterAssetsData = []
        this.filter.sortBy = ''
        this.pendingPaginate = false
        this.filter.category = 0
        this.filter.featureCategories = ''
        this.filter.type_price = 0
        this.filter.type_price = 0
        this.filter.type_price = 0
      }

      this.filtering()
    },
    clearAllFilters(from = 'page') {
      // this.filter.dateStartStr = ''
      // this.filter.dateEndStr = ''
      // this.filter.guestsAndRoomsInput = ''
      this.filter.bedrooms = 1
      this.filter.capacity = 1
      this.check_dates_availabe = true
      // this.filter.adult_count = 1
      // this.filter.children_age = []
      // this.filter.child_count = 0
      // this.filter.room_count = 1
      // this.filter.rooms = [{ child: 0, adult: 1 }]
      this.filter.priceRange = []
      // districtId.value = ''
      this.filter.districtSelectedName = ''
      this.scrollPaginate = 0
      this.scrollLoading = true
      this.pendingPaginate = false
      this.filter.filterCount = 0
      this.units = []
      this.price_hotelbeds = []
      this.filter.features = []
      this.filter.starHotel = []
      this.filter.benefits = []
      this.filter.sortBy = ''
      this.filter.districts = []
      this.filter.unitTypes = []
      this.filter.category = 0
      this.filter.type_price = 0
      this.filter.districts = []
      this.selected_hotel_search = {}
      //THEN FILTER
      // await getUnitsByCityId()
      if (false) {
        this.filtersCounter()
        if (from == 'map') {
          this.getFilterMap()
        } else {
          this.getUnitsByFilterDate()
        }
      }
    },

    async createFormatQueryUrl() {
      let countries: any[] = []
      const store = useStaticData()
      if (!store.countries.length) {
        store.getCountries().then(() => {
          countries = store.countries
        })
      } else {
        countries = store.countries
      }

      let formattedQuery = ``
      let address = ``
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const checkIn = urlParams.get('checkIn')
      const checkOut = urlParams.get('checkOut')
      const location = urlParams.get('location')
      if (this.filter.dateStartStr && this.filter.dateEndStr) {
        console.log('hello')
        formattedQuery += `&filter[fromDate]=${formatDateToDashedString(
          this.filter.dateStartStr
        )}`
        formattedQuery += `&filter[toDate]=${formatDateToDashedString(
          this.filter.dateEndStr
        )}`
      } else if (checkOut) {
        console.log('hello2')

        formattedQuery += `&filter[fromDate]=${formatDateToDashedString(checkIn)}`
        formattedQuery += `&filter[toDate]=${formatDateToDashedString(checkOut)}`
      } else {
        console.log('hello3')

        const today = new Date()
        const endDate = new Date(today)
        const startDate = new Date(today)
        if (window.location.pathname.indexOf('/wallet/hotels') == -1) {
          formattedQuery += `&filter[fromDate]=${formatDateToDashedString(
            new Date(startDate.setDate(startDate.getDate() + 2))
          )}`
          formattedQuery += `&filter[toDate]=${formatDateToDashedString(
            new Date(endDate.setDate(endDate.getDate() + 4))
          )}`
        } else {
          formattedQuery += `&filter[fromDate]=&filter[toDate]=`
        }
        console.log('3')
      }
      const hotel = JSON.parse(localStorage.getItem('hotel_id'))
      const city = JSON.parse(localStorage.getItem('city_id'))
      const district = JSON.parse(localStorage.getItem('district_id'))
      if (window.location.pathname.indexOf('/wallet/hotels') !== -1) {
        if (this.filter.wallet_hotel_id) {
          formattedQuery += `&filter[packageId]=${this.filter.wallet_hotel_id}`
        }
        console.log(Object.keys(this.selected_hotel_search).length, 'length of object')

        if (
          this.selected_hotel_search?.type === 'all' ||
          Object.keys(this.selected_hotel_search).length === 0
        ) {
          address = `&filter[countryId]=`
          address = `&filter[cityId]=`
        } else {
          if (this.selected_hotel_search?.type === 'country') {
            address = `&filter[countryId]=${this.selected_hotel_search.country_code}`
          } else if (this.selected_hotel_search?.type === 'city') {
            address = `&filter[cityId]=${this.selected_hotel_search.id}`
          }
        }
      } else {
        console.log(this.filter.country_id, 'country_id')

        if (hotel) {
          formattedQuery += `&filter[hotelId]=${hotel}`
        } else if (district) {
          address = `&filter[districts]=${district}`
        } else if (this.filter.country_id && !city) {
          console.log(this.filter.country_id, 'country_id')

          // const country_code = countries.find(
          //   (item) => item.country_id === this.filter.country_id
          // ).country_code
          address = `&filter[countryId]=${this.selectLocation.country?.country_code}`
        }
        if (city) {
          formattedQuery += `&filter[cityId]=${city}`
        }
      }

      if (this.filter.adult_count) {
        formattedQuery += `&filter[adults]=${this.filter.adult_count}`
      }
      if (this.filter.children_age) {
        if (this.filter.room_count.length > 0) {
          for (let index = 0; index < this.filter.room_count; index++) {
            formattedQuery += `&filter[rooms][${index}][children_age]=${
              this.filter.children_age[index] == 0
                ? 0
                : this.filter.children_age[index] === undefined
                ? 0
                : this.filter.children_age[index]
            }`
          }
        } else {
          formattedQuery += `&filter[children_age]=${this.filter.children_age}`
        }
      }

      if (this.filter.unitTypes) {
        formattedQuery += `&filter[hostingTypeId]=${this.filter.unitTypes}`
      }
      if (this.filter.coupon) {
        formattedQuery += `&filter[couponCode]=${this.filter.coupon}`
      }

      if (this.filter.offer) {
        formattedQuery += `&filter[offerId]=${this.filter.offer}`
      }
      if (this.filter.features) {
        formattedQuery += `&filter[features]=${this.filter.features}`
      }
      if (this.filter.sortBy) {
        formattedQuery += `&sort=${this.filter.sortBy}`
      }
      if (this.filter.starHotel) {
        formattedQuery += `&filter[starHotel]=${this.filter.starHotel}`
      }
      if (this.filter.benefits) {
        formattedQuery += `&filter[featureBooking]=${this.filter.benefits}`
      }
      if (this.filter.child_count) {
        formattedQuery += `&filter[childes]=${this.filter.child_count}`
      }

      if (this.filter.priceRange) {
        formattedQuery += `&filter[priceRange]=${this.filter.priceRange}`
      }

      if (this.filter.bedrooms) {
        formattedQuery += `&filter[bedrooms]=${this.filter.bedrooms}`
      }

      if (this.filter.capacity) {
        formattedQuery += `&filter[capacity]=${this.filter.capacity}`
      }
      if (this.filter.packages) {
        // ${this.filter.packages}
        formattedQuery += `&filter[packageId]=91`
      }

      if (this.filter.unit) {
        switch (this.filter.unit?.type) {
          case 'hotel':
            formattedQuery += `&filter[hotelId]=${this.filter.unit?.hotel_id}`
            break
          case 'unit':
            formattedQuery += `&filter[unitId]=${this.filter.unit?.id}`
            break

          default:
            break
        }
      }
      if (this.filter.category) {
        formattedQuery += `&filter[category]=${this.filter.category}`
      }
      if (this.filter.onlyOffer && this.filter.onlyOffer == true) {
        formattedQuery += `&filter[onlyOffer]=${this.filter.onlyOffer}`
      }

      formattedQuery += address

      if (this.filter.room_count) {
        formattedQuery += `&filter[unitCounts]=${this.filter.room_count}`
      }

      // include_assets_filter
      // formattedQuery += `&include_assets_filter=${this.filter.inclgude_assets_filter}`
      // include_assets_filter

      if (this.filter.rooms.length > 0) {
        this.filter.rooms.forEach((item, index) => {
          formattedQuery += `&filter[rooms][${index}][adults]=${item.adult ?? 0}`
          formattedQuery += `&filter[rooms][${index}][childes]=${item.child ?? 0}`
        })
      } else {
        formattedQuery += `&filter[rooms][0][adults]= 1`
        formattedQuery += `&filter[rooms][0][childes]=0`
      }

      formattedQuery += `&page[size]=50`
      if (localStorage.getItem('authToken')) {
        formattedQuery += `&user_token=${localStorage.getItem('authToken')}`
      }
      this.formattedQuerySearch = formattedQuery
      console.timeEnd('concatenation')
    },

    async getFilterMap(payload?: Record<string, unknown>) {
      let page = this.scrollPaginate

      await this.createFormatQueryUrl()
      this.map_pending = true
      const { data, pending, error, refresh } = await useApiFetch(
        `/v2/hotels/stream?${this.formattedQuerySearch}&filter[location][distance]=20000&filter[location][lat]=${this.units[0].lat}&filter[location][lng]=${this.units[0].lng}&sort=distance`,
        {
          method: 'GET',
          // body: payload,
          server: false
        }
      ).finally(() => {
        this.map_pending = false
      })

      if (error.value) {
        return Promise.reject(error.value)
      }

      this.map_units = []
      this.center = {
        lat: Number(this.units[0].lat),
        lng: Number(this.units[0].lng)
      } as Center
      if (data.value !== null) {
        //24.71258066695867, lng: 46.674884506485
        // data.value is an object
        console.log(data.value?.data)
        this.map_units = data.value?.data
      }

      this.unitsVisited = []
      // if (this.map_units.length > 0) {
      //   let first = this.map_units[0]
      //   if (first) {
      //     // this.center = { lat: first.unit_lat, lng: first.unit_lng }
      //     if (!this.isMobile) {
      //       // showInfoWindow(first)
      //       this.markerUnitOpen = first
      //       this.infoWindowOpened = true
      //       if (first.id) {
      //         this.selectedMarkerId = first.id
      //         this.unitsVisited.push(String(first.id))
      //       }
      //     }
      //   }
      // }

      this.map_pending = false

      this.infoWindowOpened = false
      // if (this.isMobile) {
      //   this.infoWindowOpened = false
      // }
      // this.selectedMarkerId = 0
      return Promise.resolve()
    },
    async updateUnitType(id: string) {
      this.filter.unitTypes.push(id)
    },
    async getHotels(page: number, payload?: Record<string, unknown>) {
      await this.createFormatQueryUrl()
      let data

      if (window.location.pathname.indexOf('/wallet/hotels') !== -1) {
        // const params = new URLSearchParams(window.location.search)
        // console.log(route, 'id')

        data = await useApiFetch(
          `/v2/wallet-hotels?page[number]=${page}${this.formattedQuerySearch}`,
          {
            method: 'GET',
            // body: payload,
            server: false
          }
        )

        if (data?.error?.value?.data?.error?.length > 0) {
        }
      } else {
        data = await useApiFetch(
          `/v2/hotels/stream?page[number]=${page}${this.formattedQuerySearch}`,
          {
            method: 'GET',
            // body: payload,
            server: false
          }
        )
      }

      if (data.data?.value?.data?.length > 0) {
        this.units.push(...data.data?.value?.data)
        this.units = this.units.filter(
          (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
        )

        this.meta = data.data?.value?.meta
        this.links = data.data?.value?.links
        // this.price_processing = data.value.process.id
        if (data?.data?.value?.data?.length == 0) {
          this.scrollLoading = false
        } else this.scrollLoading = true
        this.COUNT_DATA = data.data?.value?.data.length

        this.isLoadingFirst = true
        this.filter.coupon = ''
        this.filter.offer = ''
      } else {
        if (payload.processType !== 'loadMore') {
          this.units = data.data?.value?.data
        }
        this.load_more_processing = false
        this.meta = data.data?.value?.meta
        this.links = data.data?.value?.links
        // this.load_more_processing = true
      }
      this.scrollLoading = false
      // if (this.filter.dateStartStr && this.filter.dateEndStr) {
      if (page === 1) {
        this.price_hotelbeds = []
      }

      // Introduce a delay before calling getpriceHotels
      // }
      return Promise.resolve(data)
    },
    async getHotelFilters() {
      this.hotel_filter_loading = true
      await this.createFormatQueryUrl()

      // this.current_units = this.current_units.map((item, index) => {
      //   return { ...item, processing: false }
      // })
      // this.formattedQuerySearch = this.formattedQuerySearch
      const { data, pending, error, refresh } = await useApiFetch(
        `/v2/getFilters?${this.formattedQuerySearch}`,
        {
          method: 'GET',
          // body: payload,
          server: false
        }
      ).finally(() => {
        this.hotel_filter_loading = false
      })
      if (data.value?.data) {
        this.filter.filterAssetsData = data.value.data
        this.unitIcones = data.value.data.hostingTypes
        console.log(data.value.data.hostingTypes, 'units')

        if (window.location.pathname.indexOf('/wallet/hotels') !== -1) {
          if (data.value.data.cities.length > 0 || data.value.data.countries.length > 0) {
            this.wallet_hotels_search = [
              ...data.value.data.cities,
              ...data.value.data.countries
            ]
          }
        }
      }
      // Introduce a delay before calling getpriceHotels
      // }

      return Promise.resolve().finally(() => {})
    },
    async getpriceHotels(process_id: string, payload?: Record<string, unknown>) {
      this.hotel_price_loader = true
      await this.createFormatQueryUrl()
      const { data, pending, error, refresh } = await useApiFetch(
        `/v2/hotels/pricing?process_id=${process_id}`,
        {
          method: 'GET',
          // body: payload,
          server: false
        }
      )
      if (data.value) {
        this.price_hotelbeds.push(...data.value.data)
        this.units = this.units.map((item, index) => {
          if (item.channel === 'h') {
            return this.price_hotelbeds.find((price) => {
              if (price.id === item.id && price.ratePlan) {
                return price
              }
            })
          } else {
            return item
          }
        })
        this.units = this.units
          .filter((item) => item !== undefined)
          .map((item) => {
            return { ...item, processing: false }
          })
        this.current_units = this.current_units.map((item) => {
          return { ...item, processing: false }
        })
      }
    },

    async getUnits(page: number, payload?: Record<string, unknown>) {
      await this.createFormatQueryUrl()

      const { data, pending, error, refresh } = await useApiFetch(
        `/v2/units?page[number]=${page}${this.formattedQuerySearch}`,
        {
          method: 'GET',
          // body: payload,
          server: false
        }
      )

      if (error.value) {
        return Promise.reject(error.value)
      }

      if (data.value) {
        // this.units.push(...data.value)

        if (data.value.length == 0) this.scrollLoading = false
        else this.scrollLoading = true
        this.COUNT_DATA = data.value.length

        this.isLoadingFirst = true
      }
      this.scrollLoading = false
      return Promise.resolve()
    },

    filteredListDistract() {
      this.cityDistrictsFilter = this.cityDistricts.filter((item) =>
        item.name.toLowerCase().includes(this.filter.inputDistrictName.toLowerCase())
      )
    },
    clearSelectDistract() {
      this.filter.inputDistrictName = ''
      this.cityDistrictsFilter = this.cityDistricts
      this.filter.districtSelectedName = ' '
      this.filter.districts = []
    },
    getDistrictCity(payload?: Record<string, unknown>) {
      return useApiAxios('post', `/home/city/district`, payload, {})
        .then((response) => {
          this.cityDistricts = response.data.data
          this.cityDistrictsFilter = response.data.data

          return Promise.resolve()
        })
        .catch((error) => {
          return Promise.reject()
        })
        .finally(() => {})
    },
    getSuggestion(payload?: Record<string, unknown>) {
      return useApiAxios('post', `/home/city/locations`, payload, {})
        .then((response) => {
          this.suggestionLocations = response.data.data
          return Promise.resolve()
        })
        .catch((error) => {
          return Promise.reject()
        })
        .finally(() => {})
    },
    getFilterAssets(payload?: Record<string, unknown>) {
      return useApiAxios('post', `/filter/filterAssets`, payload, {})
        .then((response) => {
          this.filterAssets = response.data.data

          return Promise.resolve()
        })
        .catch((error) => {
          return Promise.reject()
        })
        .finally(() => {})
    },
    getFilterStorage() {
      const storageStartDate = localStorage.getItem('filterUnits.start_date')
      const storageEndDate = localStorage.getItem('filterUnits.end_date')
      if (storageStartDate != null)
        this.filter.start_date = new Date(Date.parse(storageStartDate))
      if (storageEndDate != null)
        this.filter.end_date = new Date(Date.parse(storageEndDate))
      let seletD = localStorage.getItem('filterUnits.selectDays')
      if (seletD != null) {
        this.filter.selectDays = parseInt(seletD)
      }
    },
    setFilterStorage() {
      const startDate = this.filter.start_date
      const endDate = this.filter.end_date
      if (startDate != null)
        localStorage.setItem('filterUnits.start_date', startDate.toString())
      if (endDate != null)
        localStorage.setItem('filterUnits.end_date', endDate.toString())
      localStorage.setItem('filterUnits.selectDays', this.filter.selectDays.toString())
    },

    setOrderBySeed() {
      const orderBySeed = useCookie('orderBySeed')
      if (orderBySeed.value != undefined) {
        if (Date.now() - Number(orderBySeed.value) >= 6 * 60 * 60 * 1000) {
          //reset each 6 hours
          orderBySeed.value = Number(Date.now()).toString()
        }
      } else {
        orderBySeed.value = Number(Date.now()).toString()
      }

      // localStorage.setItem('filterUnits.selectDays',this.filter.selectDays.toString())
    }
  }
})
