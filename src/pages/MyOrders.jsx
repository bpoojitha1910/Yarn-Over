import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function MyOrders({ onNavigate }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => ({
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
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        background: "rgba(255,255,255,0.72)",
        padding: "40px",
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <button
        onClick={() => onNavigate("home")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          border: "none",
          background: "none",
          color: "#C05A5A",
          fontSize: "18px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        ← home
      </button>

      <h1
        style={{
          textAlign: "center",
          color: "#CB6565",
        }}
      >
        My Orders 📦
      </h1>

      {orders.length === 0 ? (
        <h2>No Orders Yet 🧶</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "25px",
              marginBottom: "25px",
              boxShadow: "0 5px 15px rgba(0,0,0,.08)",
            }}
          >
            <h3>Order ID</h3>

            <p>{order.id}</p>

            <hr />

            <h3>Products</h3>

            {order.cartItems.map(item => (
              <div
                key={item.id}
                style={{
                  marginBottom: "15px",
                }}
              >
                🧶 {item.name}

                <br />

                Qty : {item.quantity}

                <br />

                ₹{item.price}
              </div>
            ))}

            <hr />

            <p>
              <strong>Total :</strong> ₹{order.total}
            </p>

            <p>
              <strong>Payment :</strong> {order.paymentMethod}
            </p>

            <h3>Status</h3>

            <div
              style={{
                background: "#FCE7EA",
                color: "#CB6565",
                display: "inline-block",
                padding: "10px 18px",
                borderRadius: "20px",
                fontWeight: "bold",
              }}
            >
              {order.orderStatus}
            </div>
          </div>
        ))
      )}
    </div>
  );
}