import React from "react";

export default function Home({ onNavigate }) {
  return (
    <div className="home-container">
      <style>{`
        .home-container {
          min-height: 100vh;
          background-color: #FFF2F4;
          font-family: 'Playfair Display', serif;
          padding: clamp(20px, 5vw, 60px) clamp(20px, 6vw, 80px);
          box-sizing: border-box;
        }

        .hero-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-content {
          flex: 1;
        }

        .hero-title {
          font-size: clamp(2.2rem, 6vw, 4rem);
          color: #C05A5A;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          color: #555;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .hero-btn {
          padding: 16px 36px;
          background-color: #C05A5A;
          color: white;
          border: none;
          border-radius: 30px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(192, 90, 90, 0.3);
          transition: transform 0.2s ease, background-color 0.2s ease;
          font-family: 'Playfair Display', serif;
        }

        .hero-btn:hover {
          transform: translateY(-3px);
          background-color: #a84b4b;
        }

        .hero-image-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .hero-image {
          width: 100%;
          max-width: 500px;
          height: auto;
          border-radius: 30px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }

        @media (max-width: 850px) {
          .hero-section {
            flex-direction: column;
            text-align: center;
          }
          .hero-image-wrapper {
            width: 100%;
          }
        }
      `}</style>

      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Handcrafted Knits & Crochet Made with Love</h1>
          <p className="hero-subtitle">
            Explore our curated catalog of cozy sweaters, accessories, and custom yarn creations crafted to bring warmth into your life.
          </p>
          <button className="hero-btn" onClick={() => onNavigate("collections")}>
            Explore Collection →
          </button>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="/YarnOver21.png"
            alt="Yarn Over Featured Work"
            className="hero-image"
          />
        </div>
      </div>
    </div>
  );
}