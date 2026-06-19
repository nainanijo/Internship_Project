import { useLocation } from "react-router-dom";

function Confirmation() {
  const location = useLocation();

  const { token, totalPrice } = location.state || {};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎉 Payment Successful</h1>

      <b><h2>Token Number: {token}</h2></b>

      <h3>Amount Paid: ₹{totalPrice}</h3>

      <p>Show this token at the print shop counter.</p>
    </div>
  );
}

export default Confirmation;