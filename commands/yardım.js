const Discord = require('discord.js');
const config = require('../config.json');   // by ✨Shell Co. - @starr.dev

module.exports = {
    name: 'yardım',
    aliases: ['help', 'h'],
    description: 'Tüm komutları ve açıklamalarını gösterir.',
    async execute(client, message, args) {
        let commands = Array.from(client.commands.values());
        
        const commandsPerPage = 6;   // by ✨Shell Co. - @starr.dev
        
        const totalPages = Math.ceil(commands.length / commandsPerPage);
        
        let currentPage = 1;

        function generateEmbed(page) {
            const startIndex = (page - 1) * commandsPerPage;
            const currentCommands = commands.slice(startIndex, startIndex + commandsPerPage);

            const embed = new Discord.MessageEmbed()
                .setTitle('📚 Komut Listesi')
                .setDescription(`Prefix: \`${config.prefix}\`\nToplam Komut: ${commands.length}`)   // by ✨Shell Co. - @starr.dev
                .setImage('https://cdn-kupsat.glitch.me/assets/1738511652690-963526699-s.gif')
                .setColor('#0099ff')
                .setFooter(`Sayfa ${page}/${totalPages} • ${message.author.tag} tarafından istendi.`)   // by ✨Shell Co. - @starr.dev
                .setTimestamp();

            currentCommands.forEach(cmd => {
                embed.addField(
                    `${config.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases.join(', ')})` : ''}`,
                    cmd.description || 'Açıklama belirtilmemiş.',
                    false
                );   // by ✨Shell Co. - @starr.dev
            });

            return embed;
        }

        const helpMessage = await message.channel.send(generateEmbed(currentPage));

        await helpMessage.react('⬅️');
        await helpMessage.react('➡️');   // by ✨Shell Co. - @starr.dev


        const filter = (reaction, user) => {
            return ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        const collector = helpMessage.createReactionCollector(filter, { time: 300000 });

        collector.on('collect', async (reaction, user) => {
            reaction.users.remove(user);

            if (reaction.emoji.name === '⬅️' && currentPage > 1) {   // by ✨Shell Co. - @starr.dev
                currentPage--;
                helpMessage.edit(generateEmbed(currentPage));
            } else if (reaction.emoji.name === '➡️' && currentPage < totalPages) {
                currentPage++;
                helpMessage.edit(generateEmbed(currentPage));
            }
        });

        collector.on('end', () => {   // by ✨Shell Co. - @starr.dev
            helpMessage.reactions.removeAll().catch(error => console.error('Reaksiyonlar kaldırılamadı:', error));
        });

        client.on('messageReactionAdd', async (reaction, user) => {   // by ✨Shell Co. - @starr.dev
            if (reaction.message.id === helpMessage.id && user.id !== message.author.id && !user.bot) {
                reaction.users.remove(user);
                try {
                    const warningMsg = await message.channel.send(`${user}, bu menüyü sadece komutu kullanan kişi kullanabilir!`);
                    setTimeout(() => warningMsg.delete(), 3000);
                } catch (err) {
                    console.error('Uyarı mesajı gönderilemedi:', err);   // by ✨Shell Co. - @starr.dev
                }
            }
        });
    }
}

   // by ✨Shell Co. - @starr.dev
