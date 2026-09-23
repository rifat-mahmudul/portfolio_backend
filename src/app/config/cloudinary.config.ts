import { v2 as cloudinary } from "cloudinary";
import { envVars } from "./env";
import AppError from "../errorHelpers/appError";

cloudinary.config({
  cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY_API_SECRET,
});

export const uploadBufferCloudinary = async (
  buffer: Buffer,
  fileName: string,
) => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            public_id: `portfolio/${fileName}-${Date.now()}`,
            folder: "portfolio",
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          },
        )
        .end(buffer);
    });
  } catch (error: any) {
    throw new AppError(500, "Error uploading file: ", error.message);
  }
};

export const deleteImageFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error: any) {
    throw new AppError(
      500,
      `Cloudinary image deletion failed: ${error.message}`,
    );
  }
};

export const getPublicIdFromUrl = (url: string) => {
  const parts = url.split("/");

  const uploadIndex = parts.indexOf("upload");

  if (uploadIndex === -1) {
    throw new Error("Invalid Cloudinary URL");
  }

  const publicIdWithExtension = parts.slice(uploadIndex + 2).join("/");

  return publicIdWithExtension.replace(/\.[^/.]+$/, "");
};

export const cloudinaryUpload = cloudinary;
