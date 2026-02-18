// src/api.ts

const API_URL = import.meta.env.VITE_API_URL;

export const getLostItems = async () => {
  const res = await fetch(`${API_URL}/api/lost`);
  return res.json();
};

export const getFoundItems = async () => {
  const res = await fetch(`${API_URL}/api/found`);
  return res.json();
};

export const reportLostItem = async (data: any) => {
  const res = await fetch(`${API_URL}/api/lost`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
