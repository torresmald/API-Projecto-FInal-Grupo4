const jwt = require('jsonwebtoken');

const getJWT = (userInfo) => {
    return jwt.sign(
        {
            id: userInfo._id,
            email: userInfo._email
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "4h"
        }
    );
};

module.exports = getJWT;