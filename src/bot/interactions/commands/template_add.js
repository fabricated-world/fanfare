const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');

module.exports = {
    init(client) {
        // Initialisation si nécessaire
    },
    data: new SlashCommandBuilder()
        .setName('template_add')
        .setDescription("ajouter un template")
        .addStringOption(option => option.setName('template').setDescription('template').setRequired(true)),

    async execute(interaction) {
        const string = interaction.options.getString('template');

        if (await interaction.client.db.is_template(string)){
            return await interaction.reply(`le template ${string} existe deja.`);
        }

        await interaction.client.db.add_template(string);
        
        return await interaction.reply(`le template "${string}" a etais ajouter.`); 
    }
};