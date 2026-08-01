import Navbar from "../components/Navbar";

export default function Home({ onNavigate, cartCount }) {
  return (
    <div
      style={{
        backgroundColor: "#FFF2F4",
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Playfair Display', serif",
        boxSizing: "border-box",
      }}
    >
      {/* Background Pattern */}
      <img
        src="/YarnOver21.png"
        alt="Background Pattern"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.35,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Structured Navbar Component */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar activePage="home" onNavigate={onNavigate} cartCount={cartCount} />
      </div>

      {/* Hero / Main Content Section */}
      <main
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px 20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(239, 209, 214, 0.88)",
            backdropFilter: "blur(6px)",
            padding: "50px 40px",
            borderRadius: "35px",
            border: "2px dashed #CB6565",
            maxWidth: "700px",
            width: "100%",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              color: "#CB6565",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              margin: "0 0 15px 0",
            }}
          >
            Where Every Stitch Tells a Story.
          </h2>
          <p
            style={{
              color: "#666",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              lineHeight: 1.6,
              marginBottom: "30px",
            }}
          >
            Handmade with love, cozy aesthetics, and unique craftsmanship tailored just for you. Explore our collection of custom crochet and handcrafted treasures.
          </p>

          <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => onNavigate("collections")}
              style={{
                backgroundColor: "#CB6565",
                color: "white",
                border: "none",
                padding: "14px 28px",
                borderRadius: "16px",
                fontSize: "1.1rem",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Playfair Display', serif",
                boxShadow: "0 4px 15px rgba(203, 101, 101, 0.3)",
                transition: "transform 0.2s ease",
              }}
            >
              Shop Collections 🧶
            </button>
            <button
              onClick={() => onNavigate("customOrders")}
              style={{
                backgroundColor: "#FFFFFF",
                color: "#CB6565",
                border: "2px solid #CB6565",
                padding: "14px 28px",
                borderRadius: "16px",
                fontSize: "1.1rem",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Request Custom Order ✨
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
