exports.run = (client, message, args, p) => {
    //if author isn't cool enough return
    if(!client.isSuperior) return message.channel.send(client.config.notSuperiorException);
    let type = args[0];
    let activity;
    let url;
    //if the type is streaming then stream or some shit
    if(type === "streaming") {
        activity = args.splice(2).join(" ");
        url = args[1];
    } else {
        activity = args.splice(1).join(" ");
        url = "-";
    }
    //if no args retzurn XD
    if(!args[0]) return message.channel.send("What am I doing with my life?");
    //idk change the presence
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