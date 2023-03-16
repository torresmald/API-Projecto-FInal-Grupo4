const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const Parent = require('../../model/Parents');

const createError = require('../errors/createError.js');
const bcrypt = require('bcrypt');
const Teacher = require('../../model/Teachers');

passport.use(
    'registerParent',
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
        async (request, email, password, done) => {
            try {
                const previousParent = await Parent.findOne({ email });
                if (previousParent) {
                    return done(createError('El usuario ya existe, logueate'));
                }
                const encryptedPassword = await bcrypt.hash(password.toString(), parseInt(10));
                const newUser = new Parent({
                    email,
                    password: encryptedPassword,
                    childs: request.body.childs
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
    'registerTeacher',
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
        async (request, email, password, done) => {
            try {
                const previousTeacher = await Teacher.findOne({ email });
                if (previousTeacher) {
                    return done(createError('El usuario ya existe, logueate'));
                }
                const encryptedPassword = await bcrypt.hash(password.toString(), parseInt(10));
                const newUser = new Teacher({
                    email,
                    password: encryptedPassword,
                    name: request.body.name,
                    phone: request.body.phone,
                    idCard: request.body.idCard,
                    grade: request.body.grade
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
    'loginParent',
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
        async (request, email, password, done) => {
            const currentParent = await Parent.findOne({ email });
            if (!currentParent) {
                return done(createError('El usuario no existe, registrate!'));
            }
            const isValidPasswordParent = await bcrypt.compare(
                password,
                currentParent.password
            );
           
            if (!isValidPasswordParent) {
                return done(createError('La contraseña no es correcta'));
            }
            currentParent.password = null;
            done(null, currentParent)
        }
    )
);
passport.use(
    'loginTeacher',
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
        async (request, email, password, done) => {
            const currentTeacher = await Teacher.findOne({ email });
            if (!currentTeacher) {
                return done(createError('El usuario no existe, registrate!'));
            }
            const isValidPasswordTeacher = await bcrypt.compare(
                password,
                currentTeacher.password
            );
           
            if (!isValidPasswordTeacher) {
                return done(createError('La contraseña no es correcta'));
            }
            currentTeacher.password = null;
            done(null, currentParent)
        }
    )
);


passport.serializeUser((user, done) => {
    return done(null, user._id)
});

passport.deserializeUser(async (userId, done) => {
    try {
        const existingUser = await Parent.findById(userId) || await Teacher.findById(userId);
        return done(null, existingUser);
    } catch (error) {
        return done(error)
    }
});
