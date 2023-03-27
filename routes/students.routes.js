const express = require('express');
const studentsRouter = express.Router();
const Student = require('../model/Students');
const createError = require('../utils/errors/createError.js');
const uploadToCloud = require('../utils/middlewares/cloudinary.js');
const upload = require('../utils/middlewares/files.middleware.js');
const isAuth = require ('../utils/middlewares/auth.middleware.js')

studentsRouter.get('/', async (request, response, next) => {
    try {
        const allStudents = await Student.find().populate('tutor');
        return response.status(200).json(allStudents);
    } catch (error) {
        next(error)
    }
});

studentsRouter.get('/paged', async (request, response, next) => {
    try {
        let page = request.query.page;
        const startPage = (page - 1) * 5;
        const endPage = page * 5;
        const allStudents = await Student.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }).sort({ title: 1 });
        if (allStudents.length === 0) {
            return next(createError('No hay Students disponibles', 404))
        }
        if (!page) {
            return next(createError('No se ha indicado un número de página valido', 404))
        }
        page = parseInt(page, 10);
        const pagedStudents = allStudents.slice(0, 5);
        const maxPage = Math.ceil(allStudents.length / 5);
        if (page <= 0 || (page - 1) * 5 > allStudents.length - 1) {
            return response.status(404).json(`La página no existe, la primera página es: 1 y la ultima pagina es : ${maxPage}`);
        }
        response.status(200).json({
            Students: allStudents.slice(startPage, endPage),
            nextPage: page + 1 <= maxPage ? page + 1 : null,
            previousPage: page - 1 < 1 ? null : page - 1
        });
    } catch (error) {
        next(error)
    }
});
studentsRouter.get('/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const allStudents = await Student.findOne({ id: id });
        return response.status(200).json(allStudents);
    } catch (error) {
        next(error)
    }
});
studentsRouter.post('/', [upload.single('image'), uploadToCloud], async (request, response, next) => {
    try {
        const allStudents = await Student.find();
        let maxId = 0;
        allStudents.forEach((boardStudent) => {
            let id = parseInt(boardStudent.id);
            if (id >= maxId) {
                maxId = id + 1;
            }
        });
        const newStudent = new Student({ ...request.body, id: maxId, image: request.file_urls ? request.file_urls[0] : null,});
        const newStudentDoc = await newStudent.save();
        return response.status(201).json(newStudentDoc);
    } catch (error) {
        next(error)
    }
});

studentsRouter.put('/:id' ,async (request, response, next) => {
    try {
        const id = request.params.id;
        const modifiedStudent = new Student({ ...request.body});
        modifiedStudent._id = id;
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            modifiedStudent,
            { new: true }
        );
        if (!updatedStudent) {
            return next(createError(`No se encuentra el Student con el Id: ${id} para actualizarlo`, 404))
        }
        return response.status(201).json(updatedStudent);
    } catch (error) {
        next(error)
    }
});
studentsRouter.delete('/:id',async (request, response, next) => {
    try {
        const id = request.params.id;
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return next(createError(`No se encuentra el Student con el Id: ${id} para eliminarlo`, 404))
        } else {
            return response.status(200).json(`Student eliminado con éxito`);
        }
    } catch (error) {
        next(error)
    }
});



module.exports = studentsRouter;


