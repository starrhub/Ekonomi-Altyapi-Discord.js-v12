const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'madenkaz',
    aliases: ['mine'],
    description: 'Kazma ile maden kazarak para kazanmanızı sağlar.',
    async execute(client, message, args) {
        let timeout = 3600000;
        let mining = await db.fetch(`maden_${message.author.id}`);

        if (mining !== null && timeout - (Date.now() - mining) > 0) {
            let time = timeout - (Date.now() - mining);
            let minutes = Math.floor(time / (1000 * 60));
            let seconds = Math.floor((time % (1000 * 60)) / 1000);
            return message.channel.send(`Tekrar maden kazmak için **${minutes} dakika ${seconds} saniye** beklemelisin!`);
        }

        let inventory = db.get(`envanter_${message.author.id}`) || [];
        if (!inventory.includes('kazma')) {
            return message.channel.send('Maden kazmak için kazmaya ihtiyacın var! Marketten satın alabilirsin.');
        }

        const minerals = [
            { name: "💎 Elmas", price: 5000, chance: 0.1 },
            { name: "🥇 Altın", price: 2500, chance: 0.2 },
            { name: "🥈 Gümüş", price: 1000, chance: 0.3 },
            { name: "🪨 Taş", price: 100, chance: 0.4 }
        ];

        let chance = Math.random();
        let found = minerals.find(m => chance <= m.chance);
        if (!found) found = minerals[minerals.length - 1];

        db.add(`para_${message.author.id}`, found.price);
        db.set(`maden_${message.author.id}`, Date.now());

        message.channel.send(`⛏️ ${found.name} buldun ve **${found.price}** 💰 kazandın!`);
    }
}

// by ✨Shell Co. - @starr.dev