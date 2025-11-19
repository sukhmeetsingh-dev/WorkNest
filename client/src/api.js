export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = options.headers || {};
  headers["Content-Type"] = "application/json";
  if (token) headers["x-auth-token"] = token;
  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
};
