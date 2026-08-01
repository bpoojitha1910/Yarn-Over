import { useState } from "react";
import { auth } from "../firebase";
import { API_URL } from "../config";

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "15px",
  border: "1px solid #E5B2B8",
  outline: "none",
  fontSize: "16px",
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

  // UPI Specific States
  const [selectedUpiApp, setSelectedUpiApp] = useState("");
  const [upiId, setUpiId] = useState("");

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  const [orderSuccess, setOrderSuccess] = useState(null);

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

    if (paymentMethod === "UPI" && !selectedUpiApp && !upiId.trim()) {
      alert("Please select a UPI app or enter your UPI ID.");
      return;
    }

    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please log in before placing an order.");
        return;
      }

      // Helper function to submit order to backend
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
      };

      // Handle UPI via Razorpay
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
            // Razorpay payment successful, now save order
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
        // Handle Cash on Delivery (COD)
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
        padding: "35px",
        boxSizing: "border-box",
      }}
    >
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
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: "18px",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={() => onNavigate?.("home")}
          style={{
            border: "none",
            background: "none",
            color: "#C05A5A",
            fontSize: "24px",
            cursor: "pointer",
            fontWeight: 700,
            marginTop: "-25px",
          }}
        >
          ← Home
        </button>

        <h1
          style={{
            color: "#C05A5A",
            fontSize: "48px",
            margin: "0 auto",
            marginTop: "-30px",
            marginLeft: "200px",
          }}
        >
          Cart & Checkout
        </h1>
        <div style={{ width: "90px" }} />
      </div>

      {/* 2-Column Grid Layout */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1.8fr 1fr",
          gap: "25px",
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN: Section 1 (Cart) & Section 2 (Delivery) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          {/* SECTION 1: Your Cart */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              borderRadius: "25px",
              padding: "30px",
              minHeight: "250px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              overflowY: "auto",
              overflowX: "120px",
              maxHeight: "150px",
              marginBottom: 0,
              boxSizing: "border-box",
              marginTop: "-20px",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#C05A5A", fontSize: "28px" }}>
              Your Cart
            </h2>

            {cartItems.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  color: "#666",
                  fontSize: "20px",
                }}
              >
                🛒 Your cart is empty.
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "20px",
                    background: "#FFF",
                    borderRadius: "20px",
                    padding: "18px",
                    marginBottom: "15px",
                    alignItems: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, color: "#C05A5A", fontSize: "22px" }}>
                      {item.name}
                    </h3>
                    <p style={{ margin: "5px 0", fontSize: "18px", fontWeight: 600 }}>
                      ₹{item.price}
                    </p>
                    <p style={{ margin: "2px 0", fontSize: "15px", color: "#666" }}>
                      Subtotal: ₹{item.price * item.quantity}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
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
                      <span style={{ fontSize: "18px", fontWeight: 700 }}>
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
                        fontSize: "15px",
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
              padding: "30px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              marginTop: "-15px",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#C05A5A", fontSize: "28px" }}>
              Delivery Details
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
                marginBottom: "15px",
              }}
            >
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
              background: "rgba(242, 201, 206, 0.88)",
              borderRadius: "25px",
              padding: "30px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              marginTop: "-53px",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#C05A5A", fontSize: "28px" }}>
              Order Summary
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px" }}>
                <span>Total Items</span>
                <strong>{totalItems}</strong>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px" }}>
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px" }}>
                <span>Delivery</span>
                <strong>FREE</strong>
              </div>

              <hr style={{ border: "none", borderTop: "2px solid #d89aa2", margin: "10px 0" }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#C05A5A",
                }}
              >
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          {/* SECTION 4: Payment Method & Place Order */}
          <div
            style={{
              background: "rgba(242, 201, 206, 0.88)",
              borderRadius: "25px",
              padding: "30px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              overflowY: "auto",
              overflowX: "120px",
              maxHeight: "330px",
              marginBottom: 0,
              boxSizing: "border-box",
              marginTop: "-20px",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#C05A5A", fontSize: "28px", marginBottom: "20px" }}>
              Payment Method
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "25px", fontSize: "18px" }}>
              <label style={{ cursor: "pointer", display: "flex", gap: "10px", alignItems: "center" }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setSelectedUpiApp("");
                    setUpiId("");
                  }}
                />
                Cash on Delivery
              </label>

              <label style={{ cursor: "pointer", display: "flex", gap: "10px", alignItems: "center" }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI
              </label>

              {/* Expandable UPI Sub-panel */}
              {paymentMethod === "UPI" && (
                <div
                  style={{
                    marginLeft: "24px",
                    padding: "15px",
                    background: "#FFF",
                    borderRadius: "18px",
                    border: "1px solid #E5B2B8",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {paymentMethod === "UPI" && (
  <div
    style={{
      marginLeft: "24px",
      padding: "16px",
      background: "#FFF",
      borderRadius: "16px",
      border: "1px solid #E5B2B8",
      color: "#C05A5A",
      fontSize: "14px",
      lineHeight: "1.6",
    }}
  >
    <strong>Secure Online Payment</strong>

    <p style={{ margin: "10px 0 0" }}>
      After you click <b>Place Order</b>, a secure Razorpay payment window
      will open where you can pay using:
    </p>

    <ul style={{ marginTop: "8px", paddingLeft: "18px" }}>
      <li>Google Pay</li>
      <li>PhonePe</li>
      <li>Paytm</li>
      <li>Any UPI App</li>
      <li>Debit / Credit Card</li>
    </ul>

    <p style={{ marginTop: "10px", fontWeight: "bold" }}>
      Your order will be confirmed only after successful payment.
    </p>
  </div>
)}
                </div>
              )}

            </div>

            <div style={{ marginTop: "15px" }}>
              <p style={{ fontSize: "14px", color: "#C05A5A", marginBottom: "12px" }}>
                Note: Please ensure your delivery details are correct before placing the order.
              </p>
            </div>

            <button
              onClick={handlePlaceOrder}
              style={{
                width: "100%",
                background: "#C05A5A",
                color: "white",
                border: "none",
                padding: "16px",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: 700,
                boxShadow: "0 4px 12px rgba(192, 90, 90, 0.3)",
              }}
            >
              Place Order
            </button>
          </div>

        </div>

      </div>

      {orderSuccess && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#FFF",
              borderRadius: "25px",
              padding: "35px",
              width: "420px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            <h2 style={{ color: "#C05A5A", marginTop: 0 }}>
              🌸 Order Placed!
            </h2>

            <p>
              Thank you for shopping with <b>Yarn Over</b> 💖
            </p>

            <p>
              <b>Order ID</b>
            </p>

            <p
              style={{
                color: "#C05A5A",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {orderSuccess.orderId}
            </p>

            <p>
              We'll contact you soon to confirm your order.
            </p>

            <button
              onClick={() => {
                setOrderSuccess(null);
                setCartItems([]);
                setCustomer({
                  name: "",
                  phone: "",
                  address: "",
                  pincode: "",
                });
                setPaymentMethod("");
                setSelectedUpiApp("");
                setUpiId("");
                onNavigate("home");
              }}
              style={{
                marginTop: "20px",
                background: "#C05A5A",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "15px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}