const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const config = require('./config.json');  // by ✨Shell Co. - @starr.dev
const moment = require('moment');
moment.locale('tr');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

['command', 'event'].forEach(handler => {
    require(`./handlers/${handler}`)(client);  // by ✨Shell Co. - @starr.dev
});

client.login(process.env.token);

// by ✨Shell Co. - @starr.dev