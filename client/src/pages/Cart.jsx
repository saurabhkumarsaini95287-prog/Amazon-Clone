import React, { useContext } from "react";
import { cartContext } from "../context/cartContext";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, setCart } = useContext(cartContext);

    const removeItem = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    const increaseQty = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
};

const decreaseQty = (index) => {
    const updatedCart = [...cart];

    if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity -= 1;
    }

    setCart(updatedCart);
};

   const totalAmount = cart.reduce((total, item) => {
    return total + (item.price || 0) * (item.quantity || 1);
}, 0);

    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>

            <Link to="/" className="back-home">
                  ← Back to Home
           </Link>

            {cart.length === 0 ? (
                <h2>Your cart is empty</h2>
            ) : (
                <>
                    <div className="cart-container">

                        {cart.map((item, index) => (
                            <div className="cart-item" key={index}>

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    width="150"
                                />
                
                 <div className="cart-product">
                      <h2>{item.name}</h2>

                    <p>Price: ₹{item.price}</p>

                   <div className="quantity">
                    <button onClick={() => decreaseQty(index)}>-</button>

                    <span>{item.quantity || 1}</span>

                    <button onClick={() => increaseQty(index)}>+</button>
                   </div>
               </div>

                                <button
                                    onClick={() => removeItem(index)}
                                    className="remove-btn"
                                >
                                    Remove
                                </button>

                            </div>
                        ))}

                    </div>

                    <div className="cart-total">
                        <h2>Total Amount: ₹{totalAmount}</h2>
                    
                    <Link to="/checkout" className="checkout-btn">
                          Proceed to Checkout
                    </Link>

                     <button
                        className="clear-cart-btn"
                        onClick={() => setCart([])}
                       >
                          Clear Cart
                    </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;