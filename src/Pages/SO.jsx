import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SO = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;

    // Allow only digits
    if (!/^\d*$/.test(value)) {
      return;
    }

    setToken(value);

    if (value !== "" && Number(value) < 0) {
      setError("❌ Token number cannot be negative.");
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (token === "") {
      setError("❌ Please enter a token number.");
      return;
    }

    if (Number(token) < 0) {
      setError("❌ Token number cannot be negative.");
      return;
    }

    navigate("/status", {
      state: { token },
    });
  };

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
            color: "#9c4f3d",
            fontSize: "32px",
            marginBottom: "35px",
          }}
        >
          Order Status
        </h1>

        <input
          type="text"
          inputMode="numeric"
          placeholder="Enter Token Number"
          value={token}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #e0d7d2",
            outline: "none",
            fontSize: "18px",
            textAlign: "center",
            marginBottom: "15px",
          }}
        />

        {error && (
          <p
            style={{
              color: "#b23a48",
              marginBottom: "20px",
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          style={{
            padding: "14px 42px",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer",
            fontSize: "17px",
            fontWeight: "600",

            backgroundColor: "#7B3306",

            color: "white",

            boxShadow: "0 6px 16px rgba(139,74,59,0.4)",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SO;