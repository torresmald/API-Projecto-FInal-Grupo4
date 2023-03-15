require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const fs = require('fs');
const Game = require('../../../model/Games.js');
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allGames = await Game.find();

    if (allGames.length) {
        await Game.collection.drop();
    }
}).catch((error) => {
    console.log(`Ha habido un error al borrar los Games ${error}`);
}).then(async () => {
    const data = fs.readFileSync('./utils/seed/db/games.json');
    const parsedData = JSON.parse(data);
    const GamesDoc = parsedData.map((game) => {
        return new Game(game);
    });
    await Game.insertMany(GamesDoc);
    console.log('Games añadidos con exito');
}).catch((error) => {
    console.log(`Ha habido un error al añadir los Games ${error}`);
}).finally(() => mongoose.disconnect());