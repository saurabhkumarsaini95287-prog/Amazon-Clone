import React, { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");

        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <cartContext.Provider value={{ cart, setCart }}>
            {children}
        </cartContext.Provider>
    );
};

export default CartProvider;