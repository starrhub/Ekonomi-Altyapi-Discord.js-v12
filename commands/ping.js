const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['ms'],
    description: 'Botun gecikme süresini gösterir.',
    execute(client, message, args) {
        message.channel.send(`🏓 Pong! Gecikme: **${client.ws.ping}ms**`);
    }
}

// by ✨Shell Co. - @starr.dev