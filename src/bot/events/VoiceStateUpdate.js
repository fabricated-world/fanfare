const { Events, MessageEmbed, ChannelType, PermissionsBitField } = require('discord.js');
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
                leave = oldChannel.id;
            } else if (oldChannel && newChannel && oldChannel.id !== newChannel.id) {
                join = newChannel.name;
                leave = oldChannel.id;
            }

            if (join !== ""){
                if (await newState.client.db.is_entree(join)){
                    let name_salon = await newState.client.db.get_randome_template();

                    name_salon = name_salon.replace("%username%", member.user.username);

                    const chan = await newState.guild.channels.create({name: name_salon,type: ChannelType.GuildVoice,});
                    await member.voice.setChannel(chan);

                    await chan.permissionOverwrites.edit(member.id, {ManageChannels : true, MoveMembers : true, ManageChannels : true});

                    await newState.client.db.new_voice(chan.id,member.user.username,member.user.id);
                }
            }

            if (leave != ""){
                if (await newState.client.db.is_creat_voice(leave)){

                    let chan_get = await newState.client.db.get_creat_voice(leave);

                    if (member.user.id == chan_get.owner){
                        await newState.client.db.rm_creat_voice(chan_get.id);
                        await newState.guild.channels.delete(chan_get.id);
                    }
                }
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
