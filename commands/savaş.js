const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'savaş',
    aliases: ['pvp', 'fight'],
    description: 'Etiketlediğiniz kullanıcı ile savaşırsınız.',
    async execute(client, message, args) {
        let timeout = 1800000;
        let lastUsed = await db.fetch(`savaş_cooldown_${message.author.id}`);
        
        if (lastUsed !== null && timeout - (Date.now() - lastUsed) > 0) {
            let timeLeft = timeout - (Date.now() - lastUsed);
            let minutes = Math.floor(timeLeft / (1000 * 60));
            let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            return message.channel.send(`⏰ Tekrar savaşmak için **${minutes} dakika ${seconds} saniye** beklemelisin!`);
        }

        let target = message.mentions.users.first();
        if (!target) return message.channel.send('Savaşmak için birini etiketlemelisin!');
        if (target.bot) return message.channel.send('Botlarla savaşamazsın!');
        if (target.id === message.author.id) return message.channel.send('Kendinle savaşamazsın!');

        let targetCooldown = await db.fetch(`savaş_cooldown_${target.id}`);
        if (targetCooldown !== null && timeout - (Date.now() - targetCooldown) > 0) {
            let timeLeft = timeout - (Date.now() - targetCooldown);
            let minutes = Math.floor(timeLeft / (1000 * 60));
            let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            return message.channel.send(`❌ ${target} şu anda savaşamaz! **${minutes} dakika ${seconds} saniye** sonra tekrar dene.`);
        }

        let userInv = db.get(`envanter_${message.author.id}`) || [];
        let targetInv = db.get(`envanter_${target.id}`) || [];

        if (!userInv.includes('kılıç')) return message.channel.send('Savaşmak için kılıca ihtiyacın var!');
        if (!targetInv.includes('kılıç')) return message.channel.send('Rakibinin kılıcı yok!');

        let userPoints = userInv.includes('kalkan') ? 2 : 1;
        let targetPoints = targetInv.includes('kalkan') ? 2 : 1;

        message.channel.send(`⚔️ **SAVAŞ BAŞLIYOR!**\n${message.author} vs ${target}\n\nSavaşçılar hazırlanıyor...`);

        await new Promise(resolve => setTimeout(resolve, 3000));

        let winner = Math.random() > 0.5 ? message.author : target;
        let loser = winner.id === message.author.id ? target : message.author;

        let prize = 1000;
        db.add(`para_${winner.id}`, prize);
        db.subtract(`para_${loser.id}`, prize);

        db.set(`savaş_cooldown_${message.author.id}`, Date.now());
        db.set(`savaş_cooldown_${target.id}`, Date.now());

        const embed = new Discord.MessageEmbed()
            .setTitle('⚔️ Savaş Sonucu')
            .setColor('#ff0000')
            .addField('🏆 Kazanan', winner.toString(), true)
            .addField('💀 Kaybeden', loser.toString(), true)
            .addField('💰 Ödül', `${prize} 💰`, true)
            .addField('🛡️ Ekipmanlar', `
                ${message.author}: ${userInv.includes('kalkan') ? 'Kılıç + Kalkan' : 'Kılıç'}
                ${target}: ${targetInv.includes('kalkan') ? 'Kılıç + Kalkan' : 'Kılıç'}
            `)
            .setTimestamp();

        message.channel.send(embed);
    }
}

// by ✨Shell Co. - @starr.dev