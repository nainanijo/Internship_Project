import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import "./payment.css"; // Kept to preserve your original global styles

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Safe fallback if navigation state doesn't exist
  const { totalPrice } = location.state || { totalPrice: 0 };

  const [paymentStarted, setPaymentStarted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePayment = () => {
    setPaymentStarted(true);
  };

  const handlePaymentCompleted = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('totalPrice', totalPrice);

    // 🌐 Use live target environment variable if it exists, otherwise fallback to local testing host
    const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8080';

    try {
      const response = await axios.post(`${API_BASE_URL}/api/tokens/generate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Explicitly tell the server binary streams are coming
        }
      });
      
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
    <div className="min-h-screen bg-[#faf8f5] px-4 py-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 text-center">
        
        <h1 className="text-2xl font-black text-gray-900 mb-6">🔒 Secure Checkout</h1>

        {/* Amount Box Display Card */}
        <div className="bg-[#FAF6F0] border border-[#E6DCD0] rounded-2xl p-5 mb-4 shadow-xs">
          <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
            Total Payable Amount
          </span>
          <span className="text-3xl font-black text-amber-900">₹{totalPrice}</span>
        </div>

        <p className="text-sm text-gray-500 mb-6">Complete your transaction parameters to authorize printing.</p>

        {!paymentStarted ? (
          <button 
            className="w-full py-4 bg-amber-900 hover:bg-amber-950 text-white font-bold rounded-xl shadow-md transition active:scale-[0.99] cursor-pointer" 
            onClick={handlePayment}
          >
            Pay via UPI Gateway
          </button>
        ) : (
          <div className="space-y-5 text-left">
            <div className="bg-green-50 border border-green-200 p-3.5 rounded-xl text-center">
              <p className="text-sm text-green-800 font-bold flex items-center justify-center gap-1.5">
                <span>✅</span> UPI Payment initiated successfully!
              </p>
            </div>

            {/* Document Selection Section */}
            <div className="bg-[#FAF6F0] border border-[#E6DCD0] rounded-xl p-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Select Print Document File
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                // 🌟 FIX A: Added safe check wrapper to prevent undefined state crashes
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
                className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-900 file:text-white hover:file:bg-amber-950 file:cursor-pointer"
              />
              {selectedFile && (
                <p className="text-xs text-amber-900 font-medium mt-3 bg-white p-2 rounded border border-gray-100 truncate">
                  📄 Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <button
              className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-md transition active:scale-[0.99] cursor-pointer text-center block"
              onClick={handlePaymentCompleted}
            >
              Verify & Complete Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;