const { SlashCommandBuilder } = require('discord.js');
const { getKeyLocalizations, getLocalization } = require('../../../localizations/localizations');

module.exports = {
    init(client) {
        // Initialisation si nécessaire
    },
    data: new SlashCommandBuilder()
        .setName('slack_remove')
        .setDescription("retirer une entree")

        .setNameLocalizations(getKeyLocalizations('commands:stack_remove.name'))
        .setDescriptionLocalizations(getKeyLocalizations('commands:stack_remove.description'))

        .addStringOption(option => option.setName('salont').setDescription('nom du salont')
        .setDescriptionLocalizations(getKeyLocalizations('commands:slack_remove.arg1_description'))
        .setNameLocalizations(getKeyLocalizations('commands:slack_remove.arg1'))
        .setRequired(true)),

    async execute(interaction) {
        const channel_name = interaction.options.getString('salont');

        if (!interaction.client.db.is_entree(channel_name)){
            return await interaction.reply(getLocalization("commands:stack_remove.output.already_existe", interaction.locale).replace("%chanel%", channel_name));
        }

        interaction.client.db.rm_entree(channel_name);

        return await interaction.reply(getLocalization("commands:stack_remove.output.ok", interaction.locale).replace("%chanel%", channel_name));
    }
};

//Trad