import { useState } from "react";

const CustomerPopup = ({ close }) => {
    const [option, setOption] = useState("");

    const options = {
        order: [
            ["🚚 Where is my order?", "Order status selected"],
            ["❌ Order not received", "Order not received"],
            ["🚫 Cancel my order", "Cancel order selected"],
            ["📋 Order status", "Order status selected"]
        ],
        return: [
            ["📦 Return a product", "Return a product selected"],
            ["💰 Refund status", "Refund status selected"],
            ["⚠️ Refund not received", "Refund not received"]
        ],
        support: [
            ["📞 Call Support", "Calling Customer Support 📞"],
            ["💬 Chat Support", "Chat Support selected 💬"]
        ]
    };

    if (option) {
        return (
            <div className="customer-popup">
                <div className="customer-box">
                    <button
                        className="close-customer"
                        onClick={close}
                    >
                        ×
                    </button>

                    <h2>
                        {option === "order" && "📦 Order Help"}
                        {option === "return" && "🔄 Return & Refund"}
                        {option === "support" && "📞 Contact Support"}
                    </h2>

                    {options[option].map(([text, alertText]) => (
                        <button
                            key={text}
                            onClick={() => alert(alertText)}
                        >
                            {text}
                        </button>
                    ))}

                    <button
                        className="back-customer"
                        onClick={() => setOption("")}
                    >
                        ← Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="customer-popup">
            <div className="customer-box">
                <button
                    className="close-customer"
                    onClick={close}
                >
                    ×
                </button>

                <h2>📞 Customer Service</h2>
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
            </div>
        </div>
    );
};

export default CustomerPopup;