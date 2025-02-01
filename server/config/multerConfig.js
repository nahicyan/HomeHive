// server/config/multerConfig.js
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Reconstruct __dirname if you're in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 'uploads' is your directory
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    // e.g. land-123456.jpg
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // original name might contain spaces, so you may want to sanitize
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

export const upload = multer({ storage });
