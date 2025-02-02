const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'günlük',
    aliases: ['daily'],
    description: 'Her 24 saatte bir 500-1500 arası para kazanmanızı sağlar.',
    async execute(client, message, args) {
        let timeout = 86400000;
        let amount = Math.floor(Math.random() * 1000) + 500;

        let daily = await db.fetch(`günlük_${message.author.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let timeLeft = timeout - (Date.now() - daily);
            let hours = Math.floor(timeLeft / (1000 * 60 * 60));
            let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            message.channel.send(`Bu komutu tekrar kullanmak için **${hours} saat, ${minutes} dakika, ${seconds} saniye** beklemelisin!`);
        } else {
            db.add(`para_${message.author.id}`, amount);
            db.set(`günlük_${message.author.id}`, Date.now());

            message.channel.send(`Günlük ödülün olan **${amount}** 💰 hesabına eklendi!`);
        }
    }
}

// by ✨Shell Co. - @starr.dev