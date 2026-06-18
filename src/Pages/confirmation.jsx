import { useLocation } from "react-router-dom";
import {useState, useEffect} from 'react' 

function Confirmation() {
  const [tokenNumber,setTokenNumber] = useState(0)
  useEffect(() => {
    const dynaNum = Math.floor(Math.random() * 9000) + 1000; 
    setTokenNumber(dynaNum);
  }, []);
  const location = useLocation();

  const {totalPrice } = location.state || {};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
    
      <h1>🎉 Payment Successful</h1>
      <h2 style={{ fontWeight: "bold" }}>
        Token Number: {tokenNumber}
      </h2>
      
      <h3>Amount Paid: ₹{totalPrice}</h3>

      <p>Show this token at the print shop counter.</p>
    
    </div>
  );
}

export default Confirmation;