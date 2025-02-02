const fs = require('fs');

module.exports = (client) => {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));  // by ✨Shell Co. - @starr.dev

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        client.commands.set(command.name, command);
        
        if (command.aliases) {
            command.aliases.forEach(alias => {
                client.aliases.set(alias, command.name);  // by ✨Shell Co. - @starr.dev
            });
        }
    }
}

// by ✨Shell Co. - @starr.dev