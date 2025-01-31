const User = require('../models/user');
const fs = require('fs');
const path = require('path');

async function setFundo(message, fundo) {
    const fundoPath = path.join(__dirname, '..', 'perfil', fundo);
        
            if (!fs.existsSync(fundoPath)) {
                    return message.reply('Esse fundo não existe. Verifique os disponíveis na pasta "perfil".');
                        }

                            let user = await User.findOne({ userId: message.author.id });
                                if (!user) {
                                        user = new User({
                                                    userId: message.author.id,
                                                                username: message.author.username,
                                                                            balance: 0,
                                                                                        investment: 0,
                                                                                                    bank: 0,
                                                                                                                fundo: 'default.png'
                                                                                                                        });
                                                                                                                            }

                                                                                                                                user.fundo = fundo;
                                                                                                                                    await user.save();

                                                                                                                                        message.reply(`Fundo do perfil alterado para: ${fundo}`);
                                                                                                                                        }

                                                                                                                                        module.exports = { setFundo };
                                                                                                                                        