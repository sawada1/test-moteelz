// composables/useSearch.js
import { useRuntimeConfig } from "#app";
import { useSearchStore } from "@/stores/hotels/search";
import { useApi, Method } from "@/composables/api";
import { ref } from "vue";
import { useFilter } from "@/stores/hotels/hotelsFilter";
import { storeToRefs } from "pinia";
const nprogress = useNuxtApp().$nprogress;
const { filter_processing } = storeToRefs(useFilter());

export async function useSearch(params) {
  const config = useRuntimeConfig();
  const searchStore = useSearchStore();
  const useFilterStore = useFilter();
  const eventSource = ref(null); // Ref to manage EventSource lifecycle
  searchStore.resetHotels();
  searchStore.setNoUnits(false)
  useFilterStore.resetFilters(true);

  searchStore.MAP= false
  // filter_processing.filter_processing = true
  try {
    // Step 1: Perform POST request to initiate search
    const data = await useApi("/api/v1/search/start", Method.POST, params);
    // Check if searchQueryId is received
    const searchQueryId = data?.data?.data?.id;
    if (!searchQueryId) {
      console.error("No searchQueryId received");
      return;
    }
    // Store the search query ID in Pinia
    searchStore.setSearchQueryId(searchQueryId);
    // Step 2: Define connect function for SSE
    searchStore.progress = 0;
    searchStore.countHotels = 0;
    const connect = () => {
      const sseUrl = `${config.public.apiUrl}/api/v1/search/stream/${searchQueryId}`;
      eventSource.value = new EventSource(sseUrl);
      searchStore.changeEventStatus(false);

      // Handle each event type specifically
      eventSource.value.addEventListener("search started", (event) => {
        const eventData = JSON.parse(event.data);
        console.log("Search started event received:", eventData);
        searchStore.setSearchQueryId(eventData.data);
      });
      eventSource.value.addEventListener("progress", (event) => {
        const eventData = JSON.parse(event.data);
        console.log("Progress event received:", eventData);
        searchStore.setProgress(eventData.data.progress);
        searchStore.setCountHotels(eventData.data.countHotels);
      });
      eventSource.value.addEventListener("results", (event) => {
        const eventData = JSON.parse(event.data);
        // console.log("Results event received:", eventData.data.summary);
        searchStore.addHotels(eventData.data);
        searchStore.addtotalPages(eventData.data.length);
        console.log(eventData.data.length);
      });
      eventSource.value.addEventListener("paginaited", (event) => {
        const eventData = JSON.parse(event.data);
        console.log(eventData.data, "pag");
        searchStore.addHotels(eventData.data);
        searchStore.setMeta(eventData.meta);
        searchStore.setNoUnits(eventData.data.length === 0 ? true : false);
      });
      eventSource.value.addEventListener("filters", (event) => {
        const eventData = JSON.parse(event.data);
        console.log("Filters event received:", eventData.data);
        searchStore.addFilter(eventData.data);
      });
      eventSource.value.addEventListener("sort", (event) => {
        const eventData = JSON.parse(event.data);
        searchStore.setSortOptions(eventData.data.sortFields);
        console.log("Sort event received:", eventData.data.sortFields);
      });
      eventSource.value.addEventListener("done", (event) => {
        const eventData = JSON.parse(event.data);
        searchStore.changeEventStatus(true);
        console.log("Done event received:", eventData);
        disconnect();
      });
    };

    // Step 3: Define disconnect function to close SSE connection
    const disconnect = () => {
      if (eventSource.value) {
        eventSource.value.close();
        eventSource.value = null;
      }
    };

    // Return the connection functions for use in components
    return { connect, disconnect };
  } catch (error) {
    console.error("Failed to initiate search:", error);
  }
}
// function useNuxtApp() {
//     throw new Error("Function not implemented.");
// }
