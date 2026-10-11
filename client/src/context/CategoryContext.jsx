import React, { createContext, useState } from "react";

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [category, setCategory] = useState("all");

    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;