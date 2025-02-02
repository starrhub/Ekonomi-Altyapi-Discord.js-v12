const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'satınal',
    aliases: ['buy'],
    description: 'Marketten eşya satın almanızı sağlar.',
    execute(client, message, args) {
        const items = {
            "olta": { name: "🎣 Olta", price: 25 },
            "kazma": { name: "⛏️ Kazma", price: 30 },
            "balta": { name: "🪓 Balta", price: 300 },
            "kılıç": { name: "🗡️ Kılıç", price: 50 },
            "kalkan": { name: "🛡️ Kalkan", price: 40 }
        };

        const item = args[0];
        if (!item) return message.channel.send('Bir eşya ID\'si belirtmelisin!');
        if (!items[item]) return message.channel.send('Böyle bir eşya bulunamadı!');

        const balance = db.fetch(`para_${message.author.id}`) || 0;
        if (balance < items[item].price) {
            return message.channel.send('Yeterli paran yok!');
        }

        db.subtract(`para_${message.author.id}`, items[item].price);
        db.push(`envanter_${message.author.id}`, item);

        message.channel.send(`Başarıyla ${items[item].name} satın aldın! (-${items[item].price} 💰)`);
    }
}

// by ✨Shell Co. - @starr.dev