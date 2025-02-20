import asyncHandler from "express-async-handler";
import { prisma } from '../config/prismaConfig.js';
import path from "path";
import fs from "fs";

  export const createResidency = asyncHandler(async (req, res) => {
    const {
      ownerId,
      apnOrPin,
      askingPrice,
      minPrice,
      title,
      description,
      direction,
      type,
      subtype,
      zoning,
      restrictions,
      mobileHomeFriendly,
      hoaPoa,
      hoaDeedDevInfo,
      notes,
  
      // Address and Location
      streetAddress,
      city,
      county,
      state,
      zip,
      latitude,
      longitude,
      area,
      landIdLink,
  
      // Physical Attributes
      sqft,
      acre,
      image,
  
      // Pricing and Financing
      disPrice,
      financing,
      status,
  
      // Utilities and Infrastructure
      water,
      sewer,
      electric,
      roadCondition,
      floodplain,
  
      // Miscellaneous
      ltag,
      rtag,
      landId,
  
      // User Information
      userEmail,
    } = req.body.data;
  
    try {
      const lowerCaseEmail = userEmail.toLowerCase(); // Normalize email
  
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
            {
              streetAddress,
              city,
              state,
              userEmail: lowerCaseEmail,
            },
            {
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            },
          ],
        },
      });
  
      if (existingProperty) {
        return res.status(400).send({ message: "This property already exists in the system." });
      }
  
      // Create the property with provided data
      const residency = await prisma.residency.create({
        data: {
          ownerId,
          apnOrPin,
          askingPrice,
          minPrice,
          title,
          description: description ?? null,
          direction: direction ?? null,
          type: type ?? null,
          subtype: subtype ?? null,
          zoning: zoning ?? null,
          restrictions: restrictions ?? null,
          mobileHomeFriendly: mobileHomeFriendly ?? null,
          hoaPoa: hoaPoa ?? null,
          hoaDeedDevInfo: hoaDeedDevInfo ?? null,
          notes: notes ?? null,
  
          // Address and Location
          streetAddress,
          city,
          county,
          state,
          zip,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null,
          area: area ?? null,
          landIdLink: landIdLink ?? null,
  
          // Physical Attributes
          sqft,
          acre: acre ?? null,
          image: image ?? null,
  
          // Pricing and Financing
          disPrice: disPrice ?? null,
          financing: financing ?? "Not-Available",
          status: status ?? "Available",
  
          // Utilities and Infrastructure
          water: water ?? null,
          sewer: sewer ?? null,
          electric: electric ?? null,
          roadCondition: roadCondition ?? null,
          floodplain: floodplain ?? null,
  
          // Miscellaneous
          ltag: ltag ?? null,
          rtag: rtag ?? null,
          landId: landId ?? "Not-Available",
  
          // Relate to the user
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
    let { currentUser, userEmail, imageUrls, viewCount, ...restOfData } = req.body;

    // Remove non-updatable fields.
    delete restOfData.id;
    delete restOfData.createdAt;
    delete restOfData.updatedAt;

    if (restOfData.ownerId) restOfData.ownerId = parseInt(restOfData.ownerId, 10);
    if (restOfData.latitude) restOfData.latitude = parseFloat(restOfData.latitude);
    if (restOfData.longitude) restOfData.longitude = parseFloat(restOfData.longitude);
    if (restOfData.sqft) restOfData.sqft = parseInt(restOfData.sqft, 10);
    if (restOfData.askingPrice) restOfData.askingPrice = parseFloat(restOfData.askingPrice);
    if (restOfData.minPrice) restOfData.minPrice = parseFloat(restOfData.minPrice);
    if (restOfData.disPrice) restOfData.disPrice = parseFloat(restOfData.disPrice);
    if (restOfData.acre) restOfData.acre = parseFloat(restOfData.acre);

    // Process the "imageUrls" field (expected as JSON-stringified array)
    let finalExistingImages = [];
    if (imageUrls) {
      try {
        finalExistingImages = JSON.parse(imageUrls);
        if (!Array.isArray(finalExistingImages)) {
          finalExistingImages = [];
        }
      } catch (error) {
        finalExistingImages = [];
      }
    }

    // Process newly uploaded images (if any) from multer.
    let newImagePaths = [];
    if (req.files && req.files.length > 0) {
      // Use relative path: "uploads/" + file.filename
      newImagePaths = req.files.map((file) => "uploads/" + file.filename);
    }

    // Merge existing images with new image paths.
    const finalImageUrls = [...finalExistingImages, ...newImagePaths];

    // Prepare update data.
    let updateData = {
      ...restOfData,
      imageUrls: finalImageUrls, // Save as a JSON array in the DB.
    };

    if (userEmail) {
      updateData.owner = { connect: { email: userEmail } };
    }

    const updatedResidency = await prisma.residency.update({
      where: { id },
      data: updateData,
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









export const getResidencyImages = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const residency = await prisma.residency.findUnique({
    where: { id },
  });

  if (!residency || !residency.image) {
    return res.status(404).json({ message: "No images found for this residency" });
  }

  // Parse image array from JSON string
  const imagePaths = JSON.parse(residency.image);

  res.status(200).json({
    message: "Images retrieved successfully",
    images: imagePaths,
  });
});




export const createResidencyWithMultipleFiles = asyncHandler(async (req, res) => {
  console.log("This is creation request body: ", req.body);
  try {
    // Collect all uploaded file paths
    let imagePaths = [];
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => "uploads/" + file.filename);
    }

    // Process existing imageUrls from req.body (if any)
    let existingImages = [];
    if (req.body.imageUrls) {
      try {
        existingImages = JSON.parse(req.body.imageUrls);
        if (!Array.isArray(existingImages)) existingImages = [];
      } catch (err) {
        existingImages = [];
      }
    }
    // Merge existing images with the new image paths
    const allImageUrls = [...existingImages, ...imagePaths];

    // Destructure the fields from req.body
    const {
      ownerId,
      apnOrPin,
      askingPrice,
      minPrice,
      title,
      description,
      direction,
      type,
      subtype,
      zoning,
      restrictions,
      mobileHomeFriendly,
      hoaPoa,
      hoaDeedDevInfo,
      notes,
      streetAddress,
      city,
      county,
      state,
      zip,
      latitude,
      longitude,
      area,
      landIdLink,
      sqft,
      acre,
      disPrice,
      financing,
      status,
      water,
      sewer,
      electric,
      roadCondition,
      floodplain,
      ltag,
      rtag,
      landId,
      userEmail,
    } = req.body;

    const lowerCaseEmail = userEmail.toLowerCase();

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: lowerCaseEmail },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create the residency with the array of image URLs stored in "imageUrls"
    const residency = await prisma.residency.create({
      data: {
        ownerId: parseInt(ownerId),
        apnOrPin,
        askingPrice: parseFloat(askingPrice),
        minPrice: parseFloat(minPrice),
        title,
        description: description ?? null,
        direction: direction ?? null,
        type: type ?? null,
        subtype: subtype ?? null,
        zoning: zoning ?? null,
        restrictions: restrictions ?? null,
        mobileHomeFriendly: mobileHomeFriendly ?? null,
        hoaPoa: hoaPoa ?? null,
        hoaDeedDevInfo: hoaDeedDevInfo ?? null,
        notes: notes ?? null,
        streetAddress,
        city,
        county,
        state,
        zip,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        area: area ?? null,
        landIdLink: landIdLink ?? null,
        sqft: parseInt(sqft),
        acre: acre ? parseFloat(acre) : null,
        // Store the combined array directly
        imageUrls: allImageUrls.length > 0 ? allImageUrls : null,
        disPrice: disPrice ? parseFloat(disPrice) : null,
        financing: financing ?? "Not-Available",
        status: status ?? "Available",
        water: water ?? null,
        sewer: sewer ?? null,
        electric: electric ?? null,
        roadCondition: roadCondition ?? null,
        floodplain: floodplain ?? null,
        ltag: ltag ?? null,
        rtag: rtag ?? null,
        landId: landId ?? "Not-Available",
        owner: {
          connect: { email: lowerCaseEmail },
        },
      },
    });

    res.status(201).json({
      message: "Property added successfully",
      residency,
    });
  } catch (err) {
    console.error("Error creating residency:", err);
    res
      .status(500)
      .json({ message: "An error occurred", error: err.message });
  }
});




  
