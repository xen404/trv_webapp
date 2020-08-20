require("dotenv").config();
const keys = require("../config/keys");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: keys.cloudinaryName,
  api_key: keys.cloudinaryApiKey,
  api_secret: keys.cloudinaryApiSecret,
});

module.exports = { cloudinary };
