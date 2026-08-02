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
        padding: "20px",
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
          justify: "space-between",
          marginBottom: "25px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <button
          onClick={() => onNavigate?.("home")}
          style={{
            border: "none",
            background: "none",
            color: "#C05A5A",
            fontSize: "20px",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          ← Home
        </button>
        <h1
          style={{
            color: "#C05A5A",
            fontSize: "clamp(28px, 5vw, 44px)",
            marginLeft: "450px",
            marginTop: "-10px",
          }}
        >
          Cart & Checkout
        </h1>
        <div style={{ width: "60px" }} />
      </div>


      {/* Main Responsive Container */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: "25px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* LEFT COLUMN: Cart Items & Delivery Details */}
        <div
          style={{
            flex: "1 1 550px",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            minWidth: 0,
          }}
        >
          {/* SECTION 1: Scrollable Items Table */}
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
marginTop: "-40px",
marginLeft: "-100px",
}}
>


            <h2 style={{ marginTop: 0, color: "#C05A5A", fontSize: "26px" }}>
              Your Cart
            </h2>
            {cartItems.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "30px 20px",
                  color: "#666",
                  fontSize: "18px",
                }}
              >
                🛒 Your cart is empty.
              </div>
            ) : (
              /* Horizontally Scrollable Table Container */
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
                    minWidth: "480px",
                    textAlign: "left",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "2px solid #E5B2B8", color: "#C05A5A" }}>
                      <th style={{ padding: "10px" }}>Product</th>
                      <th style={{ padding: "10px" }}>Price</th>
                      <th style={{ padding: "10px" }}>Quantity</th>
                      <th style={{ padding: "10px" }}>Subtotal</th>
                      <th style={{ padding: "10px", textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} style={{ borderBottom: "1px solid #F2C9CE" }}>
                        <td style={{ padding: "12px 10px", display: "flex", alignItems: "center", gap: "12px" }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "55px",
                              height: "55px",
                              objectFit: "cover",
                              borderRadius: "12px",
                            }}
                          />
                          <span style={{ fontWeight: 600, color: "#C05A5A" }}>{item.name}</span>
                        </td>
                        <td style={{ padding: "12px 10px" }}>₹{item.price}</td>
                        <td style={{ padding: "12px 10px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
                                width: "26px",
                                height: "26px",
                                borderRadius: "50%",
                                border: "none",
                                background: "#C05A5A",
                                color: "white",
                                fontSize: "16px",
                                cursor: "pointer",
                              }}
                            >
                              −
                            </button>
                            <span style={{ fontWeight: 700 }}>{item.quantity}</span>
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
                                width: "26px",
                                height: "26px",
                                borderRadius: "50%",
                                border: "none",
                                background: item.quantity >= item.stock ? "#CCC" : "#C05A5A",
                                color: "white",
                                cursor: item.quantity >= item.stock ? "not-allowed" : "pointer",
                                fontSize: "16px",
                              }}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: "12px 10px", fontWeight: "bold" }}>
                          ₹{item.price * item.quantity}
                        </td>
                        <td style={{ padding: "12px 10px", textAlign: "right" }}>
                          <button
                            onClick={() => setCartItems(cartItems.filter((p) => p.id !== item.id))}
                            style={{
                              border: "none",
                              background: "none",
                              color: "#C05A5A",
                              cursor: "pointer",
                              fontSize: "14px",
                              fontWeight: 700,
                            }}
                          >
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>


          {/* SECTION 2: Delivery Details */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              borderRadius: "25px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              marginLeft: "-100px",
              marginTop: "-19px",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#C05A5A", fontSize: "26px" }}>
              Delivery Details
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
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


        {/* RIGHT COLUMN: Checkout Summaries (Stacks below on mobile) */}
        <div
          style={{
            flex: "1 1 320px",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          {/* SECTION 3: Order Summary */}
          <div
            style={{
              background: "rgba(242, 201, 206, 0.88)",
              borderRadius: "25px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              marginRight: "-100px",
              marginTop: "-50px",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#C05A5A", fontSize: "26px" }}>
              Order Summary
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
                <span>Total Items</span>
                <strong>{totalItems}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
                <span>Delivery</span>
                <strong>FREE</strong>
              </div>
              <hr style={{ border: "none", borderTop: "2px solid #d89aa2", margin: "10px 0" }} />
              <div
                style={{
                  display: "flex",
                  justify: "space-between",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#C05A5A",
                }}
              >
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>


          {/* SECTION 4: Payment Method & Submit */}
          <div
            style={{
              background: "rgba(242, 201, 206, 0.88)",
              borderRadius: "25px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              marginRight: "-100px",
              marginTop: "-10px",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#C05A5A", fontSize: "26px", marginBottom: "15px" }}>
              Payment Method
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px", fontSize: "16px" }}>
              <label style={{ cursor: "pointer", display: "flex", gap: "10px", alignItems: "center" }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
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
              {paymentMethod === "UPI" && (
                <div
                  style={{
                    padding: "14px",
                    background: "#FFF",
                    borderRadius: "16px",
                    border: "1px solid #E5B2B8",
                    color: "#C05A5A",
                    fontSize: "13px",
                    lineHeight: "1.5",
                  }}
                >
                  <strong>💳 Secure Online Payment</strong>
                  <p style={{ margin: "8px 0" }}>
                    After clicking <strong>Place Order</strong>, a secure Razorpay window will open.
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={handlePlaceOrder}
              style={{
                width: "100%",
                background: "#C05A5A",
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: "18px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: 700,
                boxShadow: "0 4px 12px rgba(192, 90, 90, 0.3)",
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>


      {/* Success Modal */}
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
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#FFF",
              borderRadius: "25px",
              padding: "30px",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            <h2 style={{ color: "#C05A5A", marginTop: 0 }}>🌸 Order Placed!</h2>
            <p>Thank you for shopping with <b>Yarn Over</b> 💖</p>
            <p><b>Order ID</b></p>
            <p style={{ color: "#C05A5A", fontWeight: "bold", fontSize: "18px" }}>
              {orderSuccess.orderId}
            </p>
            <button
              onClick={() => {
                setOrderSuccess(null);
                setCartItems([]);
                setCustomer({ name: "", phone: "", address: "", pincode: "" });
                setPaymentMethod("");
                onNavigate("home");
              }}
              style={{
                marginTop: "15px",
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

