const { update } = require('../db/crew');

module.exports = {
  name: 'crew carry',
  triggers: ['crew.carry', 'cc'],
  description: 'Add another crewmate carry to your count',
  handler: async (message) => {
    const { author } = message;
    const res = await update(author.id);

    return message.reply(`Gratz on carrying this bum ass crew to another win\n Total Crewmate Games Carried ${res}`);
  }
};