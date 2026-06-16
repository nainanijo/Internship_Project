import React, { useState } from "react";

const SO = () => {

  const [token, setToken] = useState("");

  return (
    <div>

      <h1>Order Status</h1>

      <input
        type="number"
        placeholder="Enter Token Number"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

    </div>
  );
};

export default SO;