const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const { prefix, token, owner } = require('./config.json');
//const bot = Discord.Client();
const bot = new Commando.Client({
  commandPrefix: prefix,
  owner: owner,
  disableEveryone: false
});

bot.registry.registerGroups([
    ['random', 'Random number generators'],
    ['roles', 'Role commands']
  ])
  .registerDefaults()
  //.registerDefaultCommands()
  .registerCommandsIn(__dirname + "/commands");

bot.on('ready', () => {
  console.log('jeff bot is now ready to slave away.');
  bot.user.setActivity('upgrading some new stuff!');
});

bot.on('message', message => {
  // preventing bot from reading non-command messages and self-written messages
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(message.content == 'ping'){
    message.channel.send('pong!');    //sends message to channel without person tag
  }
  if(message.content == 'beep'){
    message.channel.send('boop.');
  }
});



/*
 *  Bot token - THIS SHOULD BE A PRIVATE TOKEN
 */
bot.login(token); // makes sure to remove after pushing.