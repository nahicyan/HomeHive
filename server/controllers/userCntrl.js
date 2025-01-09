import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
    console.log("Creating a user");

    let { email } = req.body;

    // Check if the user already exists
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (!userExists) {
        // Create a new user
        const user = await prisma.user.create({ data: req.body });
        res.status(201).send({
            message: "New User Registered",
            user: user,
        });
    } else {
        // Respond if the user already exists
        res.status(409).json({ message: "User Already Exists" });
    }
});

