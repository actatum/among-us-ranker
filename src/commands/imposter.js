const Table = require('easy-table');
const { readAll } = require('../db/imposter');

module.exports = {
  name: 'imposters',
  triggers: ['imposters', 'impo', 'i'],
  description: 'See the imposter rankings and the number of games they\'ve carried',
  handler: async (message) => {
    const imposters = await readAll();
    let t = new Table;
    imposters.forEach((crew, i) => {
      t.cell('Rank', i + 1);
      t.cell('Gamer', crew.gamer);
      t.cell('Games Carried', crew.games_carried);
      t.newRow();
    });
    return message.channel.send('Imposter Rankings\n' + t.toString());
  }
};