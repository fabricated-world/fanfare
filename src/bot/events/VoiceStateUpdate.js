const { Events, MessageEmbed } = require('discord.js');
const { getLocalization } = require('../../localizations/localizations.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState,newState) {
        try {
            const member = newState.member;  // Membre Discord associé à l'état vocal

            const oldChannel = oldState.channel;  // Canal vocal précédent
            const newChannel = newState.channel;  // Nouveau canal vocal

            const channel = newState.guild.channels.cache.get('1180608131760406609');
        
            if (!oldChannel && newChannel) {
                // L'utilisateur est arrivé dans un canal vocal
                channel.send(`${member.user.tag} est arrivé dans ${newChannel.name}`);
            } else if (oldChannel && !newChannel) {
                // L'utilisateur est parti d'un canal vocal
                channel.send(`${member.user.tag} est parti de ${oldChannel.name}`);
            } else if (oldChannel && newChannel && oldChannel.id !== newChannel.id) {
                // L'utilisateur a changé de canal vocal
                channel.send(`${member.user.tag} a changé de ${oldChannel.name} à ${newChannel.name}`);
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
