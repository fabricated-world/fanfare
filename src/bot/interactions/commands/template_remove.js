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
        const nom = interaction.options.getString('template');

        if (!interaction.client.db.is_template(nom)){
            return await interaction.reply(`le template ${nom} nexiste pas.`);
        }

        interaction.client.db.rm_template(nom);

        return await interaction.reply(`le template ${nom} a etais retirer a la liste.`);
    }
};