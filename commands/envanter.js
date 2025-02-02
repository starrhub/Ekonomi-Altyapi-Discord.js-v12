const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'envanter',
    aliases: ['inv', 'inventory'],
    description: 'Sahip olduğunuz eşyaları gösterir.',
    execute(client, message, args) {
        const items = {
            "olta": "🎣 Olta",
            "kazma": "⛏️ Kazma",
            "balta": "🪓 Balta",
            "kılıç": "🗡️ Kılıç",
            "kalkan": "🛡️ Kalkan"
        };

        let inventory = db.get(`envanter_${message.author.id}`) || [];
        
        const embed = new Discord.MessageEmbed()
            .setTitle('🎒 Envanter')
            .setColor('#36393F')
            .setFooter(`${message.author.tag} tarafından istendi.`);

        if (inventory.length === 0) {
            embed.setDescription('Envanteriniz boş!');
        } else {
            let itemCounts = {};
            inventory.forEach(item => {
                itemCounts[item] = (itemCounts[item] || 0) + 1;
            });

            Object.keys(itemCounts).forEach(item => {
                embed.addField(
                    items[item],
                    `Adet: ${itemCounts[item]}`,
                    true
                );
            });
        }

        message.channel.send(embed);
    }
}

// by ✨Shell Co. - @starr.dev