const { SlashCommandBuilder } = require('discord.js');
const { getKeyLocalizations, getLocalization } = require('../../../localizations/localizations');

module.exports = {
    init(client) {
        // Initialisation si nécessaire
    },
    data: new SlashCommandBuilder()
        .setName('template_list')
        .setDescription("lister les template")
        
        .setNameLocalizations(getKeyLocalizations('commands:template_liste.name'))
        .setDescriptionLocalizations(getKeyLocalizations('commands:template_liste.description')),

    async execute(interaction) {
        const template_list = await interaction.client.db.get_template();

        let returned_text = getLocalization("commands:template_liste.output.header", interaction.locale);


        template_list.forEach(element => {
            returned_text += '- ' + element["template"] + "\n";
        });

        return await interaction.reply(returned_text);
    }
};

//Trad