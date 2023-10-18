import { useEffect } from "react";
import { IOrder } from "../../@types/order";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchOrdersThunk } from "../../store/middlewares/orders";
import LoggedAs from "../LoggedAs/LoggedAs";
import Order from "../Order/Order";
import "./Orders.scss";

function Orders({ userId }: { userId: number }) {
  // Utilisation du hook dispatch pour envoyer des actions à Redux.
  const dispatch = useAppDispatch();

  // Récupération de la liste des commandes depuis l'état global de Redux.
  const orders: IOrder[] = useAppSelector((state) => state.orders.list);

  // Utilisation du hook useEffect pour exécuter du code après le premier rendu du composant.
  useEffect(() => {
    // Après le premier rendu de l'application, on souhaite récupérer les commandes associées à un utilisateur spécifique.
    // L'application va envoyer une action au middleware thunk pour gérer l'appel API.
    dispatch(fetchOrdersThunk(userId));
  }, []); // Le tableau de dépendances est vide, donc le hook s'exécutera seulement après le premier rendu.

  return (
    <>
      <header>
        <LoggedAs />
        <h2>Orders</h2>
      </header>
      <ul className="orders-list">
        {orders.map((order) => (
          <li key={order.id}>
            <Order order={order} />
          </li>
        ))}
      </ul>
    </>
  );
}
export default Orders;
