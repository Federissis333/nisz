const { createCanvasImage } = require('../utils/canvasUtils');
const User = require('../models/user');

async function showBalance(message) {
    const user = await User.findOne({ userId: message.author.id });
    if (!user) {
        message.reply('Você não está registrado. Use `!work` para começar.');
        return;
    }

    const text = `Seu saldo atual é: 💵 ${user.balance}`;

    const imageBuffer = createCanvasImage(400, 200, 'lightblue', text);

    message.channel.send({
        files: [{ attachment: imageBuffer, name: 'balance.png' }]
    });
}

module.exports = { showBalance };
