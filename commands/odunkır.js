const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'odunkır',
    aliases: ['odun', 'wood'],
    description: 'Balta ile odun keserek para kazanmanızı sağlar.',
    async execute(client, message, args) {
        let timeout = 3600000;
        let woodcutting = await db.fetch(`odun_${message.author.id}`);

        if (woodcutting !== null && timeout - (Date.now() - woodcutting) > 0) {
            let time = timeout - (Date.now() - woodcutting);
            let minutes = Math.floor(time / (1000 * 60));
            let seconds = Math.floor((time % (1000 * 60)) / 1000);
            return message.channel.send(`Tekrar odun kesmek için **${minutes} dakika ${seconds} saniye** beklemelisin!`);
        }

        let inventory = db.get(`envanter_${message.author.id}`) || [];
        if (!inventory.includes('balta')) {
            return message.channel.send('Odun kesmek için baltaya ihtiyacın var! Marketten satın alabilirsin.');
        }

        const woods = [
            { name: "🌳 Meşe", price: 750 },
            { name: "🌲 Çam", price: 500 },
            { name: "🌴 Huş", price: 250 }
        ];

        let found = woods[Math.floor(Math.random() * woods.length)];
        db.add(`para_${message.author.id}`, found.price);
        db.set(`odun_${message.author.id}`, Date.now());

        message.channel.send(`🪓 ${found.name} ağacı kestin ve **${found.price}** 💰 kazandın!`);
    }
}

// by ✨Shell Co. - @starr.dev