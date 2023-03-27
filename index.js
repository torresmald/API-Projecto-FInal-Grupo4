require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const server = express();
const studentsRouter = require('./routes/students.routes.js');
const resourcesRouter = require('./routes/resources.routes');
const parentsRouter = require('./routes/parents.routes.js');
const teachersRouter = require('./routes/teachers.routes');
const notificationsRouter = require('./routes/notifications.routes.js');
const connect = require('./utils/db/connect.js');
const path = require('path');
const cloudinary = require('cloudinary');
const createError = require('./utils/errors/createError.js');
const cors = require('cors');
const http = require('http').Server(server);
const io = require('socket.io')(http, {
  cors: {
    origin: "https://projecto-final-grupo4.vercel.app/",
    methods: ['GET','POST'],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

const whitelist = ['http://localhost:3000/', 'http://localhost:4200/', 'https://projecto-final-grupo4.vercel.app/' /** other domains if any */ ]
const corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};
server.use(cors(corsOptions));

connect();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


server.use(cors());
require('./utils/authentication/passport.js');
server.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 14400000,
    SameSite: 'None'
  },
  store: MongoStore.create({
    mongoUrl: DB_URL
  })
}));


io.on('connection', (socket) => {
  console.log('Nuevo usuario Conectado');

  socket.on('sendMessage', (messageInfo) => {
    console.log('Enviando un mensaje');
    socket.broadcast.emit('receiveMessage', messageInfo);
  })
})

server.use(passport.initialize());
server.use(passport.session());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, '/tmp/')));

server.get('/', (request, response) => {
  response.status(200).json('Bienvenido a la API del colegio SEMILLA.')
})

server.use('/parents', parentsRouter);
server.use('/students', studentsRouter);
server.use('/resources', resourcesRouter);
server.use('/teachers', teachersRouter);
server.use('/notifications', notificationsRouter);

server.use('*', (request, response, next) => {
  next(createError(`Esta ruta no existe`, 404))
});
server.use((error, request, response, next) => {
  return response.status(error.status || 500).json(error.message || 'Unexpected Error')
});

http.listen(PORT, () => {
  console.log(`Listening in http://localhost:${PORT}`);
});

module.exports = server;