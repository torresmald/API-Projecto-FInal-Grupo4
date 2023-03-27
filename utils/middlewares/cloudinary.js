const cloudinary = require('cloudinary');
const fs = require ('fs');


const uploadToCloud = async (req, res, next) => {
    try {
      if (!req.files) {
        return next();
      }
      const result = await Promise.all(
        Object.values(req.files).map((file) => {
          return cloudinary.uploader.upload(file[0].path, { folder: 'notifications' });
        })
      );
      req.file_urls = result.map((res) => cloudinary.url(res.public_id, { secure: true }));
      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = uploadToCloud;
