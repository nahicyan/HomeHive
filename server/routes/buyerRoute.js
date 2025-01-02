import express from "express";
import { getAllOffers, makeOffer } from "../controllers/buyerCntrl.js";

const router = express.Router();

// Route to create or update an offer
router.post("/makeOffer", makeOffer);
router.post("/allOffers", getAllOffers);

export { router as buyerRoute };




