const {Command} = require('discord.js-commando');

class ClearMessages extends Command{
  constructor(client){
    super(client, {
      name: 'clear',
      group: 'utils',
      memberName: 'clear',
      description: 'Clears a certain number of messages or messages written by a specific person.',
      examples: ['>clear 100 -> will clear 100 messages prior to this command'],
      args: [{
        key: 'text',
        prompt: 'Type a number to clear number of messages or name to clear certain messages by a person.',
        type: 'string'
      }]
    });
  }

  async run(message, { text }) {
    message.delete();
    if(!(message.member.roles.find("name", "Administrators") ||
    message.member.roles.find("name", "Developers") ||
    message.member.roles.find("name", "Moderators"))) {
      message.channel.send('You need at least the \'Moderator\' role to use this command.');
      return;
    }
    const user = message.mentions.users.first();
    const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
    if (!amount) return message.reply('Must specify an amount to delete!');
    if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
    message.channel.fetchMessages({
    limit: amount,
    }).then((messages) => {
    if (user) {
    const filterBy = user ? user.id : Client.user.id;
    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
    }
    message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });
    message.say('Messages deleted.').then(msg => {
      msg.delete(5000)
    }).catch(console.error);
  }
}

module.exports = ClearMessages;