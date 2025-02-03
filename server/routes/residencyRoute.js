import express from 'express';
import { createResidency, getAllResidencies, getResidency, updateResidency, getResidencyImage, createResidencyWithFile } from '../controllers/residencyCntrl.js';
import { upload } from '../config/multerConfig.js';

const router = express.Router();
router.post("/create", createResidency);
router.get("/allresd",  getAllResidencies)
router.get("/:id", getResidency)

router.put("/update/:id", updateResidency)
router.get("/:id/image", getResidencyImage)

router.post(
    "/createWithFile",
    // 'image' is the form field name for the file
    upload.single("image"), 
    createResidencyWithFile
  );

export {router as residencyRoute};