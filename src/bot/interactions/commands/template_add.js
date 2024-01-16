const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    init(client) {
        // Initialisation si nécessaire
    },
    data: new SlashCommandBuilder()
        .setName('template_add')
        .setDescription("ajouter un template")
        .addStringOption(option => option.setName('template').setDescription('template').setRequired(true)),

    async execute(interaction) {
        const new_template = interaction.options.getString('template');

        if (await interaction.client.db.is_template(new_template)){
            return await interaction.reply(`le template ${new_template} existe deja.`);
        }

        await interaction.client.db.add_template(new_template);
        
        return await interaction.reply(`le template "${new_template}" a etais ajouter.`); 
    }
};