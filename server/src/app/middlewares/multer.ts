import multer from "multer";

export const upload = multer({ storage: multer.memoryStorage() }).fields([
  { name: "featuredImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 5 },
]);
