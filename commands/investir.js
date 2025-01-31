const { createCanvasImage } = require('../utils/canvasUtils');
const User = require('../models/user');

async function invest(message, value) {
    if (isNaN(value) || value <= 0) {
        return message.reply('Por favor, forneça um valor válido para investir.');
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
        return message.reply('Você não tem saldo suficiente para investir.');
    }

    user.balance -= value;
    user.investment += value;

    await user.save();

    const text = `${message.author.username}, você investiu 💵 ${value}. Seu investimento atual é 💵 ${user.investment}.`;

    const imageBuffer = createCanvasImage(400, 200, 'lightgreen', text);

    message.channel.send({
        files: [{ attachment: imageBuffer, name: 'invest.png' }]
    });

    setTimeout(async () => {
        const profit = user.investment * 0.10; // Rentabilidade de 10%
        user.balance += profit;
        user.investment = 0;

        await user.save();

        const profitText = `Seu investimento gerou um retorno de 💵 ${profit}. Seu novo saldo é 💵 ${user.balance}.`;

        const profitImageBuffer = createCanvasImage(400, 200, 'lightblue', profitText);

        message.channel.send({
            files: [{ attachment: profitImageBuffer, name: 'profit.png' }]
        });
    }, 60000); // Rentabilidade após 1 minuto
}

module.exports = { invest };
