import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Register({ onNavigate }) {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function handleRegister(){
    try{
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db,"users",user.uid),{
        name:name,
        email:email,
        role:"user"
      });

      alert("Account created successfully 🌸");

      onNavigate("userLogin");

    }catch(error){
      alert(error.message);
    }
  }

  return (

    <div
      style={{
        backgroundColor:"#fff2f4",
        minHeight:"100vh",
        
        width:"100vw",
        position:"relative",
        overflow:"hidden",
        fontFamily:"'Playfair Display', serif",
        padding:"10px",
        boxSizing:"border-box",
      }}
    >

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

      <div
        style={{
          position:"relative",
          zIndex:2,
          backgroundColor:"rgba(239,209,214,0.88)",
          backdropFilter:"blur(6px)",
          width:"450px",
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
            marginTop:"0px",
          }}
        >
          Create Account 🌸
        </h1>

        <p
          style={{
            color:"#8f5555",
            fontSize:"17px",
            marginBottom:"25px",
          }}
        >
          Join our little yarn world 🧶
        </p>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
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
          onClick={handleRegister}
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
          🌸 Register
        </button>

        <button
          onClick={()=>onNavigate("userLogin")}
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
          }}
        >
          ← Back to Login
        </button>


      </div>

      </div>

    </div>

  );
}
