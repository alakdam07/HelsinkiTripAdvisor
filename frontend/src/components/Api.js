export async function logEntry() {
  const response = await fetch("/api");
  return response.json();
}

export async function createLogEntry(entry) {
  const response = await fetch("/api", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(entry)
  });

  return response.json();
}
