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
                  //randomize order of questions in embed message
                  let answers = [json.results[0].correct_answer, ...json.results[0].incorrect_answers];
                  let randomAnswers = answers.sort(() => Math.random() - 0.5);
                  let question = json.results[0].question.replace(/&quot;/g, '"');
                  //let question = json.results[0].question;
                  let embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(question)
                    .setDescription(randomAnswers.join('\n'))
                    .addField('Type your answer!', '\u200b')
                    .setFooter('Trivia question sent by ' + message.author.username, message.author.avatarURL());

                  message.channel.send(embed);
                  /*
                  const embed = new Discord.MessageEmbed()
                      .setColor('#0099ff')
                      .setTitle(json.results[0].question)
                      .setDescription("Write your answer as a message!")
                      .addField('Answer 1', json.results[0].correct_answer)
                      .addField('Answer 2', json.results[0].incorrect_answers[0])
                      .addField('Answer 3', json.results[0].incorrect_answers[1])
                      .addField('Answer 4', json.results[0].incorrect_answers[2])
                      
                  // send the embed message
                  message.channel.send(embed);
                  */
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


