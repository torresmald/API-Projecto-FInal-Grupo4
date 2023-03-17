const express = require('express');
const passport = require('passport');
const Parent = require('../model/Parents');
const parentRouter = express.Router();
const createError = require('../utils/errors/createError.js');
const bcrypt = require('bcrypt');
const getJWT = require('../utils/authentication/jsonwebtoken');
const isAuth = require('../utils/middlewares/auth.middleware.js');

parentRouter.get('/', async (request, response, next) => {
    try {
        const allParents = await Parent.find().populate('childs');
        if (allParents.length === 0) {
            return response.status(200).json('No hay usuarios registrados');
        }
        return response.status(200).json(allParents)
    } catch (error) {
        return next(error)
    }
})
parentRouter.post('/register', async (request, response, next) => {
    const done = (error, user) => {
        if (error) {
            return next(error);
        }
        request.logIn(
            user,
            (error) => {
                if (error) {
                    return next(error)
                }
                return response.status(201).json(user)
            }
        )
    }
    passport.authenticate('registerParent', done)(request);
});

parentRouter.post('/login', async (request, response, next) => {
    const { email, password } = request.body;
    const user = await Parent.findOne({ email }).populate('childs');
    if (!user) {
        return next(createError('El usuario no existe'), 404);
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return next(createError('La contraseña no es válida', 403));
    }
    user.password = null;
    const token = getJWT(user);
    return response.status(200).json({
        user,
        token
    });
});

module.exports = parentRouter;