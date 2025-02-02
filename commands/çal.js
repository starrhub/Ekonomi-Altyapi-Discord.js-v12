const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'çal',
    aliases: ['steal', 'rob'],
    description: 'Belirtilen kullanıcıdan para çalmayı denersiniz.',
    async execute(client, message, args) {
        let timeout = 7200000;
        let stealing = await db.fetch(`çalma_${message.author.id}`);

        if (stealing !== null && timeout - (Date.now() - stealing) > 0) {
            let time = timeout - (Date.now() - stealing);
            let hours = Math.floor(time / (1000 * 60 * 60));
            let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            return message.channel.send(`Tekrar çalmak için **${hours} saat ${minutes} dakika** beklemelisin!`);
        }

        let target = message.mentions.users.first();
        if (!target) return message.channel.send('Kimden çalacağını etiketlemelisin!');
        if (target.bot) return message.channel.send('Botlardan para çalamazsın!');
        if (target.id === message.author.id) return message.channel.send('Kendinden çalamazsın!');

        let targetBalance = db.fetch(`para_${target.id}`) || 0;
        if (targetBalance < 1000) return message.channel.send('Bu kullanıcının yeterli parası yok!');

        let success = Math.random() > 0.6;
        if (success) {
            let amount = Math.floor(targetBalance * 0.2);
            db.add(`para_${message.author.id}`, amount);
            db.subtract(`para_${target.id}`, amount);
            message.channel.send(`🦹 Başarıyla ${target} kullanıcısından **${amount}** 💰 çaldın!`);
        } else {
            let fine = 1000;
            db.subtract(`para_${message.author.id}`, fine);
            message.channel.send(`👮 Çalarken yakalandın ve **${fine}** 💰 ceza ödedin!`);
        }

        db.set(`çalma_${message.author.id}`, Date.now());
    }
}

// by ✨Shell Co. - @starr.dev