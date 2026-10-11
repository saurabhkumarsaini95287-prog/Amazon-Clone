import axios from "axios";

const SellerPopup = ({ setShowSeller }) => {
    const submitProduct = async () => {
        const productName = document.querySelector("#sellerProductName").value.trim();
        const price = document.querySelector("#sellerPrice").value;
        const category = document.querySelector("#sellerCategory").value;
        const description = document.querySelector("#sellerDescription").value.trim();

        if (!productName || !price || !category || !description) {
            alert("Please fill all details!");
            return;
        }

        try {
            const { data } = await axios.post(
                "http://localhost:8000/api/product/add",
                { productName, price, category, description }
            );

            if (data.status) {
                alert("Product submitted successfully! 🎉");
                setShowSeller(false);
            }
        } catch (error) {
            console.log(error);
            alert("Product submit failed");
        }
    };

    return (
        <div className="seller-popup">
            <div className="seller-box">
                <button
                    className="close-seller"
                    onClick={() => setShowSeller(false)}
                >
                    ×
                </button>

                <h2>🛍️ Sell Your Product</h2>

                <label>Product Name</label>
                <input id="sellerProductName" placeholder="Enter product name" />

                <label>Price</label>
                <input id="sellerPrice" type="number" placeholder="Enter price" />

                <label>Category</label>
                <select id="sellerCategory">
                    <option value="">Select Category</option>
                    <option>Mobiles</option>
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Kitchen</option>
                    <option>Other</option>
                </select>

                <label>Description</label>
                <textarea
                    id="sellerDescription"
                    placeholder="Enter product description"
                />

                <label>Product Picture</label>
                <input type="file" accept="image/*" />

                <button onClick={submitProduct}>
                    Submit Product
                </button>
            </div>
        </div>
    );
};

export default SellerPopup;