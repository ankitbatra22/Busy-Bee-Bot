const Discord = require('discord.js');
const fetch = require("node-fetch");
const request = require("request-promise");
const ytch = require('yt-channel-info')
const config = require('./config.json')
const fs = require('fs');

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
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

  const msg = message.content.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  
  if (msg.includes('free discord nitro') ||
      msg.includes('free nitro') || 
      msg.includes('discord nitro for free') || 
      msg.includes('httpsdiscodegift') || 
      msg.includes('httpdiscode') || 
      msg.includes('free gift') ||
      msg.includes('httpsdiscode') ||
      msg.includes('nitro') ||
      msg.includes('who is first')
      ) {
    const embed = new Discord.MessageEmbed();
                    embed.setColor('#0099ff');
                    embed.setTitle('Spam Message Detected!');
                    embed.setDescription('The previous message was deleted as it was detected as spam. If you think there was a mistake please contact a florist.');
                    message.channel.send(embed);
                    message.delete();

  }

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
    
    
    }else if (command === "selfcare") {
      message.channel.send(selfcare[getRandomInt(selfcare.length)])

    } else if(command === "help") {
      client.commands.get('help').execute(message, args);

    } else if (command === "subs" || command === "subscribers") {
      const channelId = 'UCz9F9eEkt2KcLXZt--M6vjA'
      ytch.getChannelInfo(channelId, 1).then((response) => {
        let subCount = response['subscriberText'];
        message.channel.send(`Breanna currently has ${subCount} on YouTube!`)
      })

    } else if (command === 'ping') {
      client.commands.get('ping').execute(message, args);
    } 
    else if (command === 'trivia') {
      client.commands.get('trivia').execute(message, args);
    }
    else if (command === 'todo') {
      client.commands.get('todo').execute(message, args);
    }
    else if (command === 'anime') {
      client.commands.get('anime').execute(message, args);
    }
    else if (command === 'finances') {
      // send a message to channel that says "Enter the amount you want to split in $" and then store their response in a variable called money
      message.channel.send("Enter the amount you want to split in $")
      const filter = m => m.author.id === message.author.id;
      message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
        let money = collected.first().content;
        // The money needs to be split into 80/10/5/5
        // savings, investements, chequings, goals
        // Send an embeded message that says "Your savings, investements, chequings, goals are: "
        const embed = new Discord.MessageEmbed();
        embed.setColor('#0099ff');
        embed.setTitle('Your Finances');
        embed.setDescription(`Your savings, investements, chequings, goals are:`);
        embed.addField('Savings', `${money*0.8}`);
        embed.addField('Investements', `${money*0.1}`);
        embed.addField('Chequings', `${money*0.05}`);
        embed.addField('Goals', `${money*0.05}`);
        message.channel.send(embed);
        
    }
    )
  }


});

// login to discord bot
client.login(config.token);

