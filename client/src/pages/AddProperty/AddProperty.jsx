import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {textFieldStyle, sectionStyle, sectionTitleStyle, submitButtonStyle, FormControlWithSelect} from "../formStyles";
import { Box, TextField, Typography, FormControl, Button, Stack, Select, InputLabel, MenuItem } from "@mui/material";
import { useContext } from "react"; // New import
import { UserContext } from "../../utils/UserContext"; // New import for UserContext
import ImageUploadPreview from "../../components/ImageUploadPreview/ImageUploadPreview"; // Import the ImageUploadPreview componen
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";

const serverURL = import.meta.env.VITE_SERVER_URL;

const AddProperty = () => {
  const navigate = useNavigate();
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
    image: "",
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

  useEffect(() => {
    if (currentUser?.email) {
      setFormData((prev) => ({
        ...prev,
        userEmail: currentUser.email,
      }));
    }
  }, [currentUser]);

 
  const [uploadedImages, setUploadedImages] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev };
      if (["sqft", "askingPrice", "minPrice", "disPrice"].includes(name)) {
        // Remove commas from the input
        const valueWithoutCommas = value.replace(/,/g, "");
        const numberVal = parseFloat(valueWithoutCommas);
        if (!isNaN(numberVal)) {
          // Format the number as it's typed
          updated[name] = numberVal.toLocaleString("en-US");
          if (name === "sqft") {
            updated.acre = (numberVal / 43560).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          }
        } else {
          updated[name] = "";
          if (name === "sqft") updated.acre = "";
        }
      } else {
        updated[name] = value;
      }
      return updated;
    });
  };
  
  

  const handleQuillChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };


    // Separate handlers for RichTextEditor fields
    const handleTitleChange = (value) =>
      setFormData((prev) => ({ ...prev, title: value }));
    const handleDescriptionChange = (value) =>
      setFormData((prev) => ({ ...prev, description: value }));
    const handleNotesChange = (value) =>
      setFormData((prev) => ({ ...prev, notes: value }));


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const multipartForm = new FormData();
        // List of fields that are stored with formatting (commas)
        const numericFields = ["sqft", "askingPrice", "minPrice", "disPrice", "acre"];
        
        for (let key in formData) {
          let value = formData[key];
          // If this is a numeric field and value is a string, remove commas
          if (numericFields.includes(key) && typeof value === "string") {
            value = value.replace(/,/g, "");
          }
          multipartForm.append(key, value);
        }
        
        uploadedImages.forEach((image) => multipartForm.append("images", image.file));
    
        await axios.post(
          `${serverURL}/api/residency/createWithFile`,
          multipartForm,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
    
        alert("Property Added Successfully!");
        navigate("/properties");
      } catch (error) {
        console.error("Error creating property:", error);
        alert("Failed to create property");
      }
    };
    

  
  return (<Box component="form" onSubmit={handleSubmit} sx={{display:"flex",flexDirection:"column",gap:4,background:"#fff",borderRadius:"20px",boxShadow:"0 12px 24px rgba(0, 0, 0, 0.1)",border:"1px solid rgba(200, 200, 200, 0.6)",maxWidth:"1080px",width:"95%",mx:"auto",p:3}}>
    <Typography variant="h3" gutterBottom sx={{color:"#2d2d2d",fontWeight:700}}>Add New Property</Typography>
    {/* Display the User Email */}
    <Box sx={{background:"#f0f0f0",padding:2,borderRadius:"12px",border:"1px solid rgba(200,200,200,0.6)"}}>
      <Typography variant="body1" sx={{fontWeight:600,color:"#333"}}>
          You are uploading as:{" "}
        {currentUser ? (<Typography component="span" sx={{fontWeight:700,color:"#000"}}>{currentUser.email}</Typography>) : (<Typography component="span" sx={{color:"red"}}>Not logged in</Typography>)}
     </Typography>
    </Box>
    {/* System Information */}
    <Box sx={sectionStyle}>
      <Typography variant="h5" gutterBottom sx={sectionTitleStyle}>System Information</Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField fullWidth label="Owner ID" name="ownerid" value={formData.ownerid} onChange={handleChange} sx={textFieldStyle} />
          <FormControlWithSelect label="Status" name="status" value={formData.status} onChange={handleChange} options={["Available","Pending","Sold","Not Available","Testing"]} />
          <FormControlWithSelect label="Area" name="area" value={formData.area} onChange={handleChange} options={["DFW","Austin","Houston","Other"]} />
        </Stack>
      </Box>
    {/* Listing Details */}
    <Box sx={sectionStyle}>
  <Typography variant="h5" gutterBottom sx={sectionTitleStyle}>
    Listing Details
  </Typography>
  <Stack spacing={3}>
    {/* Title Field */}
    <Box sx={{ my: 4 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Title
      </Typography>
      <RichTextEditor
        value={formData.title}
        onChange={handleTitleChange}
        placeholder="Enter property title..."
      />
    </Box>
    {/* Description Field */}
    <Box sx={{ my: 4 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Description
      </Typography>
      <RichTextEditor
        value={formData.description}
        onChange={handleDescriptionChange}
        placeholder="Enter property description with emojis..."
      />
    </Box>
    {/* Notes Field */}
    <Box sx={{ my: 4 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Notes
      </Typography>
      <RichTextEditor
        value={formData.notes}
        onChange={handleNotesChange}
        placeholder="Enter any additional notes..."
      />
    </Box>
  </Stack>
</Box>

    {/* Property Classification & Features */}
    <Box sx={sectionStyle}>
      <Typography variant="h5" gutterBottom sx={sectionTitleStyle}>Property Classification & Features</Typography>
      <Stack direction={{xs:"column",sm:"row"}} spacing={2}>
        <TextField fullWidth label="Type" name="type" value="Land" disabled sx={textFieldStyle} />
        <FormControlWithSelect label="Subtype" name="subtype" value={formData.subtype} onChange={handleChange} options={["Residential","Agricultural","Commercial","Industrial","Recreational","Timberland","Waterfront","Vacant/Undeveloped","Specialty"]} />
        <FormControlWithSelect label="Zoning" name="zoning" value={formData.zoning} onChange={handleChange} options={["Residential","Commercial","Industrial","Agricultural","Mixed-Use","Institutional","Recreational","Conservation"]} />
        <FormControlWithSelect label="Restrictions" name="restrictions" value={formData.restrictions} onChange={handleChange} options={["No Known Restriction(s)","Zoning","Deed","Environmental","Easement","Setback"]} />
      </Stack>
      <Stack direction={{xs:"column",sm:"row"}} spacing={2} mt={2}>
        <TextField fullWidth label="Direction" name="direction" value={formData.direction} onChange={handleChange} sx={textFieldStyle} />
        <FormControlWithSelect label="Mobile Home Friendly" name="mobileHomeFriendly" value={formData.mobileHomeFriendly} onChange={handleChange} options={["Yes","No","Verify"]} />
        <FormControlWithSelect label="HOA / POA" name="hoaPoa" value={formData.hoaPoa} onChange={handleChange} options={["Yes","No"]} />
      </Stack>
      {formData.hoaPoa==="Yes" && (<Box mt={2}>
        <TextField fullWidth label="HOA / Deed / Development Info" name="hoaDeedDevInfo" value={formData.hoaDeedDevInfo} onChange={handleChange} sx={textFieldStyle} />
      </Box>)}
    </Box>
    {/* Location & Identification */}
    <Box sx={sectionStyle}><Typography variant="h5" gutterBottom sx={sectionTitleStyle}>Location & Identification</Typography>
      <Stack direction={{xs:"column",sm:"row"}} spacing={2}>
        <TextField fullWidth label="Street Address" name="streetaddress" value={formData.streetaddress} onChange={handleChange} sx={textFieldStyle} />
        <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} sx={textFieldStyle} />
        <TextField fullWidth label="County" name="county" value={formData.county} onChange={handleChange} sx={textFieldStyle} />
        <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} sx={textFieldStyle} />
      </Stack>
      <Stack direction={{xs:"column",sm:"row"}} spacing={2} mt={2}>
        <TextField fullWidth label="ZIP" name="zip" value={formData.zip} onChange={handleChange} sx={textFieldStyle} />
        <TextField fullWidth label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} sx={textFieldStyle} />
        <TextField fullWidth label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} sx={textFieldStyle} />
        <TextField fullWidth label="APN or PIN" name="apnOrPin" value={formData.apnOrPin} onChange={handleChange} sx={textFieldStyle} />
      </Stack>
      <Stack direction={{xs:"column",sm:"row"}} spacing={2} mt={2}>
      <FormControlWithSelect label="Land ID" name="landId" value={formData.landId} onChange={handleChange} options={["Available","Not-Available"]} />
{formData.landId === "Available" && (
  <TextField
    fullWidth
    label="Land ID Link"
    name="landIdLink"
    value={formData.landIdLink}
    onChange={handleChange}
    sx={textFieldStyle}
  />
)}

      </Stack>
    </Box>
    {/* Property Size & Dimensions */}
    <Box sx={sectionStyle}><Typography variant="h5" gutterBottom sx={sectionTitleStyle}>Property Size & Dimensions</Typography>
      <Stack direction={{xs:"column",sm:"row"}} spacing={2}>
        <TextField fullWidth label="Square Footage (sqft)" name="sqft" value={formData.sqft} onChange={handleChange} sx={textFieldStyle} />
        <TextField fullWidth label="Acre" name="acre" value={formData.acre} sx={textFieldStyle} disabled/>

      </Stack>
    </Box>
    {/* Pricing & Financial Information */}
    <Box sx={sectionStyle}><Typography variant="h5" gutterBottom sx={sectionTitleStyle}>Pricing & Financial Information</Typography>
      <Stack direction={{xs:"column",sm:"row"}} spacing={2}>
        <TextField fullWidth label="Asking Price" name="askingPrice" value={formData.askingPrice} onChange={handleChange} sx={textFieldStyle} />
        <TextField fullWidth label="Minimum Price" name="minPrice" value={formData.minPrice} onChange={handleChange} sx={textFieldStyle} />
        <TextField fullWidth label="Discount Price" name="disPrice" value={formData.disPrice} onChange={handleChange} sx={textFieldStyle} />
        <FormControlWithSelect label="Financing" name="financing" value={formData.financing} onChange={handleChange} options={["Available","Not-Available"]} />

      </Stack>
    </Box>
    {/* Utilities, Infrastructure & Environmental Factors */}
    <Box sx={sectionStyle}><Typography variant="h5" gutterBottom sx={sectionTitleStyle}>Utilities, Infrastructure & Environmental Factors</Typography>
      <Stack direction={{xs:"column",sm:"row"}} spacing={2}>
        <FormControlWithSelect label="Water" name="water" value={formData.water} onChange={handleChange} options={["Available","Unavailable","Well Needed","Unknown","Active Well"]} />
        <FormControlWithSelect label="Sewer" name="sewer" value={formData.sewer} onChange={handleChange} options={["Available","Unavailable","Septic Needed","Unknown","Active Septic"]} />
        <FormControlWithSelect label="Electric" name="electric" value={formData.electric} onChange={handleChange} options={["Available","Unavailable","Unknown","On Property"]} />
        <FormControlWithSelect label="Road Condition" name="roadCondition" value={formData.roadCondition} onChange={handleChange} options={["Paved Road","Dirt Road","No Access","Gravel"]} />
      </Stack>
      <Stack direction={{xs:"column",sm:"row"}} spacing={2} mt={2}>
        <FormControlWithSelect label="Floodplain" name="floodplain" value={formData.floodplain} onChange={handleChange} options={["Yes","No","100-Year Floodplain","100-Year Floodway","Coastal-100 Year Floodplain","Coastal 100 Year Floodway","100-Year Partial Floodplain","500 Year-Floodplain","Wetlands"]} />
      </Stack>
    </Box>
    {/* Media & Tags */}
    <Box sx={sectionStyle}><Typography variant="h5" gutterBottom sx={sectionTitleStyle}>Media & Tags</Typography>
      <Stack direction={{xs:"column",sm:"row"}} spacing={2}>
        <TextField fullWidth label="Left Tag" name="ltag" value={formData.ltag} onChange={handleChange} sx={textFieldStyle} />
        <TextField fullWidth label="Right Tag" name="rtag" value={formData.rtag} onChange={handleChange} sx={textFieldStyle} />
      </Stack>
      {/* <Typography variant="subtitle1" mt={3}>Upload Images</Typography> */}
      <ImageUploadPreview uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
    </Box>
    {/* Submit Button */}
    <Box textAlign="center" mt={4}>
      <Button type="submit" variant="contained" sx={submitButtonStyle}>Submit</Button>
    </Box>
  </Box>);
  
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



export default AddProperty;
