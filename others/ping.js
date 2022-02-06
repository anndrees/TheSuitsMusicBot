const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);

module.exports = {
  name: `ping`,
  description: `Muestra la latencia del bot`,
  aliases: ["latency"],
  cooldown: 2,
  edesc: "Escribe esto para ver como de rapido responde el bot a tus mensajes / comandos!",
  execute(message, args, client) {
    //react with approve emoji
    message.react("✅");
    //send the Ping embed
    message.reply(new MessageEmbed().setColor("#F0EAD6").setTitle("Pong! \n:ping_pong: `" + client.ws.ping + "ms`"));
  }
}