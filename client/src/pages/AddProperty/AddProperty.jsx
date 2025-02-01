import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// For Vite:
// const serverURL = import.meta.env.VITE_SERVER_URL || "http://localhost:8400";
// For CRA:
const serverURL = import.meta.env.VITE_SERVER_URL;

const AddProperty = () => {
  const navigate = useNavigate();

  // Full form state
  const [formData, setFormData] = useState({
    ownerid: "",
    apnOrPin: "",
    askingPrice: "",
    minPrice: "",
    title: "",
    description: "",
    address: "",
    zip: "",
    city: "",
    county: "",
    state: "",
    facilities: "{}",
    userEmail: "",
    status: "",
    flyer: "",
    propertyAddress: "",
    sqft: "",
    acre: "",
    zoning: "",
    utilities: "{}",
    roadCondition: "",
    restrictions: "",
    mobileHomeFriendly: "false",
    hoaPoa: "",
    floodplain: "",
    hoaDeedDevInfo: "",
    notes: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // Handle text changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const multipartForm = new FormData();
      for (let key in formData) {
        multipartForm.append(key, formData[key]);
      }
      if (selectedFile) {
        multipartForm.append("image", selectedFile);
      }

      const response = await axios.post(
        `${serverURL}/api/residency/createWithFile`,
        multipartForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Property created:", response.data);
      alert("Property Added Successfully!");
      navigate("/properties");
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Failed to create property");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        color: "#fff",
        backgroundColor: "#333",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <h1>Add New Property</h1>

      <form onSubmit={handleSubmit}>
        {/* ownerid */}
        <label>Owner ID:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="number"
          name="ownerid"
          value={formData.ownerid}
          onChange={handleChange}
          required
        />
        <br />

        {/* apnOrPin */}
        <label>APN or PIN:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="apnOrPin"
          value={formData.apnOrPin}
          onChange={handleChange}
        />
        <br />

        {/* askingPrice */}
        <label>Asking Price:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="number"
          name="askingPrice"
          value={formData.askingPrice}
          onChange={handleChange}
          required
        />
        <br />

        {/* minPrice */}
        <label>Min Price:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="number"
          name="minPrice"
          value={formData.minPrice}
          onChange={handleChange}
        />
        <br />

        {/* title */}
        <label>Title:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />

        {/* description */}
        <label>Description:</label>
        <textarea
          style={{ color: "#fff", backgroundColor: "#444" }}
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
        <br />

        {/* address */}
        <label>Address:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <br />

        {/* zip */}
        <label>ZIP:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
        />
        <br />

        {/* city */}
        <label>City:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <br />

        {/* county */}
        <label>County:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="county"
          value={formData.county}
          onChange={handleChange}
        />
        <br />

        {/* state */}
        <label>State:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
        <br />

        {/* image file */}
        <label>Image File:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="file"
          onChange={handleFileChange}
        />
        <br />

        {/* facilities (JSON) */}
        <label>Facilities (JSON):</label>
        <textarea
          style={{ color: "#fff", backgroundColor: "#444" }}
          name="facilities"
          value={formData.facilities}
          onChange={handleChange}
          rows={2}
        />
        <br />

        {/* userEmail */}
        <label>User Email (Owner):</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="email"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleChange}
          required
        />
        <br />

        {/* status */}
        <label>Status:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
        <br />

        {/* flyer */}
        <label>Flyer URL:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="flyer"
          value={formData.flyer}
          onChange={handleChange}
        />
        <br />

        {/* propertyAddress */}
        <label>Property Address:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="propertyAddress"
          value={formData.propertyAddress}
          onChange={handleChange}
        />
        <br />

        {/* sqft */}
        <label>Square Footage (sqft):</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="number"
          name="sqft"
          value={formData.sqft}
          onChange={handleChange}
        />
        <br />

        {/* acre */}
        <label>Acre:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="number"
          step="0.01"
          name="acre"
          value={formData.acre}
          onChange={handleChange}
        />
        <br />

        {/* zoning */}
        <label>Zoning:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="zoning"
          value={formData.zoning}
          onChange={handleChange}
        />
        <br />

        {/* utilities (JSON) */}
        <label>Utilities (JSON):</label>
        <textarea
          style={{ color: "#fff", backgroundColor: "#444" }}
          name="utilities"
          value={formData.utilities}
          onChange={handleChange}
          rows={2}
        />
        <br />

        {/* roadCondition */}
        <label>Road Condition:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="roadCondition"
          value={formData.roadCondition}
          onChange={handleChange}
        />
        <br />

        {/* restrictions */}
        <label>Restrictions:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="restrictions"
          value={formData.restrictions}
          onChange={handleChange}
        />
        <br />

        {/* mobileHomeFriendly (boolean) */}
        <label>Mobile Home Friendly:</label>
        <select
          style={{ color: "#fff", backgroundColor: "#444" }}
          name="mobileHomeFriendly"
          value={formData.mobileHomeFriendly}
          onChange={handleChange}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
        <br />

        {/* hoaPoa */}
        <label>HOA/POA:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="hoaPoa"
          value={formData.hoaPoa}
          onChange={handleChange}
        />
        <br />

        {/* floodplain */}
        <label>Floodplain:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="floodplain"
          value={formData.floodplain}
          onChange={handleChange}
        />
        <br />

        {/* hoaDeedDevInfo */}
        <label>HOA Deed Dev Info:</label>
        <input
          style={{ color: "#fff", backgroundColor: "#444" }}
          type="text"
          name="hoaDeedDevInfo"
          value={formData.hoaDeedDevInfo}
          onChange={handleChange}
        />
        <br />

        {/* notes */}
        <label>Notes:</label>
        <textarea
          style={{ color: "#fff", backgroundColor: "#444" }}
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={2}
        />
        <br />

        <button style={{ marginTop: "1rem" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
