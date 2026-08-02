import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function MyOrders({ onNavigate }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      if (!auth.currentUser) return;
      const q = query(
        collection(db, "orders"),
        where("userId", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "rgba(255,255,255,0.72)",
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: "'Playfair Display', serif",
      }}
    >
      {/* Header Container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1000px",
          margin: "0 auto 30px auto",
        }}
      >
        <button
          onClick={() => onNavigate("home")}
          style={{
            border: "none",
            background: "none",
            color: "#C05A5A",
            fontSize: "18px",
            fontWeight: 800,
            cursor: "pointer",
            marginLeft: "-250px",
            marginTop: "-50px",
          }}
        >
          ← Home
        </button>

        <h1
          style={{
            color: "#CB6565",
            flex: 1,
            textAlign: "center",
            fontSize: "clamp(24px, 4vw, 36px)",
          }}
        >
          My Orders 📦
        </h1>
        <div style={{ width: "50px" }} />
      </div>

      {/* Orders List Container */}
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {orders.length === 0 ? (
          <h2 style={{ textAlign: "center", color: "#666", margin: "40px auto 0", maxWidth: "1000px",marginLeft:"-100px" }}>No Orders Yet 🧶</h2>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "25px",
                marginBottom: "25px",
                boxShadow: "0 5px 15px rgba(0,0,0,.08)",
              }}
            >
              {/* Order Header Summary */}
              <div
                style={{
                  display: "flex",
                  justify: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  borderBottom: "1px solid #f3f4f6",
                  paddingBottom: "12px",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <h3 style={{ margin: 0, color: "#CB6565" }}>Order ID</h3>
                  <span style={{ fontSize: "14px", color: "#666" }}>{order.id}</span>
                </div>
                <div>
                  <span
                    style={{
                      background: "#FCE7EA",
                      color: "#CB6565",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      fontSize: "14px",
                      display: "inline-block",
                    }}
                  >
                    {order.orderStatus || "Processing"}
                  </span>
                </div>
              </div>

              {/* Scrollable Products Table Container */}
              <h4 style={{ margin: "10px 0", color: "#444" }}>Products</h4>
              <div
                style={{
                  overflowX: "auto",
                  width: "100%",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: "400px",
                    textAlign: "left",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "1px solid #e5e7eb", color: "#6b7280", fontSize: "14px" }}>
                      <th style={{ padding: "8px" }}>Item</th>
                      <th style={{ padding: "8px" }}>Quantity</th>
                      <th style={{ padding: "8px" }}>Price</th>
                      <th style={{ padding: "8px" }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems?.map((item) => (
                      <tr key={item.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                        <td style={{ padding: "10px 8px", fontWeight: "500" }}>
                          🧶 {item.name}
                        </td>
                        <td style={{ padding: "10px 8px" }}>{item.quantity}</td>
                        <td style={{ padding: "10px 8px" }}>₹{item.price}</td>
                        <td style={{ padding: "10px 8px", fontWeight: "bold" }}>
                          ₹{item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Footer Details (Flexbox Stacking) */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justify: "space-between",
                  gap: "15px",
                  marginTop: "15px",
                  paddingTop: "15px",
                  borderTop: "1px solid #f3f4f6",
                  fontSize: "15px",
                }}
              >
                <div>
                  <strong>Payment: </strong>
                  <span>{order.paymentMethod}</span>
                </div>
                <div>
                  <strong style={{ fontSize: "18px", color: "#CB6565" }}>Total: </strong>
                  <span style={{ fontSize: "18px", fontWeight: "bold", color: "#CB6565" }}>
                    ₹{order.total}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}