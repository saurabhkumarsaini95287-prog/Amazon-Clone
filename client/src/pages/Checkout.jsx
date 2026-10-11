import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { cartContext } from "../context/cartContext";
import "./Checkout.css";

const Checkout = () => {
    const { cart } = useContext(cartContext);

    const [address, setAddress] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: ""
    });

    const [discount, setDiscount] = useState(0);
    const [offerApplied, setOfferApplied] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("COD");

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
    );

    const finalAmount = subtotal - discount;

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const applyOffer = () => {
        if (!offerApplied) {
            setDiscount(Math.round(subtotal * 0.1));
            setOfferApplied(true);
        }
    };

    const placeOrder = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login before placing an order");
            window.location.href = "/login";
            return;
        }

        if (!cart.length) {
            alert("Your cart is empty");
            window.location.href = "/cart";
            return;
        }

        const { name, phone, address: userAddress, city, pincode } = address;

        if (!name || !phone || !userAddress || !city || !pincode) {
            alert("Please fill all delivery address details");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit mobile number");
            return;
        }

        if (!/^\d{6}$/.test(pincode)) {
            alert("Please enter a valid 6-digit PIN code");
            return;
        }

        try {
            const { data } = await axios.post(
                "http://localhost:8000/api/order/create",
                {
                    items: cart,
                    totalAmount: finalAmount,
                    deliveryAddress: address,
                    paymentMethod
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (data.status) {
                localStorage.setItem("lastOrder", JSON.stringify(data.order));
                localStorage.removeItem("cart");
                window.location.href = "/order-success";
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Order placement failed");
        }
    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>

            <Link to="/cart" className="back-cart">
                ← Back to Cart
            </Link>

            <div className="checkout-container">

                <div className="checkout-address">
                    <h2>Delivery Address</h2>

                    {["name", "phone", "address", "city", "pincode"].map(
                        (field) => (
                            <input
                                key={field}
                                name={field}
                                type="text"
                                placeholder={
                                    field === "pincode"
                                        ? "PIN Code"
                                        : field === "phone"
                                        ? "Mobile Number"
                                        : field === "name"
                                        ? "Full Name"
                                        : field[0].toUpperCase() + field.slice(1)
                                }
                                value={address[field]}
                                onChange={handleChange}
                            />
                        )
                    )}
                </div>

                <div className="order-summary">
                    <h2>Order Summary</h2>

                    {cart.map((item) => (
                        <div className="summary-item" key={item.name}>
                            <img src={item.image} alt={item.name} />

                            <div>
                                <p>{item.name}</p>
                                <span>
                                    ₹{item.price} × {item.quantity || 1}
                                </span>
                            </div>
                        </div>
                    ))}

                    <hr />

                    <p>Total Products: {cart.length}</p>
                    <p>Subtotal: ₹{subtotal}</p>

                    <div className="offer-box">
                        <h3>🎁 Special Offer</h3>
                        <p>Get 10% OFF on your order</p>

                        <button
                            onClick={applyOffer}
                            disabled={offerApplied}
                        >
                            {offerApplied ? "Offer Applied" : "Apply Offer"}
                        </button>
                    </div>

                    <div className="payment-box">
                        <h3>Payment Method</h3>

                        {[
                            ["COD", "Cash on Delivery"],
                            ["UPI", "UPI"],
                            ["CARD", "Credit / Debit Card"]
                        ].map(([value, label]) => (
                            <label key={value}>
                                <input
                                    type="radio"
                                    value={value}
                                    checked={paymentMethod === value}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />
                                {label}
                            </label>
                        ))}
                    </div>

                    {offerApplied && (
                        <p className="discount">
                            Discount: -₹{discount}
                        </p>
                    )}

                    <h2>Final Amount: ₹{finalAmount}</h2>

                    <button onClick={placeOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;