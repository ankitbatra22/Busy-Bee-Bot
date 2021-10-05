const Discord = require('discord.js');
const fetch = require("node-fetch");
const request = require("request-promise");
const ytch = require('yt-channel-info')
const config = require('./config.json')
const fs = require('fs');

const client = new Discord.Client();
console.log('new instance')

client.commands = new Discord.Collection();

//load from config.json
const prefix = config.prefix
const reminders = config.reminders
const selfcare = config.selfcare

//setting up commands directory
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (var file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//helper function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

client.once('ready', () => {
  console.log("Busy Bee is online!")
});

client.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase()

  if(command === 'youtube') {
    client.commands.get('youtube').execute(message, args);

  } else if (command === 'motivation') {
    fetch("https://type.fit/api/quotes")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var obj = (data[parseInt(Math.random() * data.length)]);
        quote = (Object.values(obj))
        message.channel.send(quote[0])
      })

    } else if (command === "reminder") {
      message.channel.send(reminders[getRandomInt(reminders.length)])

    } else if (command === "selfcare") {
      message.channel.send(selfcare[getRandomInt(selfcare.length)])

    } else if(command === "help") {
      client.commands.get('help').execute(message, args);

    } else if (command === "subs" || command === "subscribers") {
      const channelId = 'UCz9F9eEkt2KcLXZt--M6vjA'
      ytch.getChannelInfo(channelId, 1).then((response) => {
        let subCount = response['subscriberText'];
        console.log(typeof subCount)
        message.channel.send(`Breanna currently has ${subCount} on YouTube!`)
      })

    } else if (command === 'ping') {
      client.commands.get('ping').execute(message, args);
    }

    else if (command === 'trivia') {
      client.commands.get('trivia').execute(message, args);
    }

});

// login to discord bot
client.login(config.token);

