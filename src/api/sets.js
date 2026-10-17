const API = import.meta.env.VITE_API;

export async function addSet(token, activityId, routineId, count) {
  const response = await fetch(API + "/sets", {
    method: "POST",
    headers: {
      Authorization: "Bearer" + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activityId,
      routineId,
      count,
    }),
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
