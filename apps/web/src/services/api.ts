const API_URL = import.meta.env.VITE_API_URL;

export type HealthResponse = {
  message: string;
  status: string;
};

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("Failed to test supabase");
  }

  return response.json();
}

export async function runSupabaseTest() {
  const response = await fetch(`${API_URL}/supabase-test`);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}
