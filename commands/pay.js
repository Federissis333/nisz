const { createCanvasImage } = require('../utils/canvasUtils');
const User = require('../models/user');

async function pay(message, value) {
    if (isNaN(value) || value <= 0) {
        return message.reply('Por favor, forneça um valor válido para pagar.');
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

    if (user.balance < value) {
        return message.reply('Você não tem saldo suficiente para fazer esse pagamento.');
    }

    user.balance -= value;
    await user.save();

    const text = `${message.author.username}, você pagou 💵 ${value}. Seu saldo agora é 💵 ${user.balance}.`;

    const imageBuffer = createCanvasImage(400, 200, 'lightgreen', text);

    message.channel.send({
        files: [{ attachment: imageBuffer, name: 'pay.png' }]
    });
}

module.exports = { pay };
