import { generalStore } from '@/stores/general'

export const useDateSearchCity = () => {
  const localePath = useLocalePath();
  const router = useRouter();

  let store = generalStore();
  let searchInput = ref("");
  const getCity = (item) => {
    store.cityObj.name = item?.name;
    store.cityObj.id = item?.api_id || item?.id;
    store.searchObj.destination.city.id = item?.api_id || item?.id
  }
  const getHotel = (item) => {
    store.cityObj.name = item?.name;
    store.hotelId = item?.key;
  }
  let citiesArr = ref([
    {
      type: "city",
      name: "اسطنبول",
      api_id: 1
    },
    {
      type: "city",
      name: "القاهرة",
      api_id: 2
    },
    {
      type: "country",
      name: "مصر",
      api_id: 3
    },
    {
      type: "country",
      name: "السعودية",
      api_id: 4
    },
  ]);

  let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

  function debouncedSearch() {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      store.getDestinations();
    }, 500);  // Delay of 500ms after the user stops typing
  }

  const filterdCities = computed(() => {
    return citiesArr.value.filter((ele: any) => {
      return ele.name.toUpperCase().includes(searchInput.value.toUpperCase());
    })
  })
  return {
    searchInput,
    filterdCities,
    getCity,
    debouncedSearch,
    getHotel
  }
}