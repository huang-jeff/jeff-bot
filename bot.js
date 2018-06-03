const Commando = require('discord.js-commando');
const { prefix, token, owner } = require('./config.json');

const roleSetupCMD = "<reactrole>";
const rebootCMD = "<reboot>";
const selfAssignRoles = ["Yutzu Farmers", "ABC123", "League of Legends", "Destiny 2", "Warframe", "Fortnite"];
const reactions = ["🍊", "🔤", "😍", "😃", "😅", "🤑"];

const bot = new Commando.Client({
  commandPrefix: prefix,
  owner: owner,
  disableEveryone: false
});

/*
 *  Bot registry for command groups
 */
bot.registry.registerGroups([
    ['random', 'RNG plug-ins'],
    ['roles', 'Role plug-ins'],
    ['utils', 'Utility plug-ins']
  ])
  .registerDefaults()
  .registerCommandsIn(__dirname + "/commands");

/*
 *  Once the bot is ready and initialized, set status and show info that bot is ready.
 */
bot.on('ready', () => {
  console.log('jeff bot is now ready to slave away.');
  bot.user.setActivity('upgrading some new stuff!');
});

/*
 *  Message responses for certain words or phrases.
 */
bot.on('message', message => {
  // preventing bot from reading non-command messages and self-written messages
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if(message.content === 'ping'){
    message.channel.send('pong!');    //sends message to channel without person tag
  }
  if(message.content === 'beep'){
    message.channel.send('boop.');
  }
  if(message.content === rebootCMD){
    message.delete();
    rebootBot(message.channel);
  }
  if(message.author.id == owner && message.content.toLowerCase() == roleSetupCMD){
    message.delete();
    var sending = generateMessages();
    let mappedArray = [[sending[0], false], ...sending.slice(1).map( (message, idx) => [message, reactions[idx]])];
    for( let mapObj of mappedArray){
      message.channel.send(mapObj[0]).then( sent => {
        if (mapObj[1]){
          sent.react(mapObj[1]);
        }
      });
    }
  }
});

bot.on('raw', event => {
  if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
    let channel = bot.channels.get(event.d.channel_id);
    let message = channel.fetchMessage(event.d.message_id).then(msg => {
    let user = msg.guild.members.get(event.d.user_id);
    if (msg.author.id == bot.user.id && msg.content != initialMessage){
      var re = `\\*\\*"(.+)?(?="\\*\\*)`;
      var role = msg.content.match(re)[1];
      if (user.id != bot.user.id){
        var roleObj = msg.guild.roles.find('name', role);
        var memberObj = msg.guild.members.get(user.id);
        if (event.t === "MESSAGE_REACTION_ADD"){
          memberObj.addRole(roleObj);
        } else {
          memberObj.removeRole(roleObj);
        }
      }
    }
    })
  }
})

/*
 *  Reboot function for Jeff Bot
 */
function rebootBot(channel){
  console.log('Rebooting...');
  channel.send('Rebooting...')
    .then(msg => bot.destroy())
    .then(() => bot.login(token));
}

/*
 *  Self assign roles based on reactions
 */
let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
if(selfAssignRoles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

function generateMessages(){
  var messages = [];
  messages.push(initialMessage);
  for(let role of selfAssignRoles) messages.push(`React below to get the **"${role}"** role!`);
  return messages;
}



/*
 *  Bot Starter - Don't touch anything below this.
 */
bot.login(token); // makes sure to remove after pushing.