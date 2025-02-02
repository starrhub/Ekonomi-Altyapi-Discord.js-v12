const config = require('../config.json');

module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;  // by ✨Shell Co. - @starr.dev

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

    if (!command) return;

    try {
        command.execute(client, message, args);  // by ✨Shell Co. - @starr.dev
    } catch (error) {
        console.error(error);
        message.reply('Komutu çalıştırırken bir hata oluştu!');
    }
}

// by ✨Shell Co. - @starr.dev