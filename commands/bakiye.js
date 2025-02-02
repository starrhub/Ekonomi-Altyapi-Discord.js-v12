const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'bakiye',
    aliases: ['para', 'money'],
    description: 'Kendinizin veya etiketlediğiniz kullanıcının bakiyesini gösterir.',
    execute(client, message, args) {
        let user = message.mentions.users.first() || message.author;
        let bakiye = db.fetch(`para_${user.id}`) || 0;

        const embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Bakiye Bilgisi')
            .setDescription(`${user} kullanıcısının bakiyesi: ${bakiye} 💰`);

        message.channel.send(embed);
    }
}

// by ✨Shell Co. - @starr.dev