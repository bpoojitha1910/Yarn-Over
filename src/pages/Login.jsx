import { useState } from "react";
import { auth, db } from "../firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Login({ onNavigate }) {
  // Mode can be 'login', 'register', or 'admin'
  const [mode, setMode] = useState("login"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [loading, setLoading] = useState(false);

  const HARDCODED_ADMIN_CODE = "1999";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "admin") {
        if (adminCode.trim() !== HARDCODED_ADMIN_CODE) {
          throw new Error("Invalid Admin Passcode.");
        }
        await signInWithEmailAndPassword(auth, email, password);
        onNavigate?.("adminDashboard");
      } else if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        onNavigate?.("home");
      } else if (mode === "register") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          fullName,
          email,
          createdAt: new Date().toISOString(),
        });
        alert("Account created successfully!");
        onNavigate?.("home");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "transparent",
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
        backgroundImage: "url('/YarnOver21.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
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
      
      {/* Top-left Home Navigation Button */}
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
          backgroundColor: "#F3D1D8",
          width: "90%",
          maxWidth: "450px",
          margin: "0 auto",
          padding: "35px 30px",
          borderRadius: "35px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          boxSizing: "border-box",
          border: "1px solid rgba(203, 101, 101, 0.18)",
        }}
      >
        {/* Header Title */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <hr style={{ border: "none", borderTop: "2px dashed #CB6565", margin: "0 0 15px 0" }} />
          <h1 style={{ color: "#CB6565", fontSize: "32px", fontWeight: 600, margin: 0 }}>
            {mode === "register" ? "Create Account" : mode === "admin" ? "Admin Portal" : "Login"}
          </h1>
          <hr style={{ border: "none", borderTop: "2px dashed #CB6565", margin: "15px 0 0 0" }} />
        </div>

        {/* Mode Selector Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            padding: "5px",
            borderRadius: "16px",
          }}
        >
          <button
            type="button"
            onClick={() => setMode("login")}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: mode === "login" ? "#CB6565" : "transparent",
              color: mode === "login" ? "white" : "#CB6565",
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            👤 User
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: mode === "register" ? "#CB6565" : "transparent",
              color: mode === "register" ? "white" : "#CB6565",
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            ✨ Sign Up
          </button>
          <button
            type="button"
            onClick={() => setMode("admin")}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: mode === "admin" ? "#CB6565" : "transparent",
              color: mode === "admin" ? "white" : "#CB6565",
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              cursor: "pointer",
              fontSize: "13px",
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
          <form onSubmit={handleSubmit}>
            {mode === "register" && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
            )}
            <input
              type="email"
              placeholder={mode === "admin" ? "Admin Email" : "Email Address"}
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
                marginBottom: mode === "admin" ? "12px" : "18px",
                borderRadius: "14px",
                border: "2px solid #CB6565",
                outline: "none",
                fontFamily: "'Playfair Display', serif",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />
            {mode === "admin" && (
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
                marginBottom: "15px",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Processing..." : mode === "register" ? "Sign Up" : mode === "admin" ? "Admin Login" : "Login"}
            </button>
          </form>

          {/* Quick toggle links */}
          <div style={{ textAlign: "center", fontSize: "14px", color: "#666" }}>
            {mode === "login" && (
              <span>
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("register")}
                  style={{ background: "none", border: "none", color: "#CB6565", fontWeight: 700, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit", padding: 0 }}
                >
                  Sign Up
                </button>
              </span>
            )}
            {mode === "register" && (
              <span>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  style={{ background: "none", border: "none", color: "#CB6565", fontWeight: 700, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit", padding: 0 }}
                >
                  Sign In
                </button>
              </span>
            )}
            {mode === "admin" && (
              <span>
                Back to{" "}
                <button
                  onClick={() => setMode("login")}
                  style={{ background: "none", border: "none", color: "#CB6565", fontWeight: 700, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit", padding: 0 }}
                >
                  User Login
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}