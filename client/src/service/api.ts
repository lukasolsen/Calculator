const API_URL = "http://localhost:1200";

export const getHistory = async (limit: number) => {
  console.log("limit", limit);
  const response = await fetch(`${API_URL}/history?limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const data = await response.json();
  return data;
};

export const postHistory = async (history: ResultType) => {
  console.log("history", history);
  console.log("history as string", JSON.stringify(history));

  const response = await fetch(`${API_URL}/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ history: history }),
  });
  const data = await response.json();
  return data;
};
