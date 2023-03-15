require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const fs = require('fs');
const Parent = require('../../../model/Parents');
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allParents = await Parent.find();

    if (allParents.length) {
        await Parent.collection.drop();
    }
}).catch((error) => {
    console.log(`Ha habido un error al borrar los Parents ${error}`);
}).then(async () => {
    const data = fs.readFileSync('./utils/seed/db/parents.json');
    const parsedData = JSON.parse(data);
    const ParentsDoc = parsedData.map((parent) => {
        return new Parent(parent);
    });
    await Parent.insertMany(ParentsDoc);
    console.log('Parents añadidos con exito');
}).catch((error) => {
    console.log(`Ha habido un error al añadir los Parents ${error}`);
}).finally(() => mongoose.disconnect());