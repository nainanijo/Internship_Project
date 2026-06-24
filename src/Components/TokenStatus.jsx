import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios"; // 👈 Connects database records live

const TokenStatus = () => {
  const location = useLocation();
  const tokenFromState = location.state?.token;

  // Local state parameters to store database feedback packets
  const [liveOrder, setLiveOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!tokenFromState) {
      setLoading(false);
      return;
    }

    // Ping your exact backend database tracking route 🎯
    axios.get(`http://localhost:8080/api/tokens/${tokenFromState}`)
      .then((res) => {
        setLiveOrder(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Tracking request dropped:", err);
        setError(true);
        setLoading(false);
      });
  }, [tokenFromState]);

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
        <h1 style={{ color: "#9c4f3d", marginBottom: "20px" }}>Print Status</h1>

        {loading ? (
          <p style={{ color: "#a18276" }}>Querying active shop registers...</p>
        ) : error || !liveOrder ? (
          <div>
            <h2 style={{ color: "#b23a48" }}>❌ Tracking Code Error</h2>
            <p style={{ fontSize: "14px", color: "gray", marginTop: "10px" }}>
              Token reference identifier <strong>"{tokenFromState || "Empty"}"</strong> does not exist inside system cluster registries.
            </p>
          </div>
        ) : (
          <div>
            <h2>Token No : {liveOrder.tokenNumber}</h2>
            
            {/* 🔄 Dynamic Status Message Router System Based on Real Dashboard Selections */}
            {liveOrder.status === "Pending" && (
              <div>
                <p style={{ marginTop: "15px", fontSize: "16px" }}>⏳ Your document is in the print stream queue.</p>
                <p style={{ color: "#d97706", fontWeight: "bold", marginTop: "10px" }}>
                  Status: Pending Operator Execution
                </p>
              </div>
            )}

            {liveOrder.status === "Printing" && (
              <div>
                <p style={{ marginTop: "15px", fontSize: "16px" }}>⚙️ Machine hardware processing is currently live.</p>
                <p style={{ color: "#2563eb", fontWeight: "bold", marginTop: "10px" }}>
                  Status: Actively Pressing Ink 🖨️
                </p>
              </div>
            )}

            {(liveOrder.status === "Completed" || liveOrder.status === "Collected") && (
              <div>
                <p style={{ marginTop: "15px", fontSize: "16px" }}>Document Processing: 100% Finalized.</p>
                <p style={{ color: "green", fontWeight: "bold", marginTop: "10px" }}>
                  ✅ Ready! You can collect your physical printout.
                </p>
              </div>
            )}
            
            <p style={{ fontSize: "12px", color: "gray", marginTop: "25px" }}>
              Order Valuation Settle: ₹{liveOrder.totalPrice}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenStatus;