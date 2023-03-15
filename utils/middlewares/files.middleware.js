const multer = require ('multer');
const createError = require ('../errors/createError.js')
const VALID_FILES = ['image/png', 'image/jpg', 'image/jpeg'];


const fileFilter = (request, file, cb) => {
    if(!VALID_FILES.includes(file.mimetype)){
        cb(createError('El tipo de archivo no es válido'))
    } else {
        cb(null, true)
    }
};

const storage = multer.diskStorage({
    filename: (request, file, cb) => {
        cb(null, Date.now() + file.originalname )
    },
    destination: (request, file, cb) => {
        cb(null, '/tmp/')
    }
});

const upload = multer({storage, fileFilter});

module.exports = upload;