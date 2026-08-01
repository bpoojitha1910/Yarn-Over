import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register({ onNavigate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      onNavigate("home");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <style>{`
        .auth-container {
          min-height: 100vh;
          background: #FFF2F4;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Playfair Display', serif;
          box-sizing: border-box;
        }

        .auth-card {
          background: rgba(255, 255, 255, 0.95);
          padding: clamp(25px, 5vw, 40px);
          border-radius: 25px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          box-sizing: border-box;
        }

        .auth-title {
          color: #C05A5A;
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          text-align: center;
          margin-top: 0;
          margin-bottom: 25px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .auth-input {
          width: 100%;
          padding: 14px;
          border-radius: 15px;
          border: 1px solid #E5B2B8;
          outline: none;
          font-size: 1rem;
          box-sizing: border-box;
          font-family: 'Playfair Display', serif;
        }

        .auth-btn {
          width: 100%;
          padding: 14px;
          border-radius: 15px;
          border: none;
          background: #C05A5A;
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 10px;
          font-family: 'Playfair Display', serif;
          transition: background-color 0.2s ease;
        }

        .auth-btn:hover {
          background-color: #a84b4b;
        }

        .toggle-text {
          text-align: center;
          margin-top: 20px;
          color: #666;
          font-size: 0.95rem;
        }

        .toggle-link {
          color: #C05A5A;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>

        <p className="toggle-text">
          Already have an account?{" "}
          <span className="toggle-link" onClick={() => onNavigate("login")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}