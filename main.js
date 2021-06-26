const Discord = require('discord.js');
const fetch = require("node-fetch");
const request = require("request-promise");
const axios = require("axios")
const ytch = require('yt-channel-info')

const client = new Discord.Client();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const prefix = '!'
const reminders = ["your value is not based on your productivity 🤍",
"stop shrinking to fit places you've outgrown 💛",
"make yourself a priority! ❤️",
"do it for you 🌷",
"be cautious of where you spend your energy 💫",
"you are more than enough. 🦋",
"it's okay to ask for help",
"change is good 🦋",
"how you love yourself is how you teach others to love you 💕",
"selfcare is productive. 💛", 
"you deserve a break 📴",
"don't rush the process. good things take time. 🌱",
"the way you speak to yourself matters",
"i'm so proud of you. i just wanted to tell you incase no one has today.",
"work smarter, not harder "]

const selfcare = ["everyone grows at difference paces 🌱",
"your direction matters more than your speed.",
"it's okay to not be okay",
"it's going to be okay",
"let's take a screen time break 📴",
"you are the greatest project you will ever work on. 💕",
"don't be so hard on yourself, you're doing what you can 🦋",
"selfcare isn't selfish",
"have you gone outside today? let's take a stroll 💛",
"did you drink water today? 🌷",
"you deserve a break",
"inhale for 4 seconds, exhale for 4 seconds. repeat x2"
]
client.once('ready', () => {
  console.log("Busy Bee is online!")
});

client.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase()

  if(command === 'youtube') {
    message.channel.send('https://www.youtube.com/channel/UCz9F9eEkt2KcLXZt--M6vjA')

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
      //message.channel.send(":", '\n', "!reminder: ", '\n', "!motivation: for when you need some motivation",'\n', "!selfcare: de-stressing, self-care tips, and quotes", '\n', '-help: for list of all the groovy commands (music bot)')
      message.channel.send({embed: {
        color: 3447003,
        title: "Garden Commands 🌱",
        fields: [
          { name: "Command", value: "!reminder\n!motivation\n!selfcare\n!subs\n-help", inline: true},
          { name: "Use", value: "helpful reminders for your mental and physical health\nfor when you need some motivation\nde-stressing, self-care tips, and quotes\nHow many subscribers Breanna currently has \nlist of all the groovy commands (music bot)", inline: true}
        ]
      }
    });
    } else if (command === "subs" || command === "subscribers") {
      const channelId = 'UCz9F9eEkt2KcLXZt--M6vjA'
      ytch.getChannelInfo(channelId, 1).then((response) => {
        console.log(response['subscriberText'])
        let subCount = response['subscriberText'];
        console.log(typeof subCount)
        message.channel.send(`Breanna currently has ${subCount} on YouTube!`)
      })
    }

});

// login to discord bot
client.login('ODU3ODIwOTA4MDcxOTQ0MTkz.YNVJ-g.YCWxkv7bt61XxeMTTt7z5l85YJk');

