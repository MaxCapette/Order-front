// Importation des outils nécessaires depuis les bibliothèques.
import { createReducer } from "@reduxjs/toolkit";
import { ICategory } from "../../@types/order";
import { fetchCategoriesThunk } from "../middlewares/categories";

// Définition de l'interface pour le state global des catégories.
interface RootState {
  list: ICategory[];
}

// Initialisation du state par défaut pour les catégories.
export const initialState: RootState = {
  list: [],
};

// Création du reducer pour les catégories en utilisant "createReducer" de Redux Toolkit.
const categoriesReducer = createReducer(initialState, (builder) => {
  builder
    // En cas de succès de la requête pour récupérer les catégories.
    .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
      // Mise à jour de la liste des catégories avec les données reçues.
      state.list = action.payload;
      // console.log("fulfilled");
    })
    // En cas d'échec de la requête pour récupérer les catégories.
    .addCase(fetchCategoriesThunk.rejected, () => {
      // Log pour indiquer que la requête a échoué.
      // console.log("rejected");
    });
});

// Exportation du reducer pour l'utiliser dans le store Redux.
export default categoriesReducer;
