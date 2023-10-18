import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import "./CustomersCarte.scss";

function CustomersCarte() {
  const items = useAppSelector((state) => state.items.list);
  const navigate = useNavigate();
  return (
    <div className="lacarte">
      <button
        type="button"
        className="kitchen-NavBtnBack"
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <h1>La Carte</h1>
      <ul className="orders-list">
        {items.map((item) => (
          <li key={item.id} className="items-list">
            <p>{item.name}</p>
            <p>{item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CustomersCarte;
