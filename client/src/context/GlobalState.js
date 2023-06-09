import React, { createContext, useReducer, useContext } from "react";

import jwtDecode from "jwt-decode";

let user = JSON.parse(localStorage.getItem("user"));
let cart = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  currentUser: user ? jwtDecode(user.access) : null,
  currentUserToken: user ? user.access : null,
  cart: cart ? cart : []
};

const GlobalStateContext = createContext(initialState);
const DispatchStateContext = createContext(undefined);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    initialState
  );
    console.log(state);
  return (
    <GlobalStateContext.Provider value={state}>
      <DispatchStateContext.Provider value={dispatch}>
        {children}
      </DispatchStateContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => [
  useContext(GlobalStateContext),
  useContext(DispatchStateContext),
];
