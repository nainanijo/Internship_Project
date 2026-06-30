import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./payment.css";
import axios from 'axios'

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalPrice } = location.state || {};

  const [paymentStarted, setPaymentStarted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePayment = () => {
    setPaymentStarted(true);
  };

 const handlePaymentCompleted = async () => {
  if (!selectedFile) {
    alert('Please select a file first');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('totalPrice', totalPrice);

  try {
    const response = await axios.post('http://localhost:8080/api/tokens/generate', formData);
    
    const serverToken = response.data.tokenNumber;
    
    navigate("/confirmation", {
      state: {
        token: serverToken,
        totalPrice: totalPrice,
        fileName: response.data.originalFileName
      }
    });
  } catch (error) {
    console.error("❌ Failed to secure database token tracking entry:", error);
    alert(error.response?.data?.error || "Database error while securing token routing.");
  }
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
        <div style={{ marginBottom: '15px' }}>
        <input
        type="file"
        accept=".pdf,.doc,.docx,.ppt,.pptx"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        />
       {selectedFile && <p>File: {selectedFile.name}</p>}
        </div>
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