require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const fs = require('fs');
const MyGame = require('../../../model/MyGames');
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allGames = await MyGame.find();

    if (allGames.length) {
        await MyGame.collection.drop();
    }
}).catch((error) => {
    console.log(`Ha habido un error al borrar los Games ${error}`);
}).then(async () => {
    const data = fs.readFileSync('./utils/seed/db/myGames.json');
    const parsedData = JSON.parse(data);
    const GamesDoc = parsedData.map((game) => {
        return new MyGame(game);
    });
    await MyGame.insertMany(GamesDoc);
    console.log('Games añadidos con exito');
}).catch((error) => {
    console.log(`Ha habido un error al añadir los Games ${error}`);
}).finally(() => mongoose.disconnect());