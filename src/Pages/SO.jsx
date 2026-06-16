import React, { useState } from "react";

const SO = () => {
  const [token, setToken] = useState("");

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f7f2",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          width: "350px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: "#556B2F",
            letterSpacing: "1px",
            marginBottom: "30px",
          }}
        >
          Order Status
        </h1>

        <input
          type="number"
          placeholder="Enter Token Number"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #d6d6d6",
            outline: "none",
            fontSize: "16px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        />

        <button
          style={{
            padding: "12px 35px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: "#a3b18a",
            color: "white",
            boxShadow: "0 6px 15px rgba(163,177,138,0.5)",
            transition: "0.3s",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SO;