exports.run = (client, message, args, p) => {
    //check if author id isnt me
    if(!client.isSuperior) return message.channel.send(client.config.notSuperiorException);
    
    //convert uptime into readable numbers
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = parseInt(totalSeconds % 60);
    
    let uptime = `I've been online since ${days} days ${hours} hours ${minutes} minutes and ${seconds} seconds`;

    message.channel.send(uptime);
}