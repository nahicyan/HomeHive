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

export const getOffersOnProperty = asyncHandler(async (req, res) => {
    const { propertyId } = req.params;

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
                offers: true
            }
        });

        // Filter and aggregate offers for the specific propertyId
        const offers = buyers
            .flatMap((buyer) => {
                const buyerOffers = Array.isArray(buyer.offers) ? buyer.offers : [];
                return buyerOffers
                    .filter((offer) => offer.propertyId === propertyId)
                    .map((offer) => ({
                        ...offer,
                        buyer: {
                            firstName: buyer.firstName,
                            lastName: buyer.lastName,
                            email: buyer.email,
                            phone: buyer.phone
                        }
                    }));
            });

        res.status(200).json({
            propertyId,
            totalOffers: offers.length,
            offers
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while fetching offers for the property.",
            error: err.message
        });
    }
});



export const getOffersByBuyer = asyncHandler(async (req, res) => {
    const { email, phone } = req.query;

    if (!email && !phone) {
        res.status(400).json({ message: "At least one of email or phone is required." });
        return;
    }

    try {
        // Build dynamic query conditions
        const whereConditions = [];
        if (email) whereConditions.push({ email });
        if (phone) whereConditions.push({ phone });

        // Find the buyer using dynamic conditions
        const buyer = await prisma.buyer.findFirst({
            where: {
                OR: whereConditions
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                offers: true
            }
        });

        if (!buyer) {
            res.status(404).json({ message: "Buyer not found with the provided email or phone." });
            return;
        }

        res.status(200).json({
            buyer: {
                firstName: buyer.firstName,
                lastName: buyer.lastName,
                email: buyer.email,
                phone: buyer.phone
            },
            totalOffers: buyer.offers.length,
            offers: buyer.offers
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while fetching offers for the buyer.",
            error: err.message
        });
    }
});

// Add Another functions To 


