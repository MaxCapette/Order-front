// Importe les fonctions `createAction` et `createReducer` de la bibliothèque Redux Toolkit.
import { createAction, createReducer } from "@reduxjs/toolkit";

// Importe le type `IOrder` depuis le dossier des types.
import { IOrder } from "../../@types/order";

// Importe plusieurs thunks (fonctions asynchrones) depuis le dossier des middlewares pour les commandes.
import {
  addItemToCurrentOrderThunk,
  deleteOrderThunk,
  editCommOrderThunk,
  fetchOrderByTableIdThunk,
  fetchOrderThunk,
  fetchOrdersKitchenThunk,
  fetchOrdersThunk,
  minusItemToCurrentOrderThunk,
  plusItemToCurrentOrderThunk,
} from "../middlewares/orders";

// Définit l'interface pour la forme de l'état global des commandes.
interface RootState {
  list: IOrder[]; // Liste de toutes les commandes.
  currentOrder: IOrder | null; // La commande actuellement sélectionnée ou null si aucune n'est sélectionnée.
}

// Initialise l'état par défaut pour les commandes.
export const initialState: RootState = {
  list: [],
  currentOrder: null,
};

// Crée une action pour mettre à jour une commande spécifique dans la liste des commandes.
export const updateSpecificOrder = createAction<IOrder>("orders/UPDATE_LIST");

// Crée le réducteur pour les commandes en utilisant la fonction `createReducer`.
const ordersReducer = createReducer(initialState, (builder) => {
  builder
    // Gère le cas où la requête pour récupérer toutes les commandes est réussie.
    .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
      // Met à jour la liste des commandes avec les données renvoyées par l'action.
      state.list = action.payload;
    })
    // Gère le cas où la requête pour récupérer toutes les commandes échoue.
    .addCase(fetchOrdersThunk.rejected, () => {
      // Affiche un message d'erreur dans la console.
      // console.log("rejected");
    })
    // Gère le cas où la requête pour récupérer toutes les commandes pour la cuisine est réussie.
    .addCase(fetchOrdersKitchenThunk.fulfilled, (state, action) => {
      // Met à jour la liste des commandes avec les données renvoyées par l'action.
      state.list = action.payload;
    })
    // Gère le cas où la requête pour récupérer toutes les commandes pour la cuisine échoue.
    .addCase(fetchOrdersKitchenThunk.rejected, () => {
      // Affiche un message d'erreur dans la console.
      // console.log("rejected");
    })
    // Gère le cas où la requête pour récupérer une commande spécifique est réussie.
    .addCase(fetchOrderThunk.fulfilled, (state, action) => {
      // Affiche un message dans la console pour indiquer que les articles ont été récupérés.
      console.log("fetched items");
      // Si des données sont renvoyées par l'action, met à jour la commande actuelle avec ces données.
      if (action.payload) {
        state.currentOrder = action.payload;
      }
    })
    // Gère le cas où la requête pour récupérer une commande spécifique échoue.
    .addCase(fetchOrderThunk.rejected, () => {
      // Affiche un message d'erreur dans la console.
      // console.log("fetch order rejected");
    })
    // Gère le cas où la requête pour récupérer une commande par l'ID de la table est réussie.
    .addCase(fetchOrderByTableIdThunk.fulfilled, (state, action) => {
      // Met à jour la commande actuelle avec les données renvoyées par l'action.
      state.currentOrder = action.payload;
    })
    // Gère le cas où la requête pour récupérer une commande par l'ID de la table échoue.
    .addCase(fetchOrderByTableIdThunk.rejected, () => {
      // Affiche un message d'erreur dans la console.
      // console.log("rejected");
    })
    // Gère le cas où la requête pour ajouter un article à la commande actuelle est réussie.
    .addCase(addItemToCurrentOrderThunk.fulfilled, (state, action) => {
      // Met à jour la commande actuelle avec les données renvoyées par l'action.
      state.currentOrder = action.payload;
    })
    // Gère le cas où la requête pour ajouter un article à la commande actuelle échoue.
    .addCase(addItemToCurrentOrderThunk.rejected, () => {
      // Affiche un message d'erreur dans la console.
      // console.log("rejected");
    })
    // Gère le cas où la requête pour augmenter la quantité d'un article dans la commande actuelle est réussie.
    .addCase(plusItemToCurrentOrderThunk.fulfilled, (state, action) => {
      // Met à jour la commande actuelle avec les données renvoyées par l'action.
      state.currentOrder = action.payload;
    })
    // Gère le cas où la requête pour augmenter la quantité d'un article dans la commande actuelle échoue.
    .addCase(plusItemToCurrentOrderThunk.rejected, () => {
      // Affiche un message d'erreur dans la console.
      // console.log("rejected");
    })
    // Gère le cas où la requête pour diminuer la quantité d'un article dans la commande actuelle est réussie.
    .addCase(minusItemToCurrentOrderThunk.fulfilled, (state, action) => {
      // Met à jour la commande actuelle avec les données renvoyées par l'action.
      state.currentOrder = action.payload;
    })
    // Gère le cas où la requête pour diminuer la quantité d'un article dans la commande actuelle échoue.
    .addCase(minusItemToCurrentOrderThunk.rejected, () => {
      // Affiche un message d'erreur dans la console.
      // console.log("rejected");
    })
    // Gère le cas où la requête pour éditer le commentaire d'un article dans la commande actuelle est réussie.
    .addCase(editCommOrderThunk.fulfilled, (state, action) => {
      // Met à jour la commande actuelle avec les données renvoyées par l'action.
      state.currentOrder = action.payload;
    })
    // Gère le cas où la requête pour éditer le commentaire d'un article dans la commande actuelle échoue.
    .addCase(editCommOrderThunk.rejected, () => {
      // Affiche un message d'erreur dans la console.
      // console.log("rejected");
    })
    // Gère le cas où la requête pour supprimer la commande actuelle est réussie.
    .addCase(deleteOrderThunk.fulfilled, (state, action) => {
      // Met à jour la commande actuelle avec les données renvoyées par l'action (probablement null).
      state.currentOrder = action.payload;
    })
    // Gère le cas où la requête pour supprimer la commande actuelle échoue.
    .addCase(deleteOrderThunk.rejected, () => {
      // Affiche un message d'erreur dans la console.
      // console.log("rejected");
    })
    // Gère le cas où une action pour mettre à jour une commande spécifique est dispatchée.
    .addCase(updateSpecificOrder, (state, action) => {
      // Récupère la commande mise à jour depuis l'action.
      const updatedOrder = action.payload;
      // Vérifie si la commande mise à jour est valide.
      if (!updatedOrder || !updatedOrder.id) {
        // Si elle ne l'est pas, affiche un message d'erreur dans la console.
        // console.error("Invalid order:", updatedOrder);
        return;
      }
      // Met à jour la liste des commandes en remplaçant la commande existante par la commande mise à jour.
      state.list = state.list.map((order) => {
        if (order.id !== updatedOrder.id) {
          return order;
        }
        return updatedOrder;
      });
      // update currentOrder
      if (state.currentOrder && state.currentOrder.id === updatedOrder.id) {
        state.currentOrder = updatedOrder;
      }
    });
});

// Exporte le réducteur pour être utilisé dans le store Redux.
export default ordersReducer;
