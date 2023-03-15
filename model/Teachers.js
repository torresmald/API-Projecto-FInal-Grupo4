const mongoose = require('mongoose');

const teachersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El email no tiene un formato válido']
    },
    password: { type: String, required: true },
    name: String,
    phone: Number,
    idCard: String,
    grade: String,
},
    {
        timestamps: true
    }
);

const Teacher = mongoose.model('Teacher', teachersSchema);

module.exports = Teacher;