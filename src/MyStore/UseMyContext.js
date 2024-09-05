import { createContext, useContext } from "react";

// 1) Firstly Create Context
export const MyContext = createContext();

// 2) Secondly We can use useMyContext anyWhere for Accessing Props 
export const useMyContext = () => {
    return useContext(MyContext);
}

// 3) You can Create a Provider and Wrapp Your App inside the Provider
export const MyProvider = MyContext.Provider;