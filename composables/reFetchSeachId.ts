import { storeToRefs } from "pinia";
import { useSearchStore } from "../stores/hotels/search";
const { searchQueryId } = storeToRefs(useSearchStore());
import { useApi, Method } from "./api";
export const reFetchSearchId = async () => {
  const searchQuery = JSON.parse(localStorage.getItem("searchQueryId"));
  await useApi('')
};
