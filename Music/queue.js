////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");
const { Client, Collection } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const {
  approveemoji,
  denyemoji,
  PREFIX,
} = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "queue",
  aliases: ["q"],
  description: "Muestra la lista y la cancion actual.",
  cooldown: 7.5,
  edesc: `Escribe este comando para ver la lista.\nModo de uso: ${PREFIX}queue`,
  execute(message) {
    //if not in a guild return
    if(!message.guild) return;
    //get serverqueue
    const queue = message.client.queue.get(message.guild.id);
    //if no queue aka nothing playing error
    if (!queue) return attentionembed(message, "No hay nada sonando.").catch(console.error);
    //set description
    console.log(queue.songs);
    let description = "";
    for(let i = 1; i < queue.songs.length; i++){
      description += `**${i}.** [${queue.songs[i].title.substring(1,40)}](${queue.songs[i].url}) | \`${queue.songs[i].duration}\`\n`
    }
    //define queueembed
    let queueEmbed = new MessageEmbed()
      .setTitle("Lista de Reproduccion")
      .setDescription(description)
      .setColor("#F0EAD6");
    //split the description
    const splitDescription = splitMessage(description, {
      maxLength: 2048,
      char: "\n",
      prepend: "",
      append: ""
    });
    //For every description send a new embed
    splitDescription.forEach(async (m) => {
      //(over)write embed description
      queueEmbed.setDescription(m);
      //react with emoji
      message.react(approveemoji)
      //send embed
      message.channel.send(queueEmbed);
    });
  }
};
