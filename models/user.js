const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
        username: { type: String, required: true },
            balance: { type: Number, default: 0 },
                investment: { type: Number, default: 0 },
                    bank: { type: Number, default: 0 },
                        fundo: { type: String, default: 'default.png' } // Fundo do perfil
                        });

                        const User = mongoose.model('User', userSchema);

                        module.exports = User;
                        