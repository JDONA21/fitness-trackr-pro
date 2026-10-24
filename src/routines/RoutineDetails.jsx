import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteRoutine, getRoutine } from "../api/routines";
import { useAuth } from "../auth/AuthContext";
import SetForm from "./SetForm";

export default function RoutineDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState();
  const [error, setError] = useState(null);

  const syncRoutine = async (id) => {
    const data = await getRoutine(id);
    setRoutine(data);
  };

  useEffect(() => {
    syncRoutine(id);
  }, [id]);

  const tryDelete = async () => {
    try {
      await deleteRoutine(token, id);
      navigate("/routines");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!routine) return <p>Loading...</p>;

  return (
    <>
      <h1>{routine.name}</h1>
      <p>by {routine.creatorName}</p>
      <p>{routine.goal}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
      <section>
        <h2>Sets</h2>
        <ul>
          {routine.sets.map((set) => (
            <li key={set.id}>
              {set.name} x {set.count}
            </li>
          ))}
        </ul>
      </section>
      {token && <SetForm routineId={id} syncRoutine={syncRoutine} />}
    </>
  );
}
