// stores/hotels/search.js
import { defineStore } from "pinia";
// import { storeToRefs } from "pinia";
import { useApi, Method } from "@/composables/api";
import { Filter } from "@/types/hotel";
import { useSearchStore } from "./search";
// const { searchQueryId ,hotels} = storeToRefs(useSearchStore());
export interface Center {
  lat: number;
  lng: number;
}

export const useFilter = defineStore("useFilterStore", {
  state: () => ({
    filter_processing: false,
    active_facilities: [],
    active_unit_types: [],
    active_category: [],
    active_price: [],
    active_stars: [],
    active_borads: [],
    active_nonRefundable: 1,
    checked_filter: [],
    resetStars: false,
    resetPrice: false,
    active_sort: "",
    hotelName: "",
    filterPayload: {} as Filter,
    page: 1,
    perPage: 15,
    current_pge: 1,
    query: "9d91987a-e56e-4cc6-adcd-0a8e1cc11b5d",
  }),
  actions: {
    setSearchQueryId(id) {
      this.searchQueryId = id;
    },

    async handleFilterApi(isPagination = false, map = false) {
      let is_pagination = isPagination;
      let map_filter = map;
      this.filter_processing = true;
      const params = this.setFilterParams(isPagination);

      let geofanse = JSON.parse(localStorage.getItem("geofense"));
      let searchQuery = JSON.parse(localStorage.getItem("searchQueryId"));
      const useSearchStoreStore = useSearchStore();
      useSearchStoreStore.setNoUnits(false);
      if (map || useSearchStoreStore.MAP) {
        map_filter = true;
        useSearchStoreStore.resetMap();
      }
      if (map_filter) {
        params["destination"] = {
          geofense: {
            latitude: geofanse[0],
            longitude: geofanse[1],
            radias: 10,
          },
        };
      }
      await useApi(`/api/v1/search/results/${searchQuery}`, Method.POST, params)
        .then(async (res) => {
          if (res.statusCode === 450) {
            useSearchStoreStore.setSearchQueryId(
              res.search_id?.data?.search_id
            );
            this.query = res.search_id?.data?.search_id;
            await this.refreshHandleFilterApi(is_pagination, map_filter);
            return;
          }
          console.log(res?.data.data);
          if (res?.data?.data?.length > 0) {
            
            useSearchStoreStore.setMeta(res?.data?.meta);
            useSearchStoreStore.addFiltersHotels(res?.data?.data, map);
          }else{
            useSearchStoreStore.resetHotels();
          }
          return Promise.resolve(res)
        })
        .finally(() => {
          this.filter_processing = false;
        });
    },
    async refreshHandleFilterApi(is_pagination, map_filter) {
      await this.handleFilterApi(is_pagination, map_filter);
    },
    setFilterParams(isPagination = false) {
      const all_filters = {
        hotelFacilityIds: this.active_facilities,
        hotelTypeIds: this.active_unit_types,
        active_category: this.active_category,
        stars: this.active_stars,
        sort: this.active_sort,
        hotelName: this.hotelName,
        boardBasis: this.active_borads,
        excludeNonRefundable: this.active_nonRefundable,
      };
      if (this.hotelName.length == 0) {
        all_filters["priceRange"] = this.active_price;
      }
      console.log(isPagination, this.page, isPagination ? this.page : 1, "ts");
      if (!isPagination) {
        this.page = 1;
        this.current_pge = 1;
      }
      const paylod = {
        page: isPagination ? this.page : 1,
        perPage: this.perPage,
      };
      for (let prop in all_filters) {
        if (all_filters[prop].length > 0) {
          if (prop === "priceRange") {
            if (!this.map) {
              paylod[prop] = {
                min: all_filters[prop][0],
                max: all_filters[prop][1],
                currency: "SAR",
              };
            }
          } else if (
            prop === "hotelTypeIds" ||
            prop === "hotelCategoryIds" ||
            prop === "hotelFacilityIds"
          ) {
            paylod[prop] = all_filters[prop]?.join(",");
          } else if (prop === "excludeNonRefundable") {
            if (all_filters[prop] == "unknown") {
              delete paylod[prop];
            } else {
              paylod[prop] = all_filters[prop] === "nonrefundable" ? 1 : 0;
            }
          } else {
            paylod[prop] = all_filters[prop];
          }
        }
      }

      return paylod;
    },
    async resetFilters(new_search_city = false) {
      this.active_facilities = [];
      this.active_unit_types = [];
      this.active_category = [];
      this.active_price = [];
      this.active_stars = [];
      this.active_nonRefundable = 0;
      // this.checked_filter = []
      this.excludeNonRefundable = 1;
      this.active_borads = [];
      this.active_sort = "";
      this.hotelName = "";
      this.resetPrice = true;
      if (!new_search_city){
        await this.handleFilterApi();
      }
    },
  },
  // persist: true, // Enables persistence (requires a plugin)
});
