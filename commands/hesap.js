const Discord = require('discord.js');
const db = require('quick.db');
const moment = require('moment');
require('moment-duration-format');
moment.locale('tr');

module.exports = {
    name: 'hesap',
    aliases: ['profil', 'profile'],
    description: 'Ekonomi hesap bilgilerinizi gösterir.',
    execute(client, message, args) {
        let user = message.mentions.users.first() || message.author;
        if (user.bot) return message.channel.send('Botların hesap bilgilerine bakamazsın!');
        
        let balance = db.fetch(`para_${user.id}`) || 0;
        let inventory = db.get(`envanter_${user.id}`) || [];
        let daily = db.fetch(`günlük_${user.id}`);
        let work = db.fetch(`çalış_${user.id}`);
        let weekly = db.fetch(`haftalık_${user.id}`);

        function getRelativeTime(timestamp) {
            if (!timestamp) return 'Hiç almamış';
            return `${moment(timestamp).fromNow()} (${moment(timestamp).format('DD/MM/YYYY HH:mm')})`;
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`${user.username} - Hesap Bilgileri`)
            .setThumbnail(user.avatarURL({ dynamic: true }))
            .addField('💰 Bakiye', balance)
            .addField('🎒 Envanter', inventory.length > 0 ? inventory.join(', ') : 'Boş')
            .addField('📅 Son Günlük Ödül', getRelativeTime(daily))
            .addField('💼 Son Çalışma', getRelativeTime(work))
            .addField('🎁 Son Haftalık Ödül', getRelativeTime(weekly))
            .setColor('BLUE')
            .setTimestamp();

        message.channel.send(embed);
    }
}

// by ✨Shell Co. - @starr.dev