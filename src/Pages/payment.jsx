import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalPrice } = location.state || {};

  const [paymentStarted, setPaymentStarted] = useState(false);

  const handlePayment = () => {
    // Demo payment simulation
    setPaymentStarted(true);
  };

  const handlePaymentCompleted = () => {
    const token = Math.floor(1000 + Math.random() * 9000);

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