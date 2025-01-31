const { createProfileImage } = require('../utils/canvasUtils');
const User = require('../models/user');

async function perfil(message) {
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
                                                                                                        await user.save();
                                                                                                            }

                                                                                                                const imageBuffer = await createProfileImage(user.username, user.balance, user.bank, user.fundo);

                                                                                                                    message.channel.send({
                                                                                                                            files: [{ attachment: imageBuffer, name: 'perfil.png' }]
                                                                                                                                });
                                                                                                                                }

                                                                                                                                module.exports = { perfil };
                                                                                                                                