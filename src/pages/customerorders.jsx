import { useState } from "react";


export default function CustomOrders({ onNavigate }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  


  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submitting order...");

  try {
    const response = await fetch("https://yarn-over-1.onrender.com/custom-orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        contact,
        details,
      }),
    });

    console.log(response);

    const data = await response.json();

    if (response.ok) {
      setSubmitted(true);

      setName("");
      setContact("");
      setDetails("");
      

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);

      alert(data.message);
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
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
        fontFamily: "'Playfair Display', serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "30px",
        paddingBottom: "40px",
        overflowY: "auto",
        alignItems: "center",
        padding: "30px 40px",
        boxSizing: "border-box",
        margin: 0,
      }}
    >

      {/* Full-width Background Image Overlay */}
<img
  src="/YarnOver21.png"
  alt="Background Pattern"
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100%",
    minHeight: "100vh",
    objectFit: "cover",
    zIndex: 0,
    opacity: 0.35,
    pointerEvents: "none",
  }}
/>


      {/* Top Header: Home Button */}
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          display: "flex",
          justifyContent: "flex-start",
          zIndex: 10,
          marginBottom: "25px",
        }}
      >
        <button
          onClick={() => onNavigate?.("home")}
          style={{
            background: "none",
            border: "none",
            color: "#C05A5A",
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


      {/* Center Form Card */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "rgba(242, 201, 206, 0.88)",
          backdropFilter: "blur(6px)",
          borderRadius: "36px",
          padding: "40px 50px",
          width: "100%",
          maxWidth: "700px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          marginBottom: "40px",
          boxSizing: "border-box",
          marginTop: "10px",
        }}
      >
        <h1
          style={{
            color: "#C05A5A",
            fontSize: "48px",
            fontWeight: 700,
            textAlign: "center",
            margin: "0 0 8px 0",
            lineHeight: 1,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          custom orders
        </h1>
        <p
          style={{
            color: "#222222",
            fontSize: "18px",
            fontWeight: 600,
            textAlign: "center",
            margin: "0 0 28px 0",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Tell us what you'd like us to create for you! 🌸
        </p>


        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Field 1 */}
          <div>
            <label
              style={{
                display: "block",
                fontWeight: 700,
                color: "#1A1A1A",
                marginBottom: "8px",
                fontSize: "15px",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maya Sharma"
              required
              style={{
                width: "100%",
                padding: "14px 20px",
                borderRadius: "20px",
                border: "none",
                outline: "none",
                fontSize: "15px",
                fontFamily: "'Playfair Display', serif",
                backgroundColor: "#FFFFFF",
                color: "#1A1A1A",
                boxSizing: "border-box",
              }}
            />
          </div>


          {/* Field 2 */}
          <div>
            <label
              style={{
                display: "block",
                fontWeight: 700,
                color: "#1A1A1A",
                marginBottom: "8px",
                fontSize: "15px",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              email id / Phone Number
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="e.g. maya@gmail.com or +91 9876543210"
              required
              style={{
                width: "100%",
                padding: "14px 20px",
                borderRadius: "20px",
                border: "none",
                outline: "none",
                fontSize: "15px",
                fontFamily: "'Playfair Display', serif",
                backgroundColor: "#FFFFFF",
                color: "#1A1A1A",
                boxSizing: "border-box",
              }}
            />
          </div>


          {/* Field 3 */}
          <div>
            <label
              style={{
                display: "block",
                fontWeight: 700,
                color: "#1A1A1A",
                marginBottom: "8px",
                fontSize: "15px",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Order Details / Ideas
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe the plushie, bouquet, keychain, or custom design you want..."
              required
              rows={2}
              style={{
                width: "100%",
                padding: "14px 20px",
                borderRadius: "20px",
                border: "none",
                outline: "none",
                fontSize: "15px",
                fontFamily: "'Playfair Display', serif",
                backgroundColor: "#FFFFFF",
                color: "#1A1A1A",
                boxSizing: "border-box",
                resize: "none",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px 20px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#C05A5A",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Bottom Right Instagram Handle */}
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
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
            color: "#C05A5A",
            fontSize: "22px",
            fontWeight: 700,
            textDecoration: "none",
            fontFamily: "'Playfair Display', serif",
            position: "relative",
            top: "-12px",
          }}
        >
       @__yarn_over__
        </a>
      </div>
    </div>
  );
}
