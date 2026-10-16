import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { getRoutine, deleteRoutine } from "routines";

import SetForm from "./sets/SetForm";
import SetList from "./sets/SetList";

export default function RoutineDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
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
    setError(null);

    try {
      await deleteRoutine(token, routine.id);
      navigate("/routine");
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
      <SetList sets={routine.sets} syncRoutine={syncRoutine} />
      {token && <SetForm routineId={id} syncRoutine={syncRoutine} />}
    </>
  );
}
