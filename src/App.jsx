import { useState, useEffect } from 'react';

import Home from './pages/home';

import Collections from './pages/collections';

import CustomOrders from './pages/customerorders';

import Reviews from './pages/reviews';

import Cart from './pages/cart';

import Login from './pages/Login';

import Register from './pages/register';

import AdminDashboard from './pages/AdminDashboard';

import MyOrders from "./pages/MyOrders";

import { auth } from "./firebase";

import { onAuthStateChanged, signOut } from "firebase/auth";

export default function App() {

  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : [];
});

const handleLogout = async () => {
  try {
    await signOut(auth);
    setCurrentPage("home");
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

 

  return unsubscribe;
}, []);

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

      {currentPage === "home" && (
  <Home
    onNavigate={setCurrentPage}
    user={user}
    handleLogout={handleLogout}
  />
)}

      {currentPage === "collections" && (
        <Collections
          onNavigate={setCurrentPage}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      )}

      {currentPage === "login" && <Login onNavigate={setCurrentPage} />}

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