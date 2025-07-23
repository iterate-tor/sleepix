export const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8000/api/v1";

export function redirectToWearableAuth(provider: "fitbit" | "oura") {
  window.location.href = `${API_BASE}/wearables/authorize/${provider}`;
} 