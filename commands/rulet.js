const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'rulet',
    aliases: ['roulette'],
    description: 'Rulet oynatır. (Kırmızı, siyah veya yeşil)',
    execute(client, message, args) {
        let amount = parseInt(args[0]);
        let choice = args[1] ? args[1].toLowerCase() : null;

        if (!amount || isNaN(amount)) return message.channel.send('Geçerli bir miktar belirtmelisin!');
        if (!choice || !['kırmızı', 'siyah', 'yeşil'].includes(choice)) {
            return message.channel.send('Geçerli bir renk belirtmelisin! (kırmızı, siyah, yeşil)');
        }

        let balance = db.fetch(`para_${message.author.id}`) || 0;
        if (balance < amount) return message.channel.send('Yeterli paran yok!');

        let result = Math.random();
        let win = false;
        let multiplier = 0;

        if (result < 0.45 && choice === 'kırmızı') {
            win = true;
            multiplier = 2;
        } else if (result < 0.90 && choice === 'siyah') {
            win = true;
            multiplier = 2;
        } else if (result < 0.98 && choice === 'yeşil') {
            win = true;
            multiplier = 14;
        }

        if (win) {
            let winAmount = amount * multiplier;
            db.add(`para_${message.author.id}`, winAmount);
            message.channel.send(`🎲 Tebrikler! **${choice}** geldi ve **${winAmount}** 💰 kazandın!`);
        } else {
            db.subtract(`para_${message.author.id}`, amount);
            message.channel.send(`🎲 Maalesef kaybettin ve **${amount}** 💰 kaybettin!`);
        }
    }
}

// by ✨Shell Co. - @starr.dev