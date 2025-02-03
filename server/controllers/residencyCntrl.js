import asyncHandler from "express-async-handler";
import { prisma } from '../config/prismaConfig.js';
import path from "path";
import fs from "fs";

export const createResidency = asyncHandler(async (req, res) => {
  const {
      ownerid,
      apnOrPin,
      askingPrice,
      minPrice,
      title,
      description,
      address,
      zip,
      city,
      county,
      state,
      image,
      facilities,
      userEmail,
      status,
      flyer,
      propertyAddress,
      sqft,
      acre,
      zoning,
      utilities,
      roadCondition,
      restrictions,
      mobileHomeFriendly,
      hoaPoa,
      floodplain,
      hoaDeedDevInfo,
      notes,
  } = req.body.data;

  try {
      const lowerCaseEmail = userEmail.toLowerCase(); // Convert email to lowercase

      // Check if the user exists
      const user = await prisma.user.findUnique({
          where: { email: lowerCaseEmail },
      });

      if (!user) {
          return res.status(404).send({ message: "User not found." });
      }

      // Check for existing property with unique constraints
      const existingProperty = await prisma.residency.findFirst({
          where: {
              OR: [
                  { apnOrPin },
                  { address },
                  { propertyAddress },
              ],
          },
      });

      if (existingProperty) {
          return res.status(400).send({ message: "This property already exists in the system." });
      }

      // Create the property if no duplicates are found
      const residency = await prisma.residency.create({
          data: {
              ownerid,
              apnOrPin,
              askingPrice,
              minPrice,
              title,
              description,
              address,
              zip,
              city,
              county,
              state,
              image,
              facilities,
              status,
              flyer,
              propertyAddress,
              sqft,
              acre,
              zoning,
              utilities,
              roadCondition,
              restrictions,
              mobileHomeFriendly,
              hoaPoa,
              floodplain,
              hoaDeedDevInfo,
              notes,
              owner: {
                  connect: { email: lowerCaseEmail },
              },
          },
      });

      res.status(201).send({
          message: "Property Added Successfully",
          residency,
      });
  } catch (err) {
      console.error(err);
      res.status(500).send({ message: "An error occurred", error: err.message });
  }
});
//Get All Property
export const getAllResidencies = asyncHandler(async (req, res) => {
    try {
      const residencies = await prisma.residency.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).send(residencies);
    } catch (error) {
      console.error("Error fetching residencies:", error);
      res.status(500).send({ message: "An error occurred while fetching residencies", error: error.message });
    }
  });
//Get A Certain Property

export const getResidency= asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try{

        const residency = await prisma.residency.findUnique({
            where: {id:id}
        })
        res.send(residency);
    }
    catch(err){
        throw new Error(err.message);
    }
});




export const updateResidency = asyncHandler(async (req, res) => {
  console.log("Received updateResidency request body:", req.body);

  try {
    const { id } = req.params;
    let { currentUser, ...restOfData } = req.body;

    // Remove fields you cannot update
    delete restOfData.id;
    delete restOfData.createdAt;
    delete restOfData.updatedAt;

    // Optional admin check
    if (!currentUser || currentUser.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden - Admin only" });
    }

    const updatedResidency = await prisma.residency.update({
      where: { id },
      data: restOfData,
    });

    return res.status(200).json(updatedResidency);
  } catch (error) {
    console.error("Error updating residency:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Residency with this ID does not exist",
        error: error.message,
      });
    }
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Unique constraint violation—some field must be unique",
        error: error.message,
      });
    }
    if (error.code === "P2003") {
      return res.status(400).json({
        message: "Foreign key constraint failed—invalid relation",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to update property",
      error: error.message,
    });
  }
});


export const getResidencyImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("Triggered Image")

  // 1) Find the property record
  const residency = await prisma.residency.findUnique({
    where: { id },
  });

  // 2) If not found or no image, return 404
  if (!residency) {
    return res.status(404).json({ message: "Residency not found" });
  }
  if (!residency.image) {
    return res.status(404).json({ message: "No image path found in this property" });
  }

  // 3) Convert backslashes to forward slashes if necessary
  // e.g. "uploads\\land1.jpg" => "uploads/land1.jpg"
  const normalizedPath = residency.image.replace(/\\/g, "/");

  // 4) Construct absolute path
  // e.g. if you store uploads in <projectRoot>/uploads
  // Adjust __dirname logic if using ES modules
  const absolutePath = path.join(process.cwd(), normalizedPath);

  // 5) Check if file exists
  if (!fs.existsSync(absolutePath)) {
    return res.status(404).json({ message: "File not found on server" });
  }

  // 6) Stream the file back
  res.sendFile(absolutePath, (err) => {
    if (err) {
      console.error("Error sending image file:", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Error sending image file" });
      }
    }
  });
});



export const createResidencyWithFile = asyncHandler(async (req, res) => {
  try {
    // Check if there's a file
    let savedFilePath = null;
    if (req.file) {
      // e.g. 'uploads/land-123456.jpg'
      // If in your Multer config you set a custom path, you can store that:
      savedFilePath = "uploads/" + req.file.filename;
    }

    // If you're still sending JSON in 'req.body.data' for the fields:
    // With multipart/form-data, you can parse from 'req.body' directly 
    // or do JSON.parse(req.body.data) if you're sending a field named data. 
    // For simplicity, let's assume each field is in `req.body`.
    const {
      ownerid,
      apnOrPin,
      askingPrice,
      minPrice,
      title,
      description,
      address,
      zip,
      city,
      county,
      state,
      // 'image' can be overwritten by the file path if a file was uploaded
      facilities,
      userEmail,
      status,
      flyer,
      propertyAddress,
      sqft,
      acre,
      zoning,
      utilities,
      roadCondition,
      restrictions,
      mobileHomeFriendly,
      hoaPoa,
      floodplain,
      hoaDeedDevInfo,
      notes,
    } = req.body;

    // Convert these to the correct types if needed, e.g. parseFloat, parseInt, JSON.parse, etc.

    // If user provided an image string in the body, or if we have a file path from req.file
    const finalImagePath = savedFilePath || (req.body.image || "");

    // Example: Convert userEmail to lowercase for uniqueness
    const lowerCaseEmail = userEmail.toLowerCase();

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: lowerCaseEmail },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Perform any uniqueness checks as you did in your original code
    // Then create the property
    const residency = await prisma.residency.create({
      data: {
        ownerid: parseInt(ownerid),
        apnOrPin,
        askingPrice: parseFloat(askingPrice),
        minPrice: parseFloat(minPrice),
        title,
        description,
        address,
        zip,
        city,
        county,
        state,
        // Use finalImagePath
        image: finalImagePath,
        facilities: facilities ? JSON.parse(facilities) : {},
        status,
        flyer,
        propertyAddress,
        sqft: parseInt(sqft),
        acre: parseFloat(acre),
        zoning,
        utilities: utilities ? JSON.parse(utilities) : {},
        roadCondition,
        restrictions,
        mobileHomeFriendly: mobileHomeFriendly === "true",
        hoaPoa,
        floodplain,
        hoaDeedDevInfo,
        notes,
        owner: {
          connect: { email: lowerCaseEmail },
        },
      },
    });

    res.status(201).json({
      message: "Property Added Successfully",
      residency,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
});

  
