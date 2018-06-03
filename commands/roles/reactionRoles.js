const {Command} = require('discord.js-commando');

class RoleReaction extends Command {
  constructor(client){
    super(client, {
      name: 'assignrole',
      group: 'roles',
      memberName: 'assignrole',
      description: 'Reaction to a specified message will assign a specific role.',
      examples: ['I haven\'t thought of an example yet']
    });
  }

  async run(message, { text }){
    message.delete();
    message.say('oops. looks like this isn\'t implemented yet.')
  }
}

module.exports = RoleReaction;