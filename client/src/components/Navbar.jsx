import "./Navbar.css";
import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../context/cartContext";
import { Link, useLocation } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { CategoryContext } from "../context/CategoryContext";

import LocationPopup from "./LocationPopup";
import VideoPopup from "./VideoPopup";
import SellerPopup from "./SellerPopup";
import PrimePopup from "./PrimePopup";
import CustomerPopup from "./CustomerPopup";

const Navbar = ({ showSeller, setShowSeller }) => {
    const { cart } = useContext(cartContext);
    const { searchText, setSearchText, setSearchResult } =
        useContext(SearchContext);
    const { setCategory } = useContext(CategoryContext);
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [showLocation, setShowLocation] = useState(false);
    const [userLocation, setUserLocation] = useState(
        localStorage.getItem("userLocation") || "India"
    );
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [showPrime, setShowPrime] = useState(false);
    const [showCustomer, setShowCustomer] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        setUser(token && savedUser ? JSON.parse(savedUser) : false);
    }, [location.pathname]);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(false);
    };

    const search = () => setSearchResult(searchText.trim());

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Your browser does not support location.");
            return;
        }

        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&zoom=10&addressdetails=1`
                    );

                    const data = await res.json();
                    const city =
                        data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        data.address.municipality ||
                        data.address.county ||
                        "Unknown";

                    localStorage.setItem("userLocation", city);
                    setUserLocation(city);
                    setShowLocation(false);
                } catch {
                    alert("Unable to find your city.");
                } finally {
                    setLoadingLocation(false);
                }
            },
            (error) => {
                setLoadingLocation(false);

                alert(
                    error.code === 1
                        ? "Location permission denied."
                        : "Unable to get your current location."
                );
            }
        );
    };

    const cartCount = cart.reduce(
        (total, item) => total + (item.quantity || 1),
        0
    );

    return (
        <>
            <div className="navbar">
                <div className="nav-logo border">
                    <div className="logo"></div>
                </div>

                <div
                    className="nav-address border"
                    onClick={() => setShowLocation(true)}
                >
                    <i className="fa-solid fa-location-dot"></i>
                    <div>
                        <span className="add-first">Deliver to</span>
                        <span className="add-second">{userLocation}</span>
                    </div>
                </div>

                <div className="nav-search border">
                    <select className="search-select">
                        <option>All</option>
                    </select>

                    <input
                        className="search-input"
                        placeholder="Search Amazon.in"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && search()
                        }
                    />

                    <div className="search-icon">
                        <button className="search-btn" onClick={search}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>

                <Link
                    to={user ? "/profile" : "/signup"}
                    className="nav-box border"
                >
                    <p className="box4">
                        {user ? `Hello, ${user.name}` : "Hello, sign in"}
                    </p>

                    {user && (
                        <button
                            className="logout-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                logout();
                            }}
                        >
                            Logout
                        </button>
                    )}
                </Link>

                <Link to="/orders" className="nav-box5 border">
                    <p>Returns</p>
                    <p>& Orders</p>
                </Link>

                <Link to="/cart" className="nav-cart border">
                    <div className="cart-icon">
                        <span>{cartCount}</span>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                    <p className="box41">Cart</p>
                </Link>
            </div>

            <div className="panel">
                <div
                    className="panel-all"
                    onClick={() => setCategory("all")}
                >
                    <i className="fa-solid fa-bars"></i>
                    All
                </div>

                <div className="panel-ops">
                    <p onClick={() => setCategory("fresh")}>Fresh</p>
                    <p onClick={() => setShowVideo(true)}>MX Player</p>
                    <p onClick={() => setShowSeller(true)}>Sell</p>
                    <p onClick={() => setCategory("bestsellers")}>
                        Bestsellers
                    </p>
                    <p onClick={() => setCategory("today,s deals")}>
                        Today's Deals
                    </p>
                    <p onClick={() => setCategory("mobiles")}>Mobiles</p>
                    <p onClick={() => setShowPrime(true)}>Prime</p>
                    <p onClick={() => setShowCustomer(true)}>
                        Customer Service
                    </p>
                    <p onClick={() => setCategory("electronics")}>
                        Electronics
                    </p>
                    <p onClick={() => setCategory("fashion")}>Fashion</p>
                </div>
            </div>

            {showLocation && (
                <LocationPopup
                    close={() => setShowLocation(false)}
                    getLocation={getLocation}
                    loading={loadingLocation}
                />
            )}

            {showVideo && (
                <VideoPopup close={() => setShowVideo(false)} />
            )}

            {showSeller && (
                <SellerPopup setShowSeller={setShowSeller} />
            )}

            {showPrime && (
                <PrimePopup close={() => setShowPrime(false)} />
            )}

            {showCustomer && (
                <CustomerPopup close={() => setShowCustomer(false)} />
            )}
        </>
    );
};

export default Navbar;