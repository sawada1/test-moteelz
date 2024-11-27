// composables/useSSE.js
import { onMounted, onUnmounted } from "vue";
import { useRuntimeConfig } from "#app";
import { useSearchStore } from "@/stores/hotels/search";

export function useSSE(url) {
  const config = useRuntimeConfig();
  const searchStore = useSearchStore();
  let eventSource;
  console.log(url);
  
  const connect = () => {
    eventSource = new EventSource(config.public.apiUrl + url);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      
      // Handle different events based on data structure or type
      if (data.type === "id") {
        searchStore.setSearchQueryId(data.id);
      } else if (data.type === "hotel") {
        searchStore.addHotel(data);
      }
    };

    eventSource.onerror = () => { 
      console.error("Error with SSE connection.");
      eventSource.close();
    };
  };

  const disconnect = () => {
    if (eventSource) {
      eventSource.close();
    }
  };

  onMounted(() => {
    connect();
  });

  onUnmounted(() => {
    disconnect();
  });

  return { connect, disconnect };
}
