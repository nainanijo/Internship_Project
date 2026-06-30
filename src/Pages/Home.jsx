import React, { useState } from 'react'; // 👈 Added missing useState hook import
import PO from './PO';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 👈 Added missing axios utility import
import '../App.css';
import HIW from '../Images/HIW.png'; 

const Home = () => {
  // 🔑 Local Input State Observers
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [statusMsg, setStatusMsg] = useState('');
  
  const navigate = useNavigate();

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      // Transmit form object payload directly to your newly established cloud schemas
      await axios.post('http://localhost:8080/api/contact/submit', formData);
      setStatusMsg('✅ Message sent successfully! The admin will review it.');
      setFormData({ name: '', email: '', message: '' }); // Reset text input spaces on success
    } catch (err) {
      setStatusMsg('❌ Failed to send message. Please verify your network parameters.');
    }
  };  

  const handleNavigate = () => {
    navigate('/PO');
  };

  return (
    <div className="w-full min-h-screen bg-[#faf8f5] flex flex-col">
      
      {/* 🚀 Hero Accent Container Layout */}
      <div className="w-full bg-[#92400e] pt-12 pb-24 px-4 flex justify-center items-center shadow-md">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl max-w-xl w-full text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
            Welcome to the e-Print Shop
          </h1>
          
          <div className="relative inline-flex items-center justify-center gap-4 group">
            {/* The Glow Effect Background (Scoped to button size) */}
            <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-linear-to-r from-red-500 via-amber-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
            
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

      {/* 🌟 1. About Us Section */}
      <div id="about" className="scroll-mt-24 bg-[#FAF6F0] rounded-2xl p-8 border border-[#E6DCD0] flex flex-col justify-between shadow-sm max-w-4xl mx-auto my-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🤝</span>
            <h2 className="text-2xl font-bold text-[#4A3B32]">About CampusPrint</h2>
          </div>
          <p className="text-[#6D5D53] leading-relaxed mb-4">
            Welcome to <strong className="text-[#A25F35]">CampusPrint</strong>, your smart campus printing companion designed to eliminate long print shop queues. Created for students by students, our platform automates order queues and payment processing in real-time.
          </p>
          <p className="text-[#6D5D53] leading-relaxed">
            Simply upload your document metrics, complete your transaction via secure UPI parameters, and trace your order status live right from your device. We bridge the gap between digital workflows and physical delivery.
          </p>
        </div>
      </div>
        
      {/* 🛠️ 2. How It Works Section */}
      <div className="w-full max-w-4xl mx-auto mt-6 px-6 pb-16 flex flex-col items-center">
        <div className="bg-white w-full p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase mb-4 mt-2">
            HOW IT WORKS
          </h2>
          
          <img 
            src={HIW} 
            alt="Step by step print processing guide flow" 
            className="w-full h-auto object-contain max-w-3xl"
          />
        </div>
      </div>

      {/* ✉️ 3. Contact Us Section */}
      <div id="contact" className="scroll-mt-24 w-full max-w-4xl mx-auto mt-6 px-6 pb-16 flex flex-col items-center">
        <div className="bg-white w-full p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
          
          {/* Header Block */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="text-2xl">✉️</span>
              <h2 className="text-xl font-bold tracking-wide text-gray-900 uppercase">
                Get in Touch
              </h2>
            </div>
            <p className="text-sm text-[#908075]">Have questions about your print queue? Drop us a message.</p>
          </div>

          {/* Interactive Form Elements */}
          <form className="space-y-5" onSubmit={handleContactSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6D5D53] mb-2">
                  Your Name
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter name"
                  className="w-full px-4 py-3 bg-[#FAF6F0] border border-[#E6DCD0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#A25F35] focus:bg-white transition-all text-gray-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6D5D53] mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@college.edu"
                  className="w-full px-4 py-3 bg-[#FAF6F0] border border-[#E6DCD0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#A25F35] focus:bg-white transition-all text-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6D5D53] mb-2">
                Message / Inquiry
              </label>
              <textarea 
                rows="4" 
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type your message details here..."
                className="w-full px-4 py-3 bg-[#FAF6F0] border border-[#E6DCD0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#A25F35] focus:bg-white transition-all text-gray-800 resize-none"
              ></textarea>
            </div>

            {/* Asynchronous System Confirmation Banner */}
            {statusMsg && (
              <div className={`p-4 text-sm font-semibold rounded-xl text-center shadow-xs transition-all ${statusMsg.startsWith('✅') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {statusMsg}
              </div>
            )}

            <div className="flex justify-end">
              <button 
                type="submit"
                className="px-6 py-3 bg-[#A25F35] hover:bg-[#8B4E2B] text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                Send Message
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Home;