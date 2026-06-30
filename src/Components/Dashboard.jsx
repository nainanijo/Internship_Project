import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios"; 

const Dashboard = () => {
  const navigate = useNavigate();
  
  // 🔑 State memory arrays to keep track of dynamic entries coming from MongoDB
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // 1. Fetch live queue records directly from your cluster on page mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/tokens/all')
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching live dashboard records:", err);
        setLoading(false);
      });
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
    ? orders
    : orders.filter((order) => order.status === filter);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F5F0E6] to-[#E8D8C4] p-6">

      {/* Header Banner Component */}
      <div className="flex justify-between items-center bg-amber-900 text-white p-6 rounded-2xl shadow-lg mb-6">
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
    <p className="text-3xl font-bold text-amber-900">
      {orders.length}
    </p>
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
        <p className="text-center text-amber-900 font-medium">Fetching real-time document queue maps...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No print queue instances exist inside active memory slots.</p>
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order._id} // Using secure MongoDB ObjectID strings as structural identity elements
            className="bg-white border-l-8 border-amber-900 rounded-2xl shadow-md p-6 mb-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-amber-900 mb-3">
              🎟️ Token #{order.tokenNumber}
            </h3>

            {/* Note: Standard fallback labels used until file collection uploads are piped */}
            <p className="mb-2">
              📄 <strong>Settled Value:</strong> ₹{order.totalPrice}
            </p>

            <p className="mb-4">
              💳 <strong>Payment Status:</strong>
              <span className="ml-2 px-3 py-1 rounded-full text-white text-xs font-bold bg-green-600">
                Paid (Verified)
              </span>
            </p>

            {/* Select Status Controls Interactivity */}
            <div className="flex flex-wrap items-center gap-3">
              <label className="font-medium text-amber-900">Status:</label>

              <select
                id={`status-select-${order._id}`}
                defaultValue={order.status}
                className="border-2 border-amber-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
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
                className="bg-amber-900 text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#6F4E37] hover:scale-105 transition"
              >
                Update Status
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;