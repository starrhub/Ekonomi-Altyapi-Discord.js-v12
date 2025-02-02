const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'balıktut',
    aliases: ['fish'],
    description: 'Olta ile balık tutarak para kazanmanızı sağlar.',
    async execute(client, message, args) {
        let timeout = 1800000;
        let fishing = await db.fetch(`balık_${message.author.id}`);

        if (fishing !== null && timeout - (Date.now() - fishing) > 0) {
            let time = timeout - (Date.now() - fishing);
            let minutes = Math.floor(time / (1000 * 60));
            let seconds = Math.floor((time % (1000 * 60)) / 1000);

            return message.channel.send(`Tekrar balık tutmak için **${minutes} dakika ${seconds} saniye** beklemelisin!`);
        }

        let inventory = db.get(`envanter_${message.author.id}`) || [];
        if (!inventory.includes('olta')) {
            return message.channel.send('Balık tutmak için oltaya ihtiyacın var! Marketten satın alabilirsin.');
        }

        const fishes = [
            { name: "🐟 Hamsi", price: 100 },
            { name: "🐠 Çipura", price: 300 },
            { name: "🐡 Levrek", price: 500 },
            { name: "🦈 Köpek Balığı", price: 1000 }
        ];

        let caught = fishes[Math.floor(Math.random() * fishes.length)];
        db.add(`para_${message.author.id}`, caught.price);
        db.set(`balık_${message.author.id}`, Date.now());

        message.channel.send(`${caught.name} yakaladın ve **${caught.price}** 💰 kazandın!`);
    }
}

// by ✨Shell Co. - @starr.dev