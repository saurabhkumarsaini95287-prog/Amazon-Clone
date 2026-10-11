import React from "react";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {

const order = JSON.parse(localStorage.getItem("lastOrder"));

    return (
        <div className="order-success-page">

            <div className="success-box">

                <div className="success-icon">
                    ✓
                </div>

                <h1>Order Placed Successfully!</h1>

                <p className="success-message">
                    Thank you for shopping with us.
                </p>

                <p>
                    Your order has been placed successfully.
                </p>

                {order && (
    <div className="order-details">

        <p>
            <strong>Order ID:</strong> {order._id}
        </p>

        <p>
            <strong>Total Amount:</strong> ₹{order.totalAmount}
        </p>

        <p>
            <strong>Payment Method:</strong>{" "}
            {order.paymentMethod === "COD"
                ? "Cash on Delivery"
                : order.paymentMethod === "UPI"
                ? "UPI"
                : "Credit / Debit Card"}
        </p>

    </div>
)}

                <div className="success-buttons">

                    <Link to="/orders" className="view-orders-btn">
                        View My Orders
                    </Link>

                    <Link to="/" className="continue-shopping-btn">
                        Continue Shopping
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default OrderSuccess;