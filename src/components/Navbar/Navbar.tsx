import { NavLink } from "react-router-dom";
import "./Navbar.scss";

function Navbar({ userId }: { userId: number }) {
  // console.log(userId);

  return (
    <section className="section">
      <nav className="btm-nav">
        <NavLink className="btm-nav-label" to="/">
          Menu
        </NavLink>
        <NavLink className="btm-nav-label" to="/tables/30/order">
          Current
        </NavLink>
        <NavLink className="btm-nav-label" to={`/users/${userId}/orders`}>
          Orders
        </NavLink>
      </nav>
    </section>
  );
}

export default Navbar;
