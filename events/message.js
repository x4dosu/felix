module.exports = (client, message) => {
    //ignore bots
    if (message.author.bot) return;
    //make sure the settings for the specified key are there and if not set them to the default
    client.database.ensure(message.guild.id, client.defaultSettings);
    client.specialNSFW.ensure(message.author.id, {nsfw: false});
    client.osuNames.ensure(message.author.id, client.osuConfig);
    //if message doesn't start with the prefix ignore it
    const p = client.database.get(message.guild.id, "prefix");
    if (message.content.indexOf(p) !== 0) return;
    
    //logs commands in console (format: LOG: [time] (guild name) COMMAND FROM username#0000: command)
    console.log(`LOG: [${time()}] (${message.guild.name}) COMMAND FROM ${message.member.user.tag}: ${message.content}`);

    //just takes the arguments
    const args = message.content.slice(p.length).trim().split(/ +/g);
    //just takes the command
    let command = args.shift().toLowerCase();

    //aliases
    if(command === "l" || command === "recent" || command === "r") { command = "last"; }
    if(command === "t") { command = "top"; }
    if(command === "p") { command = "profile"; }
    if(command === "a") { command = "akatsuki"; }
    if(command === "ri") { command = "ripple"; }
    if(command === "g") { command = "gatari"; }
    if(command === "ku") { command = "kurikku"; }
    if(command === "es") { command = "enshi"; }
    if(command === "ej") { command = "enjuu"; }
    if(command === "y") { command = "yozora"; }
    if(command === "ka") { command = "kawata"; }

    //get the command
    const cmd = client.commands.get(command);
    //if command doesn't exist return
    if (!cmd) return;

    //run the command
    cmd.run(client, message, args, p);
};

function time() {
  let str = "";
  let currentTime = new Date()
  let hours = currentTime.getHours()
  let minutes = currentTime.getMinutes()
  let seconds = currentTime.getSeconds()

  if (minutes < 10) {
      minutes = "0" + minutes
  }
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  str += hours + ":" + minutes + ":" + seconds + " " ;
  if(hours > 11){
      str += "PM"
  } else {
      str += "AM"
  }
  return str;
}