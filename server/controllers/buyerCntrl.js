import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const makeOffer = asyncHandler(async (req, res) => {
    const { email, phone, buyerType, propertyId, offeredPrice, firstName, lastName } = req.body;

    if (!email || !phone || !propertyId || !offeredPrice || !firstName || !lastName) {
        res.status(400).json({ message: "First Name, Last Name, Email, phone, property ID, and offered price are required." });
        return;
    }

    try {
        // Find existing buyer
        const existingBuyer = await prisma.buyer.findFirst({
            where: {
                OR: [
                    { email },
                    { phone }
                ]
            }
        });

        if (existingBuyer) {
            // Ensure offers is an array
            const existingOffers = Array.isArray(existingBuyer.offers) ? existingBuyer.offers : [];

            // Check if the buyer has already made an offer on the property
            const existingOffer = existingOffers.find((offer) => offer.propertyId === propertyId);

            if (existingOffer) {
                res.status(400).json({
                    message: "You already made an offer. Would you like to change your previous offer?",
                    existingOffer
                });
                return;
            }

            // Append the new offer to the existing offers array
            const updatedBuyer = await prisma.buyer.update({
                where: { id: existingBuyer.id },
                data: {
                    firstName,
                    lastName,
                    offers: {
                        set: [...existingOffers, { propertyId, offeredPrice }] // Append new offer
                    }
                }
            });

            res.status(200).json({
                message: "Offer updated successfully.",
                buyer: updatedBuyer
            });
        } else {
            // Create a new buyer with the initial offer
            const newBuyer = await prisma.buyer.create({
                data: {
                    email,
                    phone,
                    buyerType,
                    firstName,
                    lastName,
                    offers: [{ propertyId, offeredPrice }]
                }
            });

            res.status(201).json({
                message: "Offer created successfully.",
                buyer: newBuyer
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while processing the offer.",
            error: err.message
        });
    }
});

export const getAllOffers = asyncHandler(async (req, res) => {
    const { propertyId } = req.body;

    if (!propertyId) {
        res.status(400).json({ message: "Property ID is required." });
        return;
    }

    try {
        // Fetch all buyers
        const buyers = await prisma.buyer.findMany({
            select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                offers: true // Retrieve all offers for each buyer
            }
        });

        // Filter offers for the specified property ID
        const filteredOffers = buyers
            .map(buyer => {
                const relevantOffers = (buyer.offers || []).filter(offer => offer.propertyId === propertyId);
                return relevantOffers.length > 0
                    ? {
                          firstName: buyer.firstName,
                          lastName: buyer.lastName,
                          email: buyer.email,
                          phone: buyer.phone,
                          offers: relevantOffers
                      }
                    : null;
            })
            .filter(Boolean); // Remove null entries

        if (filteredOffers.length === 0) {
            res.status(404).json({ message: "No offers found for this property." });
            return;
        }

        res.status(200).json({
            message: "Offers retrieved successfully.",
            offers: filteredOffers
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while retrieving offers.",
            error: err.message
        });
    }
});