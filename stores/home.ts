import { defineStore } from "pinia";
import { Method, useApi } from "@/composables/api";


interface Cities {
    name: string;
    image: string;
    code: string;
    id: number;
    country_code: string;
}
interface CitiesResponse {
    data: Cities[];
}

export const homeStore = defineStore("HomeStore", () => {

    const cities = ref<Cities>([])
    const wallets = ref([])
    const offers = ref([])
    const accommodations = ref([])
    const hotels = ref([])
    let searchText = ref("")
    let favs = ref([])
    let pending1 = ref(false)
    let pendingFav = ref(false)


    const getCities = async (lang: string) => {
        pending1.value = true;
        try {
            const response = await useApi<CitiesResponse>("/api/v1/home/top-visited-cities", Method.GET, undefined, undefined, lang);
            if (response.error) {
                console.error(`Error ${response.statusCode}: ${response.error}`);
            } else if (response.data) {

                cities.value = response.data.data;
            }

        } catch (error) {
            error.value = "Failed to load user profile";
            console.error("Error loading user profile:", error);
        }

    }
    const getWallet = async (lang: string) => {
        pending1.value = true;
        try {
            const response = await useApi<CitiesResponse>("/api/v1/home/wallets-home-page", Method.GET, undefined, undefined, lang);
            if (response.error) {
                console.error(`Error ${response.statusCode}: ${response.error}`);
            } else if (response.data) {

                wallets.value = response.data.data;
            }

        } catch (error) {
            error.value = "Failed to load user profile";
            console.error("Error loading user profile:", error);
        }

    }
    const getOffers = async (lang: string) => {
        pending1.value = true;
        try {
            const response = await useApi<CitiesResponse>("/api/v1/home/offers", Method.GET, undefined, undefined, lang);
            if (response.error) {
                console.error(`Error ${response.statusCode}: ${response.error}`);
            } else if (response.data) {

                offers.value = response.data.data;
            }

        } catch (error) {
            error.value = "Failed to load user profile";
            console.error("Error loading user profile:", error);
        }

    }
    const getAccommodation = async (lang: string) => {
        pending1.value = true;
        try {
            const response = await useApi<CitiesResponse>("/api/v1/onboarding/accommodationTypes", Method.GET, undefined, undefined, lang);
            if (response.error) {
                console.error(`Error ${response.statusCode}: ${response.error}`);
            } else if (response.data) {

                accommodations.value = response.data.data;
            }

        } catch (error) {
            error.value = "Failed to load user profile";
            console.error("Error loading user profile:", error);
        }

    }
    const getHotels = async (lang: string) => {
        pending1.value = true;
        try {
            const response = await useApi<CitiesResponse>("/api/v1/home/special-deals-hotels", Method.GET, undefined, undefined, lang);
            if (response.error) {
                console.error(`Error ${response.statusCode}: ${response.error}`);
            } else if (response.data) {

                hotels.value = response.data.data;
            }

        } catch (error) {
            error.value = "Failed to load user profile";
            console.error("Error loading user profile:", error);
        }

    }
    const getFavs = async (lang: string) => {
        pendingFav.value = true;
        try {
            const response = await useApi("/api/v1/account/favorites", Method.GET, undefined, {
                search: searchText.value
            }, lang);

            if (response.error) {
                console.error(`Error ${response.statusCode}: ${response.error}`);
            } else if (response.data) {
                console.log('sdsd', response.data);
                pendingFav.value = true;
                favs.value = response.data?.data;
            }

        } catch (error) {
            error.value = "Failed to load user profile";
            console.error("Error loading user profile:", error);
        }
    }


    return {
        cities,
        wallets,
        offers,
        accommodations,
        hotels,
        searchText,
        favs,
        pending1,
        pendingFav,
        getCities,
        getWallet,
        getOffers,
        getAccommodation,
        getHotels,
        getFavs,
    }
});
