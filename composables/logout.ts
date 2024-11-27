import { useAuthStore } from "@/stores/auth";
export const logOutLogic = () => {
  const localePath = useLocalePath();

  let store = useAuthStore();
  const logoutFunction = () => {
    store.user = null;
    store.token = null;
    store.on_boarding = null;
    if (process.client) {
      localStorage.removeItem("token");
      console.log('signed out')
    }
    navigateTo(localePath('/'));
  }
  return {
    logoutFunction
  }
}