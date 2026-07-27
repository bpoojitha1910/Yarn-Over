import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ onNavigate }) {
  // User Form State
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userLoading, setUserLoading] = useState(false);

  // Admin Form State
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);

  // User Login Handler
  const handleUserLogin = async (e) => {
    e.preventDefault();
    setUserLoading(true);
    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword);
      onNavigate?.("home");
    } catch (error) {
      alert("User Login Error: " + error.message);
    } finally {
      setUserLoading(false);
    }
  };

  // Admin Login Handler
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminLoading(true);
    try {
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      onNavigate?.("adminDashboard");
    } catch (error) {
      alert("Admin Login Error: " + error.message);
    } finally {
      setAdminLoading(false);
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

      {/* Outer Main Container Card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(239, 209, 214, 0.92)",
          backdropFilter: "blur(6px)",
          width: "100%",
          maxWidth: "800px",
          padding: "35px 30px",
          borderRadius: "35px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header Section with Dividers */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <hr style={{ border: "none", borderTop: "2px dashed #CB6565", margin: "0 0 15px 0" }} />
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
          <hr style={{ border: "none", borderTop: "2px dashed #CB6565", margin: "15px 0 0 0" }} />
        </div>

        {/* Side-by-Side Sub-Cards Container */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "25px",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {/* User Login Sub-Card */}
          <div
            style={{
              flex: "1 1 300px",
              maxWidth: "360px",
              border: "2px dashed #CB6565",
              borderRadius: "25px",
              padding: "25px 20px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2
                style={{
                  color: "#CB6565",
                  fontSize: "24px",
                  fontWeight: 600,
                  textAlign: "center",
                  marginTop: 0,
                  marginBottom: "20px",
                }}
              >
                👤 User Login
              </h2>

              <form onSubmit={handleUserLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
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
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
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

                <button
                  type="submit"
                  disabled={userLoading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#CB6565",
                    color: "white",
                    border: "none",
                    borderRadius: "14px",
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: userLoading ? "not-allowed" : "pointer",
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: "15px",
                    opacity: userLoading ? 0.7 : 1,
                  }}
                >
                  {userLoading ? "Logging in..." : "[ Login ]"}
                </button>
              </form>
            </div>

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
          </div>

          {/* Admin Login Sub-Card */}
          <div
            style={{
              flex: "1 1 300px",
              maxWidth: "360px",
              border: "2px dashed #CB6565",
              borderRadius: "25px",
              padding: "25px 20px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2
                style={{
                  color: "#CB6565",
                  fontSize: "24px",
                  fontWeight: 600,
                  textAlign: "center",
                  marginTop: 0,
                  marginBottom: "20px",
                }}
              >
                🔐 Admin Login
              </h2>

              <form onSubmit={handleAdminLogin}>
                <input
                  type="email"
                  placeholder="Admin Email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
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
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
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

                <button
                  type="submit"
                  disabled={adminLoading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#CB6565",
                    color: "white",
                    border: "none",
                    borderRadius: "14px",
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: adminLoading ? "not-allowed" : "pointer",
                    fontFamily: "'Playfair Display', serif",
                    opacity: adminLoading ? 0.7 : 1,
                  }}
                >
                  {adminLoading ? "Logging in..." : "[ Login ]"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}