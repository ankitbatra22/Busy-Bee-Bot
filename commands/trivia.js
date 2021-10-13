const fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports = {
    name: 'trivia',
    description: 'Ask a question and get a response from the Trivia API.',
    execute(message, args) {
        const embed = new Discord.MessageEmbed();
        embed.setColor('#0099ff');
        embed.setTitle('Trivia');
        embed.setDescription('Pick a Category!');
        embed.addField('Categories', '`general`, `books`, `film`, `music`, `tv`, `video_games`, `board_games`, `science`, `computers`, `mathematics`, `mythology`, `sports`, `geography`, `history`, `politics`, `art`, `celebrities`, `animals`, `vehicles`, `comics`, `gadgets`, `anime`, `cartoon`, `geek`, `random`');
        //embed.addField('Difficulties', '`easy`, `medium`, `hard`');
        message.channel.send(embed);

        const filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
            .then(collected => {
                const category = collected.first().content.toLowerCase();
                if (category === 'general' || category === 'books' || category === 'film' || category === 'music' || category === 'tv' || category === 'video_games' || category === 'board_games' || category === 'science' || category === 'computers' || category === 'mathematics' || category === 'mythology' || category === 'sports' || category === 'geography' || category === 'history' || category === 'politics' || category === 'art' || category === 'celebrities' || category === 'animals' || category === 'vehicles' || category === 'comics' || category === 'gadgets' || category === 'anime' || category === 'cartoon' || category === 'geek' || category === 'random') {
                    const embed = new Discord.MessageEmbed();
                    embed.setColor('#0099ff');
                    embed.setTitle('Busy Bee Trivia');
                    embed.setDescription('Enter the difficulty to get a question from the Trivia API.');
                    embed.addField('Difficulties', '`easy`, `medium`, `hard`');
                    message.channel.send(embed);
                
                    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                        .then(collected => {
                            const difficulty = collected.first().content.toLowerCase();
                            console.log(difficulty);
                            if (difficulty == 'easy' || difficulty == 'medium' || difficulty == 'hard') {

                                //console.log('HERE')
                                arr = ['general', 'books', 'film', 'music', 'theatre', 'tv', 'video_games', 'board_games', 'science', 'computers', 'mathematics', 'mythology', 'sports', 'geography', 'history', 'politics', 'art', 'celebrities', 'animals', 'vehicles', 'comics', 'gadgets', 'anime', 'cartoon', 'geek', 'random'];
                                cat = arr.indexOf(category)+9;

                                fetch('https://opentdb.com/api.php?amount=1&category=' + cat + '&difficulty=' + difficulty + '&type=multiple')
                                    .then(res => res.json())
                                    .then(json => {
                                        let answers = [json.results[0].correct_answer, ...json.results[0].incorrect_answers].map(answer => answer.replace(/&quot;/g, '').replace(/&#039;/g, ''));
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
                                                const embed = new Discord.MessageEmbed();
                                                embed.setColor('#0099ff');
                                                embed.setTitle('Trivia');
                                                embed.setDescription('Incorrect!');
                                                embed.addField('Answer', json.results[0].correct_answer);

                                                message.channel.send(embed);
                                            });
                                    });
                            } else {
                                console.log("invalid diff")
                                const embed = new Discord.MessageEmbed();
                                embed.setColor('#0099ff');
                                embed.setTitle('Trivia');
                                embed.setDescription('Invalid difficulty.');
                                embed.addField('Difficulties', '`easy`, `medium`, `hard`');
                                message.channel.send(embed);
                            }
                        })
                        .catch(collected => {
                            const embed = new Discord.MessageEmbed();
                            embed.setColor('#0099ff');
                            embed.setTitle('Trivia');
                            embed.setDescription('Invalid difficulty.');
                            embed.addField('Difficulties', '`easy`, `medium`, `hard`');
                            message.channel.send(embed);
                        });
                } else {
                    const embed = new Discord.MessageEmbed();
                    embed.setColor('#0099ff');
                    embed.setTitle('Trivia');
                    embed.setDescription('Invalid category.');
                    embed.addField('Categories', '`general`, `books`, `film`, `music`, `tv`, `video_games`, `board_games`, `science`, `computers`, `mathematics`, `mythology`, `sports`, `geography`, `history`, `politics`, `art`, `celebrities`, `animals`, `vehicles`, `comics`, `gadgets`, `anime`, `cartoon`, `geek`, `random`');
                    message.channel.send(embed);
                }
            })
            .catch(collected => {
                const embed = new Discord.MessageEmbed();
                embed.setColor('#0099ff');
                embed.setTitle('Trivia');
                embed.setDescription('Invalid category.');
                embed.addField('Categories', '`general`, `books`, `film`, `music`, `tv`, `video_games`, `board_games`, `science`, `computers`, `mathematics`, `mythology`, `sports`, `geography`, `history`, `politics`, `art`, `celebrities`, `animals`, `vehicles`, `comics`, `gadgets`, `anime`, `cartoon`, `geek`, `random`');
                message.channel.send(embed);
            });
    }
}
