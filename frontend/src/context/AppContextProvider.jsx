import { createContext, useEffect, useState } from "react";
import useGet from "../utils/useGet";
import useLocalStorage from "../utils/useLocalStorage";
import { getUserLocation } from "../utils/GetLocation.js";

export const AppContext = createContext({});
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user");
  const [userLocation, setUserLocation] = useLocalStorage("userLocation");
  const [locationSuccessful, setLocationSuccessful] =
    useLocalStorage("locationSuccessful");

  useEffect(() => {
    getUserLocation(setUserLocation, setLocationSuccessful);
  }, []);

  const context = {
    user,
    setUser,
    userLocation,
    locationSuccessful,

    API_BASE_URL,
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
