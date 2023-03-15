require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const fs = require('fs');
const Category = require('../../../model/Categories.js');
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allCategories = await Category.find();

    if (allCategories.length) {
        await Category.collection.drop();
    }
}).catch((error) => {
    console.log(`Ha habido un error al borrar las Categories ${error}`);
}).then(async () => {
    const data = fs.readFileSync('./utils/seed/db/categories.json');
    const parsedData = JSON.parse(data);
    const CategoriesDoc = parsedData.map((category) => {
        return new Category(category);
    });
    await Category.insertMany(CategoriesDoc);
    console.log('Categories añadidos con exito');
}).catch((error) => {
    console.log(`Ha habido un error al añadir las Categories ${error}`);
}).finally(() => mongoose.disconnect());