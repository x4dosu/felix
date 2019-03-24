exports.run = (client, message, args, p) => {
    //send ping
    message.channel.send({embed: {
        "color": "8741002",
        "description": "My Ping is **" + Math.round(client.ping) + " ms**"
    }});
}