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
      streetaddress,
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
              streetaddress,
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
          ownerid,
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
          streetaddress,
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
          financing,
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
          landId,
  
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
  try {
    // Collect all uploaded file paths
    let imagePaths = [];
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => "uploads/" + file.filename);
    }

    // Destructure the fields from req.body
    const {
      ownerid,
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
      streetaddress,
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

    // Create the residency with the array of image paths
    const residency = await prisma.residency.create({
      data: {
        ownerid: parseInt(ownerid),
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
        streetaddress,
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
        image: imagePaths.length > 0 ? JSON.stringify(imagePaths) : null, // Store as JSON array
        disPrice: disPrice ? parseFloat(disPrice) : null,
        financing: financing === "false",
        status: status ?? "Available",
        water: water ?? null,
        sewer: sewer ?? null,
        electric: electric ?? null,
        roadCondition: roadCondition ?? null,
        floodplain: floodplain ?? null,
        ltag: ltag ?? null,
        rtag: rtag ?? null,
        landId: landId === "false",
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
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
});




  
