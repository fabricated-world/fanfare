const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');

module.exports = {
    init(client) {
        // Initialisation si nécessaire
    },
    data: new SlashCommandBuilder()
        .setName('rename_chanelle')
        .setDescription("renome un salon"),

    async execute(interaction) {
        
    }
};