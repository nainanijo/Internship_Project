import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalPrice } = location.state || {};

  const [paymentStarted, setPaymentStarted] = useState(false);

  const handlePayment = () => {
    setPaymentStarted(true);
  };

  const handlePaymentCompleted = () => {
    // Get current token count
    let count = parseInt(localStorage.getItem("tokenCount")) || 1;

    // Generate token
    const letterIndex = Math.floor((count - 1) / 999);
    const number = ((count - 1) % 999) + 1;

    const letter = String.fromCharCode(65 + letterIndex); // A, B, C...
    const token = `${letter}${String(number).padStart(3, "0")}`;

    // Save next token count
    localStorage.setItem("tokenCount", count + 1);

    navigate("/confirmation", {
      state: {
        token,
        totalPrice,
      },
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