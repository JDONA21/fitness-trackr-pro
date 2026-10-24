import { useEffect, useState } from "react";
import { getActivities } from "../api/activities";
import { addSet } from "../api/sets";
import { useAuth } from "../auth/AuthContext";

export default function SetForm({ routineId }) {
  const [activities, setActivities] = useState([]);
  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };
  useEffect(() => {
    syncActivities();
  }, []);

  const [error, setError] = useState();
  const { token } = useAuth();

  const tryAddSet = async (formData) => {
    setError(null);

    const activityId = formData.get("activityId");
    const count = formData.get("count");

    try {
      await addSet(token, activityId, routineId, count);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section>
      <h2>Adda a set</h2>
      <form action={tryAddSet}>
        <label>
          Activity
          <select name="activityId">
            {activities.map((activity) => (
              <option key={activity.id}>{activity.name}</option>
            ))}
          </select>
        </label>
        <label>
          Count
          <input type="number" />
        </label>
        <button type="submit">Add Set</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
