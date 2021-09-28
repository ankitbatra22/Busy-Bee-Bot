const fetch = require("node-fetch");
const Discord = require('discord.js');


module.exports = {
    name: 'trivia',
    description: 'Sends a trivia question in the channel',
    execute(message, args) {
        // fetch the trivia question from the api
        fetch('https://opentdb.com/api.php?amount=1&type=multiple')
            .then(res => res.json())
              .then(json => {
                // create the embed message
                  const embed = new Discord.MessageEmbed()
                      .setColor('#0099ff')
                      .setTitle(json.results[0].question)
                      .setDescription("Write your answer as a message!")
                      .addField('Answer 1', json.results[0].correct_answer)
                      .addField('Answer 2', json.results[0].incorrect_answers[0])
                      .addField('Answer 3', json.results[0].incorrect_answers[1])
                      .addField('Answer 4', json.results[0].incorrect_answers[2])
                      .setFooter('Trivia question sent by ' + message.author.username, message.author.avatarURL());
                  // send the embed message
                  message.channel.send(embed);
                  // let user react with their guess and collect the reaction
                  message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] })
                      .then(collected => {
                          // check if the user guessed correctly
                          if (collected.first().content === json.results[0].correct_answer) {
                              // send the correct answer embed
                              message.channel.send(new Discord.MessageEmbed()
                                  .setColor('#0099ff')
                                  .setTitle('Correct!')
                                  .setDescription(json.results[0].correct_answer)
                                  .setFooter('Trivia question sent by ' + message.author.username, message.author.avatarURL()));
                          } else {
                              // send the incorrect answer embed
                              message.channel.send(new Discord.MessageEmbed()
                                  .setColor('#0099ff')
                                  .setTitle('Incorrect!')
                                  .setDescription(json.results[0].correct_answer)
                                  .setFooter('Trivia question sent by ' + message.author.username, message.author.avatarURL()));
                          }
                      })
                      .catch(collected => {
                          // send the time up embed
                          message.channel.send(new Discord.MessageEmbed()
                              .setColor('#0099ff')
                              .setTitle('Time is up!')
                              .setDescription(json.results[0].correct_answer)
                              .setFooter('Trivia question sent by ' + message.author.username, message.author.avatarURL()));
                      });
              
              });
    }
};


