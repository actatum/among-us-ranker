const uptime = require('./uptime');
const crew = require('./crew');
const imposter = require('./imposter');
const gamer = require('./gamer');
const impCarry = require('./imposter-carry');
const crewCarry = require('./crew-carry');
const stats = require('./stats');

let descriptions = '';
const commands = [
  uptime,
  crew,
  imposter,
  gamer,
  impCarry,
  crewCarry,
  stats
].reduce((all, cmd) => {
  cmd.triggers.forEach(trigger => all[trigger] = cmd.handler);
  descriptions += `**${cmd.name}** - ${cmd.description}
    Usage: ${cmd.triggers.map(t => '!' + t).join(' or ')} ${cmd.example || ''}
    `;
  return all;
}, {});

const allCommands = (message) => {
  return message.channel.send(descriptions);
};

commands['commands'] = allCommands;
commands['help'] = allCommands;

module.exports = {
  handle: (command, message) => {
    if (command && commands[command]) {
      commands[command](message);
    }
  }
};