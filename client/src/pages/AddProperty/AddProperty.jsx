import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProperty.css"

const serverURL = import.meta.env.VITE_SERVER_URL;

const AddProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerid: "",
    userEmail: "",
    area: "",
    title: "",
    description: "",
    type: "",
    subtype: "",
    zoning: "",
    restrictions: "",
    mobileHomeFriendly: "false",
    hoaPoa: "",
    hoaDeedDevInfo: "",
    notes: "",
    apnOrPin: "",
    streetaddress: "",
    city: "",
    county: "",
    state: "",
    zip: "",
    latitude: "",
    longitude: "",
    landId: "",
    landIdLink: "",
    sqft: "",
    acre: "",
    image: "",
    askingPrice: "",
    minPrice: "",
    disPrice: "",
    financing: "false",
    status: "Available",
    water: "",
    sewer: "",
    electric: "",
    roadCondition: "",
    floodplain: "",
    ltag: "",
    rtag: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file selection for multiple images
  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]); // Store multiple selected files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const multipartForm = new FormData();
      for (let key in formData) {
        multipartForm.append(key, formData[key]);
      }

      // Append each selected file to FormData
      selectedFiles.forEach((file) => {
        multipartForm.append("images", file);
      });

      const response = await axios.post(
        `${serverURL}/api/residency/createWithFile`, // Backend endpoint for multiple images
        multipartForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Property Added Successfully!");
      navigate("/properties");
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Failed to create property");
    }
  };

  

  return (
    <div className="form-wrapper">
      <h1>Add New Property</h1>
      <p>Please fill out the form below to add a new property.</p>

      <form onSubmit={handleSubmit}>
        <h3>System Information</h3>
        <div className="form-row">
          <InputField label="Owner ID" name="ownerid" value={formData.ownerid} onChange={handleChange} required />
          <InputField label="User Email (Owner)" name="userEmail" value={formData.userEmail} onChange={handleChange} required />
          <InputField label="Area" name="area" value={formData.area} onChange={handleChange} required />
        </div>

        <h3>Property Details</h3>
        <div className="form-row">
          <InputField label="Title" name="title" value={formData.title} onChange={handleChange} required />
          <InputField label="Description" name="description" value={formData.description} onChange={handleChange} />
          <InputField label="Type" name="type" value={formData.type} onChange={handleChange} />
          <InputField label="Sub Type" name="subtype" value={formData.subtype} onChange={handleChange} />
          <InputField label="Zoning" name="zoning" value={formData.zoning} onChange={handleChange} />
          <InputField label="Restrictions" name="restrictions" value={formData.restrictions} onChange={handleChange} />
          <InputField label="Mobile Home Friendly" name="mobileHomeFriendly" value={formData.mobileHomeFriendly} onChange={handleChange} required type="select" options={["No", "Yes"]} />
          <InputField label="HOA / POA" name="hoaPoa" value={formData.hoaPoa} onChange={handleChange} />
          <InputField label="HOA / Deed / Development Info" name="hoaDeedDevInfo" value={formData.hoaDeedDevInfo} onChange={handleChange} />
          <InputField label="Notes" name="notes" value={formData.notes} onChange={handleChange} />
        </div>
        <h3>Location</h3>
        <div className="form-row">
          <InputField label="APN or PIN" name="apnOrPin" value={formData.apnOrPin} onChange={handleChange} required />
          <InputField label="Street Address" name="streetaddress" value={formData.streetaddress} onChange={handleChange} required />
          <InputField label="City" name="city" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <InputField label="County" name="county" value={formData.county} onChange={handleChange} required />
          <InputField label="State" name="state" value={formData.state} onChange={handleChange} required />
          <InputField label="ZIP" name="zip" value={formData.zip} onChange={handleChange} required />
        </div>
        <h3>Map</h3>
        <div className="form-row">
          <InputField label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} required type="number" />
          <InputField label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} required type="number" />
          <InputField label="Land ID" name="landId" value={formData.landId} onChange={handleChange} required type="select" options={["No", "Yes"]} />
        </div>

        <InputField label="Land ID Link" name="landIdLink" value={formData.landIdLink} onChange={handleChange} />

        <h3>Physical Attributes</h3>
        <div className="form-row">
          <InputField label="Square Footage (sqft)" name="sqft" value={formData.sqft} onChange={handleChange} required type="number" />
          <InputField label="Acre" name="acre" value={formData.acre} onChange={handleChange} type="number" />
          <h3>Image Upload</h3>
          <div className="form-row">
            <InputField label="Upload Images" name="images" onChange={handleFileChange} type="file" multiple />
            <div className="selected-files">
              {selectedFiles.length > 0 ? (
                selectedFiles.map((file, index) => (
                  <p key={index} className="file-name">
                    {file.name}
                  </p>
                ))
              ) : (
                <p>No files selected.</p>
              )}
            </div>
          </div>
        </div>

        <h3>Pricing and Financing</h3>
        <div className="form-row">
          <InputField label="Asking Price" name="askingPrice" value={formData.askingPrice} onChange={handleChange} required type="number" />
          <InputField label="Minimum Price" name="minPrice" value={formData.minPrice} onChange={handleChange} required type="number" />
          <InputField label="Discount Price" name="disPrice" value={formData.disPrice} onChange={handleChange} type="number" />
        </div>

        <InputField label="Financing Available" name="financing" value={formData.financing} onChange={handleChange} required type="select" options={["No", "Yes"]} />
        <InputField label="Status" name="status" value={formData.status} onChange={handleChange} />

        <h3>Utilities and Infrastructure</h3>
        <div className="form-row">
          <InputField label="Water" name="water" value={formData.water} onChange={handleChange} />
          <InputField label="Sewer" name="sewer" value={formData.sewer} onChange={handleChange} />
          <InputField label="Electric" name="electric" value={formData.electric} onChange={handleChange} />
          <InputField label="Road Condition" name="roadCondition" value={formData.roadCondition} onChange={handleChange} />
          <InputField label="FloodPlain" name="floodplain" value={formData.floodplain} onChange={handleChange} />
        </div>

        <h3>Tags</h3>
        <div className="form-row">
        <InputField label="Left Tag" name="ltag" value={formData.ltag} onChange={handleChange} />
        <InputField label="Right Tag" name="rtag" value={formData.rtag} onChange={handleChange} />
        </div>

        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, required = false, type = "text", multiple = false }) => {
  if (type === "file") {
    return (
      <div className="input-group">
        <label>
          {label}
          {required && <span className="required">*</span>}
        </label>
        <input type="file" name={name} onChange={onChange} multiple={multiple} />
      </div>
    );
  }

  return (
    <div className="input-group">
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input type={type} name={name} value={value} onChange={onChange} required={required} />
    </div>
  );
};



export default AddProperty;
