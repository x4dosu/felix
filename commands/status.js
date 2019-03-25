exports.run = (client, message, args, p) => {
    if(message.author.id !== client.config.ownerID) return message.channel.send("no");
    let type = args[0];
    let activity;
    let url;
    if(type === "streaming") {
        activity = args.splice(2).join(" ");
        url = args[1];
    } else {
        activity = args.splice(1).join(" ");
        url = "-";
    }
    if(!args[0]) return message.channel.send("What am I doing with my life?");
    if(url !== "-" && type !== "-" && activity !== "-") {
        client.user.setPresence({game:{name: activity, type: type, url: url}});
    } else
    if(activity !== "-" && type !== "-") {
        client.user.setActivity(activity, { type: type }); 
    } else
    if(activity === "-" && type !== "-" || !args[1]) {
        message.channel.send("What am I doing with my life?");
    } else
    if(activity !== "-" && type === "-") {
        client.user.setActivity(activity);
    }
}