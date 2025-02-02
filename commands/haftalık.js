const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'haftalık',
    aliases: ['weekly'],
    description: 'Haftalık ödülünüzü almanızı sağlar.',
    async execute(client, message, args) {
        let timeout = 604800000;
        let amount = 10000;

        let weekly = await db.fetch(`haftalık_${message.author.id}`);
        if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
            let time = timeout - (Date.now() - weekly);
            let days = Math.floor(time / (1000 * 60 * 60 * 24));
            let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            message.channel.send(`Haftalık ödülünü almak için **${days} gün ${hours} saat** beklemelisin!`);
        } else {
            db.add(`para_${message.author.id}`, amount);
            db.set(`haftalık_${message.author.id}`, Date.now());

            message.channel.send(`Haftalık ödülün olan **${amount}** 💰 hesabına eklendi!`);
        }
    }
}

// by ✨Shell Co. - @starr.dev