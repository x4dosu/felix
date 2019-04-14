module.exports = (client, message) => {
    //imports
    const eDate = require("../commands/functions/eDateFunctions.js");
    const commands = require("../commands/functions/aliases.js");
    //if the message comes from dms
    if(message.channel.type === "dm") return;
    //ensure the databases
    client.functions.ensureDatabases(client, message);

    //check edate, esex & ebirth requests
    eDate.eDateStuff(client, message);
    
    const p = client.database.get(message.guild.id, "prefix");
    client.p = p;
    //in case someone forgets their prefix they can do $prefix and it will give the prefix
    if(message.content == `${client.config.prefix}prefix`) message.content = `${p}prefix`;
    //if the author is a bot
    if (message.author.bot) return;
    //if message doesn't start with the prefix ignore it
    if (message.content.indexOf(p) !== 0) return;

    //just takes the arguments
    let args = message.content.slice(p.length).trim().split(/ +/g);
    //just takes the command
    let command = args.shift().toLowerCase();

    //aliases
    let alias = commands.aliases(command, args);
    //for the osu aliases
    if(alias) {
      command = alias[0];
      args.unshift(alias[1]);
    }
    
    //check if is superior
    client.isSuperior = client.functions.getPrivilege(message, client);
    
    //get the command
    const cmd = client.commands.get(command);
    //if command doesn't exist return
    if (!cmd) return;

    //logs commands in console (format: LOG: [time] (guild name) COMMAND FROM username#0000: command)
    console.log(`LOG: [${client.functions.getTime()}] (${message.guild.name}) COMMAND FROM ${message.member.user.tag}: ${message.content.split(p).join(client.config.prefix)}`);

    //run the command
    cmd.run(client, message, args, p);
};