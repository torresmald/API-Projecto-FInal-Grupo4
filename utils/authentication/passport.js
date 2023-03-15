const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../../model/Users.js');
const createError = require('../errors/createError.js');
const bcrypt = require('bcrypt');

passport.use(
    'register',
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
        async (request, email, password, done) => {
            try {
                const previousUser = await User.findOne({ email });
                if (previousUser) {
                    return done(createError('El usuario ya existe, logueate'));
                }
                const encryptedPassword = await bcrypt.hash(password.toString(), parseInt(10));
                const newUser = new User({
                    email,
                    password: encryptedPassword,
                    nickname: request.body.nickname,
                    age: request.body.age,
                    picture: request.body.picture
                });
                const savedUser = await newUser.save();
                return done(null, savedUser)
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
        async (request, email, password, done) => {
            const currentUser = await User.findOne({ email });
            if (!currentUser) {
                return done(createError('El usuario no existe, registrate!'));
            }
            const isValidPassword = await bcrypt.compare(
                password,
                currentUser.password
            );
            if (!isValidPassword) {
                return done(createError('La contraseña no es correcta'));
            }
            currentUser.password = null;
            done(null, currentUser)
        }
    )
);

passport.serializeUser((user, done) => {
    return done(null, user._id)
});
passport.deserializeUser(async (userId, done) => {
    try {
        const existingUser = await User.findById(userId);
        return done(null, existingUser);
    } catch (error) {
        return done(error)
    }
});