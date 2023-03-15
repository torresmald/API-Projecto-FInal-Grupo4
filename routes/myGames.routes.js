const express = require('express');
const myGamesRouter = express.Router();
const MyGame = require('../model/MyGames');
const createError = require('../utils/errors/createError.js');
const uploadToCloud = require('../utils/middlewares/cloudinary.js');
const upload = require('../utils/middlewares/files.middleware.js');
const isAuth = require ('../utils/middlewares/auth.middleware.js')

myGamesRouter.get('/', async (request, response, next) => {
    try {
        const allGames = await MyGame.find().sort({ title: 1 });
        return response.status(200).json(allGames);
    } catch (error) {
        next(error)
    }
});
myGamesRouter.get('/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const allGames = await MyGame.findOne({ id: id });
        return response.status(200).json(allGames);
    } catch (error) {
        next(error)
    }
});
myGamesRouter.post('/', [upload.single('picture'), uploadToCloud, isAuth], async (request, response, next) => {
    try {
        const allGames = await MyGame.find();
        let maxId = 0;
        allGames.forEach((boardGame) => {
            let id = parseInt(boardGame.id);
            if (id >= maxId) {
                maxId = id + 1;
            }
        });
        const newGame = new MyGame({ ...request.body, id: maxId });
        const newGameDoc = await newGame.save();
        return response.status(201).json(newGameDoc);
    } catch (error) {
        next(error)
    }
});
myGamesRouter.put('/:id', [isAuth] ,async (request, response, next) => {
    try {
        const id = request.params.id;
        const modifiedGame = new MyGame({ ...request.body});
        modifiedGame._id = id;
        const updatedGame = await MyGame.findByIdAndUpdate(
            id,
            modifiedGame,
            { new: true }
        );
        if (!updatedGame) {
            return next(createError(`No se encuentra el Game con el Id: ${id} para actualizarlo`, 404))
        }
        return response.status(201).json(updatedGame);
    } catch (error) {
        next(error)
    }
});
myGamesRouter.delete('/:id', [isAuth] ,async (request, response, next) => {
    try {
        const id = request.params.id;
        const deletedGame = await MyGame.findByIdAndDelete(id);
        if (!deletedGame) {
            return next(createError(`No se encuentra el Game con el Id: ${id} para eliminarlo`, 404))
        } else {
            return response.status(200).json(`Game eliminado con éxito`);
        }
    } catch (error) {
        next(error)
    }
});



module.exports = myGamesRouter;


