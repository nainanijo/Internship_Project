import React from 'react'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login=() =>{
    const[isLoggedIn,setIsLoggedIn]= useState(true)
    //State hooks to capture form inputs
    const[email,setEmail] = useState("")
    const[password,setPassword]=useState('')
    const navigate = useNavigate();

    //handling form submission
    const handleSubmit = (e) =>{
        e.preventDefault();
        if (
          email==="admin@gmail.com" &&
          password==="Admin@123"
        ){
          navigate("/Dashboard");
        }
        else{
          alert("Invalid Email or Password");
        }
    
        //API to be used here
    console.log("Logging in with",{email,password});

    //alert
    };
return (
    <div className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {/* Email Input Field */}
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-amber-700 sm:text-sm"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-amber-700 sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-amber-900 py-2 px-4 text-sm font-medium text-white hover:bg-amber-800 "
            >
              Sign In
            </button>
          </div>
        </form>
        </div>
    </div>
    )
    //create isLoggedIn  initial value-true

   
}

export default Login

