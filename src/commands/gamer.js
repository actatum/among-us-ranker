const crew = require('../db/crew');
const impo = require('../db/imposter');


module.exports = {
  name: 'gamer',
  triggers: ['new.gamer', 'ng'],
  description: 'Add yourself as a new gamer',
  handler: async (message) => {
    const { author } = message;

    const gamer = {
      id: author.id,
      gamer: author.username
    };

    let res = {};

    try {
      res = await impo.create(gamer);
    } catch (err) {
      if (err.message.includes('duplicate key')) {
        return message.reply('You already exist you bum');
      }
    }

    try {
      res = await crew.create(gamer);
    } catch (err) {
      if (err.message.includes('duplicate key')) {
        return message.reply('You already exist you bum');
      }
    }

    return message.channel.send(`Added Gamer: ${res.gamer}`);
  }
};