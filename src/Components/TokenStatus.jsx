import React from "react";
import { useLocation } from "react-router-dom";

const TokenStatus = () => {

  const location = useLocation();

  const token = location.state?.token;

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "420px",
          padding: "40px",
          textAlign: "center",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ color: "#9c4f3d" }}>
          Print Status
        </h1>

        <h2>Token No : {token}</h2>

        <p>📄 Your document is ready.</p>

        <p style={{ color: "green" }}>
          ✅ You can collect your printout.
        </p>
      </div>
    </div>
  );
};

export default TokenStatus;