const jwt = require('jsonwebtoken');
const createError = require('../errors/createError');

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return next(createError("No estás autorizado", 401));
    }

    const splitAuth = authorization.split(" ");
    if (splitAuth.length !== 2 || splitAuth[0] !== "Bearer") {
        return next(createError("Cabecera authorization incorrecta", 400));
    }

    const token = splitAuth[1];
    let payload;
    try {

        payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return next(err);
    }
    req.authority = {
        id: payload.id,
        email: payload.email
    };
    next();
};

module.exports = isAuth;