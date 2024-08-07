const { SlashCommandBuilder, Events } = require('discord.js');

const { getKeyLocalizations, getLocalization } = require('../../../localizations/localizations');

module.exports = {
    name: Events.InteractionCreate,
    init(client) {
        
    },
    data: new SlashCommandBuilder()
        .setName('slack_add')
        .setDescription("ajouter une entree")

        .setNameLocalizations(getKeyLocalizations('commands:slack_add.name'))
        .setDescriptionLocalizations(getKeyLocalizations('commands:slack_add.description'))

        .addStringOption(option => option.setName('salont').setDescription("salont a ajouter")
        .setDescriptionLocalizations(getKeyLocalizations('commands:slack_add.arg1_description'))
        .setNameLocalizations(getKeyLocalizations('commands:slack_add.arg1'))
        .setRequired(true)),

    async execute(interaction) {
        const channel_name = interaction.options.getString('salont');

        const id_channel = interaction.guild.channels.cache.find(ch => ch.name === channel_name);

        if (id_channel !== undefined) {
            if (await interaction.client.db.is_entree(channel_name)){
                return await interaction.reply(getLocalization("commands:slack_add.output.ok", interaction.locale).replace("%chanel%", channel_name));
            }
    
            interaction.client.db.add_entree(id_channel, channel_name);
            return await interaction.reply(getLocalization("commands:slack_add.output.alredy_existe", interaction.locale).replace("%chanel%", channel_name));
        } 
        else {
            return await interaction.reply(getLocalization("commands:slack_add.output.not_existe", interaction.locale).replace("%chanel%", channel_name));
        }
    }
};

//Trad