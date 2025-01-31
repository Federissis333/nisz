const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const { work } = require('./commands/work');
const { pay } = require('./commands/pay');
const { showBalance } = require('./commands/saldo');
const { invest } = require('./commands/investir');
const { bank } = require('./commands/banco');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

mongoose.connect('mongodb+srv://base:base@base.uecrx.mongodb.net/?retryWrites=true&w=majority&appName=base', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.log('Erro ao conectar ao MongoDB:', err));

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    if (content.startsWith('!work')) {
        await work(message);
    }

    if (content.startsWith('!pay')) {
        const value = parseInt(content.split(' ')[1]);
        await pay(message, value);
    }

    if (content.startsWith('!saldo')) {
        await showBalance(message);
    }

    if (content.startsWith('!investir')) {
        const value = parseInt(content.split(' ')[1]);
        await invest(message, value);
    }

    if (content.startsWith('!banco')) {
        const args = content.split(' ');
        const action = args[1];
        const value = parseInt(args[2]);
        await bank(message, action, value);
    }
});

client.login('MTMzNDMwMzM4Mzc5NjA2MDIwMA.GyoBDp.9bju3NgexVo5aoNu4P16XZF1vj5FHhK253TmlY');
