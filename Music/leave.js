module.exports = { 
    name: "leave", 
    description: "Expulsa al bot del canal de voz actual", 
    execute(message) {
         const { channel } = message.member.voice; 
         const serverQueue = message.client.queue.get(message.guild.id); 
         if (!channel) return message.reply("Debes entrar a un canal de voz primero!").catch(console.error); 
         if (!message.guild.me.voice.channel) return message.reply("No estoy en un canal de voz!").catch(console.error); 
         if (channel.id !== message.guild.me.voice.channel.id) return message.reply("No estoy en tu canal de voz!").catch(console.error); 
         if(serverQueue) { 
             serverQueue.connection.dispatcher.destroy(); 
             channel.leave(); 
             message.client.queue.delete(message.guild.id); 
             serverQueue.textChannel.send('He salido del canal, nos vemos pronto.').catch(console.error); 
             return 
            }
            channel.leave(); 
            
    message.client.queue.delete(message.guild.id); 
    message.channel.send('He salido del canal, nos vemos pronto.').catch(console.error); } };