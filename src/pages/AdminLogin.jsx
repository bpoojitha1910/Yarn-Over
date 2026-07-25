import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function AdminLogin({ onNavigate }) {

  console.log("ADMIN LOGIN LOADED"); // add this

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleAdminLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onNavigate && onNavigate("adminDashboard");
    } catch (error) {
      console.error("Admin login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };
  
  return (

  <div
    style={{
      backgroundColor:"#FFF2F4",
      minHeight:"100vh",
      width:"100vw",
      position:"relative",
      overflow:"hidden",
      fontFamily:"'Playfair Display', serif",
      padding:"35px",
      boxSizing:"border-box",
    }}
  >

    {/* Background */}
    <img
      src="/YarnOver21.png"
      alt="Background Pattern"
      style={{
        position:"absolute",
        top:0,
        left:0,
        width:"100%",
        height:"100%",
        objectFit:"cover",
        opacity:0.35,
        zIndex:0,
      }}
    />

    {/* Header with Home Button */}
    <div
      style={{
        position:"relative",
        zIndex:2,
        marginBottom:"30px",
      }}
    >
      <button
        onClick={() => onNavigate?.("home")}
        style={{
          border:"none",
          background:"none",
          color:"#C05A5A",
          fontSize:"24px",
          cursor:"pointer",
          fontWeight:700,
        }}
      >
        ← Home
      </button>
    </div>

    <div
      style={{
        position:"relative",
        zIndex:2,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        minHeight:"calc(100vh - 100px)",
      }}
    >

    {/* Login Card */}
    <div
      style={{
        position:"relative",
        zIndex:2,

        backgroundColor:"rgba(239,209,214,0.88)",

        backdropFilter:"blur(6px)",

        width:"380px",

        padding:"45px",

        borderRadius:"35px",

        textAlign:"center",

        boxShadow:"0 8px 20px rgba(0,0,0,0.08)",
      }}
    >


      <h1
        style={{
          color:"#CB6565",
          fontSize:"42px",
          fontWeight:600,
        }}
      >
        Admin Login 🔐
      </h1>



      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        style={{
          width:"90%",
          padding:"14px",
          marginBottom:"15px",
          borderRadius:"18px",
          border:"2px solid #CB6565",
          fontSize:"16px",
        }}
      />



      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        style={{
          width:"90%",
          padding:"14px",
          marginBottom:"20px",
          borderRadius:"18px",
          border:"2px solid #CB6565",
          fontSize:"16px",
        }}
      />



      <button
        onClick={handleAdminLogin}
        style={{
          width:"100%",
          padding:"14px",
          backgroundColor:"#CB6565",
          color:"white",
          border:"none",
          borderRadius:"18px",
          fontSize:"17px",
          fontWeight:700,
          cursor:"pointer",
        }}
      >
        🔐 Login
      </button>



      <button
        onClick={()=>onNavigate("login")}
        style={{
          width:"100%",
          padding:"14px",
          marginTop:"15px",
          backgroundColor:"#FFFFFF",
          color:"#CB6565",
          border:"2px solid #CB6565",
          borderRadius:"18px",
          fontSize:"16px",
          fontWeight:700,
          cursor:"pointer",
        }}
      >
        ← Back to Login
      </button>


    </div>

    </div>

  </div>

);
}
