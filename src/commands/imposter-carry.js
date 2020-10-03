const { update } = require('../db/imposter');

module.exports = {
  name: 'imposter carry',
  triggers: ['imposter.carry', 'ic'],
  description: 'Add another imposter carry to your count',
  handler: async (message) => {
    const { author } = message;
    const res = await update(author.id);

    return message.reply(`Another EZ imposter dub\n Total Imposter Games Carried: ${res}`);
  }
};