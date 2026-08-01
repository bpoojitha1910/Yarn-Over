import { useState } from "react";
import { auth } from "../firebase";
import { API_URL } from "../config";

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "15px",
  border: "1px solid #E5B2B8",
  outline: "none",
  fontSize: "1rem",
  boxSizing: "border-box",
  fontFamily: "'Playfair Display', serif",
  backgroundColor: "#FFF",
};

export default function Cart({
  onNavigate,
  cartItems = [],
  setCartItems,
}) {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(null);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (
      !customer.name ||
      !customer.phone ||
      !customer.address ||
      !customer.pincode
    ) {
      alert("Please fill in all delivery details.");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please log in before placing an order.");
        return;
      }

      const submitOrder = async (paymentDetails = {}) => {
        const response = await fetch(`${API_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.uid,
            userEmail: user.email,
            customer,
            cartItems,
            total,
            paymentMethod,
            paymentDetails,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.error || "Failed to place order.");
          return;
        }

        setOrderSuccess(data);
        setCartItems([]);
      };

      if (paymentMethod === "UPI") {
        const orderResponse = await fetch(
          `${API_URL}/create-razorpay-order`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: total,
            }),
          }
        );

        const razorpayOrder = await orderResponse.json();

        if (!orderResponse.ok) {
          alert(razorpayOrder.error || "Failed to initialize payment.");
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "Yarn Over",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: async function (response) {
            await submitOrder({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
          },
          prefill: {
            name: customer.name,
            email: user.email,
            contact: customer.phone,
          },
          theme: {
            color: "#C05A5A",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        await submitOrder();
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while placing your order. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FFF2F4",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflowX: "hidden",
        fontFamily: "'Playfair Display', serif",
        padding: "clamp(15px, 4vw, 35px)",
        boxSizing: "border-box",
      }}
    >
      {/* Dynamic CSS styles for responsive layout & animations */}
      <style>{`
        .cart-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 25px;
          align-items: start;
        }

        .cart-item-card {
          display: flex;
          gap: 15px;
          background: #FFF;
          border-radius: 20px;
          padding: 18px;
          margin-bottom: 15px;
          align-items: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }

        .delivery-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        @media (max-width: 600px) {
          .cart-item-card {
            flex-direction: column;
            text-align: center;
          }

          .delivery-form-grid {
            grid-template-columns: 1fr;
          }

          .header-nav {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 10px !important;
          }
        }
      `}</style>

      {/* Background Image */}
      <img
        src="/YarnOver21.png"
        alt="background"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      {/* Header */}
      <div
        className="header-nav"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "30px",
          width: "100%",
        }}
      >
        <button
          onClick={() => onNavigate?.("home")}
          style={{
            border: "none",
            background: "none",
            color: "#C05A5A",
            fontSize: "clamp(18px, 2.5vw, 24px)",
            cursor: "pointer",
            fontWeight: 700,
            padding: 0,
          }}
        >
          ← Home
        </button>

        <h1
          style={{
            color: "#C05A5A",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            margin: 0,
            textAlign: "center",
            flexGrow: 1,
          }}
        >
          Cart & Checkout
        </h1>
        
        {/* Balance Spacer for desktop centered alignment */}
        <div style={{ width: "80px" }} />
      </div>

      {/* Responsive Grid Layout */}
      <div className="cart-grid-container" style={{ position: "relative", zIndex: 2 }}>
        
        {/* LEFT COLUMN: Section 1 (Cart) & Section 2 (Delivery) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          {/* SECTION 1: Your Cart */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              borderRadius: "25px",
              padding: "clamp(18px, 3vw, 30px)",
              minHeight: "200px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              overflowY: "auto",
              maxHeight: "350px",
              boxSizing: "border-box",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#C05A5A", fontSize: "clamp(20px, 3vw, 28px)" }}>
              Your Cart
            </h2>

            {cartItems.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "30px 10px",
                  color: "#666",
                  fontSize: "1.1rem",
                }}
              >
                🛒 Your cart is empty.
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      maxWidth: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                  />

                  <div style={{ flex: 1, width: "100%" }}>
                    <h3 style={{ margin: 0, color: "#C05A5A", fontSize: "1.3rem" }}>
                      {item.name}
                    </h3>
                    <p style={{ margin: "5px 0", fontSize: "1.1rem", fontWeight: 600 }}>
                      ₹{item.price}
                    </p>
                    <p style={{ margin: "2px 0", fontSize: "0.9rem", color: "#666" }}>
                      Subtotal: ₹{item.price * item.quantity}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "12px",
                        marginTop: "10px",
                      }}
                    >
                      <button
                        onClick={() => {
                          setCartItems(
                            cartItems.map((p) =>
                              p.id === item.id && p.quantity > 1
                                ? { ...p, quantity: p.quantity - 1 }
                                : p
                            )
                          );
                        }}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          border: "none",
                          background: "#C05A5A",
                          color: "white",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                      >
                        −
                      </button>
                      <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                        {item.quantity}
                      </span>
                      <button
                        disabled={item.quantity >= item.stock}
                        onClick={() => {
                          setCartItems(
                            cartItems.map((p) =>
                              p.id === item.id
                                ? { ...p, quantity: p.quantity + 1 }
                                : p
                            )
                          );
                        }}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          border: "none",
                          background: item.quantity >= item.stock ? "#CCC" : "#C05A5A",
                          color: "white",
                          cursor: item.quantity >= item.stock ? "not-allowed" : "pointer",
                          fontSize: "18px",
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        setCartItems(cartItems.filter((p) => p.id !== item.id))
                      }
                      style={{
                        marginTop: "10px",
                        border: "none",
                        background: "none",
                        color: "#C05A5A",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                      }}
                    >
                      🗑 Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* SECTION 2: Delivery Details */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              borderRadius: "25px",
              padding: "clamp(18px, 3vw, 30px)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#C05A5A", fontSize: "clamp(20px, 3vw, 28px)" }}>
              Delivery Details
            </h2>

            <div className="delivery-form-grid">
              <input
                placeholder="Full Name"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                style={inputStyle}
              />
              <input
                placeholder="Phone Number"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                style={inputStyle}
              />
            </div>

            <textarea
              placeholder="Delivery Address"
              rows={3}
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              style={{
                ...inputStyle,
                resize: "none",
                marginBottom: "15px",
              }}
            />

            <input
              placeholder="Pincode"
              value={customer.pincode}
              onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Section 3 (Summary) & Section 4 (Payment) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          {/* SECTION 3: Order Summary */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              borderRadius: "25px",
              padding: "clamp(18px, 3vw, 30px)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#C05A5A", fontSize: "clamp(20px, 3vw, 28px)" }}>
              Order Summary
            </h2>

            <div style={{ fontSize: "1.1rem", color: "#333", lineHeight: "1.8" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Delivery:</span>
                <span style={{ color: "#2E7D32", fontWeight: 600 }}>FREE</span>
              </div>
              <hr style={{ border: "none", borderTop: "1px solid #E5B2B8", margin: "15px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.3rem", fontWeight: 700, color: "#C05A5A" }}>
                <span>Total Amount:</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          {/* SECTION 4: Payment Method */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              borderRadius: "25px",
              padding: "clamp(18px, 3vw, 30px)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#C05A5A", fontSize: "clamp(20px, 3vw, 28px)" }}>
              Payment Method
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "25px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  padding: "12px",
                  borderRadius: "12px",
                  border: paymentMethod === "UPI" ? "2px solid #C05A5A" : "1px solid #E5B2B8",
                  background: paymentMethod === "UPI" ? "#FFF2F4" : "#FFF",
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                💳 UPI / Online Payment
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  padding: "12px",
                  borderRadius: "12px",
                  border: paymentMethod === "COD" ? "2px solid #C05A5A" : "1px solid #E5B2B8",
                  background: paymentMethod === "COD" ? "#FFF2F4" : "#FFF",
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                💵 Cash on Delivery (COD)
              </label>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "20px",
                border: "none",
                background: cartItems.length === 0 ? "#CCC" : "#C05A5A",
                color: "white",
                fontSize: "1.2rem",
                fontWeight: 700,
                cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
                fontFamily: "'Playfair Display', serif",
                boxShadow: "0 4px 12px rgba(192, 90, 90, 0.3)",
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      {/* Order Success Modal */}
      {orderSuccess && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#FFF",
              padding: "clamp(20px, 5vw, 40px)",
              borderRadius: "25px",
              textAlign: "center",
              width: "100%",
              maxWidth: "450px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              boxSizing: "border-box",
            }}
          >
            <h2 style={{ color: "#2E7D32", fontSize: "clamp(24px, 4vw, 32px)", margin: "0 0 10px 0" }}>
              🎉 Order Placed!
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#555" }}>
              Thank you for shopping with Yarn Over! Your order details have been recorded.
            </p>
            <button
              onClick={() => {
                setOrderSuccess(null);
                onNavigate?.("myorders");
              }}
              style={{
                marginTop: "20px",
                padding: "12px 30px",
                borderRadius: "15px",
                border: "none",
                background: "#C05A5A",
                color: "white",
                fontSize: "1.1rem",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              View My Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
}