import { createAction, createReducer } from "@reduxjs/toolkit";
import myAxiosInstance from "../../api/axios";
import { saveToLocalStorage } from "../../localStorage/localStorage";

export interface RootState {
  id: number;
  logged?: boolean;
  login?: string;
  token: null | string;
  roles?: [];
  name: string;
  lastname: string;
}

export const initialState: RootState = {
  id: 0,
  logged: false,
  login: "",
  token: null,
  name: "",
  lastname: "",
  roles: [],
};

export const getActionDisconnect = createAction("login/DISCONNECT");
export const getActionLogin = createAction<{
  token: string;
  id: number;
  name: string;
  roles: [];
}>("login");
// export const refreshFromLocalStorage = createAction<{}>("login/REFRESH");

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getActionLogin, (state, action) => {
      // mettre isLogged à true dans le state
      // enregistrer le speudo et le tocken dans le state
      // console.log(action.id, action.token);
      state.logged = true;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.roles = action.payload.roles;
      // on va enregistrer les entetes header autorisation dans l'instance d'axios
      myAxiosInstance.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`;

      // on va aussi enregistrer le token dans le localStorage
      saveToLocalStorage("auth", {
        token: action.payload.token,
        id: action.payload.id,
        name: action.payload.name,
        roles: action.payload.roles,
      });

      // state.errorMessage = null;
    })
    // .addCase(login.rejected, (state, action) => {
    //   // enregistrer un message d'erreur
    //   state.errorMessage = "erreur de connexion";
    // })
    .addCase(getActionDisconnect, (state) => {
      // on met logged à false
      state.logged = false;
      // detruit auth dans le local storage
      delete myAxiosInstance.defaults.headers.common.Authorization;
      localStorage.removeItem("auth");
    });
});

export default userReducer;
