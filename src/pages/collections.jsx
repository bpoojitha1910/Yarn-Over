import { useState, useEffect } from "react";
import { API_URL } from "../config";

export default function Collections({
  onNavigate,
  cartItems = [], // 👈 Default fallback to empty array to avoid crashes
  setCartItems,
}) {
  const [flippedCards, setFlippedCards] = useState({});
  const [collections, setCollections] = useState([]);

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const addToCart = (item) => {
    // Safely check existing item
    const currentCart = Array.isArray(cartItems) ? cartItems : [];
    const existingItem = currentCart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      if (existingItem.quantity >= item.quantity) {
        alert(`Only ${item.quantity} item(s) available in stock.`);
        return;
      }

      setCartItems?.(
        currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
    } else {
      if (item.quantity <= 0) {
        alert("This product is sold out.");
        return;
      }

      setCartItems?.([
        ...currentCart,
        {
          id: item.id,
          name: item.name,
          price: Number(item.price),
          image: `/${item.image}`,
          quantity: 1,
          stock: item.quantity,
        },
      ]);
    }

    alert(`${item.name} added to cart!`);
  };

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setCollections(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflowX: "hidden",
        fontFamily: "'Playfair Display', serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px 40px",
        boxSizing: "border-box",
        margin: 0,
      }}
    >
      {/* Background Image Overlay */}
      <img
        src="/YarnOver21.png"
        alt="Yarn Over Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: 0,
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />

      {/* Top Header Bar */}
      <div
        style={{
          width: "100%",
          maxWidth: "1140px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "flex-start",
          zIndex: 10,
        }}
      >
        <button
          onClick={() => onNavigate?.("home")}
          style={{
            background: "none",
            border: "none",
            color: "#CB6565",
            fontSize: "22px",
            fontWeight: 700,
            cursor: "pointer",
            padding: 0,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          ← home
        </button>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          maxWidth: "1140px",
          width: "100%",
          margin: "12px auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Title & Subtitle */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              color: "#CB6565",
              fontSize: "48px",
              fontWeight: 600,
              margin: 0,
              lineHeight: 1,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            our collections
          </h1>
          <p
            style={{
              color: "#1A1A1A",
              fontSize: "16px",
              fontWeight: 600,
              margin: 0,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            (click on the image to get details.✦ )
          </p>
        </div>

        {/* 3-Column Compact Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px 24px",
            justifyContent: "center",
          }}
        >
          {collections?.map((item, index) => {
            const isFlipped = !!flippedCards[index];

            return (
              <div
                key={item.id || index}
                onClick={() => toggleFlip(index)}
                style={{
                  width: "100%",
                  height: "230px",
                  perspective: "1000px",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transition:
                      "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)",
                    transformStyle: "preserve-3d",
                    transform: isFlipped
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)",
                  }}
                >
                  {/* --- FRONT SIDE (Photo) --- */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      borderRadius: "40px",
                      overflow: "hidden",
                      boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
                    }}
                  >
                    <img
                      src={`/${item.image}`}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "40px",
                      }}
                    />
                  </div>

                  {/* --- BACK SIDE (Flipped Color Card) --- */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backgroundColor: item.bgColor || "#F8D8DD",
                      borderRadius: "40px",
                      padding: "16px",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "28px",
                        fontWeight: 600,
                        color: item.textColor || "#1A1A1A",
                        margin: "0 0 6px 0",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                        color: item.textColor || "#1A1A1A",
                        margin: 0,
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      ₹{item.price}
                    </p>

                    <p
                      style={{
                        marginTop: "8px",
                        fontWeight: "600",
                        color:
                          item.status === "Sold Out"
                            ? "#E53935"
                            : item.quantity <= 3
                            ? "#E67E22"
                            : "#2E7D32",
                      }}
                    >
                      {item.status === "Sold Out"
                        ? "❌ Sold Out"
                        : item.quantity <= 3
                        ? `🔥 Only ${item.quantity} left`
                        : `✅ In Stock (${item.quantity})`}
                    </p>

                    <button
                      disabled={item.status === "Sold Out"}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card from flipping back
                        addToCart(item);
                      }}
                      style={{
                        marginTop: "18px",
                        width: "100%",
                        padding: "12px",
                        borderRadius: "20px",
                        border: "none",
                        cursor:
                          item.status === "Sold Out"
                            ? "not-allowed"
                            : "pointer",
                        backgroundColor:
                          item.status === "Sold Out"
                            ? "#BDBDBD"
                            : "#CB6565",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: 700,
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {item.status === "Sold Out"
                        ? "❌ Sold Out"
                        : "🛒 Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Right Instagram Handle */}
      <div
        style={{
          width: "100%",
          maxWidth: "1140px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "flex-end",
          zIndex: 10,
        }}
      >
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#CB6565",
            fontSize: "22px",
            fontWeight: 700,
            textDecoration: "none",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          @__yarn_over__
        </a>
      </div>
    </div>
  );
}