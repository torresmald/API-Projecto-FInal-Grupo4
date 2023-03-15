const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El email no tiene un formato válido']
    },
    password: { type: String, required: true },
    picture: String,
    age: { type: Number, required: true},
    nickname: { type: String},
    favoriteGames: [{ type: mongoose.Types.ObjectId, ref: 'Game' }]
},
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;