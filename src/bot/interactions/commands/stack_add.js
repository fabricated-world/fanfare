const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');

module.exports = {
    init(client) {
        // Initialisation si nécessaire
    },
    data: new SlashCommandBuilder()
        .setName('slack_add')
        .setDescription("ajouter une entree")
        .addStringOption(option => option.setName('salont').setDescription('nom du salont').setRequired(true)),

    async execute(interaction) {
        const nom = interaction.options.getString('nom');
        const id = interaction.guild.channels.cache.find(ch => ch.name === nom);

        interaction.client.db.add_entree(0, nom);

        return await interaction.reply("ok");
    }
};