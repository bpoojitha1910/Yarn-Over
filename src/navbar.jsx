import React from "react";

export default function Navbar({ activePage, onNavigate, cartCount = 0 }) {
  return (
    <header className="navbar-container">
      <style>{`
        .navbar-container {
          position: relative;
          z-index: 100;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 15px clamp(20px, 5vw, 40px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          font-family: 'Playfair Display', serif;
        }

        .brand-logo {
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: 700;
          color: #C05A5A;
          cursor: pointer;
          margin: 0;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: clamp(15px, 3vw, 30px);
          flex-wrap: wrap;
        }

        .nav-btn {
          background: none;
          border: none;
          color: #555;
          font-size: clamp(0.95rem, 2vw, 1.1rem);
          font-weight: 600;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 12px;
          transition: all 0.2s ease;
          font-family: 'Playfair Display', serif;
        }

        .nav-btn:hover, .nav-btn.active {
          color: #C05A5A;
          background: #FFF2F4;
        }

        .cart-badge {
          background: #C05A5A;
          color: white;
          border-radius: 50%;
          padding: 2px 8px;
          font-size: 0.85rem;
          margin-left: 6px;
        }

        @media (max-width: 650px) {
          .navbar-container {
            justify-content: center;
            text-align: center;
          }
          .nav-links {
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>

      <h1 className="brand-logo" onClick={() => onNavigate("home")}>
        Yarn Over 🧶
      </h1>

      <nav className="nav-links">
        <button
          className={`nav-btn ${activePage === "home" ? "active" : ""}`}
          onClick={() => onNavigate("home")}
        >
          Home
        </button>
        <button
          className={`nav-btn ${activePage === "collections" ? "active" : ""}`}
          onClick={() => onNavigate("collections")}
        >
          Collections
        </button>
        <button
          className={`nav-btn ${activePage === "cart" ? "active" : ""}`}
          onClick={() => onNavigate("cart")}
        >
          Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
        <button
          className={`nav-btn ${activePage === "myorders" ? "active" : ""}`}
          onClick={() => onNavigate("myorders")}
        >
          Orders
        </button>
        <button
          className={`nav-btn ${activePage === "login" ? "active" : ""}`}
          onClick={() => onNavigate("login")}
        >
          Account
        </button>
      </nav>
    </header>
  );
}