// API Base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";

// API utility function with authentication
export async function apiCall(
  endpoint: string,
  options: RequestInit = {},
  getToken?: () => Promise<string | null>,
) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string> | undefined),
    };

    // Add authentication token if getToken function is provided
    if (getToken) {
      const token = await getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
}

// Specific API functions
export async function syncUser(getToken: () => Promise<string | null>) {
  return apiCall("/api/auth/sync-user", { method: "POST" }, getToken);
}
export async function verifyToken(getToken: () => Promise<string | null>) {
  return apiCall("/api/auth/verify", { method: "GET" }, getToken);
}

export async function getMe(getToken: () => Promise<string | null>) {
  return apiCall("/api/auth/me", { method: "GET" }, getToken);
}

export async function getUsage(getToken: () => Promise<string | null>) {
  return apiCall("/api/auth/usage", { method: "GET" }, getToken);
}

export async function getProgress(getToken: () => Promise<string | null>) {
  return apiCall("/api/auth/progress", { method: "GET" }, getToken);
}

export async function getSessions(
  getToken: () => Promise<string | null>,
  params?: { active?: boolean; limit?: number },
) {
  const queryParams = new URLSearchParams();
  if (params?.active !== undefined)
    queryParams.append("active", String(params.active));
  if (params?.limit) queryParams.append("limit", String(params.limit));

  const query = queryParams.toString();
  const endpoint = query ? `/api/auth/sessions?${query}` : "/api/auth/sessions";

  return apiCall(endpoint, { method: "GET" }, getToken);
}

export async function getLanguages() {
  return apiCall("/api/languages", { method: "GET" });
}

export async function getScenarios() {
  return apiCall("/api/scenarios", { method: "GET" });
}

export async function getDifficultyLevels() {
  return apiCall("/api/difficulty-levels", { method: "GET" });
}

export async function getLanguageTips(language: string) {
  return apiCall(`/api/language-tips/${language}`, { method: "GET" });
}

export async function getCorrections(
  getToken: () => Promise<string | null>,
  params?: { type?: string; limit?: number },
) {
  const queryParams = new URLSearchParams();
  if (params?.type) queryParams.append("type", params.type);
  if (params?.limit) queryParams.append("limit", String(params.limit));

  const query = queryParams.toString();
  const endpoint = query
    ? `/api/auth/corrections?${query}`
    : "/api/auth/corrections";

  return apiCall(endpoint, { method: "GET" }, getToken);
}

export async function getFeedback(
  getToken: () => Promise<string | null>,
  data: {
    text: string;
    language: string;
    difficulty: string;
    scenario: string;
    sessionId?: string;
  },
) {
  return apiCall(
    "/api/corrections/get-feedback",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    getToken,
  );
}

export async function getCulturalContext(
  getToken: () => Promise<string | null>,
  data: {
    phrase: string;
    language: string;
    scenario: string;
  },
) {
  return apiCall(
    "/api/corrections/cultural-context",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    getToken,
  );
}

export async function getPhrasingSuggestions(
  getToken: () => Promise<string | null>,
  data: {
    text: string;
    context: string;
    language: string;
  },
) {
  return apiCall(
    "/api/corrections/suggest-phrasing",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    getToken,
  );
}

export async function getSessionSummary(
  sessionId: string,
  getToken?: () => Promise<string | null>,
) {
  return apiCall(
    `/api/progress/session-summary/${sessionId}`,
    { method: "GET" },
    getToken,
  );
}

export async function getUserProgressDetailed(
  userId: string,
  getToken: () => Promise<string | null>,
) {
  return apiCall(
    `/api/progress/user-progress/${userId}`,
    { method: "GET" },
    getToken,
  );
}
export async function startSession(
  getToken: () => Promise<string | null>,
  data: {
    language: string;
    difficulty: string;
    scenario: string;
  },
) {
  return apiCall(
    "/api/start-session",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    getToken,
  );
}

export async function endSession(
  getToken: () => Promise<string | null>,
  sessionId: string,
) {
  return apiCall(
    "/api/end-session",
    {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    },
    getToken,
  );
}

export async function getSession(
  getToken: () => Promise<string | null>,
  sessionId: string,
) {
  return apiCall(`/api/session/${sessionId}`, { method: "GET" }, getToken);
}

export async function getSessionHistory(
  getToken: () => Promise<string | null>,
  sessionId: string,
) {
  return apiCall(
    `/api/session/${sessionId}/history`,
    { method: "GET" },
    getToken,
  );
}
export async function getUserSummaries(
  getToken: () => Promise<string | null>,
  userId: string,
  limit: number = 10,
) {
  return apiCall(
    `/api/progress/user-summaries/${userId}?limit=${limit}`,
    { method: "GET" },
    getToken,
  );
}
export async function getHealth() {
  return apiCall("/api/health", { method: "GET" });
}

export async function getStats() {
  return apiCall("/api/stats", { method: "GET" });
}
