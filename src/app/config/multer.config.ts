import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    public_id: (req, file) => {
      const originalName = file.originalname;

      const nameWithoutExtension = originalName
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      return `${nameWithoutExtension}-${Date.now()}`;
    },
  },
});

const fileFilter: multer.Options["fileFilter"] = (req, file, callback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    callback(new Error("Only JPG, PNG, and WEBP images are allowed."));
    return;
  }

  callback(null, true);
};

export const multerUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});
