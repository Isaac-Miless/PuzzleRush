const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export type HealthResponse = {
  message: string;
  status: string;
};

export type SupabaseTestResponse = {
  ok: boolean;
  error: string | null;
};

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error(`Failed to request health: ${response.status}`);
  }

  return response.json();
}

export async function runSupabaseTest(): Promise<SupabaseTestResponse> {
  const response = await fetch(`${API_URL}/supabase-test`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Failed to run Supabase test: ${response.status}`);
  }

  return response.json();
}
