import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import login from "../../api/login";
import { useAppDispatch } from "../../hooks/redux";
import { getActionLogin } from "../../store/reducers/userReducer";

function Login() {
  // Initialisation de l'état pour le nom d'utilisateur avec une valeur initiale vide.
  const [username, setUsername] = useState("");

  // Initialisation de l'état pour le mot de passe avec une valeur initiale vide.
  const [password, setPassword] = useState("");

  // Initialisation de l'état pour l'utilisateur.
  // const [user, setUser] = useState();

  // Initialisation de l'état pour les erreurs avec une valeur initiale vide.
  const [error, setError] = useState("");

  // Utilisation du hook navigate pour la navigation.
  const navigate = useNavigate();

  // Utilisation du hook dispatch pour envoyer des actions à Redux.
  const dispatch = useAppDispatch();

  // Définition de la fonction handleLogin qui sera appelée lors de la tentative de connexion.
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // Empêche le comportement par défaut du formulaire.
    e.preventDefault();

    try {
      // Tentative de connexion avec le nom d'utilisateur et le mot de passe.
      const response = await login(username, password);

      // Extraction du token et de l'ID de la réponse.
      const {
        token,
        data: { id, name, roles },
      } = response;
      // console.log(response);

      // Envoi d'une action pour gérer la connexion.
      dispatch(getActionLogin({ token, id, name, roles }));
      // if (response.data.roles.includes("ROLE_KITCHEN")) {
      //   navigate("/kitchen");
      // } else {
      //   navigate("/");
      // }
      navigate("/");
      // Redirection vers la page d'accueil.

      // (Commentaire de débogage) Affichage des données de la réponse.
      // console.log(response.data);
    } catch (error) {
      // Gestion des erreurs de connexion.
      setError("Invalid credentials");
    }
  };
  // const userRole = useAppSelector((state) => state.user.roles);
  // console.log(userRole);

  // Message indiquant que l'utilisateur est connecté.
  // const loggedMessage = "You are login!";

  return (
    <>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          className="settings-input"
          placeholder="username"
          value={username} // control en lecture : on affiche la donnée de redux
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="settings-input"
          placeholder="password"
          value={password} // control en lecture : on affiche la donnée de redux
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-form-button">
          Login
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </>
  );
}
export default Login;
