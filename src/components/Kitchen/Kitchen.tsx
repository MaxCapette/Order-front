import { useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  changeStatusOrderThunk,
  fetchOrdersKitchenThunk,
} from "../../store/middlewares/orders";

import LoggedAs from "../LoggedAs/LoggedAs";
import "./Kitchen.scss";
import { updateSpecificOrder } from "../../store/reducers/ordersReducer";

// Définition de la fonction Kitchen.
function Kitchen() {
  // Utilisation du hook navigate pour la navigation.
  const navigate = useNavigate();

  // Utilisation du hook dispatch pour envoyer des actions à Redux.
  const dispatch = useAppDispatch();
  // Utilisation du sélecteur Redux pour obtenir la liste des commandes.
  const orders = useAppSelector((state) => state.orders.list);
  // console.log(orders);

  // const hasSomeItems = currentOrder?.orderItems?.some((orderItem) => orderItem);
  useEffect(() => {
    // Cette ligne envoie une action pour récupérer toutes les commandes destinées à la cuisine dès que le composant est monté.
    dispatch(fetchOrdersKitchenThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Le hook useEffect est utilisé pour exécuter du code après le rendu du composant.
  useEffect(() => {
    // Cette ligne envoie une action pour récupérer toutes les commandes destinées à la cuisine dès que le composant est monté.

    const url = new URL("http://45.147.98.243:2020/.well-known/mercure");
    url.searchParams.append("authorization", import.meta.env.VITE_MERCURE_JWT);
    url.searchParams.append("topic", `orders`);
    const es = new EventSource(url, { withCredentials: true });
    // console.log(es);

    // Cette fonction est appelée chaque fois qu'un message est reçu du serveur Mercure.
    es.onmessage = (event) => {
      // console.log("ouiii ça a marché !", event);
      // Vous parsez le message reçu pour le convertir en objet JavaScript.
      const updatedOrder = JSON.parse(event.data);
      dispatch(updateSpecificOrder(updatedOrder));
      // Après avoir reçu une mise à jour, vous envoiez une autre action pour récupérer à nouveau toutes les commandes destinées à la cuisine.
      // Cela garantit que votre application affiche toujours les données les plus récentes.
      dispatch(fetchOrdersKitchenThunk());
    };

    // Cette fonction de nettoyage est appelée lorsque le composant est démonté.
    // Elle ferme la connexion avec le serveur Mercure pour éviter les fuites de mémoire.
    return () => {
      es?.close();
    };
    // La dépendance [dispatch] signifie que le code à l'intérieur de useEffect sera exécuté chaque fois que la fonction dispatch change.
    // En pratique, avec Redux, dispatch ne change jamais, donc useEffect ne s'exécutera qu'une fois, similaire à componentDidMount.
  }, [dispatch]);

  const handleStatusClick = (orderId: number, orderStatus: number) => {
    // Envoi d'une action pour changer le statut de la commande.
    dispatch(
      changeStatusOrderThunk({
        orderId,
        orderStatus,
      })
      // ).then(() => {
      //   // Récupération des commandes après la mise à jour du statut.
      //   dispatch(fetchOrdersKitchenThunk());
      //
    );
  };

  return (
    <>
      <header>
        <LoggedAs />
        <h2>Orders</h2>
        <button
          type="button"
          className="kitchen-NavBtnBack"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </header>
      <div className="kitchen-list">
        <ul className="kitchen-order-list">
          {orders.map((order) => (
            <li key={`order-${order.id}`} className="kitchen-list-li">
              <h4>Order {order.id}</h4>
              <h4>Table {order.relatedTable.number}</h4>
              {order.orderItems?.map((item) => (
                <Fragment key={`order-item-${item.id}`}>
                  <div
                    className={`kitchen-list-li-div ${
                      item.sent ? "item-sent" : ""
                    }`}
                  >
                    <p>{item.quantity}</p>
                    <p>{item.item.name}</p>
                  </div>

                  {item.comment && (
                    <div className="comment">{item.comment}</div>
                  )}
                </Fragment>
              ))}

              <button
                type="button"
                className="btn"
                onClick={() => handleStatusClick(order.id, order.status)}
              >
                {order.orderItems && order.orderItems.length > 0
                  ? "send"
                  : "cancel"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Kitchen;
