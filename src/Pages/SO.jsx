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
        background: "#faf6f3",
      }}
    >
      <div
        style={{
          width: "380px",
          padding: "45px",
          textAlign: "center",
          backgroundColor: "#ffffff",
          borderRadius: "25px",
          boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: "#9c4f3d",
            fontWeight: "700",
            fontSize: "32px",
            marginBottom: "35px",
            letterSpacing: "1px",
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
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #e0d7d2",
            outline: "none",
            fontSize: "18px",
            textAlign: "center",
            marginBottom: "28px",
            color: "#6b4a42",
          }}
        />

        <button
          style={{
            padding: "14px 42px",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer",
            fontSize: "17px",
            fontWeight: "600",
            backgroundColor: "#c96b57",
            color: "white",
            boxShadow: "0 6px 16px rgba(201,107,87,0.35)",
            transition: "all 0.2s ease",
          }}
          onMouseDown={(e) => {
            e.target.style.transform = "translateY(2px)";
            e.target.style.boxShadow =
              "0 3px 8px rgba(201,107,87,0.45)";
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow =
              "0 6px 16px rgba(201,107,87,0.35)";
          }}
        >
          Submit
        </button>

        <style>
          {`
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            input[type=number] {
              -moz-appearance: textfield;
            }
          `}
        </style>

      </div>
    </div>
  );
};

export default SO;