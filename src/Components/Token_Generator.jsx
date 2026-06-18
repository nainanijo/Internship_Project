import React from 'react'
import {useState} from 'react' 


const Token_Generator = () => {
    const [tokenNumber,setTokenNumber] = useState(0)
    const handleCreateOrder = () => {
        const dynaNum = Math.floor(Math.random()*9000)+10
        setTokenNumber(dynaNum)
    }
    
  return (
    <div id='generator'>
        <button
        onClick={handleCreateOrder}>
        Press here for token!
        </button>

        // to ensure only positive token numbers get generated

        {tokenNumber > 0 && (
            <p id= 'generator_m'>
                Your token number is : {tokenNumber}
                Please await your Order Completion!
                </p>
        )}



    </div>
  )
}

export default Token_Generator