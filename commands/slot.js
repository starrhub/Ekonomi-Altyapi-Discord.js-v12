const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'slot',
    aliases: ['slots'],
    description: 'Slot makinesi oynatır.',
    execute(client, message, args) {
        let amount = parseInt(args[0]);
        if (!amount || isNaN(amount)) return message.channel.send('Geçerli bir miktar belirtmelisin!');
        if (amount < 500) return message.channel.send('En az 500 💰 ile oynayabilirsin!');

        let balance = db.fetch(`para_${message.author.id}`) || 0;
        if (balance < amount) return message.channel.send('Yeterli paran yok!');

        const slots = ['🍎', '🍌', '🍇', '🍊', '🍒'];
        const slot1 = slots[Math.floor(Math.random() * slots.length)];
        const slot2 = slots[Math.floor(Math.random() * slots.length)];
        const slot3 = slots[Math.floor(Math.random() * slots.length)];

        if (slot1 === slot2 && slot2 === slot3) {
            const winAmount = amount * 3;
            db.add(`para_${message.author.id}`, winAmount);
            message.channel.send(`
🎰 | **SLOT MAKİNESİ**
${slot1} | ${slot2} | ${slot3}
Tebrikler! **${winAmount}** 💰 kazandın!`);
        } else {
            db.subtract(`para_${message.author.id}`, amount);
            message.channel.send(`
🎰 | **SLOT MAKİNESİ**
${slot1} | ${slot2} | ${slot3}
Maalesef **${amount}** 💰 kaybettin!`);
        }
    }
}

// by ✨Shell Co. - @starr.dev