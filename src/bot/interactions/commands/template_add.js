const { SlashCommandBuilder } = require('discord.js');
const { getKeyLocalizations, getLocalization } = require('../../../localizations/localizations');

module.exports = {
    init(client) {
        // Initialisation si nécessaire
    },
    data: new SlashCommandBuilder()
        .setName('template_add')
        .setDescription("ajouter un template")

        .setNameLocalizations(getKeyLocalizations('commands:template_add.name'))
        .setDescriptionLocalizations(getKeyLocalizations('commands:template_add.description'))

        .addStringOption(option => option.setName('template').setDescription('template')
        .setDescriptionLocalizations(getKeyLocalizations('commands:template_add.arg1_description'))
        .setNameLocalizations(getKeyLocalizations('commands:template_add.arg1'))
        .setRequired(true)),

    async execute(interaction) {
        const new_template = interaction.options.getString('template');

        if (await interaction.client.db.is_template(new_template)){
            return await interaction.reply(`le template ${new_template} existe deja.`);
        }

        await interaction.client.db.add_template(new_template);
        
        return await interaction.reply(`le template "${new_template}" a etais ajouter.`); 
    }
};