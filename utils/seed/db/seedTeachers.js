require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const fs = require('fs');
const Teacher = require('../../../model/Teachers');
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allTeachers = await Teacher.find();

    if (allTeachers.length) {
        await Teacher.collection.drop();
    }
}).catch((error) => {
    console.log(`Ha habido un error al borrar los Teachers ${error}`);
}).then(async () => {
    const data = fs.readFileSync('./utils/seed/db/teachers.json');
    const parsedData = JSON.parse(data);
    const TeachersDoc = parsedData.map((teacher) => {
        return new Teacher(teacher);
    });
    await Teacher.insertMany(TeachersDoc);
    console.log('Teachers añadidos con exito');
}).catch((error) => {
    console.log(`Ha habido un error al añadir los Teachers ${error}`);
}).finally(() => mongoose.disconnect());