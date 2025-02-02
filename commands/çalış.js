const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'çalış',
    aliases: ['work'],
    description: 'Her saat başı çalışarak 100-600 arası para kazanmanızı sağlar.',
    async execute(client, message, args) {
        let timeout = 3600000;
        let amount = Math.floor(Math.random() * 500) + 100;

        let work = await db.fetch(`çalış_${message.author.id}`);

        if (work !== null && timeout - (Date.now() - work) > 0) {
            let timeLeft = timeout - (Date.now() - work);
            let minutes = Math.floor(timeLeft / (1000 * 60));
            let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            message.channel.send(`Bu komutu tekrar kullanmak için **${minutes} dakika, ${seconds} saniye** beklemelisin!`);
        } else {
            db.add(`para_${message.author.id}`, amount);
            db.set(`çalış_${message.author.id}`, Date.now());

            let jobs = ['Yazılımcı', 'Doktor', 'Mühendis', 'Öğretmen', 'Şef'];
            let job = jobs[Math.floor(Math.random() * jobs.length)];

            message.channel.send(`${job} olarak çalıştın ve **${amount}** 💰 kazandın!`);
        }
    }
}

// by ✨Shell Co. - @starr.dev