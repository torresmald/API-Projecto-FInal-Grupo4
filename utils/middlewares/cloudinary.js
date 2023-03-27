const cloudinary = require('cloudinary');
const fs = require ('fs');

const uploadToCloud2 = async (request, response, next) => {
    if (request.file){
        const filePath = request.file.path;
        const image = await cloudinary.v2.uploader.upload(filePath);
        const calendar = await cloudinary.v2.uploader.upload(filePath);

        fs.unlinkSync(filePath);
        request.file_url = image.secure_url;
        request.file_url = calendar.secure_url;

        return next();
    } else {
        return next()
    }
};
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
module.exports = uploadToCloud2;