import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

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
      // Load Razorpay Script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = async () => {
        try {
          // Create Order
          const { data } = await axios.post(
            "http://localhost:8080/api/payment/create-order",
            {
              amount: totalPrice,
            }
          );

          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.order.amount,
            currency: data.order.currency,
            name: "E PrintShop",
            description: "Print Order Payment",
            order_id: data.order.id,

            handler: async function () {
              try {
                const formData = new FormData();

                files.forEach((file) => {
                  formData.append("file", file);
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

                navigate("/confirmation", {
                  state: {
                    token: response.data.tokenNumber,
                    totalPrice: totalPrice,
                    fileName: response.data.originalFileName,
                  },
                });
              } catch (error) {
                console.error(error);
                alert("Failed to generate token.");
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
            alert("Payment Failed");
          });

          razorpay.open();
        } catch (error) {
          console.error(error);
          alert("Unable to create payment.");
        }
      };

      script.onerror = () => {
        alert("Failed to load Razorpay.");
      };

      document.body.appendChild(script);
    } catch (error) {
      console.error(error);
      alert("Payment Error");
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
        <h3>Selected Files</h3>

        {files && files.length > 0 ? (
          files.map((file, index) => (
            <p key={index}>📄 {file.name}</p>
          ))
        ) : (
          <p>No file selected.</p>
        )}
      </div>

      <button className="pay-btn" onClick={handlePayment}>
        Pay via UPI
      </button>
    </div>
  );
}

export default Payment;