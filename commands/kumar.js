const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'kumar',
    aliases: ['bahis', 'bet'],
    description: 'Belirttiğiniz miktar ile kumar oynarsınız. (2x veya 0x)',
    async execute(client, message, args) {
        let amount = parseInt(args[0]);
        if (!amount || isNaN(amount)) return message.channel.send('Geçerli bir miktar belirtmelisin!');
        if (amount < 100) return message.channel.send('En az 100 💰 ile oynayabilirsin!');

        let balance = db.fetch(`para_${message.author.id}`) || 0;
        if (balance < amount) return message.channel.send('Yeterli paran yok!');

        let chance = Math.random();
        if (chance > 0.5) {
            db.add(`para_${message.author.id}`, amount);
            message.channel.send(`🎰 Tebrikler! **${amount}** 💰 kazandın!`);
        } else {
            db.subtract(`para_${message.author.id}`, amount);
            message.channel.send(`🎰 Maalesef **${amount}** 💰 kaybettin.`);
        }
    }
}

// by ✨Shell Co. - @starr.dev