const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const conf = require("../conf/conf");

// Configure Cloudinary
cloudinary.config({
  cloud_name: conf.cloudinaryCloudName,
  api_key: conf.cloudinaryApiKey,
  api_secret: conf.cloudinaryApiSecret,
});

// Configure Multer Storage to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog-uploads", // The name of the folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

module.exports = upload;
