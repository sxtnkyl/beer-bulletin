require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})


exports.cloudinaryUpload = (file) => cloudinary.uploader.upload(file);
// module.exports = { cloudinary };
