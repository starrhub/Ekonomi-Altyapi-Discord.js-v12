const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'yardım',
    aliases: ['help', 'h'],
    description: 'Tüm komutları ve açıklamalarını gösterir.',
    execute(client, message, args) {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('📚 Komut Listesi')
            .setDescription(`Prefix: \`${config.prefix}\``)
            .setFooter(`${message.author.tag} tarafından istendi.`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();

        client.commands.forEach(command => {
            embed.addField(
                `${config.prefix}${command.name} ${command.aliases ? `(${command.aliases.join(', ')})` : ''}`,
                command.description || 'Açıklama belirtilmemiş.',
                false
            );
        });

        message.channel.send(embed);
    }
}

// by ✨Shell Co. - @starr.dev