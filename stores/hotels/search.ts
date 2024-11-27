// stores/hotels/search.js
import { defineStore } from "pinia";
import { Meta } from "@/types/hotel";
export interface Center {
  lat: number;
  lng: number;
}
export const useSearchStore = defineStore("search", {
  state: () => ({
    searchQueryId: null,
    events_completed: false,
    progress: 0,
    countHotels: 0,
    hotels: [],
    filter: {},
    totalPages: 0,
    sort: [],
    //map variables
    map_hotels: [],
    map_center: { lat: 24.71258066695867, lng: 46.674884506485 } as Center,
    unitsVisited: [] as string[],
    markerUnitOpen: {},
    infoWindowOpened: false,
    MAP: false,
    isOpenMap: false,
    no_units: false,
    //meta
    meta: {} as Meta,
  }),
  actions: {
    setSearchQueryId(id) {
      this.searchQueryId = id;
      if (process.client) {
        localStorage.setItem("searchQueryId", id ? JSON.stringify(id) : "");
      }
    },
    setProgress(progress) {
      this.progress = progress;
    },
    setCountHotels(count) {
      this.countHotels = count;
    },
    setMeta(meta: Meta) {
      this.meta = meta;
    },
    addHotels(newHotels) {
      console.log(newHotels);
      if (newHotels.length == 0) {
        this.hotels = [];
        return;
      }
      this.hotels = [...newHotels];

      this.map_center = {
        lat: Number(this.hotels[0]?.latitude),
        lng: Number(this.hotels[0]?.longitude),
      };
      console.log(this.map_center);

      if (process.client) {
        localStorage.setItem(
          "geofense",
          this.hotels[0]?.latitude
            ? JSON.stringify([
                this.hotels[0]?.latitude,
                this.hotels[0]?.longitude,
              ])
            : ""
        );
      }
      if(newHotels.length === 0){
        this.setNoUnits()
      }
      // console.log(this.hotels[0].latitude);
    },
    addFiltersHotels(newHotels, map) {
      if (map || this.MAP) {
        this.map_hotels = [...newHotels];
        console.log(this.map_hotels);
      }
      this.hotels = [...newHotels];
      this.map_center = {
        lat: Number(newHotels[0]?.latitude),
        lng: Number(newHotels[0]?.longitude),
      };
      if (process.client) {
        localStorage.setItem(
          "geofense",
          this.hotels[0]?.latitude
            ? JSON.stringify([
                this.hotels[0]?.latitude,
                this.hotels[0]?.longitude,
              ])
            : ""
        );
      }
      if (newHotels.length === 0) {
        this.setNoUnits(true);
      }
    },
    addtotalPages(totalPages) {
      this.totalPages = totalPages;
    },
    addFilter(newFiter) {
      this.filter = newFiter;
    },
    setSortOptions(sort) {
      this.sort = sort;
    },
    changeEventStatus(status) {
      this.events_completed = status;
    },
    resetHotels() {
      this.hotels = [];
      this.map_hotels = [];
      this.meta = {};
      this.setNoUnits(true);

    },
    resetMap() {
      this.unitsVisited = [];
      this.markerUnitOpen = {};
      this.infoWindowOpened = false;
      this.setNoUnits(true)
    },
    setNoUnits(is_no_units:boolean){
      this.no_units = is_no_units;
    }
  },
});
