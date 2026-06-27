import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaPrint } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/Dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 pt-16 pb-10 px-4 flex justify-center">
      <div className="w-full max-w-md">

        <div className="rounded-3xl bg-white p-8 shadow-[0_8px_20px_rgba(0,0,0,0.08),0_30px_60px_rgba(120,53,15,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.10),0_40px_80px_rgba(120,53,15,0.38)]">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-900 shadow-[0_10px_25px_rgba(120,53,15,0.35)]">
              <FaPrint className="text-3xl text-white" />
            </div>

            <h2 className="mt-4 text-3xl font-bold text-black">
              Welcome Admin
            </h2>

            <p className="mt-2 text-gray-500">
              Sign in to your admin account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-800" />

                <input
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:border-amber-900 focus:ring-2 focus:ring-amber-200 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-800" />

                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:border-amber-900 focus:ring-2 focus:ring-amber-200 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-amber-900 py-3 text-white text-lg font-semibold shadow-lg hover:bg-amber-900 transition-all duration-300 hover:scale-[1.02]"
            >
              Sign In
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;