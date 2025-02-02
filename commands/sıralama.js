const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'sıralama',
    aliases: ['top', 'zenginler'],
    description: 'Sunucudaki en zengin 10 kişiyi gösterir.',
    async execute(client, message, args) {
        try {
            let allData = db.all().filter(data => data.ID.startsWith(`para_`));
            
            let serverData = [];
            for (let data of allData) {
                let id = data.ID.split('_')[1];
                try {
                    let member = await message.guild.members.fetch(id);
                    if (member) {
                        serverData.push({
                            id: id,
                            money: data.data
                        });
                    }
                } catch (err) {
                    continue;
                }
            }

            serverData.sort((a, b) => b.money - a.money);
            
            serverData = serverData.slice(0, 10);

            const embed = new Discord.MessageEmbed()
                .setTitle(`💰 ${message.guild.name} - En Zengin 10 Kişi`)
                .setColor('#FFD700')
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setFooter(`${message.author.tag} tarafından istendi.`)
                .setTimestamp();

            for (let i = 0; i < serverData.length; i++) {
                try {
                    let member = await message.guild.members.fetch(serverData[i].id);
                    let money = serverData[i].money;

                    embed.addField(
                        `${i + 1}. ${member.user.tag}`,
                        `Bakiye: ${money.toLocaleString()} 💰`,
                        false
                    );
                } catch (err) {
                    console.log(`Üye bulunamadı: ${serverData[i].id}`);
                }
            }

            // Eğer hiç veri yoksa
            if (serverData.length === 0) {
                embed.setDescription('Bu sunucuda henüz hiç veri yok!');
            }

            message.channel.send(embed);
        } catch (err) {
            console.error(err);
            message.channel.send('Sıralama oluşturulurken bir hata oluştu!');
        }
    }
}

// by ✨Shell Co. - @starr.dev