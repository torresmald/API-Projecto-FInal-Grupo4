const mongoose = require('mongoose');

const parentsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El email no tiene un formato válido']
    },
    password: { type: String, required: true },
    childs: [{ type: mongoose.Types.ObjectId, ref: 'Student' }]
},
    {
        timestamps: true
    }
);

const Parent = mongoose.model('Parent', parentsSchema);

module.exports = Parent;