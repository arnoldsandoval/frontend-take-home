const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export const getApiUrl = (path: string, search?: string | null) => {
  const url = `${API_BASE_URL}${path}`;
  return search ? `${url}?search=${encodeURIComponent(search)}` : url;
};
