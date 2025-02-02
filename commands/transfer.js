const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'transfer',
    aliases: ['gönder', 'send'],
    description: 'Belirttiğiniz kullanıcıya para transfer etmenizi sağlar.',
    execute(client, message, args) {
        let user = message.mentions.users.first();
        if (!user) return message.channel.send('Bir kullanıcı etiketlemelisin!');
        if (user.bot) return message.channel.send('Botlara para transfer edemezsin!');
        if (user.id === message.author.id) return message.channel.send('Kendine para transfer edemezsin!');

        let amount = parseInt(args[1]);
        if (!amount || isNaN(amount)) return message.channel.send('Geçerli bir miktar belirtmelisin!');

        let balance = db.fetch(`para_${message.author.id}`) || 0;
        if (balance < amount) return message.channel.send('Yeterli bakiyen yok!');

        db.subtract(`para_${message.author.id}`, amount);
        db.add(`para_${user.id}`, amount);

        message.channel.send(`${user} kullanıcısına başarıyla **${amount}** 💰 gönderildi!`);
    }
}

// by ✨Shell Co. - @starr.dev