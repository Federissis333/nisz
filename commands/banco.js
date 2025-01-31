const { createCanvasImage } = require('../utils/canvasUtils');
const User = require('../models/user');

async function bank(message, action, value) {
    if (isNaN(value) || value <= 0) {
        return message.reply('Por favor, forneça um valor válido para depositar ou sacar.');
    }

    let user = await User.findOne({ userId: message.author.id });
    if (!user) {
        user = new User({
            userId: message.author.id,
            username: message.author.username,
            balance: 0,
            investment: 0,
            bank: 0
        });
    }

    if (action === 'depositar') {
        if (user.balance < value) {
            return message.reply('Você não tem saldo suficiente para depositar.');
        }

        user.balance -= value;
        user.bank += value;

        await user.save();

        const text = `${message.author.username}, você depositou 💵 ${value} no banco. Seu saldo bancário é 💵 ${user.bank}.`;

        const imageBuffer = createCanvasImage(400, 200, 'lightblue', text);

        message.channel.send({
            files: [{ attachment: imageBuffer, name: 'bank_deposit.png' }]
        });
    }

    if (action === 'sacar') {
        if (user.bank < value) {
            return message.reply('Você não tem saldo suficiente no banco para sacar.');
        }

        user.bank -= value;
        user.balance += value;

        await user.save();

        const text = `${message.author.username}, você sacou 💵 ${value} do banco. Seu saldo atual é 💵 ${user.balance}.`;

        const imageBuffer = createCanvasImage(400, 200, 'lightgreen', text);

        message.channel.send({
            files: [{ attachment: imageBuffer, name: 'bank_withdraw.png' }]
        });
    }
}

module.exports = { bank };
