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
        const nom = interaction.options.getString('salont');

        const id = interaction.guild.channels.cache.find(ch => ch.name === nom);

        if (await interaction.client.db.is_entree(nom)){
            return await interaction.reply(`le salont ${nom} est deja dans la liste.`);
        }

        interaction.client.db.add_entree(id, nom);
        return await interaction.reply(`le salont ${nom} a etais ajouter a la liste des point d'entree`);
    }
};