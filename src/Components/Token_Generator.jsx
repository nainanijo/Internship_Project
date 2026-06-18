import React from 'react'
import {useState} from 'react' 


const Token_Generator = () => {
    const [tokenNumber,setTokenNumber] = useState(0)
    const handleCreateOrder = () => {
        const dynaNum = Math.floor(Math.random()*9000)+10
        setTokenNumber(dynaNum)
    }
    
  return (
    <div className='p-6 text-center'>
        <button
        onClick={handleCreateOrder} className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-700">
        Press here for token!
        </button>

        //to ensure only positive token numbers get generated

        {tokenNumber > 0 && (
            <p className= 'className="mt-4 text-lg font-bold text-gray-800">'>
                Your token number is : {tokenNumber}
                Please await your Order Completion!
                </p>
        )}



    </div>
  )
}

export default Token_Generator