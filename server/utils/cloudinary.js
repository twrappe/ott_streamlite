// server/utils/cloudinary.js
import cloudinary from "../config/cloudinary.js";

// Upload helper (useful for non-multer use cases)
export const uploadVideo = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    resource_type: "video",
    folder: "ott_videos",
  });
};

// Delete helper
export const deleteVideo = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId, {
    resource_type: "video",
  });
};
