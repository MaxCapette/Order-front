import { useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Dish from "../Dish/Dish";
import LoggedAs from "../LoggedAs/LoggedAs";
import NavCategories from "../NavCategories/NavCategories";
import { IItem } from "../../@types/order";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import "./CurrentOrder.scss";
import {
  fetchItemsByCategoryIdThunk,
  fetchItemsThunk,
} from "../../store/middlewares/items";
import {
  addItemToCurrentOrderThunk,
  fetchOrderThunk,
} from "../../store/middlewares/orders";

// Définition de la fonction CurrentOrder.
function CurrentOrder() {
  // Utilisation du sélecteur Redux pour obtenir la liste des articles.
  const items: IItem[] = useAppSelector((state) => state.items.list);
  // Utilisation du hook navigate pour la navigation.
  const navigate = useNavigate();
  // Utilisation du hook dispatch pour envoyer des actions à Redux.
  const dispatch = useAppDispatch();

  // Récupération de l'ID de la commande à partir des paramètres de l'URL.
  // const { orderId } = useParams();
  // Utilisation du sélecteur Redux pour obtenir la commande actuelle.
  // const orderId = useAppSelector((state) => state.orders.currentOrder?.id);
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const categoryId = useMemo(
    () => searchParams.get("category"),
    [searchParams]
  );

  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  console.log(currentOrder?.id, orderId);

  // (Commentaire de débogage) Affichage des articles et de la commande actuelle.
  // console.log(items, currentOrder);

  // Utilisation du hook useEffect pour exécuter du code après le rendu du composant.
  useEffect(() => {
    // Après le premier chargement de l'application, on veut récupérer les tables.
    // L'application va envoyer une action au middleware thunk qui gère l'appel API.
    if (categoryId) {
      dispatch(fetchItemsByCategoryIdThunk(categoryId));
    } else {
      dispatch(fetchItemsThunk());
    }

    // Si un ID de commande est présent, on récupère la commande correspondante.
    if (orderId) dispatch(fetchOrderThunk(parseInt(orderId || "", 10)));

    // (Commentaire pour ESLint) Désactivation de la règle exhaustive-deps pour ce hook.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // Définition de la fonction handleClick qui sera appelée lors du clic sur un article.
  const handleClick = (itemId: number) => {
    // Envoi d'une action pour ajouter un article à la commande actuelle.
    dispatch(
      addItemToCurrentOrderThunk({
        orderId: parseInt(orderId || "", 10),
        itemId,
      })
    );
    // (Commentaire de débogage) Récupération de la commande après l'ajout de l'article.
    dispatch(fetchOrderThunk(parseInt(orderId || "", 10)));
  };
  return (
    <>
      <header>
        <LoggedAs />
        <h5>Order n {currentOrder?.id}</h5>
        <h5>Table {currentOrder?.relatedTable?.number}</h5>
        <NavCategories />
        <button
          type="button"
          className="btn btn-wide margin-small"
          onClick={() => navigate("/")}
        >
          BACK
        </button>
      </header>

      <ul className="dish-list">
        {items.map((item) => (
          <li
            className="li-clickable"
            onClick={() => handleClick(item.id)}
            key={item.id}
          >
            <Dish dish={item} />
          </li>
        ))}
      </ul>
    </>
  );
}
export default CurrentOrder;
