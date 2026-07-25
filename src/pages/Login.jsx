export default function Login({ onNavigate }) {
  return (


    <div
      style={{
        backgroundColor: "#FFF2F4",
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Playfair Display', serif",
      }}
    >
        

      {/* Background */}
      <img
        src="/YarnOver21.png"
        alt="Background Pattern"
        style={{
          position: "absolute",
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
        onClick={() => onNavigate("home")}
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
          zIndex: 2,
        }}
      >
        ← home
      </button>

      {/* Login Choice Card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,

          backgroundColor: "rgba(239, 209, 214, 0.88)",
          backdropFilter: "blur(6px)",

          width: "380px",

          padding: "45px",

          borderRadius: "35px",

          textAlign: "center",

          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >

        <h1
          style={{
            color: "#CB6565",
            fontSize: "48px",
            fontWeight: 600,
            marginBottom: "10px",
          }}
        >
          Welcome to our little yarn world ! 🌸
        </h1>

        <button
          onClick={() => onNavigate("userLogin")}
          style={{
            width: "100%",
            padding: "14px",

            backgroundColor: "#CB6565",
            color: "white",

            border: "none",
            borderRadius: "18px",

            fontSize: "17px",
            fontWeight: 700,

            cursor: "pointer",

            fontFamily: "'Playfair Display', serif",

            marginBottom: "15px",
          }}
        >
          🌸 User Login
        </button>



        <button
          onClick={() => onNavigate("adminLogin")}
          style={{
            width: "100%",
            padding: "14px",

            backgroundColor: "#FFFFFF",
            color: "#CB6565",

            border: "2px solid #CB6565",
            borderRadius: "18px",

            fontSize: "17px",
            fontWeight: 700,

            cursor: "pointer",

            fontFamily: "'Playfair Display', serif",
          }}
        >
          🧶 Admin Login
        </button>

        

      </div>

    </div>
  );
}