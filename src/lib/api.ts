const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

interface ApiError {
  error: string;
  details?: unknown;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = (await res.json()) as ApiError;
      message = body.error ?? message;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(message);
  }

  // Some endpoints (204) have no body.
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
};
