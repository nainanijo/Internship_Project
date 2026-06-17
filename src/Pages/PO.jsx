import { useState } from "react";
import "./PO.css";

function PO() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    copies: 1,
    color: "Black & White",
    paperSize: "A4",
    side: "Single Side",
    notes: "",
  });

  const handleFileUpload = (e) => {
    setFiles([...e.target.files]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Files:", files);
    console.log("Print Details:", formData);

    alert("Order Submitted Successfully!");
  };

  return (
    <div className="po-container">
      <h1>Place Print Order</h1>

      <form className="order-form" onSubmit={handleSubmit}>
        {/* File Upload */}
        <div className="section">
          <label>Upload Files</label>

          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
          />

          {files.length > 0 && (
            <div className="file-list">
              <h4>Uploaded Files:</h4>

              {files.map((file, index) => (
                <p key={index}>{file.name}</p>
              ))}
            </div>
          )}
        </div>

        {/* Copies */}
        <div className="section">
          <label>Number of Copies</label>

          <input
            type="number"
            name="copies"
            min="1"
            value={formData.copies}
            onChange={handleChange}
          />
        </div>

        {/* Color */}
        <div className="section">
          <label>Print Type</label>

          <select
            name="color"
            value={formData.color}
            onChange={handleChange}
          >
            <option>Black & White</option>
            <option>Color</option>
          </select>
        </div>

        {/* Paper Size */}
        <div className="section">
          <label>Paper Size</label>

          <select
            name="paperSize"
            value={formData.paperSize}
            onChange={handleChange}
          >
            <option>A4</option>
            <option>A3</option>
            <option>Letter</option>
          </select>
        </div>

        {/* Single / Double */}
        <div className="section">
          <label>Printing Side</label>

          <select
            name="side"
            value={formData.side}
            onChange={handleChange}
          >
            <option>Single Side</option>
            <option>Double Side</option>
          </select>
        </div>

        {/* Notes */}
        <div className="section">
          <label>Special Instructions</label>

          <textarea
            name="notes"
            rows="4"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter any special instructions..."
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default PO;