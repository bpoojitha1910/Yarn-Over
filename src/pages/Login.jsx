import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ onNavigate }) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔑 Set your hardcoded secret code here!
  const HARDCODED_ADMIN_CODE = "1999";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Check the hardcoded Admin Secret Key first if in Admin Mode
      if (isAdminMode && adminCode.trim() !== HARDCODED_ADMIN_CODE) {
        throw new Error("Invalid Admin Passcode.");
      }

      // 2. Authenticate user credentials with Firebase
      await signInWithEmailAndPassword(auth, email, password);

      // 3. Route user based on selected tab
      if (isAdminMode) {
        onNavigate?.("adminDashboard");
      } else {
        onNavigate?.("home");
      }
    } catch (error) {
      alert(`${isAdminMode ? "Admin" : "User"} Login Error: ${error.message}`);
    } finally {
      setLoading(false);
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Playfair Display', serif",
        padding: "40px 20px",
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
        }}
      />

      {/* Top-left Home Button */}
      <button
        onClick={() => onNavigate?.("home")}
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
          zIndex: 3,
        }}
      >
        ← home
      </button>

      {/* Main Container Card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(239, 209, 214, 0.92)",
          backdropFilter: "blur(6px)",
          width: "100%",
          maxWidth: "480px",
          padding: "35px 30px",
          borderRadius: "35px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          boxSizing: "border-box",
        }}
      >
        {/* Header with Dividers */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <hr
            style={{
              border: "none",
              borderTop: "2px dashed #CB6565",
              margin: "0 0 15px 0",
            }}
          />
          <h1
            style={{
              color: "#CB6565",
              fontSize: "36px",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Login
          </h1>
          <hr
            style={{
              border: "none",
              borderTop: "2px dashed #CB6565",
              margin: "15px 0 0 0",
            }}
          />
        </div>

        {/* Role Selector Tabs */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            padding: "5px",
            borderRadius: "16px",
          }}
        >
          <button
            type="button"
            onClick={() => setIsAdminMode(false)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: !isAdminMode ? "#CB6565" : "transparent",
              color: !isAdminMode ? "white" : "#CB6565",
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            👤 User
          </button>
          <button
            type="button"
            onClick={() => setIsAdminMode(true)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: isAdminMode ? "#CB6565" : "transparent",
              color: isAdminMode ? "white" : "#CB6565",
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            🔐 Admin
          </button>
        </div>

        {/* Form Container */}
        <div
          style={{
            border: "2px dashed #CB6565",
            borderRadius: "25px",
            padding: "25px 20px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              color: "#CB6565",
              fontSize: "22px",
              fontWeight: 600,
              textAlign: "center",
              marginTop: 0,
              marginBottom: "20px",
            }}
          >
            {isAdminMode ? "🔐 Admin Portal" : "👤 Welcome Back"}
          </h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder={isAdminMode ? "Admin Email" : "Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "14px",
                border: "2px solid #CB6565",
                outline: "none",
                fontFamily: "'Playfair Display', serif",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: isAdminMode ? "12px" : "18px",
                borderRadius: "14px",
                border: "2px solid #CB6565",
                outline: "none",
                fontFamily: "'Playfair Display', serif",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />

            {/* Admin-Only Input */}
            {isAdminMode && (
              <input
                type="password"
                placeholder="Admin Passcode"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "18px",
                  borderRadius: "14px",
                  border: "2px solid #CB6565",
                  outline: "none",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "15px",
                  boxSizing: "border-box",
                }}
              />
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#CB6565",
                color: "white",
                border: "none",
                borderRadius: "14px",
                fontSize: "16px",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Playfair Display', serif",
                marginBottom: !isAdminMode ? "15px" : "0",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Logging in..." : "[ Login ]"}
            </button>
          </form>

          {!isAdminMode && (
            <button
              onClick={() => onNavigate?.("register")}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#FFFFFF",
                color: "#CB6565",
                border: "1.5px solid #CB6565",
                borderRadius: "14px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}