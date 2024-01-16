const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');

module.exports = {
    init(client) {
        // Initialisation si nécessaire
    },
    data: new SlashCommandBuilder()
        .setName('template_remove')
        .setDescription("suprimer un template")
        .addStringOption(option => option.setName('template').setDescription('text du template a suprimer').setRequired(true)),

    async execute(interaction) {
        const name_template = interaction.options.getString('template');

        if (!interaction.client.db.is_template(name_template)){
            return await interaction.reply(`le template ${name_template} nexiste pas.`);
        }

        interaction.client.db.rm_template(name_template);

        return await interaction.reply(`le template ${name_template} a etais retirer a la liste.`);
    }
};