const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'market',
    aliases: ['shop', 'mağaza'],
    description: 'Satın alabileceğiniz eşyaların listesini gösterir.',
    execute(client, message, args) {
        const items = [
            { name: "🎣 Olta", price: 25, id: "olta" },
            { name: "⛏️ Kazma", price: 30, id: "kazma" },
            { name: "🪓 Balta", price: 300, id: "balta" },
            { name: "🗡️ Kılıç", price: 50, id: "kılıç" },
            { name: "🛡️ Kalkan", price: 40, id: "kalkan" }
        ];

        const embed = new Discord.MessageEmbed()
            .setTitle('🏪 Market')
            .setColor('#36393F')
            .setDescription('Satın almak için: .satınal <eşya_id>')
            .setFooter(`${message.author.tag} tarafından istendi.`);

        items.forEach(item => {
            embed.addField(
                item.name,
                `Fiyat: ${item.price} 💰\nID: ${item.id}`,
                true
            );
        });

        message.channel.send(embed);
    }
}

// by ✨Shell Co. - @starr.dev