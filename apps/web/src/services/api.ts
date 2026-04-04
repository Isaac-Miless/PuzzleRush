const API_URL = import.meta.env.VITE_API_URL;

export type HealthResponse = {
  message: string;
  status: string;
};

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_URL}/api/health`);

  if (!response.ok) {
    throw new Error("Failed to fetch health status");
  }

  return response.json();
}
