import { Link, useNavigate } from "react-router-dom";
import { getActionDisconnect } from "../../store/reducers/userReducer"; // Ajustez le chemin d'importation en fonction de votre structure de projet
import "./Login.scss"; // Assurez-vous que le chemin vers le fichier SCSS est correct
import { useAppDispatch } from "../../hooks/redux";

function Logout() {
  // Utilisation du hook dispatch pour envoyer des actions à Redux.
  const dispatch = useAppDispatch();

  // Utilisation du hook navigate pour la navigation.
  const navigate = useNavigate();

  // Message indiquant que l'utilisateur est connecté.
  const loggedMessage = "Vous êtes connecté !";

  // Définition de la fonction handleDisconnect qui sera appelée lors de la déconnexion.
  const handleDisconnect = () => {
    // Suppression du token du localStorage.
    localStorage.removeItem("token");

    // Envoi d'une action pour gérer la déconnexion.
    dispatch(getActionDisconnect());

    // Redirection de l'utilisateur vers la page de connexion.
    navigate("/login");
  };

  return (
    <div className="login-form">
      <div className="login-form-logged">
        <p className="login-form-message">{loggedMessage}</p>
        <button
          type="button"
          className="login-form-button"
          onClick={handleDisconnect}
        >
          Logout
        </button>
        <Link to="/" className="login-form-button">
          back
        </Link>
      </div>
    </div>
  );
}

export default Logout;
