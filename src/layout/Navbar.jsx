import { NavLink } from "react-router";

/** Navbar with site navigation links */
export default function Navbar() {
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink to="/">Activities</NavLink>
        <NavLink to="/">Register</NavLink>
        <NavLink to="/">Login</NavLink>
      </nav>
    </header>
  );
}
