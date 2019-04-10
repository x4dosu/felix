exports.run = (client, message, args, p) => {
    //send message
    message.channel.send({"embed": {
        "color": `10970023`,
        "fields": [
            {
                "name": "PREFIX:",
                "value": p
    }]}});
}