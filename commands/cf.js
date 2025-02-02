const Discord = require('discord.js');
const db = require('quick.db');
  // by ✨Shell Co. - @starr.dev
module.exports = {
    name: 'cf',
    aliases: ['coinflip', 'yazıtura'],  // by ✨Shell Co. - @starr.dev
    description: 'Yazı tura atarak bahis oynarsınız. (t/tail veya h/head)',
    async execute(client, message, args) { 
        let choice = args[0] ? args[0].toLowerCase() : null;  // by ✨Shell Co. - @starr.dev
        let amount = parseInt(args[1]);

        if (!isNaN(args[0])) {
            amount = parseInt(args[0]);
            choice = 'h';  // by ✨Shell Co. - @starr.dev
        }

        if (choice) {
            if (['t', 'tail', 'tura'].includes(choice)) {
                choice = 'tail';
            } else if (['h', 'head', 'yazı'].includes(choice)) {  // by ✨Shell Co. - @starr.dev
                choice = 'head';
            } else if (!isNaN(choice)) {
                amount = parseInt(choice);  // by ✨Shell Co. - @starr.dev
                choice = 'head';
            } else {
                return message.channel.send('Geçerli bir seçim yapmalısın! (t/tail veya h/head)');  // by ✨Shell Co. - @starr.dev
            }
        } else {
            choice = 'head';
        }

        if (!amount || isNaN(amount)) {
            return message.channel.send('Geçerli bir miktar belirtmelisin!');  // by ✨Shell Co. - @starr.dev
        }

        if (amount < 100) {
            return message.channel.send('En az 100 💰 ile oynayabilirsin!');
        }
        if (amount > 200000) {
            return message.channel.send('En fazla 200,000 💰 ile oynayabilirsin!');  // by ✨Shell Co. - @starr.dev
        }

        let balance = db.fetch(`para_${message.author.id}`) || 0;
        if (balance < amount) {
            return message.channel.send('Yeterli paran yok!');  // by ✨Shell Co. - @starr.dev
        }

        db.subtract(`para_${message.author.id}`, amount);

        let result = Math.random() > 0.5 ? 'head' : 'tail';

        let flipMsg = await message.channel.send('Yazı tura atılıyor...');  // by ✨Shell Co. - @starr.dev
        
        await new Promise(resolve => setTimeout(resolve, 3000));

        if (result === choice) {
            let winAmount = amount * 2;
            db.add(`para_${message.author.id}`, winAmount);  // by ✨Shell Co. - @starr.dev

            const embed = new Discord.MessageEmbed()
                .setTitle('🎰 Coinflip Sonucu')
                .setColor('#00ff00')
                .addField('Seçimin', choice === 'head' ? 'Yazı' : 'Tura', true)  // by ✨Shell Co. - @starr.dev
                .addField('Sonuç', result === 'head' ? 'Yazı' : 'Tura', true)
                .addField('Kazanç', `+${winAmount} 💰`, true)
                .setTimestamp();  // by ✨Shell Co. - @starr.dev

            flipMsg.edit('', embed);
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle('🎰 Coinflip Sonucu')  // by ✨Shell Co. - @starr.dev
                .setColor('#ff0000')
                .addField('Seçimin', choice === 'head' ? 'Yazı' : 'Tura', true)  // by ✨Shell Co. - @starr.dev
                .addField('Sonuç', result === 'head' ? 'Yazı' : 'Tura', true)
                .addField('Kayıp', `-${amount} 💰`, true)
                .setTimestamp();

            flipMsg.edit('', embed);  // by ✨Shell Co. - @starr.dev
        }
    }
}

  // by ✨Shell Co. - @starr.dev