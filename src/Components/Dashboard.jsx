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
    <div className="p-4">
      <h1>Welcome Admin</h1>

      {orders.map((order) => (
        <div
          key={order.token}
          style={{
            border: "1px solid black",
            padding: "15px",
            marginTop: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>Token Number: {order.token}</h3>

          <p>
            <strong>Document:</strong> {order.document}
          </p>

          <p>
            <strong>Order Details:</strong> {order.details}
          </p>

          <p>
            <strong>Payment Status:</strong> {order.payment}
          </p>

          <label>Status: </label>

          <select defaultValue={order.status}>
            <option>Pending</option>
            <option>Printing</option>
            <option>Completed</option>
            <option>Collected</option>
          </select>
          <button style={{marginLeft: "10px"}}>Update Status</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;