require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const fs = require('fs');
const User = require('../../../model/Users');
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allUsers = await User.find();

    if (allUsers.length) {
        await User.collection.drop();
    }
}).catch((error) => {
    console.log(`Ha habido un error al borrar los Users ${error}`);
}).then(async () => {
    const data = fs.readFileSync('./utils/seed/db/users.json');
    const parsedData = JSON.parse(data);
    const UsersDoc = parsedData.map((user) => {
        return new User(user);
    });
    await User.insertMany(UsersDoc);
    console.log('Users añadidos con exito');
}).catch((error) => {
    console.log(`Ha habido un error al añadir los Users ${error}`);
}).finally(() => mongoose.disconnect());