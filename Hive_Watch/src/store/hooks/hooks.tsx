import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// Typed hook for dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed hook for selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
