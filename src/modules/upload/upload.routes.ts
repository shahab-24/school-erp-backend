import { Router } from "express";
import multer from "multer";
import { uploadImage } from "./upload.controller";

const router = Router();

// ✅ Vercel-safe memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  },
});

router.post("/image", upload.single("image"), uploadImage);

export default router;
