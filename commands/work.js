const { createCanvasImage } = require('../utils/canvasUtils');
const User = require('../models/user');

async function work(message) {
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

    const earnedMoney = Math.floor(Math.random() * 100) + 10; // Ganha entre 10 e 100
    user.balance += earnedMoney;

    await user.save();

    const text = `${message.author.username}, você trabalhou e ganhou 💵 ${earnedMoney}! Seu saldo agora é 💵 ${user.balance}.`;

    const imageBuffer = createCanvasImage(400, 200, 'lightblue', text);

    message.channel.send({
        files: [{ attachment: imageBuffer, name: 'work.png' }]
    });
}

module.exports = { work };
