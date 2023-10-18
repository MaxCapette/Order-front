// Importation des hooks nécessaires depuis "react-redux".
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// Importation des types depuis le fichier "store".
import type { RootState, AppDispatch } from "../store";

// Création d'un hook personnalisé pour le dispatch qui utilise le type AppDispatch.
// Utilisez ce hook dans votre application à la place du `useDispatch` standard.
export const useAppDispatch: () => AppDispatch = useDispatch;

// Création d'un hook personnalisé pour la sélection qui utilise le type RootState.
// Utilisez ce hook dans votre application à la place du `useSelector` standard.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
