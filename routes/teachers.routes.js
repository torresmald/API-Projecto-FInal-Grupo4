const express = require('express');
const passport = require('passport');
const Teacher = require('../model/Teachers');
const teacherRouter = express.Router();
const createError = require('../utils/errors/createError.js');
const bcrypt = require('bcrypt');
const getJWT = require('../utils/authentication/jsonwebtoken');
const isAuth = require('../utils/middlewares/auth.middleware.js');

teacherRouter.get('/', async (request, response, next) => {
    try {
        const allTeachers = await Teacher.find();
        if (allTeachers.length === 0) {
            return response.status(200).json('No hay usuarios registrados');
        }
        return response.status(200).json(allTeachers)
    } catch (error) {
        return next(error)
    }
})
teacherRouter.post('/register', async (request, response, next) => {
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
    passport.authenticate('register', done)(request);
});

teacherRouter.post('/login', async (request, response, next) => {
    const { email, password } = request.body;
    const user = await Teacher.findOne({ email });
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

module.exports = teacherRouter;