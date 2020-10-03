const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client();

const commands = require('./commands');
const crew = require('./db/crew');
const imposter = require('./db/imposter');

const guildID = process.env.GUILD_ID;
const channelID = process.env.CHANNEL_ID;

client.once('ready', async () => {
  await crew.table();
  await imposter.table();
  console.log('among us ranker bot started!');
});

client.on('message', async (msg) => {
  const { guild, channel } = msg;
  if (msg.author.bot || channel.type === 'dm') return;

  if (guild && guild.id === guildID && msg.channel.id === channelID) {
    if (msg.content[0] === '!') {
      const command = msg.content.split(' ')[0].substr(1).toLowerCase();

      commands.handle(command, msg);
    }
  }
});

client.login(process.env.BOT_TOKEN);

