const fetch = require("node-fetch");
const Discord = require('discord.js');

//let user type !anime then enter their query and list the resutls as an embed
module.exports = {
    name: 'anime',
    description: 'Search for an anime',
    execute(message, args) {
        if (args.length === 0) {
            message.channel.send('Please enter a search term');
            return;
        }
        message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] })
        let query = args.join(' ');
        let url = `https://kitsu.io/api/edge/anime?filter[text]=${query}`;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json.data.length === 0) {
                    message.channel.send('No results found');
                    return;
                }
                let embed = new Discord.RichEmbed()
                    .setTitle(json.data[0].attributes.canonicalTitle)
                    .setURL(json.data[0].links.self)
                    .setDescription(json.data[0].attributes.synopsis)
                    .setThumbnail(json.data[0].attributes.posterImage.small)
                    .addField('Rating', json.data[0].attributes.averageRating)
                    .addField('Status', json.data[0].attributes.status)
                    .addField('Start Date', json.data[0].attributes.startDate)
                    .addField('End Date', json.data[0].attributes.endDate)
                    .addField('Episodes', json.data[0].attributes.episodeCount)
                    .addField('Popularity', json.data[0].attributes.popularityRank)
                    .setColor(0x00AE86);
                message.channel.send(embed);
            })
            .catch(err => {
                console.log(err);
                message.channel.send('An error occured');
            });
    }
}



