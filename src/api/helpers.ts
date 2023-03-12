import { API_BASE_URL } from "@config/constants";
import { User } from "@firebase/auth";

export async function apiFetcher(url: string) {
  const response = await fetch(API_BASE_URL + url);
  const data = await response.json();

  if (response.status >= 200 && response.status < 300) return data.data;
  else throw data;
}

export async function authApiFetcher(user: User | null, url: string) {
  const headers = new Headers();

  if (user) {
    const token = await user.getIdToken();
    headers.append("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(API_BASE_URL + url, {
    method: "GET",
    headers: headers,
  });
  const data = await response.json();

  if (response.status >= 200 && response.status < 300) return data.data;
  else throw data;
}

export async function fetchAPI<T>(
  user: User | null,
  url: string,
  method: string = "POST",
  body: any = undefined
): Promise<T | null> {
  const headers = new Headers();
  if (!user) return null;
  const token = await user.getIdToken();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const response = await fetch(API_BASE_URL + url, { method, headers, body });
  const data = await response.json();

  if (response.status >= 200 && response.status < 300) return data?.data;
  else throw data;
}

export async function unAuthFetchAPI<T>(
  url: string,
  method: string = "POST",
  body: any = undefined
): Promise<T | null> {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(API_BASE_URL + url, { method, headers, body });
  const data = await response.json();

  if (response.status >= 200 && response.status < 300) return data?.data;
  else throw data;
}

export async function fetchFormDataAPI<T>(
  user: User | null,
  url: string,
  method: string = "POST",
  body: any = undefined
): Promise<T | null> {
  const headers = new Headers();
  if (!user) return null;
  const token = await user.getIdToken();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "multipart/form-data");

  const response = await fetch(API_BASE_URL + url, { method, headers, body });
  const data = await response.json();

  if (response.status >= 200 && response.status < 300) return data?.data;
  else throw data;
}
