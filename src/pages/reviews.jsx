import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function Reviews({ onNavigate }) {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [item, setItem] = useState("");
  const [note, setNote] = useState("");

  // Load reviews from Firestore on initial mount
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const snapshot = await getDocs(collection(db, "reviews"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Display newest reviews first
      setReviews(data.reverse());
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!name.trim() || !note.trim()) return;
    try {
      // Save directly to Firestore collection 'reviews'
      await addDoc(collection(db, "reviews"), {
        name: name,
        item: item || "Custom Crochet Item",
        note: note,
        bgColor: "#EFD1D6",
        createdAt: new Date(),
      });
      // Clear input fields and reload reviews
      setName("");
      setItem("");
      setNote("");
      await loadReviews();
    } catch (error) {
      console.error("Error posting review:", error);
      alert("Failed to post review. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FFF2F4",
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflowX: "hidden",
        overflowY: "auto",
        fontFamily: "'Playfair Display', serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "30px 40px",
        boxSizing: "border-box",
        margin: 0,
      }}
    >
      {/* Background Image Overlay */}
      <img
        src="/YarnOver21.png"
        alt="Background Pattern"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100%",
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
          marginBottom: "20px",
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

      {/* Main Content Container */}
      <div
        style={{
          maxWidth: "1140px",
          width: "100%",
          margin: "0 auto 30px auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Title Section */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "36px",
          }}
        >
          <h1
            style={{
              color: "#CB6565",
              fontSize: "52px",
              fontWeight: 600,
              margin: 0,
              lineHeight: 1,
            }}
          >
            reviews
          </h1>
        </div>

        {/* Page Content: Form on Left + Reviews Grid on Right */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {/* --- POST A REVIEW FORM --- */}
          <form
            onSubmit={handlePost}
            style={{
              flex: "1 1 320px",
              maxWidth: "360px",
              backgroundColor: "rgba(239, 209, 214, 0.88)",
              backdropFilter: "blur(6px)",
              padding: "26px",
              borderRadius: "35px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              boxSizing: "border-box",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#CB6565",
                margin: "0 0 4px 0",
              }}
            >
              💌 Leave a Review:
            </h3>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your Name / Handle"
              style={{
                padding: "12px 16px",
                borderRadius: "14px",
                border: "none",
                fontSize: "15px",
                fontFamily: "'Playfair Display', serif",
                backgroundColor: "#FFFFFF",
                color: "#1A1A1A",
                outline: "none",
              }}
            />
            <input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Item Ordered (e.g. Twin Roses)"
              style={{
                padding: "12px 16px",
                borderRadius: "14px",
                border: "none",
                fontSize: "15px",
                fontFamily: "'Playfair Display', serif",
                backgroundColor: "#FFFFFF",
                color: "#1A1A1A",
                outline: "none",
              }}
            />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
              rows={4}
              placeholder="Write your review here..."
              style={{
                padding: "12px 16px",
                borderRadius: "14px",
                border: "none",
                fontSize: "15px",
                fontFamily: "'Playfair Display', serif",
                backgroundColor: "#FFFFFF",
                color: "#1A1A1A",
                outline: "none",
                resize: "none",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#CB6565",
                color: "#FFF",
                padding: "12px",
                borderRadius: "18px",
                border: "none",
                fontSize: "16px",
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                cursor: "pointer",
                marginTop: "4px",
              }}
            >
              Post Review
            </button>
          </form>

          {/* --- REVIEWS GRID (Updated with auto-fit) --- */}
          <div
            style={{
              flex: "2 1 600px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              width: "100%",
            }}
          >
            {reviews.length === 0 ? (
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "28px",
                  padding: "30px",
                  textAlign: "center",
                  color: "#666",
                  fontSize: "16px",
                  gridColumn: "1 / -1",
                }}
              >
                No reviews yet. Be the first to leave one! 🌸
              </div>
            ) : (
              reviews.map((rev) => (
                <div
                  key={rev.id}
                  style={{
                    backgroundColor: rev.bgColor || "#EFD1D6",
                    borderRadius: "28px",
                    padding: "24px",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 8px 18px rgba(0,0,0,0.05)",
                    minHeight: "200px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "24px",
                        marginBottom: "10px",
                      }}
                    >
                      💬
                    </div>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#1A1A1A",
                        fontStyle: "italic",
                        lineHeight: "1.4",
                        margin: "0 0 16px 0",
                      }}
                    >
                      "{rev.note}"
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#1A1A1A",
                        margin: "0 0 2px 0",
                      }}
                    >
                      — {rev.name}
                    </h4>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#555",
                        margin: 0,
                      }}
                    >
                      {rev.item}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
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