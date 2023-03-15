const express = require('express');
const categoriesRouter = express.Router();
const Category = require('../model/Categories');


categoriesRouter.get('/', async (request, response, next) => {
    try {
        const allCategories = await Category.find();
        return response.status(200).json(allCategories);
    } catch (error) {
        next(error)
    }
});
categoriesRouter.get('/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const allCategories = await Category.findOne({id: id});
        return response.status(200).json(allCategories);
    } catch (error) {
        next(error)
    }
});

module.exports = categoriesRouter;