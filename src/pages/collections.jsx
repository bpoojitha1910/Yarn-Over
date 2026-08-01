import React, { useState } from "react";

export default function Collections({ products = [], onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Sweaters", "Accessories", "Yarn Sets", "Custom"];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="collections-container">
      <style>{`
        .collections-container {
          min-height: 100vh;
          background-color: #FFF2F4;
          padding: clamp(20px, 5vw, 50px);
          font-family: 'Playfair Display', serif;
          box-sizing: border-box;
        }

        .page-title {
          color: #C05A5A;
          font-size: clamp(2rem, 5vw, 3.2rem);
          text-align: center;
          margin-bottom: 25px;
        }

        .category-bar {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .cat-btn {
          padding: 8px 20px;
          border-radius: 20px;
          border: 1px solid #E5B2B8;
          background: #FFF;
          color: #555;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s ease;
          font-family: 'Playfair Display', serif;
        }

        .cat-btn.active, .cat-btn:hover {
          background: #C05A5A;
          color: #FFF;
          border-color: #C05A5A;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 25px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          transition: transform 0.2s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 15px;
          margin-bottom: 15px;
        }

        .product-name {
          color: #C05A5A;
          font-size: 1.3rem;
          margin: 0 0 8px 0;
        }

        .product-price {
          font-size: 1.2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 15px;
        }

        .add-btn {
          margin-top: auto;
          width: 100%;
          padding: 12px;
          border-radius: 15px;
          border: none;
          background: #C05A5A;
          color: white;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Playfair Display', serif;
        }

        .add-btn:hover {
          background: #a84b4b;
        }
      `}</style>

      <h1 className="page-title">Our Collections</h1>

      {/* Category Filter Pills */}
      <div className="category-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`cat-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Display Grid */}
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-img" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p>
            <button className="add-btn" onClick={() => onAddToCart(product)}>
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}