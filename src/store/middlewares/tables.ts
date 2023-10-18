/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import myAxiosInstance from "../../api/axios";

// ---- 6/ creation du thunk avec createAsyncThunk de toolkit

export const fetchTablesThunk = createAsyncThunk(
  // nom de l'action :
  "tables/GET_TABLES",
  // fonction asynchrone : c'est ici qu'on va faire l'appel AJAX
  async () => {
    // ---- 7/ ecriture de la requete API dans le thunk
    // console.log("result");
    const result = await myAxiosInstance.get("/tables");
    // console.log(result);

    // ---- 10/ return dans le thunk de la réponse de l'API : elle sera dispo dans le payload de l'action fullfilled
    return result.data;
  }
);
