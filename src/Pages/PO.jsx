import { useState } from "react";
import "./PO.css";

function PO() {
  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    phone: "",
    copies: 1,
    color: "Black & White",
    paperSize: "A4",
    side: "Single Side",
    notes: "",
  });

  // PRICE CALCULATION
  const calculatePrice = () => {
    let basePrice = formData.color === "Color" ? 5 : 2;
    return basePrice * formData.copies * files.length;
  };

  // UPLOAD FILES
  const handleFileUpload = (e) => {
    setFiles((prev) => [...prev, ...e.target.files]);
  };

  // DELETE FILE
  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT ORDER
  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if (!formData.phone || formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    console.log("Files:", files);
    console.log("Form Data:", formData);

    alert("Order Submitted Successfully!");
  };

  return (
    <div className="po-container po-layout">

      {/* LEFT SIDE */}
      <div className="po-left">

        <u><b><h1>PLACE PRINT ORDER</h1></b></u>

        <form className="order-form" onSubmit={handleSubmit}>

          {/* PHONE NUMBER */}
          <div className="section">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter 10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* FILE UPLOAD */}
          <div className="section">
            <label>Upload Files</label>

            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
            />

            {files.length > 0 && (
              <div className="file-list">
                <h4>Uploaded Files</h4>

                {files.map((file, index) => {
                  const fileURL = URL.createObjectURL(file);

                  return (
                    <div key={index} className="preview-card">

                      {/* DELETE */}
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => removeFile(index)}
                      >
                        ✕
                      </button>

                      <p>{file.name}</p>

                      {/* IMAGE */}
                      {file.type.startsWith("image/") && (
                        <img
                          src={fileURL}
                          alt={file.name}
                          className="preview-image"
                        />
                      )}

                      {/* PDF */}
                      {file.type === "application/pdf" && (
                        <iframe
                          src={fileURL}
                          title={file.name}
                          className="pdf-preview"
                        />
                      )}

                      {/* OTHER FILES */}
                      {!file.type.startsWith("image/") &&
                        file.type !== "application/pdf" && (
                          <p>📄 File uploaded (preview not supported)</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* COPIES */}
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

          {/* PRINT TYPE */}
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

          {/* PAPER SIZE */}
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

          {/* SIDE */}
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

          {/* NOTES */}
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

          {/* PRICE */}
          <h2 style={{ marginTop: "20px", color: "#442d1c" }}>
            Total Price: ₹{calculatePrice()}
          </h2>

          {/* SUBMIT */}
          <button type="submit" className="submit-btn">
            Submit Order
          </button>

        </form>
      </div>

      {/* RIGHT SIDE SUMMARY */}
      <div className="po-right">

       <u> <b><h2>Order Summary:</h2></b></u>

        <p><b>Phone:</b> {formData.phone}</p>
        <p><b>Copies:</b> {formData.copies}</p>
        <p><b>Print Type:</b> {formData.color}</p>
        <p><b>Paper Size:</b> {formData.paperSize}</p>
        <p><b>Side:</b> {formData.side}</p>
        <p><b>Files:</b> {files.length}</p>

        <h3 style={{ marginTop: "20px", color: "#442d1c" }}>
          Total: ₹{calculatePrice()}
        </h3>

      </div>

    </div>
  );
}

export default PO;