const {Command} = require('discord.js-commando');

class DiceRollCommand extends Command {
  constructor(client){
    super(client, {
      name: 'rng',
      group: 'random',
      memberName: 'roll',
      description: 'Rolls a die, flips a coin or generates a random number for [1, n].',
      examples: ['>rng coin -> Heads side up!', '>rng die -> Die rolled a 3.', '>rng number <amount> -> RNG says it\'s 4.'],
      args: [{
        key: 'text',
        prompt: 'What would  you like to RNG? Dice roll or coin flip?',
        type: 'string'
      }]
    });
  }

  async run(message, { text }) {
    const args = text.split(' ');
    message.delete();
    var output;
    if(args[0] === 'die' || args[0] === 'dice'){
      var roll = Math.floor(Math.random() * 6) + 1;
      output = "Die rolled a " + roll + ".";
    } else if(args[0] === 'coin'){
      var flip = Math.floor(Math.random() * 2) + 1;
      var coin = ((flip == 1) ? "Heads" : "Tails");
      output = coin + " sides up!"
    } else if(args[0] === 'number') {
      if(isNaN(args[1 ])){
        message.say('Error: Invalid number as argument.\nUsage: >rng number <number>');
        return;
      }
      var rng = Math.floor(Math.random() * args[1] + 1);
      output = "The number is " + rng;
    } else {
      if(isNaN(args[0])){
        message.say("Not sure what you wanted... but I do think it's a random thing.");
        return;
      } else {
        var rng = Math.floor(Math.random() * args[0] + 1);
        var output = 
        output = "RNGesus says it's " + rng;
      }
    }
    message.say(output).then(msg => {
      msg.delete(5000)
    }).catch('Error: ${error}');
  }
}

module.exports = DiceRollCommand;