const Table = require('easy-table');

const crewmates = [
  {
    name: 'danielle',
    rank: 1,
    games_carried: 1000000
  },
  {
    name: 'noah',
    rank: 2,
    games_carried: 100000
  },
  {
    name: 'chase',
    rank: 3,
    games_carried: 10000
  },
  {
    name: 'aaron',
    rank: 4,
    games_carried: 1000
  },
  {
    name: 'alyson',
    rank: 5,
    games_carried: 100
  },
];

module.exports = {
  name: 'crew',
  triggers: ['crew', 'c'],
  description: 'See the crewmates rankings and the number of games they\'ve carried',
  handler: async (message) => {
    let t = new Table;
    crewmates.forEach((crew) => {
      t.cell('Rank', crew.rank);
      t.cell('Gamer', crew.name);
      t.cell('Games Carried', crew.games_carried);
      t.newRow();
    });
    return message.channel.send('Crewmate Rankings\n ' + t.toString());
  }
};