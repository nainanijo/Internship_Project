import React from 'react'
import PO from './PO'
import {Routes,Route,NavLink,useNavigate} from 'react-router-dom'
import '../App.css'


const Home = () => {
  
    const navigate = useNavigate();
      const handleNavigate = () => {
           navigate('/PO'); // Moves user to the place order page
      }
  
  return (
  /* 1. Main page container: Centered and using a solid, soft background color */
  <div className="flex flex-col items-center justify-center min-h-[80vh] w-full text-center px-4 bg-amber-900">
    
    <div className="flex flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 rounded-xl">
    
    
    {/* Welcome Heading */}
    <h1 className= "heading text-4xl font-extrabold font- text-amber-900 tracking-tight mb-10">
      Welcome to the e-Print Shop
    </h1>
    
    {/* 2. Button Wrapper: The glow gradient stays locked right here */}
    <div className="relative inline-flex items-center justify-center gap-4 group">
      
      {/* The Glow Effect Background (Scoped to button size) */}
      <div
        className="absolute inset-0 duration-1000 opacity-60 transition-all bg-linear-to-r from-amber-800 via-red-700 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
      ></div>
      
      {/* The Main Dark Button */}
      <button
        type="button"
        onClick={handleNavigate}
        className="group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30 cursor-pointer"
        title="place order"
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

  <div>

  </div>









  </div>


);
}

export default Home