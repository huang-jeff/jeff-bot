const Commando = require('discord.js-commando');

class RoleReaction extends Commando.Command {
  constructor(client){
    super(client, {
      name: 'reactRoles',
      group: 'roles',
      memberName: 'ractRoles',
      descrption: 'Reaction to a specified message will assign a specific role.',
      examples: ['I haven\'t thought of an example yet']
    });
  }

  async run(message, { text }){
    message.delete();
    message.say('oops. looks like this isn\'t implemented yet.')
  }

}