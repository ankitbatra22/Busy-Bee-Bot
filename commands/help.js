module.exports = {
  name: 'help',
  description: 'gives all commands',
  execute(message, args) {
    message.channel.send({embed: {
      color: 3447003,
      title: "Garden Commands 🌱",
      fields: [
        { name: "Command", value: "!reminder\n!motivation\n!selfcare\n!subs\n-help", inline: true},
        { name: "Use", value: "helpful reminders for your mental and physical health\nfor when you need some motivation\nde-stressing, self-care tips, and quotes\nHow many subscribers Breanna currently has \nlist of all the groovy commands (music bot)", inline: true}
      ]
    }
  });
  }

}