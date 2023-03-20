require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const fs = require('fs');
const Resource = require('../../../model/Resources');
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allResource = await Resource.find();

    if (allResource.length) {
        await Resource.collection.drop();
    }
}).catch((error) => {
    console.log(`Ha habido un error al borrar los Resource ${error}`);
}).then(async () => {
    const data = fs.readFileSync('./utils/seed/db/resources.json');
    const parsedData = JSON.parse(data);
    const ResourcesDoc = parsedData.map((resource) => {
        return new Resource(resource);
    });
    await Resource.insertMany(ResourcesDoc);
    console.log('Resources añadidos con exito');
}).catch((error) => {
    console.log(`Ha habido un error al añadir los Resource ${error}`);
}).finally(() => mongoose.disconnect());