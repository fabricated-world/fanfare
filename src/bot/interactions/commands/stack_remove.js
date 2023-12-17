const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');

module.exports = {
    init(client) {
        // Initialisation si nécessaire
    },
    data: new SlashCommandBuilder()
        .setName('slack_remove')
        .setDescription("retirer une entree")
        .addStringOption(option => option.setName('salont').setDescription('nom du salont').setRequired(true)),

    async execute(interaction) {
        const nom = interaction.options.getString('salont');

        if (!interaction.client.db.is_entree(nom)){
            return await interaction.reply(`le salont ${nom} n'est pas dans la liste.`);
        }

        interaction.client.db.rm_entree(nom);

        return await interaction.reply(`le salont ${nom} a etais retirer a la liste des point d'entree`);
    }
};