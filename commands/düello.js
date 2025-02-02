const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'düello',
    aliases: ['duel'],
    description: 'Belirtilen kullanıcıyla düello yaparsınız.',
    async execute(client, message, args) {
        let target = message.mentions.users.first();
        if (!target) return message.channel.send('Düello yapmak için birini etiketlemelisin!');
        if (target.bot) return message.channel.send('Botlarla düello yapamazsın!');
        if (target.id === message.author.id) return message.channel.send('Kendinle düello yapamazsın!');

        let amount = parseInt(args[1]);
        if (!amount || isNaN(amount)) return message.channel.send('Geçerli bir miktar belirtmelisin!');

        let userBalance = db.fetch(`para_${message.author.id}`) || 0;
        let targetBalance = db.fetch(`para_${target.id}`) || 0;

        if (userBalance < amount) return message.channel.send('Yeterli paran yok!');
        if (targetBalance < amount) return message.channel.send('Rakibinin yeterli parası yok!');

        message.channel.send(`${target}, ${message.author} seninle **${amount}** 💰 için düello yapmak istiyor! Kabul ediyor musun? (evet/hayır)`);

        const filter = m => m.author.id === target.id && ['evet', 'hayır'].includes(m.content.toLowerCase());
        try {
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] });
            const response = collected.first().content.toLowerCase();

            if (response === 'evet') {
                let moves = ['⚔️ Saldırı', '🛡️ Savunma', '🏃 Kaçış'];
                let userMove = moves[Math.floor(Math.random() * moves.length)];
                let targetMove = moves[Math.floor(Math.random() * moves.length)];

                let winner = Math.random() > 0.5 ? message.author : target;
                let loser = winner.id === message.author.id ? target : message.author;

                db.add(`para_${winner.id}`, amount);
                db.subtract(`para_${loser.id}`, amount);

                message.channel.send(`
⚔️ **DÜELLO**
${message.author}: ${userMove}
${target}: ${targetMove}

🏆 Kazanan: ${winner}
💰 Ödül: **${amount}** 💰`);
            } else {
                message.channel.send('Düello reddedildi!');
            }
        } catch (err) {
            message.channel.send('Süre doldu, düello iptal edildi!');
        }
    }
}

// by ✨Shell Co. - @starr.dev