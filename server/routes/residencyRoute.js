import express from 'express';
import { 
    createResidency, 
    getAllResidencies, 
    getResidency, 
    updateResidency, 
    getResidencyImage, 
    createResidencyWithFile 
} from '../controllers/residencyCntrl.js';
import { upload } from '../config/multerConfig.js';

const router = express.Router();

// 1. Static and specific routes first
router.post("/create", createResidency);
router.post("/createWithFile", upload.single("image"), createResidencyWithFile);
router.get("/allresd", getAllResidencies);

// 2. Dynamic routes last
router.get("/:id", getResidency);
router.put("/update/:id", updateResidency);
router.get("/:id/image", getResidencyImage);

export { router as residencyRoute };
