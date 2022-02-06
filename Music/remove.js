////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { approveemoji,  denyemoji,  PREFIX,} = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "remove",
  description: "Elimina una cancion de la lista",
  aliases: ["delete"],
  cooldown: 1.5,
  edesc: `Escribe este comando para eliminar una cancion especifica de la lista.\nModo de uso: ${PREFIX}remove <NumeroEnLista.>`,

execute(message, args) {
  //if its not a guild return
    if(!message.guild) return;
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if there is no queue return error
    if (!queue) return attentionembed(message,"No hay lista");
    //if he isnt in the same voice channel as the bot
    if (!canModifyQueue(message.member)) return;
    //if no args then return error
    if (!args.length) return attentionembed(message,`Prueba: ${message.client.prefix}remove <NumeroEnLista>`);
    //If not a number then return error
    if (isNaN(args[0])) return attentionembed(message,`Prueba: ${message.client.prefix}remove <NumeroEnLista>`);
    //get the song
    const song = queue.songs.splice(args[0] - 1, 1);
    //react with approve
    message.react(approveemoji)
    //send approve
    queue.textChannel.send(new MessageEmbed()
    .setDescription(`:no_entry_sign: | ${message.author} elimino **${song[0].title}** de la lista`)
    .setColor("#F0EAD6")
    );
  }
};
