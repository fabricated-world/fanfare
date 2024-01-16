const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    init(client) {
        // Initialisation si nécessaire
    },
    data: new SlashCommandBuilder()
        .setName('slack_list')
        .setDescription("lister les entree"),


    async execute(interaction) {
        const liste_slack = await interaction.client.db.list_entree();

        let returned_text = "la liste des salon d'entree est : \n";

        liste_slack.forEach(element => {
            returned_text += '- ' + element["count"] + "\n";
          });

        return await interaction.reply(returned_text);
    }
};