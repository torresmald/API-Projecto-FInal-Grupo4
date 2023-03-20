const express = require('express');
const resourceRouter = express.Router();
const Resource = require('../model/Resources');
const createError = require('../utils/errors/createError.js');
const uploadToCloud = require('../utils/middlewares/cloudinary.js');
const upload = require('../utils/middlewares/files.middleware.js');

resourceRouter.get('/', async (request, response, next) => {
    try {
        const allResources = await Resource.find();
        return response.status(200).json(allResources);
    } catch (error) {
        next(error)
    }
});

resourceRouter.get('/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const allResources = await Resource.findOne({ id: id });
        return response.status(200).json(allResources);
    } catch (error) {
        next(error)
    }
});
resourceRouter.post('/',  async (request, response, next) => {
    try {
        const calendar = request.file? request.file.filename :null;
        const allResources = await Resource.find();
        let maxId = 0;
        allResources.forEach((boardResource) => {
            let id = parseInt(boardResource.id);
            if (id >= maxId) {
                maxId = id + 1;
            }
        });
        const newResource = new Resource({ ...request.body, id: maxId});
        const newResourceDoc = await newResource.save();
        return response.status(201).json(newResourceDoc);
    } catch (error) {
        next(error)
    }
});

resourceRouter.put('/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const modifiedResource = new Resource({ ...request.body});
        modifiedResource._id = id;
        const updatedResource = await Resource.findByIdAndUpdate(
            id,
            modifiedResource,
            { new: true }
        );
        if (!updatedResource) {
            return next(createError(`No se encuentra el Resource con el Id: ${id} para actualizarlo`, 404))
        }
        return response.status(201).json(updatedResource);
    } catch (error) {
        next(error)
    }
});
resourceRouter.delete('/:id' ,async (request, response, next) => {
    try {
        const id = request.params.id;
        const deletedResource = await Resource.findByIdAndDelete(id);
        if (!deletedResource) {
            return next(createError(`No se encuentra el Resource con el Id: ${id} para eliminarlo`, 404))
        } else {
            return response.status(200).json(`Resource eliminado con éxito`);
        }
    } catch (error) {
        next(error)
    }
});



module.exports = resourceRouter;


