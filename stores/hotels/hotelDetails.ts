import { defineStore } from "pinia";
import { useApi, Method } from "@/composables/api";
import { generalStore } from "./../general";
import { storeToRefs } from "pinia";
import { useApiAxios } from "@/composables/axios";
import { useSearchStore } from "./search";

export const hotelDetails = defineStore("hotelDetailsStore", {
  state: () => ({
    hotelGeneralData: {},
    hotelRatePlans: {},
    selectedRatePlans: [],
    near_hotels: [],
    general_data_processing: false,
    rate_data_processing: false,
    near_hotels_processing: false,
    selectedRoom: [],
    query: "9d91987a-e56e-4cc6-adcd-0a8e1cc11b5d",
  }),
  actions: {
    async getHotelData(id) {
      try {
        const response = await useApiAxios<any>(
          "get",
          `/api/v1/hotels/${id}/details`
        );
        if (response.data) {
          console.log(response.data);

          this.general_data_processing = false;
          this.hotelGeneralData = response.data as any;
          await this.getHotelRooms(id);
          console.log(this.hotelGeneralData);
        }
        return false;
      } catch (error) {
        return Promise.resolve(error);
      } finally {
      }
    },
    async getNearHotels(link) {
      let searchQuery = JSON.parse(localStorage.getItem("searchQueryId"));

      try {
        const response = await useApi<any>(link, Method.POST, {
          search: searchQuery,
        });
        if (response.data) {
          console.log(this.near_hotels);
          this.near_hotels = response.data as any;
        }
        return false;
      } catch (error) {
        return Promise.resolve(error);
      } finally {
      }
    },
    async getHotelRooms(id: string) {
      this.rate_data_processing = true;
      const searchQuery = JSON.parse(localStorage.getItem("searchQueryId"));
      const useSearchStoreStore = useSearchStore();
      const { searchObj } = storeToRefs(generalStore());

      await useApi(
        `/api/v1/search/${searchQuery}/hotels/${id}/offers`,
        Method.POST,
        searchObj.value
      )
        .then(async (res) => {
          if (res.statusCode === 450) {
            useSearchStoreStore.setSearchQueryId(
              res.search_id?.data?.search_id
            );
            // this.query = res.search_id?.data?.search_id;
            await this.refreshHandleFilterApi(id);
            return;
          }
          if (res.data) {
            this.hotelRatePlans = (res.data as any)?.data;
            await this.getNearHotels(
              this.hotelRatePlans.offers[0].nearHotelsUrl
            );
          }
        })
        .finally(() => {
          this.rate_data_processing = false;
        });
    },
    async refreshHandleFilterApi(id: string) {
      this.getHotelRooms(id);
    },
    async getHotelRoomsByLink(url: string) {
      const { searchObj } = storeToRefs(generalStore());

      const searchQuery = JSON.parse(localStorage.getItem("searchQueryId"));
      this.near_hotels_processing = true;
      await useApi(`${url}`, Method.POST, searchObj.value)
        .then((res) => {
          if (res.data) {
            this.hotelRatePlans = (res.data as any)?.data;
            // this.getNearHotels(this.hotelRatePlans.offers[0].nearHotelsUrl);
          }
        })
        .finally(() => {
          this.near_hotels_processing = false;
        });
    },
    async roomsSearch(id: string) {
      const searchQuery = JSON.parse(localStorage.getItem("searchQueryId"));
      this.rate_data_processing = true;
      const { searchObj } = storeToRefs(generalStore());

      let payload = searchObj.value;
      delete payload["destination"];
      payload["accommodation"] = [Number(id)];
      await useApi(`api/v1/search/start`, Method.POST, searchObj.value)
        .then(async (res) => {
          console.log(res.data);
          if (res.data) {
            this.hotelRatePlans = (res.data as any)?.data;
            await this.getHotelRoomsByLink(this.hotelRatePlans[0]?.url);
            // this.getNearHotels(this.hotelRatePlans.offers[0].nearHotelsUrl);
            return Promise.resolve(this.hotelRatePlans);
          } else {
            this.hotelRatePlans = {};
          }
        })
        .finally(() => {
          this.rate_data_processing = false;
        });
    },
  },
});
// async getSearchId() {
//   const payload = {
//     checkIn: generalStore().searchObj.checkIn,
//     checkOut: generalStore().searchObj.checkOut,
//     occupancy: generalStore().searchObj.occupancy,
//     accommodation: [this.id],
//   };
//   await useApi(`/api/v1/search/start`, Method.POST, payload).then(
//     async (res) => {
//       console.log(res);
//       if (res.data) {
//         this.hotelRatePlans = (res.data as any)?.data;
//       } else if (res.statusCode === 404) {
//       }
//     }
//   );
// },
// else if (res.statusCode === 404) {
//         // this.getSearchId();
//       }
