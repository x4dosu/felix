exports.run = (client, message, args, p) => {
    //nothing to document here
    let arg = args[0].toLowerCase();
    if(arg === "loona") {
        message.channel.send("STAN LOONA :pray::skin-tone-1: :nail_care::skin-tone-1:");
    } else 
    if(arg === "josh") {
        message.channel.send("okay fair point josh is more epic than loona");
    } else
    if(arg === "oppa") {
        message.channel.send("I LOVE YOU OPPA :heart: :heart: :heart: :heart:");
    } else
    if(arg === "bts") {
        message.channel.send("BTS IS COOL BUT HAVE YOU SEEN LOONA THEY ARE ASTONISHING :pray::skin-tone-1:");
    } else {
        message.channel.send(`${arg.toUpperCase()} IS OKAY BUT WE ONLY STAN TALENT STAN LOONA !!! :nail_care::skin-tone-1:`);
    }
}