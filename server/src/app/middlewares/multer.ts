import multer from "multer";

export const upload = multer({ storage: multer.memoryStorage() }).fields([
  { name: "file", maxCount: 5 },
]);
