const countdown = require('countdown');
const bootTime = new Date();

module.exports = {
  name: 'uptime',
  triggers: ['uptime', 'ut'],
  description: 'See how long the among us ranker bot has been up.',
  handler: (message) => {
    return message.channel.send(`Among Us Ranker Bot has been up since ${bootTime.toUTCString()} for a total of : ${countdown(bootTime)}`);
  }
};