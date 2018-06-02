const {Command} = require('discord.js-commando');

class DiceRollCommand extends Command {
  constructor(client){
    super(client, {
      name: 'rng',
      group: 'random',
      memberName: 'roll',
      description: 'Rolls a die or flips a coin',
      examples: ['coin -> Heads side up!'],
      args: [{
        key: 'text',
        prompt: 'What would  you like to RNG? Dice roll or coin flip?',
        type: 'string'
      }]
    });
  }

  async run(message, { text }) {
    message.delete();
    if(text == 'die'){
      var roll = Math.floor(Math.random() * 6) + 1;
      message.say("Die rolled a " + roll + ".");
    } else if(text == 'coin'){
      var flip = Math.floor(Math.random() * 2) + 1;
      var coin = ((flip == 1) ? "heads" : "tails");
      message.say("The coin flipped " + coin + ".");
    } else {
      message.say("Not sure what you wanted... but I do think it's a random thing.");
    }
    
  }
}

module.exports = DiceRollCommand;