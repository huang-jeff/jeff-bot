const Discord = require('discord.js');
const Commando = require('discord.js-commando');
//const bot = Discord.Client();
const bot = new Commando.Client();

bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on('message', (message) => {
    if(message.content == 'ping!'){
        message.channel.send('pong!');    //sends message to channel without person tag
    }
});

/*
 *  Bot token - THIS SHOULD BE A PRIVATE TOKEN
 */
bot.login('NDQ4MzQ5MzY4NzczMzc4MDY4.DfHxNw.zJEYJAqwIIWRx3g41DDf16g87Uc');
console.log('jeff bot is now running');