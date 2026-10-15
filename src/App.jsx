import { Routes, Route } from "react-router";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import Error404 from "./Error404.jsx";
import Navbar from "./layout/Navbar.jsx";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navbar />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/activities/:activities" element={<ActivitiesPage />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );

  //if (page === "register") return <Register />;
  //if (page === "login") return <Login />;
  //if (page === "activities") return <ActivitiesPage />;

  //return <Error404 />;
}
