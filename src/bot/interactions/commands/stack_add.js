const { SlashCommandBuilder } = require('discord.js');

const { getKeyLocalizations, getLocalization} = require('../../../localizations/localizations');

module.exports = {
    init(client) {
        // Initialisation si nécessaire
    },
    data: new SlashCommandBuilder()
        .setName('slack_add')
        .setDescription("ajouter une entree")

        .setNameLocalization(getKeyLocalizations('commands:slack_add.name'))
        .setDescriptionLocalizations(getKeyLocalizations('commands:slack_add.description'))

        .addStringOption(option => option.setName('salont')
        .setDescription('nom du salont')
        .setRequired(true)),

    async execute(interaction) {
        const channel_name = interaction.options.getString('salont');

        const id_channel = interaction.guild.channels.cache.find(ch => ch.name === channel_name);

        if (await interaction.client.db.is_entree(channel_name)){
            return await interaction.reply(`le salont ${channel_name} est deja dans la liste.`);
        }

        interaction.client.db.add_entree(id_channel, channel_name);
        return await interaction.reply(`le salont ${channel_name} a etais ajouter a la liste des point d'entree`);
    }
};