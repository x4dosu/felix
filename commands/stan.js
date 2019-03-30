exports.run = (client, message, args, p) => {
    //nothing to document here
    if(!args[0]) return message.channel.send("WHO YOU TRYNNA STAN?? STAN LOONA!!");
    let arg = args[0].toLowerCase();
    if(arg.includes("@everyone") || arg.includes("@here")) {
        message.channel.send("STOP TRYING TO PING EVERYONE AND STAN LOONA INSTEAD :gift_heart:");
    } else
    if(arg === "loona") {
        message.channel.send("STAN LOONA :pray: :nail_care:");
    } else 
    if(arg === "josh") {
        message.channel.send("okay fair point josh is more epic than loona");
    } else
    if(arg === "oppa") {
        message.channel.send("I LOVE YOU OPPA :heart: :heart: :heart: :heart:");
    } else
    if(arg === "aaron") {
        message.channel.send("stan loona stan aaron :pray:");
    } else
    if(arg === "dane" || arg === "x4d") {
        message.channel.send("How can oyu not stan someone that maps loona maps and impregnantes me");
    } else
    if(arg === "graphics") {
        message.channel.send("good graphics stan loona");
    } else
    if(arg === "cookiezi") {
        message.channel.send("COOKIEZI OUTDATED BEASTTROLL OVERRATED LOONA ACTIVATED !!!!!! STAN LOONA");
    } else
    if(arg === "bts") {
        message.channel.send("BTS IS COOL BUT HAVE YOU SEEN LOONA THEY ARE ASTONISHING :pray:");
    } else 
    if(arg === "coletaku") {
        message.channel.send("best mapper alive. with the voice of an angel and the face of a goddess! stan loona (osu needs more loona)");
    } else
    if(arg === "kids") {
        if(client.kids.get(message.author.id, "kids[0]")) {
            message.channel.send(client.kids.get(message.author.id, "kids"));
        } else {
            message.channel.send("You don't have any kids :sob:");
        }
    } else
    if(arg === "snot") {
        message.channel.send("ok stan loona scottster");
    } else {
        message.channel.send(`${args.join(" ").toUpperCase()} IS OKAY BUT WE ONLY STAN TALENT STAN LOONA !!! :nail_care:`);
    }
}