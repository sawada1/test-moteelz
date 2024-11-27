import { defineStore } from "pinia";
import { Method, useApi } from "@/composables/api";
interface ageOpt {
  // label: string;
  value: any;
}
interface RoomData {
  adult?: number;
  child?: number;
  ages_child?: ageOpt[];
}
interface Cities {
  name: string;
  type: string;
}
interface Hotels {
  name: string;
  type: string;
  apiId: number;
}
interface Regions {
  name: string;
  type: string;
}
interface Rooms {
  adults: number;
  childrenAges: number[];
}
interface DestinationsData {
  cities: Cities[];
  hotels: Hotels[];
  regions: Regions[];
}
interface DestinationsDataResponse {
  data: DestinationsData;
}
interface City {
  id: number;
}
export const generalStore = defineStore("generalStore", {
  state: () => ({
    checkMobileCitySearch: false,
    checkMobileRoomSearch: false,
    cities: [] as Cities[],
    hotels: [] as Hotels[],
    totalAdults: 1,
    totalChilds: 0,
    totalRoomsLength: 1,
    check1: false,
    pendingSearch: false,
    showModalFilter: false,
    hotelId: undefined,
    searchText: "",
    searchObj: {
      destination: {
        city: {} as City,
      },
      checkIn: "",
      checkOut: "",
      occupancy: {
        leaderNationality: 4,
        rooms: [] as Rooms[],
      },
    },
    cityObj: {
      name: "",
      id: "",
    },
    totalRooms: [
      {
        adult: 1,
        child: 0,
        ages_child: [],
      },
    ] as RoomData[],
  }),
  actions: {
    async getDestinations() {
      this.pendingSearch = true;
      try {
        const response = await useApi<DestinationsDataResponse>(
          "/api/v1/destinations",
          Method.GET,
          undefined,
          {
            query: this.searchText,
          }
        );
        console.log(response);
        if (response.loading) {
          // Show loading spinner
        } else if (response.error) {
          // Handle error state

          console.error(`Error ${response.statusCode}: ${response.error}`);
        } else if (response.data) {
          // Handle success state with response.data
          this.pendingSearch = false;
          this.cities = response.data.data.cities;
          this.hotels = response.data.data.hotels;
        }
      } catch (error) {
        this.error = "Failed to load user profile";
        console.error("Error loading user profile:", error);
      }
    },
  },
  // persist: true, // Enables persistence (requires a plugin)
});
