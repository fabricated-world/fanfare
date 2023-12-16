const { Events, MessageEmbed } = require('discord.js');
const { getLocalization } = require('../../localizations/localizations.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState,newState) {
        try {
            const member = newState.member;  // Membre Discord associé à l'état vocal

            const oldChannel = oldState.channel;  // Canal vocal précédent
            const newChannel = newState.channel;  // Nouveau canal vocal
        
            let join = "";
            let leave = "";

            if (!oldChannel && newChannel) {
                join = newChannel.name;
            } else if (oldChannel && !newChannel) {
                leave = oldChannel.name
            } else if (oldChannel && newChannel && oldChannel.id !== newChannel.id) {
                join = newChannel.name;
                leave = oldChannel.name;
            }

            if (join !== ""){
                if (newState.client.db.is_entree(join)){
                    console.log("i hop an chanelle will be make")
                }
            }

            if (leave !== ""){
                console.log("un salont a etais quiter")
            }

        } catch (error) {
            console.log('Une erreur s\'est produite :', error);

            if (error.code === 50013) {
                // Créez le message d'erreur
                const responseEmbed = new MessageEmbed()
                    .setColor(process.env.ACCENT_COLOR)
                    .setDescription(getLocalization("common:errors.missingPermission", interaction.locale));

                // Envoyez le message d'erreur
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ embeds: [responseEmbed], ephemeral: true });
                } else {
                    await interaction.reply({ embeds: [responseEmbed], ephemeral: true });
                }
            } else {
                // Créez le message d'erreur
                const responseEmbed = new MessageEmbed()
                    .setColor(process.env.ACCENT_COLOR)
                    .setDescription(getLocalization("common:errors.unknown", interaction.locale));

                // Envoyez le message d'erreur
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ embeds: [responseEmbed], ephemeral: true });
                } else {
                    await interaction.reply({ embeds: [responseEmbed], ephemeral: true });
                }
                console.error(error);
            }
        }
    }
}
