import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import config from "../config";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const uploadBufferToCloudinary = (
  buffer: Buffer,
  folder: string,
  publicId: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, public_id: publicId, overwrite: true, resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result?.secure_url || "");
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};
