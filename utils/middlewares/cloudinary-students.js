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

module.exports = uploadToCloud2;