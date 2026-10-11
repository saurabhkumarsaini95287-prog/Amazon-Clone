import React, { createContext, useState } from "react";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {

    // Search box me jo user type karega
    const [searchText, setSearchText] = useState("");

    // Search button click ke baad actual search
    const [searchResult, setSearchResult] = useState("");

    return (
        <SearchContext.Provider
            value={{
                searchText,
                setSearchText,
                searchResult,
                setSearchResult
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;