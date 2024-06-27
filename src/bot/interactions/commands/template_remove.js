const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { getKeyLocalizations, getLocalization } = require('../../../localizations/localizations');

module.exports = {
    init(client) {
        // Initialisation si nécessaire
    },
    data: new SlashCommandBuilder()
        .setName('template_remove')
        .setDescription("suprimer un template")

        .setNameLocalizations(getKeyLocalizations('commands:template_remove.name'))
        .setDescriptionLocalizations(getKeyLocalizations('commands:template_remove.description'))

        .addStringOption(option => option.setName('template').setDescription('text du template a suprimer')
        .setDescriptionLocalizations(getKeyLocalizations('commands:template_remove.arg1_description'))
        .setNameLocalizations(getKeyLocalizations('commands:template_remove.arg1'))
        .setRequired(true)),

    async execute(interaction) {
        const name_template = interaction.options.getString('template');

        if (!interaction.client.db.is_template(name_template)){
            return await interaction.reply(getKeyLocalizations("commands:template_remove.output.not_existe", interaction.locale));
        }

        interaction.client.db.rm_template(name_template);

        return await interaction.reply(getKeyLocalizations("commands:template_remove.output.ok", interaction.locale));
    }
};