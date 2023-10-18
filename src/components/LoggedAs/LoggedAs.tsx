import { Link } from "react-router-dom";
import "./LoggedAs.scss";
import { getFromLocalStorage } from "../../localStorage/localStorage";

function LoggedAs() {
  const storeUser = getFromLocalStorage("auth");
  // console.log(storeUser);

  return (
    <Link to="/logout">
      <p className="logged-as">
        Logged as: <span>{storeUser?.name}</span>
      </p>
    </Link>
  );
}
export default LoggedAs;
