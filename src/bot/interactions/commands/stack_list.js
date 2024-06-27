const { SlashCommandBuilder } = require('discord.js');
const { getKeyLocalizations, getLocalization } = require('../../../localizations/localizations');

module.exports = {
    init(client) {
        // Initialisation si nécessaire
    },
    data: new SlashCommandBuilder()
        .setName('slack_list')
        .setDescription("lister les entree")

        .setNameLocalizations(getKeyLocalizations('commands:slack_list.name'))
        .setDescriptionLocalizations(getKeyLocalizations('commands:slack_list.description')),

    async execute(interaction) {
        const liste_slack = await interaction.client.db.list_entree();

        let returned_text = getLocalization("commands:slack_list.output.hedear", interaction.locale);

        liste_slack.forEach(element => {
            returned_text += '- ' + element["count"] + "\n";
          });

        return await interaction.reply(returned_text);
    }
};

//Trad