import { useLocation, useNavigate } from "react-router-dom";
import "./payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalPrice } = location.state || {};

  const handlePayment = () => {
    const upiId = "yourupi@oksbi"; // Replace with actual UPI ID

    const upiLink =
      `upi://pay?pa=${upiId}&pn=CollegePrintShop&am=${totalPrice}&cu=INR`;

    window.location.href = upiLink;
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

    <button className="pay-btn" onClick={handlePayment}>
      Pay via UPI
    </button>

    <button
      className="complete-btn"
      onClick={handlePaymentCompleted}
    >
      Payment Completed
    </button>
  </div>
);
}

export default Payment;