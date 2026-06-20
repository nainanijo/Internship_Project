import React from 'react'
import PO from './PO'
import {Routes,Route,NavLink,useNavigate} from 'react-router-dom'
import '../App.css'
import HIW from '../Images/HIW.png'; 

const Home = () => {
const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/PO')
  }
  return (
  
    <div className="w-full min-h-screen bg-[#faf8f5] flex flex-col">
      
     
      <div className="w-full bg-[#92400e] pt-12 pb-24 px-4 flex justify-center items-center shadow-md">
        
        
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl max-w-xl w-full text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
            Welcome to the e-Print Shop
          </h1>
          
      <div className="relative inline-flex items-center justify-center gap-4 group">
      
      {/* The Glow Effect Background (Scoped to button size) */}
      <div
        className="absolute inset-0 duration-1000 opacity-60 transition-all bg-linear-to-r from-red-500 via-amber-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
      ></div>
      
      {/* The Main Dark Button */}
      <button
        type="button"
        onClick={handleNavigate}
        className="group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30 cursor-pointer"
        title="payment"
      >
        PLACE ORDER
        
        {/* Animated Arrow SVG */}
        <svg
          aria-hidden="true"
          viewBox="0 0 10 10"
          className="mt-0.5 ml-2 -mr-1 h-2.5 w-2.5 stroke-white stroke-2 fill-none"
        >
          <path
            d="M0 5h7"
            className="transition opacity-0 group-hover:opacity-100"
          ></path>
          <path
            d="M1 1l4 4-4 4"
            className="transition group-hover:translate-x-0.75"
          ></path>
        </svg>
      </button>
      </div>
      </div>

      </div>

      
      <div className="w-full max-w-4xl mx-auto -mt-12 px-6 pb-16 flex flex-col items-center">
        
      
        <div className="bg-white w-full p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center">
          
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase mb-4 mt-2">
            HOW IT WORKS
          </h2>
          
          {/* The Layout Graphic */}
          <img 
            src={HIW} 
            alt="Step by step print processing guide flow" 
            className="w-full h-auto object-contain max-w-3xl"
          />
          
        </div>
        
      </div>

    </div>
  );
};

export default Home;