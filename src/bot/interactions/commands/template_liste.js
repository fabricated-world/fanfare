const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');

module.exports = {
    init(client) {
        // Initialisation si nécessaire
    },
    data: new SlashCommandBuilder()
        .setName('template_list')
        .setDescription("lister les template"),


    async execute(interaction) {
        const list = await interaction.client.db.get_template();

        let returned_text = "liste des template: \n";


        list.forEach(element => {
            returned_text += '- ' + element["template"] + "\n";
        });

        return await interaction.reply(returned_text);
    }
};