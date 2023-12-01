import React, {createContext, useContext, useState} from "react";

  const SearchTermContext = createContext({
      searchTerm: '',
      setSearchTerm: () => {}
  });

 function SearchTermProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchTermContext.Provider>
    );
}

function useSearchTermContext() {
     return useContext(SearchTermContext);
}

export {SearchTermProvider,useSearchTermContext}