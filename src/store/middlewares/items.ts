/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import myAxiosInstance from "../../api/axios";

// ---- 6/ creation du thunk avec createAsyncThunk de toolkit

export const fetchItemsThunk = createAsyncThunk(
  // nom de l'action :
  "items/GET_ITEMS",
  // fonction asynchrone : c'est ici qu'on va faire l'appel AJAX
  async () => {
    // ---- 7/ ecriture de la requete API dans le thunk
    // console.log("result");
    const result = await myAxiosInstance.get("/items");
    // console.log(result);

    // ---- 10/ return dans le thunk de la réponse de l'API : elle sera dispo dans le payload de l'action fullfilled
    return result.data;
  }
);
export const fetchItemsByCategoryIdThunk = createAsyncThunk(
  // nom de l'action :
  "items/GET_ITEMS_BY_CATEGORY",
  // fonction asynchrone : c'est ici qu'on va faire l'appel AJAX
  async (id: string) => {
    // ---- 7/ ecriture de la requete API dans le thunk
    // console.log("result");
    const result = await myAxiosInstance.get(`/categories/${id}/items`);
    console.log(result);

    // ---- 10/ return dans le thunk de la réponse de l'API : elle sera dispo dans le payload de l'action fullfilled
    return result.data;
  }
);
