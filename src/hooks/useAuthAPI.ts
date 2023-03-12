import { fetchAPI } from "@api/helpers";
import useAuth from "@hooks/useAuth";

function processData<T = Object | FormData | string>(data: T) {
  let apiData: any = data;
  if (typeof data === "object") apiData = JSON.stringify(data);
  return apiData;
}

function useAuthAPI<D = Object | FormData | string, R = any>(url: string) {
  const [loading, user] = useAuth();
  if (loading) return null;
  return {
    get() {
      return fetchAPI<R>(user, url, "GET");
    },
    post(data: D) {
      return fetchAPI<R>(user, url, "POST", processData<D>(data));
    },
    put(data: D) {
      return fetchAPI<R>(user, url, "PUT", processData<D>(data));
    },
  };
}

export default useAuthAPI;
