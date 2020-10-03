const crew = require('../db/crew');
const impo = require('../db/imposter');

module.exports = {
  name: 'stats',
  triggers: ['stats', 's'],
  description: 'See your individual crewmate and imposter stats',
  handler: async (message) => {
    const { author } = message;

    try {
      const crewStats = await crew.read(author.id);
      const impoStats = await impo.read(author.id);
      if (crewStats === undefined || impoStats === undefined) {
        return message.reply('you don\'t have any stats try running !ng to register yourself as a new gamer');
      }

      return message.channel.send(`crewmate games carried: ${crewStats.games_carried}\nimposter games carried: ${impoStats.games_carried}`);
    } catch (err) {
      console.log(err.message);
    }
  }
};