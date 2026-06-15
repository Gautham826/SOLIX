const API_BASE = "https://solix-swys.onrender.com";

export async function fetchSurplus() {
  const res = await fetch(`${API_BASE}/meter/surplus`);
  return res.json();
}

export async function fetchForecasts() {
  const res = await fetch(`${API_BASE}/forecast/`);
  return res.json();
}

export async function fetchRecommendations() {
  const res = await fetch(`${API_BASE}/recommendations/`);
  return res.json();
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function fetchWeather() {
  const res = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=bda410e8ba4a4c380a207d0e7fe6f591&units=metric",
    { cache: "no-store" }
  );
  return res.json();
}