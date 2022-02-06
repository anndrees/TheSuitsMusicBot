require('array.prototype.move');
const { canModifyQueue } = require("../util/nkm");

module.exports = {
  name: "move",
  aliases: ["mv"],
  description: "Mueve la posicion de la cancion en la lista.",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("No hay lista.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Modo de uso: ${message.client.prefix}move <NumeroDeLista>`);
    if (isNaN(args[0])) return message.reply(`Usage: ${message.client.prefix}move <NumeroDeLista>`);

    let songMoved = queue.songs[args[0] - 1];

    queue.songs.move(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} 🚚 movio **${songMoved.title}**.`);
  }
};