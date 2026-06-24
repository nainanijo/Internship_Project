import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./payment.css";
import axios from 'axios'

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalPrice } = location.state || {};

  const [paymentStarted, setPaymentStarted] = useState(false);

  const handlePayment = () => {
    setPaymentStarted(true);
  };

 const handlePaymentCompleted = () => {
  //  Send the checkout price data package directly to the backend API route
  axios.post('http://localhost:8080/api/tokens/generate', { totalPrice })
    .then((response) => {
      // Pull down the verified generated sequential token from the database response
      const serverToken = response.data.tokenNumber;

      // Navigate safely to your confirmation screen using your existing state structure
      navigate("/confirmation", {
        state: {
          token: serverToken,
          totalPrice: totalPrice,
        },
      });
    })
    .catch((error) => {
      console.error("❌ Failed to secure database token tracking entry:", error);
      alert("Database error while securing token routing. Check terminal console.");
    });
};

  return (
    <div className="payment-container">
      <h1>Payment Page</h1>

      <div className="amount-box">
        Total Amount: ₹{totalPrice}
      </div>

      <p>Please complete your payment.</p>

      {!paymentStarted ? (
        <button className="pay-btn" onClick={handlePayment}>
          Pay via UPI
        </button>
      ) : (
        <>
          <p style={{ color: "green", fontWeight: "bold" }}>
            Payment initiated successfully!
          </p>

          <button
            className="complete-btn"
            onClick={handlePaymentCompleted}
          >
            Payment Completed
          </button>
        </>
      )}
    </div>
  );
}

export default Payment;