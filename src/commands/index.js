const uptime = require('./uptime');
const crew = require('./crew');
const imposter = require('./imposter');

let descriptions = '';
const commands = [
  uptime,
  crew,
  imposter
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