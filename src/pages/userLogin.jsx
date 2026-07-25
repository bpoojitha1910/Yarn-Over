import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


export default function UserLogin({ onNavigate }) {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth,email,password);

      alert("Welcome back 🌸");

      onNavigate("home");

    } catch(error){
      alert(error.message);
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
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontFamily:"'Playfair Display', serif",
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
            marginBottom:"10px",
          }}
        >
          Welcome Back 🌸
        </h1>



        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{
            width:"90%",
            padding:"14px",
            marginBottom:"15px",

            borderRadius:"18px",

            border:"2px solid #CB6565",

            outline:"none",

            fontFamily:"'Playfair Display', serif",

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

            outline:"none",

            fontFamily:"'Playfair Display', serif",

            fontSize:"16px",
          }}
        />



        <button
          onClick={handleLogin}
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

            fontFamily:"'Playfair Display', serif",

            marginBottom:"15px",
          }}
        >
          🌸 Login
        </button>



        <button
          onClick={()=>onNavigate("register")}
          style={{
            width:"100%",
            padding:"14px",

            backgroundColor:"#FFFFFF",

            color:"#CB6565",

            border:"2px solid #CB6565",

            borderRadius:"18px",

            fontSize:"16px",

            fontWeight:700,

            cursor:"pointer",

            fontFamily:"'Playfair Display', serif",

            marginBottom:"15px",
          }}
        >
          New here? Create Account 🌷
        </button>



        <button
          onClick={()=>onNavigate("login")}
          style={{
            marginTop:"10px",

            background:"transparent",

            border:"none",

            color:"#CB6565",

            cursor:"pointer",

            fontSize:"25px",

            fontFamily:"'Playfair Display', serif",
          }}
        >
          ← Back
        </button>


      </div>


    </div>

  );
}