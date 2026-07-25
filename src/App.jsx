import { useState, useEffect } from 'react';

import Home from './pages/home';

import Collections from './pages/collections';

import CustomOrders from './pages/customerorders';

import Reviews from './pages/reviews';

import Cart from './pages/cart';

import Login from './pages/Login';

import UserLogin from './pages/userLogin';

import AdminLogin from './pages/AdminLogin';

import Register from './pages/register';

import AdminDashboard from './pages/AdminDashboard';

import MyOrders from "./pages/MyOrders";

export default function App() {

  const [currentPage, setCurrentPage] = useState("home");

  const [cartItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);

  return (

    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#FAF4EB",
        backgroundImage: "url('/YarnOver21.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >

      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}

      {currentPage === "collections" && (
        <Collections
          onNavigate={setCurrentPage}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      )}

      {currentPage === "login" && <Login onNavigate={setCurrentPage} />}

      {currentPage === "userLogin" && (<UserLogin onNavigate={setCurrentPage} />)}

      {currentPage === "adminLogin" && (<AdminLogin onNavigate={setCurrentPage} />)}

      {currentPage === "register" && (<Register onNavigate={setCurrentPage} />)}

      {currentPage === "adminDashboard" && (<AdminDashboard onNavigate={setCurrentPage} />)}

      {currentPage === 'custom-orders' && <CustomOrders onNavigate={setCurrentPage} />}

      {currentPage === 'reviews' && <Reviews onNavigate={setCurrentPage} />}

      {currentPage === "cart" && (

  <Cart

    onNavigate={setCurrentPage}

    cartItems={cartItems}

    setCartItems={setCartItems}

  />

)}
          
      {currentPage === "myorders" && (
    <MyOrders onNavigate={setCurrentPage} />
)}

    </div>

  );
}