// Importation des composants nécessaires depuis la bibliothèque react-router-dom.
import { Link, useNavigate } from "react-router-dom";
// Importation du type ITable.
import { ITable } from "../../@types/order";
// Importation des hooks personnalisés pour Redux.
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
// Importation du thunk pour ajouter une commande.
import { addOrderThunk } from "../../store/middlewares/orders";

import "./Table.scss";

// Définition du composant Table.
function Table({ table }: { table: ITable }) {
  // Utilisation du hook pour dispatcher des actions Redux.
  const dispatch = useAppDispatch();
  // Utilisation du hook pour naviguer entre les routes.
  const navigate = useNavigate();
  // Récupération de l'ID de l'utilisateur associé à la commande de la table.
  const userId = table.relatedOrder?.user?.id;
  // Récupération de l'utilisateur actuellement connecté depuis le state Redux.
  const currentUser = useAppSelector((state) => state.user);
  // Vérification si l'utilisateur actuel est le propriétaire de la table.
  const isOwner = userId === currentUser.id;
  // Vérification si la table n'a pas de propriétaire.
  const isUnowned = !userId;
  // Mappage des statuts des commandes à leurs descriptions.
  const statusMapping = {
    0: "In progress",
    1: "Cooking",
    2: "Waiting payment",
  };
  // Mappage des statuts des commandes à leurs classes CSS.
  const statusClassMapping = {
    0: "status-in-progress",
    1: "status-cooking",
    2: "status-waiting-payment",
  };
  const status = table.relatedOrder?.status;
  const className =
    statusClassMapping[status as keyof typeof statusClassMapping] ||
    "freeTable";
  const pName =
    statusMapping[status as keyof typeof statusClassMapping] || "Free table";

  // Fonction pour gérer le clic sur une table.
  const handleTableClick = async (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    // Prévention du comportement par défaut du clic.
    event.preventDefault();
    // Si la table n'a pas de propriétaire.
    if (
      isUnowned &&
      typeof currentUser.id === "number" &&
      typeof table.id === "number"
    ) {
      try {
        // Tentative d'ajout d'une commande pour la table.

        const actionResult = await dispatch(
          addOrderThunk({ user_id: currentUser.id, relatedTable_id: table.id })
        );
        // Récupération de la commande créée.
        const createdOrder = actionResult.payload;
        // Récupération de l'ID de la commande créée.
        const createdOrderId = createdOrder.id;
        // Affichage de l'ID de la commande créée dans la console.
        // console.log("Created order ID:", createdOrderId);
        // Navigation vers la page de la commande créée.
        navigate(`/orders/${createdOrderId}`);
      } catch (error) {
        // Affichage de l'erreur dans la console en cas d'échec.
        console.error("Failed to create order:", error);
      }
    } else if (isOwner) {
      // Si l'utilisateur actuel est le propriétaire de la table, navigation vers la page de la commande existante.
      navigate(`/orders/${table.relatedOrder?.id}`);
    }
  };

  // Rendu du composant.
  return isOwner || isUnowned ? (
    // Si l'utilisateur actuel est le propriétaire ou si la table n'a pas de propriétaire, affichage d'un lien vers la commande.
    <Link to={`/orders/${table.relatedOrder?.id}`} onClick={handleTableClick}>
      <div className={`card w-96 bg-base-100 shadow-xl ${className}`}>
        <div className="card-title">
          <h3 className="card-title">Table {table.number}</h3>
          <p>{table.covers} covers</p>
          {table.relatedOrder && <p>Order {table.relatedOrder.id}</p>}
          <p>{pName}</p>
        </div>
      </div>
    </Link>
  ) : (
    // Sinon, affichage des informations de la table sans lien.
    <div className="card w-96 bg-base-100 shadow-xl">
      <h3 className="card-title">Table {table.number}</h3>
      <p>{table.covers} covers</p>
      <p>{table.relatedOrder?.user?.lastname}</p>
    </div>
  );
}

export default Table;
