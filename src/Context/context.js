import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [searchquery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [savedCred,setSavedCred]=useState({long:"",lat:""})
  return (
    <Context.Provider
      value={{
        searchquery,
      setSearchQuery,
      search,
      setSearch,
      savedCred,
     setSavedCred
      }}
    >
      {children}
    </Context.Provider>
  );
};
