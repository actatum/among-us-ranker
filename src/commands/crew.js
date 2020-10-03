const Table = require('easy-table');
const { readAll } = require('../db/crew');

module.exports = {
  name: 'crew',
  triggers: ['crew', 'c'],
  description: 'See the crewmates rankings and the number of games they\'ve carried',
  handler: async (message) => {
    const crewmates = await readAll();
    let t = new Table;
    crewmates.forEach((crew, i) => {
      t.cell('Rank', i + 1);
      t.cell('Gamer', crew.gamer);
      t.cell('Games Carried', crew.games_carried);
      t.newRow();
    });
    return message.channel.send('Crewmate Rankings\n ' + t.toString());
  }
};