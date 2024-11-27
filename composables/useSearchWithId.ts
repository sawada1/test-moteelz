// composables/useSearch.js
import { useRuntimeConfig } from "#app";
import { useSearchStore } from "@/stores/hotels/search";
import { useApi, Method } from "@/composables/api";
import { ref } from "vue";
const nprogress = useNuxtApp().$nprogress;

export async function useSearchById(params={}, isMapHotels='') {
  const config = useRuntimeConfig();
  const searchStore = useSearchStore();
  const eventSource = ref(null); // Ref to manage EventSource lifecycle
  const searchQueryId = searchStore.searchQueryId;
  const data = await useApi(
    "/api/v1/search/results/" + searchQueryId,
    Method.POST,
    params
  );
  if (isMapHotels === 'map'){
    searchStore.map_hotels = data.data;
  }else{
      searchStore.addHotels(data.data);
      searchStore.addtotalPages(data.data?.length);
  }
    // Check if searchQueryId is received
    console.log(data);

  if (!searchQueryId) {
    console.error("No searchQueryId received");
    return;
  }
  return Promise.resolve(data)
}
// function useNuxtApp() {
//     throw new Error("Function not implemented.");
// }
