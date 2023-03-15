require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const fs = require('fs');
const Student = require('../../../model/Students');
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allStudents = await Student.find();

    if (allStudents.length) {
        await Student.collection.drop();
    }
}).catch((error) => {
    console.log(`Ha habido un error al borrar los Students ${error}`);
}).then(async () => {
    const data = fs.readFileSync('./utils/seed/db/students.json');
    const parsedData = JSON.parse(data);
    const StudentsDoc = parsedData.map((student) => {
        return new Student(student);
    });
    await Student.insertMany(StudentsDoc);
    console.log('Students añadidos con exito');
}).catch((error) => {
    console.log(`Ha habido un error al añadir los Students ${error}`);
}).finally(() => mongoose.disconnect());