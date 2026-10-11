import "./home.css";
import React, { useContext } from "react";
import { cartContext } from "../context/cartContext";
import { SearchContext } from "../context/SearchContext";
import { CategoryContext } from "../context/CategoryContext";

const Home = () => {
    const { cart, setCart } = useContext(cartContext);
    const { searchResult } = useContext(SearchContext);
    const { category } = useContext(CategoryContext);

    const products = [
        {
            id: 1,
            name: "Up to 50% off | International brands",
            category: "speaker",
            image: "/box-img1.jpg",
            price: 999,
            keywords: ["speaker", "spea", "international", "brands"]
        },
        {
            id: 2,
            name: "Triumph T4 Bike Lava Red Gloss Booking",
            category: "bike",
            image: "/bike-img.jpg",
            price: 250000,
            keywords: ["bike", "bi", "bik", "triumph"]
        },
        {
            id: 3,
            name: "SAMSUNG GALAXY M36 5G",
            category: "phone",
            image: "/phone-img.png",
            price: 14999,
            keywords: ["phone", "phon", "ph", "samsung", "mobile", "galaxy"]
        },
        {
            id: 4,
            name: "Kuber Industries Makeup Kit",
            category: "makeup",
            image: "/mkp-kit.webp",
            price: 599,
            keywords: ["makeup", "make", "mak", "kit", "kuber"]
        },
        {
            id: 5,
            name: "Appliances for your home | Up to 55% off",
            category: "appliances",
            image: "/box-img5.jpg",
            price: 18999,
            keywords: ["appliances", "appli", "appl", "home"]
        },
        {
            id: 6,
            name: "Up to 60% off | Best offers on kitchen products",
            category: "kitchen",
            image: "/box-img6.jpg",
            price: 2199,
            keywords: ["kitchen", "kit", "kitch"]
        },
        {
            id: 7,
            name: "Up to 55% off | Electronics & Accessories",
            category: "electronics",
            image: "/box-img7.jpg",
            price: 1999,
            keywords: ["electronics", "electronic", "elec", "accessories", "accessory"]
        },
        {
            id: 8,
            name: "Best Sellers in Clothes & Accessories",
            category: "clothes",
            image: "/box-img8.jpg",
            price: 999,
            keywords: ["clothes", "cloth", "clothing", "accessories"]
        }
    ];

    const matchesSearch = (product) => {
        if (!searchResult) return true;

        const search = searchResult.toLowerCase().trim();

        return product.keywords.some((keyword) =>
            keyword.startsWith(search)
        );
    };

   const matchesCategory = (product) => {
    if (category === "all") return true;

    if (category === "fresh") {
        return product.category === "kitchen" ||
               product.category === "clothes";
    }

    if (category === "bestsellers") {
        return product.category === "phone" ||
               product.category === "speaker" ||
               product.category === "electronics";
    }

    if (category === "today,s deals" ){
        return product.category ==="kitchen"||
               product.category ==="phone"||
               product.category ==="appliances";
    }

    if (category === "mobiles"){
        return product.category === "phone";
    }

    if( category === "electronics"){
        return product.category === "electronics"||
                product.category === "speaker"||
                product.category ==="appliances";
    }

    if(category === "fashion"){
        return product.category ==="clothes"||
               product.category ==="makeup";
    }

    return true;
};
    const visibleProducts = products.filter(
        (product) =>
            matchesCategory(product) &&
            matchesSearch(product)
    );

    const addToCart = (product) => {
        const existingProduct = cart.find(
            (item) => item.name === product.name
        );

        if (existingProduct) {
            setCart(
                cart.map((item) =>
                    item.name === product.name
                        ? {
                              ...item,
                              quantity: (item.quantity || 1) + 1
                          }
                        : item
                )
            );
        } else {
            setCart([
                ...cart,
                {
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    quantity: 1
                }
            ]);
        }
    };

    return (
        <div className="home">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Amazon</h1>
                    <p>Great deals on your favorite products</p>
             <button onClick={() => {
                     document.querySelector(".shop-section").scrollIntoView({
                     behavior: "smooth"
                 });
            }}>
                            Shop Now
           </button>
                </div>
            </div>

            <div className="shop-section">
                {visibleProducts.map((product) => (
                    <div className="product-box" key={product.id}>
                        <h2>{product.name}</h2>

                        <div
                            className="product-img"
                            style={{
                                backgroundImage: `url('${product.image}')`
                            }}
                        ></div>

  <p className="offer-text">               
    {product.category === "speaker" && "Special offer"}
    {product.category === "bike" && "Limited offer"}
    {product.category === "phone" && "Bank offer"}
    {product.category === "makeup" && "Deal of the day"}
    {product.category === "appliances" && "Great deal"}
    {product.category === "kitchen" && "Best deal"}
    {product.category === "electronics" && "Special deal"}
    {product.category === "clothes" && "Limited deal"}
</p>

                        <button onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                ))}

                {visibleProducts.length === 0 && (
                    <div className="no-product">
                        <h2>Product not available</h2>
                        <p>
                            Sorry, we couldn't find any product
                            matching "{searchResult}".
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;