module.exports = {
  name: 'reminder',
  description: 'gives a self reminder',
  execute(message, args) {
    message.channel.send(reminders[getRandomInt(reminders.length)])
  }

}