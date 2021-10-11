const fetch = require("node-fetch");
const Discord = require('discord.js');


module.exports = {
    name: 'trivia',
    description: 'Sends a trivia question in the channel',
    execute(message, args) {
        //message.channel.send("Please pick a difficulty: easy, medium, or hard");
        const filter = m => m.author.id === message.author.id;
        let embed = new Discord.MessageEmbed()
            .setTitle("Trivia!")
            .setColor("#0099ff")
            .setDescription("Please pick a difficulty: easy, medium, or hard");
        message.channel.send(embed);
                
        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                // Get the difficulty
                const difficulty = collected.first().content.toLowerCase();
                // Send the question
                fetch('https://opentdb.com/api.php?amount=1&difficulty=' + difficulty + '&type=multiple')
                    .then(res => res.json())
                    .then(json => {
                        let answers = [json.results[0].correct_answer, ...json.results[0].incorrect_answers].map(answer => answer.replace(/&quot;/g, '').replace(/&#039;/g, ''));
                  //let answers = [json.results[0].correct_answer, ...json.results[0].incorrect_answers];
                        let randomAnswers = answers.sort(() => Math.random() - 0.5);
                        let question = json.results[0].question.replace(/&#039;/g, "'").replace(/&quot;/g, '"');
                        let embed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(question)
                            .setDescription(randomAnswers.join('\n'))
                            .addField('Type your answer!', '\u200b')
                            .setFooter('Trivia question sent by ' + message.author.username, message.author.avatarURL());
                        
                        message.channel.send(embed);

                        message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] })
                            .then(collected => {
                                // check if the user guessed correctly
                                if (collected.first().content.toLowerCase() === json.results[0].correct_answer.toLowerCase()) {
                                    message.channel.send(new Discord.MessageEmbed()
                                        .setColor('#0099ff')
                                        .setTitle('Correct!')
                                        .setDescription(json.results[0].correct_answer)
                                        .setFooter('Trivia question sent by ' + message.author.username, message.author.avatarURL()));
                                } else {
                                    message.channel.send(new Discord.MessageEmbed()
                                        .setColor('#0099ff')
                                        .setTitle('Incorrect!')
                                        .setDescription(json.results[0].correct_answer)
                                        .setFooter('Trivia question sent by ' + message.author.username, message.author.avatarURL()));
                                }
                            })
                            .catch(collected => {
                                message.channel.send(new Discord.MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle('Time is up!')
                                    .setDescription(json.results[0].correct_answer)
                                    .setFooter('Trivia question sent by ' + message.author.username, message.author.avatarURL()));
                            });
                    });
            })
        
    }
}

                                    





