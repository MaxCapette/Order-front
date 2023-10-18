import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { ICategory, IOrderItem } from "../../@types/order";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import {
  changeStatusOrderThunk,
  deleteOrderThunk,
  editCommOrderThunk,
  minusItemToCurrentOrderThunk,
  plusItemToCurrentOrderThunk,
} from "../../store/middlewares/orders";

import "./CollapseOrder.scss";
// import { IUser } from "../../@types/user";
import { updateSpecificOrder } from "../../store/reducers/ordersReducer";

function CollapseOrder() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  // console.log(currentOrder);

  // console.log(currentUser);
  const orderItems: IOrderItem[] | undefined = useAppSelector(
    (state) => state.orders.currentOrder?.orderItems
  );
  const categories = useMemo(() => {
    // return array of categories after
    const temp: ICategory[] = [];
    orderItems?.forEach((i) => {
      if (!temp.find((category) => category.id === i.item.category.id)) {
        temp.push(i.item.category);
      }
    });
    return temp;
  }, [orderItems]);

  // console.log(orderItems);

  const isOnCurrentOrderPage =
    location.pathname === `/orders/${currentOrder?.id}`;
  const [comment, setComment] = useState("");
  const [modalItemId, setModalItemId] = useState<number | null>(null);
  // const [localItems, setLocalItems] = useState<IOrderItem[]>([]);
  const emoji = "\ud83d\udd89";
  const hasSomeUnsentItems =
    Array.isArray(currentOrder?.orderItems) &&
    currentOrder?.orderItems?.some((orderItem) => !orderItem.sent);

  // Le hook useEffect est utilisé pour exécuter du code après le rendu du composant.
  useEffect(() => {
    const url = new URL("http://45.147.98.243:2020/.well-known/mercure");
    url.searchParams.append("authorization", import.meta.env.VITE_MERCURE_JWT);
    url.searchParams.append("topic", `orders`);
    const es = new EventSource(url, { withCredentials: true });
    console.log(orderItems);
    // Cette fonction est appelée chaque fois qu'un message est reçu du serveur Mercure.
    es.onmessage = (event) => {
      // console.log("ouiii ça a marché !", event);
      // Vous parsez le message reçu pour le convertir en objet JavaScript.
      const updatedOrder = JSON.parse(event.data);
      // console.log(updatedOrder, event.data);

      dispatch(updateSpecificOrder(updatedOrder));
    };
    return () => {
      es?.close();
    };
    // La dépendance [dispatch] signifie que le code à l'intérieur de useEffect sera exécuté chaque fois que la fonction dispatch change.
    // En pratique, avec Redux, dispatch ne change jamais, donc useEffect ne s'exécutera qu'une fois, similaire à componentDidMount.
  }, [dispatch]);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleOpenModal = (itemId: number) => {
    const itemComment =
      orderItems?.find((item) => item.id === itemId)?.comment || "";
    setComment(itemComment);
    setModalItemId(itemId);
  };

  const handleCloseModal = () => {
    setModalItemId(null);
  };

  // Utilisation de `useCallback` pour mémoriser la fonction et éviter des re-rendus inutiles.
  // Cette fonction est appelée lorsque l'utilisateur clique sur le bouton "moins" pour un article.
  const handleMinusClick = useCallback(
    (itemId: number) => {
      // Vérifie si une commande actuelle existe.
      if (currentOrder) {
        // Si oui, déclenche l'action pour soustraire un article de la commande actuelle.
        // L'action prend l'ID de la commande actuelle et l'ID de l'article comme arguments.
        dispatch(
          minusItemToCurrentOrderThunk({ orderId: currentOrder.id, itemId })
        );
      }
    },
    // Les dépendances de `useCallback` sont `currentOrder` et `dispatch`.
    // Cela signifie que la fonction sera mémorisée tant que `currentOrder` et `dispatch` ne changent pas.
    [currentOrder, dispatch]
  );

  // Utilisation de `useCallback` pour mémoriser la fonction et éviter des re-rendus inutiles.
  // Cette fonction est appelée lorsque l'utilisateur clique sur le bouton "plus" pour un article.

  const handlePlusClick = useCallback(
    (itemId: number) => {
      // Vérifie si une commande actuelle existe.
      if (currentOrder) {
        // Si oui, déclenche l'action pour ajouter un article à la commande actuelle.
        // L'action prend l'ID de la commande actuelle et l'ID de l'article comme arguments.
        dispatch(
          plusItemToCurrentOrderThunk({ orderId: currentOrder.id, itemId })
        );
      }
    },
    // Les dépendances de `useCallback` sont `currentOrder` et `dispatch`.
    // Cela signifie que la fonction sera mémorisée tant que `currentOrder` et `dispatch` ne changent pas.
    [currentOrder, dispatch]
  );
  // Fonction pour gérer le changement de statut de la commande.
  const handleStatusClick = (orderId: number, orderStatus: number) => {
    if (currentOrder) {
      dispatch(changeStatusOrderThunk({ orderId, orderStatus }));
      toggleVisibility();
      navigate("/");
    }
  };
  // Fonction pour soumettre le commentaire d'un article.
  const handleSubmit = () => {
    if (currentOrder && modalItemId !== null) {
      dispatch(
        editCommOrderThunk({
          orderId: currentOrder.id,
          itemId: modalItemId,
          comment,
        })
      );
      handleCloseModal();
    }
  };
  // Fonction pour gérer le clic sur le bouton de paiement.
  const handleCheckoutClick = () => {
    if (currentOrder) {
      // setLocalItems([]);
      handleStatusClick(currentOrder.id, currentOrder.status);
      dispatch(deleteOrderThunk(currentOrder.id));
      toggleVisibility();
      navigate("/");
    }
  };
  // Fonction pour ajuster la hauteur du textarea en fonction de son contenu.
  const adjustTextareaHeight = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentOrder && (
        <div className="collapse-container">
          <div className={`collapse ${isVisible ? "visible" : ""}`}>
            <h5>Order {currentOrder.id}</h5>
            <h5>Table {currentOrder.relatedTable?.number}</h5>
            {!isOnCurrentOrderPage && (
              <button
                type="button"
                className="btn"
                onClick={() => navigate(`/orders/${currentOrder.id}`)}
              >
                View Order Details
              </button>
            )}
            <ul className="list">
              <li className="list-titles">
                <h4>Name</h4>
                <h4>Quantity</h4>
                <h4>Comment</h4>
              </li>

              {categories?.map((category) => {
                // on affiche le nom de la categorie
                return (
                  <div key={`category-${category.id}`}>
                    <h3>{category.name}</h3>
                    {orderItems?.map((item) => {
                      // if item.item.categoryId  === category.id, on l'affiche
                      return (
                        item.item.category.id === category.id && (
                          <li className="list-li" key={`item-${item.id}`}>
                            <div
                              className={`list-li-div ${
                                item.sent ? "item-sent" : ""
                              }`}
                            >
                              {item.item.name}
                            </div>
                            <div className="list-li-div">{item.quantity}</div>
                            {isOnCurrentOrderPage && (
                              <div className="counter list-li-div">
                                <button
                                  type="button"
                                  className={`btn minusPlusBtn ${
                                    item.sent ? "notclickable" : ""
                                  }`}
                                  onClick={() => handleMinusClick(item.id)}
                                  key={`minus-${item.id}`}
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  className={`btn minusPlusBtn ${
                                    item.sent ? "notclickable" : ""
                                  }`}
                                  onClick={() => handlePlusClick(item.id)}
                                  key={`plus-${item.id}`}
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => handleOpenModal(item.id)}
                                  type="button"
                                  className={`btn ${
                                    item.sent ? "notclickable" : ""
                                  }`}
                                  key={`comm-${item.id}`}
                                >
                                  {emoji}
                                </button>
                                {modalItemId === item.id && (
                                  <div className="modal">
                                    <div className="modal-content">
                                      <h2>Add Comment</h2>
                                      <textarea
                                        value={comment}
                                        onChange={(e) => {
                                          setComment(e.target.value);
                                          adjustTextareaHeight(e);
                                        }}
                                        onInput={adjustTextareaHeight}
                                        placeholder="Write your comment here..."
                                      />
                                      <button
                                        type="button"
                                        className="btn"
                                        onClick={handleSubmit}
                                      >
                                        Submit
                                      </button>
                                      <button
                                        type="button"
                                        className="btn"
                                        onClick={handleCloseModal}
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </li>
                        )
                      );
                    })}
                  </div>
                );
              })}

              {currentOrder.status !== 1 && hasSomeUnsentItems ? (
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    handleStatusClick(currentOrder.id, currentOrder.status)
                  }
                >
                  {currentOrder.status === 0 && "send"}
                  {currentOrder.status === 2 && "edit"}
                </button>
              ) : (
                currentOrder.status === 2 && (
                  <button
                    type="button"
                    className={`btn ${
                      hasSomeUnsentItems ? "notclickable" : ""
                    }`}
                    onClick={
                      !hasSomeUnsentItems ? handleCheckoutClick : undefined
                    }
                  >
                    checkout
                  </button>
                )
              )}
            </ul>
          </div>
          <button
            type="button"
            className="toggle-button"
            onClick={toggleVisibility}
          >
            {isVisible ? "\u25BC" : "\u25B2"}
          </button>
        </div>
      )}
    </>
  );
}

export default CollapseOrder;
