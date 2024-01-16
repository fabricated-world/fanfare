const { SlashCommandBuilder } = require('discord.js');

const { getKeyLocalizations, getLocalization} = require('../../../localizations/localizations');

module.exports = {
    init (client) {

    },
    data: new SlashCommandBuilder()
        .setName('helloworld')
        .setDescription("I just want to say HELLO")
        .setNameLocalizations(getKeyLocalizations('commands:helloworld.name'))
        .setDescriptionLocalizations(getKeyLocalizations('commands:helloworld.description')),

    async execute(interaction) {
        return await interaction.reply(getLocalization('commands:helloworld.content', interaction.locale));
    }
}
