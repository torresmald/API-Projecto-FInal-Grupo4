const express = require('express');
const gamesRouter = express.Router();
const Game = require('../model/Games');
const createError = require('../utils/errors/createError.js');
const uploadToCloud = require('../utils/middlewares/cloudinary.js');
const upload = require('../utils/middlewares/files.middleware.js');
const isAuth = require ('../utils/middlewares/auth.middleware.js')

gamesRouter.get('/', async (request, response, next) => {
    try {
        const allGames = await Game.find().sort({ title: 1 });
        return response.status(200).json(allGames);
    } catch (error) {
        next(error)
    }
});

gamesRouter.get('/paged', async (request, response, next) => {
    try {
        let page = request.query.page;
        const startPage = (page - 1) * 5;
        const endPage = page * 5;
        const allGames = await Game.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }).sort({ title: 1 });
        if (allGames.length === 0) {
            return next(createError('No hay Games disponibles', 404))
        }
        if (!page) {
            return next(createError('No se ha indicado un número de página valido', 404))
        }
        page = parseInt(page, 10);
        const pagedGames = allGames.slice(0, 5);
        const maxPage = Math.ceil(allGames.length / 5);
        if (page <= 0 || (page - 1) * 5 > allGames.length - 1) {
            return response.status(404).json(`La página no existe, la primera página es: 1 y la ultima pagina es : ${maxPage}`);
        }
        response.status(200).json({
            games: allGames.slice(startPage, endPage),
            nextPage: page + 1 <= maxPage ? page + 1 : null,
            previousPage: page - 1 < 1 ? null : page - 1
        });
    } catch (error) {
        next(error)
    }
});
gamesRouter.get('/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const allGames = await Game.findOne({ id: id });
        return response.status(200).json(allGames);
    } catch (error) {
        next(error)
    }
});
gamesRouter.get('/title/:title', async (request, response, next) => {
    try {
        const titleGame = request.params.title;
        const Game = await Game.find({ title: titleGame });
        if (Game.length === 0) {
            return next(createError(`No hay ningun Game con el Título: ${titleGame}`, 404))
        }
        return response.status(200).json(Game);
    } catch (error) {
        next(error)
    }
});
gamesRouter.post('/', [upload.single('picture'), uploadToCloud, isAuth], async (request, response, next) => {
    try {
        const allGames = await Game.find();
        let maxId = 0;
        allGames.forEach((boardGame) => {
            let id = parseInt(boardGame.id);
            if (id >= maxId) {
                maxId = id + 1;
            }
        });
        const newGame = new Game({ ...request.body, id: maxId });
        const newGameDoc = await newGame.save();
        return response.status(201).json(newGameDoc);
    } catch (error) {
        next(error)
    }
});

gamesRouter.put('/:id', [isAuth] ,async (request, response, next) => {
    try {
        const id = request.params.id;
        const modifiedGame = new Game({ ...request.body});
        modifiedGame._id = id;
        const updatedGame = await Game.findByIdAndUpdate(
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
gamesRouter.delete('/:id', [isAuth] ,async (request, response, next) => {
    try {
        const id = request.params.id;
        const deletedGame = await Game.findByIdAndDelete(id);
        if (!deletedGame) {
            return next(createError(`No se encuentra el Game con el Id: ${id} para eliminarlo`, 404))
        } else {
            return response.status(200).json(`Game eliminado con éxito`);
        }
    } catch (error) {
        next(error)
    }
});



module.exports = gamesRouter;


