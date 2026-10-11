import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import { Link } from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:8000/api/order/my-orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data);

            if (response.data.status) {
                setOrders(response.data.orders);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="orders-page">
            <h1>My Orders</h1>

            <Link to="/" className="back-home">
                   ← Back to Home
            </Link>
              {orders.length === 0 ? (
                 <div className="no-orders">
                   <h2>No orders yet</h2>
                  <p>You haven't placed any orders yet.</p>

             <Link to="/" className="shop-now-btn">
                      Start Shopping
             </Link>
          </div>
              ) : (
                orders.map((order) => (
                    <div className="order-card" key={order._id}>

                        <div className="order-header">
                            <span>Order ID: {order._id}</span>
                            <span className="order-status">
                                {order.status}
                            </span>
                        </div>

                        {order.items.map((item, index) => (
                            <div className="order-items" key={index}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                                <div>
                                    <p><strong>{item.name}</strong></p>
                                    <p>
                                        ₹{item.price} × {item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <p className="order-total">
                            Total Amount: ₹{order.totalAmount}
                        </p>

                        <p className="payment-method">
                           Payment Method: {
                           order.paymentMethod === "COD"
                             ? "Cash on Delivery"
                             : order.paymentMethod === "UPI"
                             ? "UPI"
                             : "Credit / Debit Card"
                 }
                        </p>

                        <p>
                       Order Date: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    
                    <div className="delivery-address">
                         <h3>Delivery Address</h3>
                        <p>{order.deliveryAddress.name}</p>
                        <p>{order.deliveryAddress.phone}</p>
                        <p>{order.deliveryAddress.address}</p>
                <p>  
                   {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
                 </p>
             </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;