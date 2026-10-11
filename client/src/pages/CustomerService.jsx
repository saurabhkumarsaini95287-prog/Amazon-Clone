import React, { useState } from "react";
import "./CustomerService.css";

const CustomerService = () => {
    const [option, setOption] = useState("");

    return (
        <div className="customer-service">
            <div className="customer-service-box">

                {!option && (
                    <>
                        <h1>📞 Customer Service</h1>
                        <p>How can we help you?</p>

                        <button onClick={() => setOption("order")}>
                            📦 Order Help
                        </button>

                        <button onClick={() => setOption("return")}>
                            🔄 Return & Refund
                        </button>

                        <button onClick={() => setOption("support")}>
                            📞 Contact Support
                        </button>
                    </>
                )}

                {option === "order" && (
                    <>
                        <h2>📦 Order Help</h2>

                        <button>🚚 Where is my order?</button>
                        <button>❌ Order not received</button>
                        <button>🚫 Cancel my order</button>
                        <button>📋 Order status</button>

                        <button
                            className="back-btn"
                            onClick={() => setOption("")}
                        >
                            ← Back
                        </button>
                    </>
                )}

                {option === "return" && (
                    <>
                        <h2>🔄 Return & Refund</h2>

                        <button>📦 Return a product</button>
                        <button>💰 Refund status</button>
                        <button>⚠️ Refund not received</button>

                        <button
                            className="back-btn"
                            onClick={() => setOption("")}
                        >
                            ← Back
                        </button>
                    </>
                )}

                {option === "support" && (
                    <>
                        <h2>📞 Contact Support</h2>

                        <button>📞 Call Support</button>
                        <button>💬 Chat Support</button>

                        <button
                            className="back-btn"
                            onClick={() => setOption("")}
                        >
                            ← Back
                        </button>
                    </>
                )}

            </div>
        </div>
    );
};

export default CustomerService;