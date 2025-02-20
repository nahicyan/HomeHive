import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { textFieldStyle, sectionStyle, sectionTitleStyle, submitButtonStyle, FormControlWithSelect } from "../formStyles";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import { UserContext } from "../../utils/UserContext";
import ImageUploadPreview from "../../components/ImageUploadPreview/ImageUploadPreview";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";

const serverURL = import.meta.env.VITE_SERVER_URL;

const EditProperty = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    ownerid: "",
    userEmail: "",
    area: "",
    title: "",
    description: "",
    direction: "",
    type: "",
    subtype: "",
    zoning: "",
    restrictions: "",
    mobileHomeFriendly: "",
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
    image: "", // Existing images
    askingPrice: "",
    minPrice: "",
    disPrice: "",
    financing: "",
    status: "",
    water: "",
    sewer: "",
    electric: "",
    roadCondition: "",
    floodplain: "",
    ltag: "",
    rtag: "",
  });

  const [uploadedImages, setUploadedImages] = useState([]); // Newly uploaded images

  // **Load Existing Property Data**
  useEffect(() => {
    if (propertyId) {
      axios
        .get(`${serverURL}/api/residency/${propertyId}`)
        .then((res) => {
          const data = res.data;

          setFormData({
            ...data,
            image: data.image || "", // Keep existing images
          });
        })
        .catch((err) => {
          console.error("Error fetching property:", err);
          alert("Error fetching property data");
        });
    }
  }, [propertyId]);

  // **Set User Email from Session**
  useEffect(() => {
    if (currentUser?.email) {
      setFormData((prev) => ({ ...prev, userEmail: currentUser.email }));
    }
  }, [currentUser]);

  // **Handle Input Changes**
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => {
      let updated = { ...prev };
  
      // Ensure `ownerid` is always an integer
      if (name === "ownerid") {
        const parsedValue = parseInt(value, 10);
        updated[name] = isNaN(parsedValue) ? "" : parsedValue;
      } 
      
      // Handle numeric fields (remove commas and format)
      else if (["sqft", "askingPrice", "minPrice", "disPrice"].includes(name)) {
        const numericValue = value.replace(/,/g, ""); // Remove commas
        const parsedValue = parseFloat(numericValue);
  
        if (!isNaN(parsedValue)) {
          updated[name] = parsedValue.toLocaleString("en-US");
  
          // Convert sqft to acres dynamically
          if (name === "sqft") {
            updated.acre = (parsedValue / 43560).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          }
        } else {
          updated[name] = "";
          if (name === "sqft") updated.acre = "";
        }
      } 
      
      // Handle all other fields normally
      else {
        updated[name] = value;
      }
  
      return updated;
    });
  };
  

  // **Handle Rich Text Fields**
  const handleTitleChange = (value) => setFormData((prev) => ({ ...prev, title: value }));
  const handleDescriptionChange = (value) => setFormData((prev) => ({ ...prev, description: value }));
  const handleNotesChange = (value) => setFormData((prev) => ({ ...prev, notes: value }));



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const multipartForm = new FormData();
      const numericFields = ["sqft", "askingPrice", "minPrice", "disPrice", "acre"];
  
      console.log("📌 Preparing Form Data for Update:", formData);
  
      for (let key in formData) {
        let value = formData[key];
        console.log("Separated key-value pair:");
        console.log(`Key: ${key}:`, value);
  
        // Convert `ownerid` to an integer
        if (key === "ownerid") {
          value = parseInt(value, 10);
          if (isNaN(value)) {
            console.error("❌ Invalid ownerid value:", formData.ownerid);
            alert("⚠ Owner ID must be a number.");
            return;
          }
        }
  
        // Convert numeric fields correctly
        if (numericFields.includes(key) && typeof value === "string") {
          value = value.replace(/,/g, "");
        }
  
        // ✅ Ensure the `image` field is a **single string** (stringified JSON)
        if (key === "image" && typeof value === "string") {
          try {
            const existingImages = JSON.parse(value);
            const imageString = existingImages.length > 0 ? existingImages.join(",") : "";
            multipartForm.append("image", imageString); // ✅ Append as a single comma-separated string
          } catch (error) {
            console.warn("⚠ Error parsing existing images:", error);
          }
          continue;
        }
  
        multipartForm.append(key, value);
      }
  
      // Append newly uploaded images
      if (uploadedImages.length > 0) {
        uploadedImages.forEach((image) => multipartForm.append("images", image.file));
      } else {
        console.warn("⚠ No new images uploaded.");
      }
  
      console.log("📌 Final FormData Entries:", [...multipartForm.entries()]);
  
      // **Send the PUT request**
      await axios.put(`${serverURL}/api/residency/update/${propertyId}`, multipartForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ File updated successfully");
      alert("✅ Update Successful");
      navigate(`/properties/${propertyId}`); // Redirect to the updated property
    } catch (error) {
      console.error("❌ Error updating property:", error);
      alert("⚠ Failed to update property");
    }
  };
  
  

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(200, 200, 200, 0.6)",
        maxWidth: "1080px",
        width: "95%",
        mx: "auto",
        p: 3,
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ color: "#2d2d2d", fontWeight: 700 }}>
        Edit Property
      </Typography>
      {/* Display User Email */}
      <Box sx={{ background: "#f0f0f0", p: 2, borderRadius: "12px", border: "1px solid rgba(200,200,200,0.6)" }}>
        <Typography variant="body1" sx={{ fontWeight: 600, color: "#333" }}>
          You are editing as:{" "}
          {currentUser ? (
            <Typography component="span" sx={{ fontWeight: 700, color: "#000" }}>
              {currentUser.email}
            </Typography>
          ) : (
            <Typography component="span" sx={{ color: "red" }}>
              Not logged in
            </Typography>
          )}
        </Typography>
      </Box>
      {/* System Information */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" gutterBottom sx={sectionTitleStyle}>
          System Information
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField fullWidth label="Owner ID" name="ownerid" value={formData.ownerid} onChange={handleChange} sx={textFieldStyle} />
          <FormControlWithSelect label="Status" name="status" value={formData.status} onChange={handleChange} options={["Available", "Pending", "Sold", "Not Available", "Testing"]} />
          <FormControlWithSelect label="Area" name="area" value={formData.area} onChange={handleChange} options={["DFW", "Austin", "Houston", "San Antonio", "Other"]} />
        </Stack>
      </Box>
      {/* Listing Details */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" gutterBottom sx={sectionTitleStyle}>
          Listing Details
        </Typography>
        <Stack spacing={3}>
          <Box sx={{ my: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Title
            </Typography>
            <RichTextEditor value={formData.title} onChange={handleTitleChange} placeholder="Enter property title..." />
          </Box>
          <Box sx={{ my: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Description
            </Typography>
            <RichTextEditor value={formData.description} onChange={handleDescriptionChange} placeholder="Enter property description with emojis..." />
          </Box>
          <Box sx={{ my: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Notes
            </Typography>
            <RichTextEditor value={formData.notes} onChange={handleNotesChange} placeholder="Enter any additional notes..." />
          </Box>
        </Stack>
      </Box>
      {/* Property Classification & Features */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" gutterBottom sx={sectionTitleStyle}>
          Property Classification & Features
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField fullWidth label="Type" name="type" value="Land" disabled sx={textFieldStyle} />
          <FormControlWithSelect label="Subtype" name="subtype" value={formData.subtype} onChange={handleChange} options={["Residential", "Agricultural", "Commercial", "Industrial", "Recreational", "Timberland", "Waterfront", "Vacant/Undeveloped", "Specialty"]} />
          <FormControlWithSelect label="Zoning" name="zoning" value={formData.zoning} onChange={handleChange} options={["Residential", "Commercial", "Industrial", "Agricultural", "Mixed-Use", "Institutional", "Recreational", "Conservation"]} />
          <FormControlWithSelect label="Restrictions" name="restrictions" value={formData.restrictions} onChange={handleChange} options={["No Known Restriction(s)", "Zoning", "Deed", "Environmental", "Easement", "Setback"]} />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
          <TextField fullWidth label="Direction" name="direction" value={formData.direction} onChange={handleChange} sx={textFieldStyle} />
          <FormControlWithSelect label="Mobile Home Friendly" name="mobileHomeFriendly" value={formData.mobileHomeFriendly} onChange={handleChange} options={["Yes", "No", "Verify"]} />
          <FormControlWithSelect label="HOA / POA" name="hoaPoa" value={formData.hoaPoa} onChange={handleChange} options={["Yes", "No"]} />
        </Stack>
        {formData.hoaPoa === "Yes" && (
          <Box mt={2}>
            <TextField fullWidth label="HOA / Deed / Development Info" name="hoaDeedDevInfo" value={formData.hoaDeedDevInfo} onChange={handleChange} sx={textFieldStyle} />
          </Box>
        )}
      </Box>
      {/* Location & Identification */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" gutterBottom sx={sectionTitleStyle}>
          Location & Identification
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField fullWidth label="Street Address" name="streetaddress" value={formData.streetaddress} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="County" name="county" value={formData.county} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} sx={textFieldStyle} />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
          <TextField fullWidth label="ZIP" name="zip" value={formData.zip} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="APN or PIN" name="apnOrPin" value={formData.apnOrPin} onChange={handleChange} sx={textFieldStyle} />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
          <FormControlWithSelect label="Land ID" name="landId" value={formData.landId} onChange={handleChange} options={["Available", "Not-Available"]} />
          {formData.landId === "Available" && (
            <TextField fullWidth label="Land ID Link" name="landIdLink" value={formData.landIdLink} onChange={handleChange} sx={textFieldStyle} />
          )}
        </Stack>
      </Box>
      {/* Property Size & Dimensions */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" gutterBottom sx={sectionTitleStyle}>
          Property Size & Dimensions
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField fullWidth label="Square Footage (sqft)" name="sqft" value={formData.sqft} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Acre" name="acre" value={formData.acre} sx={textFieldStyle} disabled />
        </Stack>
      </Box>
      {/* Pricing & Financial Information */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" gutterBottom sx={sectionTitleStyle}>
          Pricing & Financial Information
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField fullWidth label="Asking Price" name="askingPrice" value={formData.askingPrice} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Minimum Price" name="minPrice" value={formData.minPrice} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Discount Price" name="disPrice" value={formData.disPrice} onChange={handleChange} sx={textFieldStyle} />
          <FormControlWithSelect label="Financing" name="financing" value={formData.financing} onChange={handleChange} options={["Available", "Not-Available"]} />
        </Stack>
      </Box>
      {/* Utilities, Infrastructure & Environmental Factors */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" gutterBottom sx={sectionTitleStyle}>
          Utilities, Infrastructure & Environmental Factors
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControlWithSelect label="Water" name="water" value={formData.water} onChange={handleChange} options={["Available", "Unavailable", "Well Needed", "Unknown", "Active Well"]} />
          <FormControlWithSelect label="Sewer" name="sewer" value={formData.sewer} onChange={handleChange} options={["Available", "Unavailable", "Septic Needed", "Unknown", "Active Septic"]} />
          <FormControlWithSelect label="Electric" name="electric" value={formData.electric} onChange={handleChange} options={["Available", "Unavailable", "Unknown", "On Property"]} />
          <FormControlWithSelect label="Road Condition" name="roadCondition" value={formData.roadCondition} onChange={handleChange} options={["Paved Road", "Dirt Road", "No Access", "Gravel"]} />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
          <FormControlWithSelect label="Floodplain" name="floodplain" value={formData.floodplain} onChange={handleChange} options={["Yes", "No", "100-Year Floodplain", "100-Year Floodway", "Coastal-100 Year Floodplain", "Coastal 100 Year Floodway", "100-Year Partial Floodplain", "500 Year-Floodplain", "Wetlands"]} />
        </Stack>
      </Box>
      {/* Media & Tags */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" gutterBottom sx={sectionTitleStyle}>
          Media & Tags
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField fullWidth label="Left Tag" name="ltag" value={formData.ltag} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Right Tag" name="rtag" value={formData.rtag} onChange={handleChange} sx={textFieldStyle} />
        </Stack>
        <ImageUploadPreview uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
      </Box>
      {/* Submit Button */}
      <Box textAlign="center" mt={4}>
        <Button type="submit" variant="contained" sx={submitButtonStyle}>
          Update
        </Button>
      </Box>
    </Box>
  );
};

const InputField = ({ label, name, value, onChange, required = false, type = "text", multiple = false, options = [] }) => {
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

export default EditProperty;
