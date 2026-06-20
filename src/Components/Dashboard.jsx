import React from "react";

const Dashboard = () => {
  const orders = [
    {
      token: 101,
      document: "Project.pdf",
      details: "Color Print, A4, Spiral Binding",
      payment: "Paid",
      status: "Pending",
    },
    {
      token: 102,
      document: "Assignment.pdf",
      details: "B/W Print, A4",
      payment: "Not Paid",
      status: "Printing",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0E6] to-[#E8D8C4] p-6">
      
      <div className="bg-amber-900 text-white p-6 rounded-2xl shadow-lg mb-6">
        <h1 className="text-3xl font-bold">🖨️ Admin Dashboard</h1>
        <p className="mt-2 text-[#F5F0E6]">
          Manage print orders and track status
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-gray-500">Total Orders</h3>
          <p className="text-3xl font-bold text-amber-900">
            {orders.length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-3xl font-bold text-orange-500">
            {
              orders.filter((order) => order.status === "Pending")
                .length
            }
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-3xl font-bold text-green-600">
            {
              orders.filter((order) => order.status === "Completed")
                .length
            }
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-amber-900 mb-4">
        Recent Orders
      </h2>

      {orders.map((order) => (
        <div
          key={order.token}
          className="bg-white border-l-8 border-amber-900 rounded-2xl shadow-md p-6 mb-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-amber-900 mb-3">
            🎟️ Token #{order.token}
          </h3>

          <p className="mb-2">
            📄 <strong>Document:</strong> {order.document}
          </p>

          <p className="mb-2">
            📝 <strong>Order Details:</strong> {order.details}
          </p>

          <p className="mb-4">
            💳 <strong>Payment Status:</strong>

            <span
              className={`ml-2 px-3 py-1 rounded-full text-white text-xs font-bold ${
                order.payment === "Paid"
                  ? "bg-green-600"
                  : "bg-red-500"
              }`}
            >
              {order.payment}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <label className="font-medium text-amber-900">
              Status:
            </label>

            <select
              defaultValue={order.status}
              className="border-2 border-amber-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            >
              <option>Pending</option>
              <option>Printing</option>
              <option>Completed</option>
              <option>Collected</option>
            </select>

            <button className="bg-amber-900 text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#6F4E37] hover:scale-105 transition">
              Update Status
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;