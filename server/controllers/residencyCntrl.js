import asyncHandler from "express-async-handler";
import { prisma } from '../config/prismaConfig.js';

export const createResidency= asyncHandler(async (req, res) => {
    
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
        country,
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
      
      console.log(req.body.data);
      
      try {
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
            country,
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
              connect: { email: userEmail },
            },
          },
        });
      
        res.status(201).send({
          message: "Property Added Successfully",
          residency,
        });
      } catch (err) {
        if (err.code === "P2002") {
          // Handle unique constraint violation
          res.status(400).send({ message: "This Property Already Exists" });
          return;
        }
      
        // Handle other errors
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
})