import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Safeguard incoming state extraction structures
  const { totalPrice, files } = location.state || {
    totalPrice: 0,
    files: [],
  };

  const handlePayment = async () => {
    if (!files || files.length === 0) {
      alert("No file selected.");
      return;
    }

    try {
      // Load Razorpay Checkout Widget Script dynamically onto document tree
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = async () => {
        try {
          // 1. Initialize Razorpay transactional instance reference from your server
          const { data } = await axios.post(
            "http://localhost:8080/api/payment/create-order",
            { amount: totalPrice }
          );

          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.order.amount,
            currency: data.order.currency,
            name: "E PrintShop",
            description: "Print Order Payment",
            order_id: data.order.id,

            // ⚡ Execution hook fires instantly upon successful verification handshake
            handler: async function () {
              try {
                const formData = new FormData();

                // 🌟 FIX A: Changed key identifier string from "file" to "files" to match your multi-upload backend array
                files.forEach((file) => {
                  formData.append("files", file); 
                });

                formData.append("totalPrice", totalPrice);

                const response = await axios.post(
                  "http://localhost:8080/api/tokens/generate",
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );

                // Safe extraction reference finder hook for the first file name string tracking metrics
                const firstFileName = response.data.documents && response.data.documents.length > 0 
                  ? response.data.documents[0].originalFileName 
                  : "Documents Pack";

                navigate("/confirmation", {
                  state: {
                    token: response.data.tokenNumber,
                    totalPrice: totalPrice,
                    fileName: firstFileName, // 🌟 FIX B: Safely passes down from array structure data map profiles
                  },
                });
              } catch (error) {
                console.error("Token deployment process failure details:", error);
                alert("Payment was successful, but token generation failed. Please contact support.");
              }
            },

            prefill: {
              name: "",
              email: "",
              contact: "",
            },

            theme: {
              color: "#442d1c",
            },
          };

          const razorpay = new window.Razorpay(options);

          razorpay.on("payment.failed", function () {
            alert("Payment Transaction Aborted / Failed");
          });

          razorpay.open();
        } catch (error) {
          console.error("Razorpay generation order sequence crash:", error);
          alert("Unable to create payment parameters with payment cluster gateway.");
        }
      };

      script.onerror = () => {
        alert("Failed to load Razorpay library runtime dependencies.");
      };

      document.body.appendChild(script);
    } catch (error) {
      console.error("Global Payment Routine Core Crash Error:", error);
      alert("Payment runtime failure pipeline error occurred.");
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment Page</h1>

      <div className="amount-box">
        Total Amount: ₹{totalPrice}
      </div>

      <p>Please complete your payment.</p>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#442d1c", marginBottom: "8px" }}>
          Selected Files Array Summary
        </h3>

        {files && files.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {files.map((file, index) => (
              <p key={index} style={{ margin: "0", fontSize: "0.9rem", color: "#555" }}>
                📄 <strong>File {index + 1}:</strong> {file.name}
              </p>
            ))}
          </div>
        ) : (
          <p style={{ color: "#999", fontStyle: "italic" }}>No file attachments caught in current state.</p>
        )}
      </div>

      <button className="pay-btn" onClick={handlePayment}>
        Pay via UPI
      </button>
    </div>
  );
}

export default Payment;