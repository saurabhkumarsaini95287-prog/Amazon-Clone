import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Navbar from "./components/Navbar"; 
import Home from "./pages/home";
import CartProvider from "./context/cartContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/Orders";
import SearchProvider from "./context/SearchContext";
import CategoryProvider from "./context/CategoryContext";
import Footer from "./components/Footer";
import CustomerService from "./pages/CustomerService";

function App() {
     const [showSeller, setShowSeller] = React.useState(false);

     useEffect(() => {
    if (window.location.search === "?sell=true") {
        setShowSeller(true);
        window.history.replaceState({}, "", "/");
    }
}, []);
    return (
        <BrowserRouter>
            
            <CartProvider>

               <SearchProvider>

                  <CategoryProvider>

            <Navbar
                showSeller={showSeller}
                setShowSeller={setShowSeller}
             />
            
           <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route
                    path="/orders"
                     element={
                         <ProtectedRoute>
                          <Orders />
                     </ProtectedRoute>
                 }
                />

            <Route path="/order-success" element={<OrderSuccess />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/login" element={<Login />} />

           <Route
                   path="/profile"
                    element={
                        <ProtectedRoute>
                           <Profile />
                        </ProtectedRoute>
              }
            />

             <Route
              path="/customer-service"
               element={<CustomerService />}
              />

              </Routes>

              <Footer />

               </CategoryProvider>

               </SearchProvider>

            </CartProvider>

        </BrowserRouter>
    );
}

export default App;