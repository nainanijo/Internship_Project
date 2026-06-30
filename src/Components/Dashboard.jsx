import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios"; 

const Dashboard = () => {
  const navigate = useNavigate();
  
  // 🔑 State Memory Slots
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]); // Added Contact Messages state
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // 1. Fetch live queue records and contact messages from your cluster on mount
  useEffect(() => {
    // Run both fetch sequences in parallel safely
    const fetchDashboardData = async () => {
      try {
        const tokenRes = await axios.get('http://localhost:8080/api/tokens/all');
        setOrders(tokenRes.data);
      } catch (err) {
        console.error("Error fetching live dashboard records:", err);
      }

      try {
        const messageRes = await axios.get('http://localhost:8080/api/contact/all');
        setMessages(messageRes.data);
      } catch (err) {
        console.error("Error loading message streams:", err);
      }

      setLoading(false); // Disable spin loaders
    };

    fetchDashboardData();
  }, []);

  // 2. Authentication check gates (Kept perfectly matching your design)
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
  if (!isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin", { replace: true });
  };

  // 3. Status Modification Trigger Handler
  const handleUpdateStatus = (id, newStatus) => {
    axios.patch(`http://localhost:8080/api/tokens/${id}/status`, { status: newStatus })
      .then((res) => {
        // Instantly switch state records inline so the DOM updates instantly
        setOrders(orders.map(order => order._id === id ? res.data : order));
        alert(`Order status successfully moved to ${newStatus}!`);
      })
      .catch((err) => console.error("Database status injection patch failed:", err));
  };

const filteredOrders =
  filter === "All"
    ? orders.filter((order) => order.status !== "Collected") 
    : orders.filter((order) => order.status === filter);
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F5F0E6] to-[#E8D8C4] p-6">

      {/* Header Banner Component */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-amber-900 text-white p-6 rounded-2xl shadow-lg mb-6">
        <div>
          <h1 className="text-3xl font-bold">🖨️ Admin Dashboard</h1>
          <p className="mt-2 text-[#F5F0E6]">Manage print orders and track status</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#F5F0E6] text-amber-900 px-5 py-2 rounded-lg font-bold shadow-md hover:bg-[#E8D8C4]"
        >
          Logout
        </button>
      </div>

      {/* Dynamic Statistics Block Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => setFilter("All")}
          className="bg-white p-5 rounded-xl shadow-md text-left"
        >
          <h3 className="text-gray-500">Total Orders</h3>
          <p className="text-3xl font-bold text-amber-900">{orders.length}</p>
        </button>

        <button
          onClick={() => setFilter("Pending")}
          className="bg-white p-5 rounded-xl shadow-md text-left"
        >
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-3xl font-bold text-orange-500">
            {orders.filter((order) => order.status === "Pending").length}
          </p>
        </button>

        <button
          onClick={() => setFilter("Completed")}
          className="bg-white p-5 rounded-xl shadow-md text-left"
        >
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-3xl font-bold text-green-600">
            {orders.filter((order) => order.status === "Completed").length}
          </p>
        </button>

        <button
          onClick={() => setFilter("Collected")}
          className="bg-white p-5 rounded-xl shadow-md text-left"
        >
          <h3 className="text-gray-500">Collected</h3>
          <p className="text-3xl font-bold text-blue-600">
            {orders.filter((order) => order.status === "Collected").length}
          </p>
        </button>
      </div>

      <h2 className="text-2xl font-bold text-amber-900 mb-4">
        {filter === "All" ? "All Orders" : `${filter} Orders`}
      </h2>

      {/* Loading States Fallback */}
      {loading ? (
        <p className="text-center text-amber-900 font-medium py-6">Fetching real-time document queue maps...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No print queue instances exist inside active memory slots.</p>
      ) : (
        filteredOrders.map((order) => (
  <div
    key={order._id}
    className="bg-white border-l-8 border-amber-900 rounded-2xl shadow-md p-6 mb-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >
   {/* Locating the top title area block inside your filteredOrders mapping loop */}
<div className="flex flex-col gap-2 mb-4 pb-4 border-b border-gray-100">
  <h3 className="text-xl font-bold text-amber-900">
    🎟️ Token #{order.tokenNumber}
  </h3>
  
  {/* 🚀 NEW: Dynamic multi-document link generator loop */}
  <div className="flex flex-col gap-2 mt-1">
    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Attached Print Files:</span>
    
    {order.documents && order.documents.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {order.documents.map((doc, index) => (
          <a 
            key={doc._id || index}
            href={`http://localhost:8080${doc.documentPath}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-900/10 hover:bg-amber-900/20 text-amber-900 text-xs font-bold rounded-lg transition-colors border border-amber-900/25 truncate max-w-xs"
          >
            📂 File {index + 1}: {doc.originalFileName}
          </a>
        ))}
      </div>
    ) : (
      <span className="text-xs text-red-500 font-medium italic">⚠️ No print assets tracked on this token.</span>
    )}
  </div>
</div>
    {/* Responsive Payment Status Row Block */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 mb-4 text-sm">
      <span className="text-gray-700">
        💳 <strong>Payment Status:</strong>
      </span>
      <span className="inline-block w-max px-2.5 py-0.5 rounded-full text-white text-[11px] font-bold bg-green-600">
        Paid (Verified)
      </span>
    </div>

    {/* Select Status Controls Interactivity */}
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <label className="font-medium text-amber-900">Status:</label>

      <select
        id={`status-select-${order._id}`}
        defaultValue={order.status}
        className="border-2 border-amber-900 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
      >
        <option value="Pending">Pending</option>
        <option value="Printing">Printing</option>
        <option value="Completed">Completed</option>
        <option value="Collected">Collected</option>
      </select>

      <button 
        onClick={() => {
          const selectElement = document.getElementById(`status-select-${order._id}`);
          handleUpdateStatus(order._id, selectElement.value);
        }}
        className="bg-amber-900 text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#6F4E37] hover:scale-105 transition active:scale-95"
      >
        Update Status
      </button>
    </div>
  </div>
        ))
      )}

      {/* =======================================================
          📩 NEW SECTION: USER INQUIRIES & MESSAGES HOOK
          ======================================================= */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-amber-900">📩 User Inquiries & Messages</h2>
          <p className="text-sm text-gray-500 mt-1">
            Respond directly to student problems or campus print system feedback.
          </p>
        </div>

        <div className="space-y-4">
          {loading ? (
            <p className="text-sm text-gray-400 text-center py-4">Syncing messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6 bg-[#FAF6F0] rounded-xl border border-dashed border-gray-200">
              No incoming inquiries found. Your inbox is completely clean!
            </p>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg._id} 
                className="p-5 bg-[#FAF6F0] border border-[#E6DCD0] rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-amber-900"
              >
                <div className="space-y-1">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-base font-bold text-amber-900">{msg.name}</span>
                    <span className="text-xs text-gray-500 font-medium">({msg.email})</span>
                  </div>
                  <p className="text-sm text-gray-700 bg-white/60 p-3 rounded-lg border border-gray-100 mt-2 italic">
                    "{msg.message}"
                  </p>
                  <span className="block text-[11px] text-gray-400 pt-1">
                    Received: {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                
                {/* Dynamic Quick Mail Reply action hook */}
                <a 
                  href={`mailto:${msg.email}?subject=CampusPrint Support Response`}
                  className="px-5 py-2.5 bg-amber-900 hover:bg-[#6F4E37] text-white text-xs font-bold rounded-lg shadow-md transition-all active:scale-95 whitespace-nowrap flex items-center gap-2 self-end md:self-auto"
                >
                  Reply via Email ✉️
                </a>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard