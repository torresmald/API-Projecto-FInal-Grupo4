const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    name: { type: String },
    image: String,
    phone: Number,
    address: String,
    email: String,
    date: String,
    areas: { type: [String] },
    diseases: { type: [String] },
    nutrition: { type: [String] },
    grade: String,
},
    {
        timestamps: true
    });


const Student = mongoose.model('Student', studentsSchema);
module.exports = Student;