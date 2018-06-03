const {Command} = require('discord.js-commando');

class SelfAssignRole extends Command {
  constructor(client){
    super(client, {
      name: 'sa',
      group: 'roles',
      memberName: 'selfassign',
      description: 'Self assign yourself a role for clans or games.\nLoL - League of Legends\n',
      examples: ['I haven\'t thought of an example yet'],
      args: [{
        key: 'text',
        prompt: 'Are you adding or removing a role and which role?',
        type: 'string'
      }]
    });
  }

  async run(message, { text }){
    const args = text.split(' ');
    const assignment = text.substring(args[0].length + 1, text.length).toLowerCase();
    console.log('|' + assignment + '|');
    message.delete();
    if(args.length != 2){
      message.say("Error: Need 2 arguments for this command.\nUsage: >sa + LoL");
      return;
    }
    if(args[0] === '+' || args[0] === 'add' || args[0] === 'a'){
      message.say('Assigning ' + args[1] + ' to ' + message.author.name + '... tho... nothing was added xD');
    } else if (args[0] === '-' || args[0] === 'remove' || args[0] === 'rm' || args[0] === 'r'){
      message.say('Removing ' + args[1] + ' from ' + message.author.name + '... tho... nothing was removed :(');
    }
  }
}

module.exports = SelfAssignRole;