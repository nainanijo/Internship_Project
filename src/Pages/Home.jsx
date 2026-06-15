import React from 'react'
import PO from './PO'
import {Routes,Route,NavLink,useNavigate} from 'react-router-dom'

const Home = () => {
  
    const navigate = useNavigate();
      const handleNavigate = () => {
           navigate('/PO'); // Moves user to the place order page
      }
  
  return (
    <div>
        <h1 className='text-align:center '>Welcome to the e-Print Shop</h1>
        <button type="button" onClick={handleNavigate} className="group relative flex w-full justify-center rounded-md border border-transparent bg-amber-900 py-2 px-4 text-sm font-medium text-white hover:bg-amber-800 "
  > PLACE ORDER
        </button>
    </div>
  )
}

export default Home