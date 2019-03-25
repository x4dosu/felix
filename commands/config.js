exports.run = (client, message, args, p) => {
    //if the first args are set
    if(args[0] === "set") {
        //if the author has admin permissions
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("You don't have administrator permissions!");
        }
        //if less than three args return kinda obvious lol
        if(args.length < 3) return message.channel.send(`Please use ${p}config set <property> <value>`);
        let prop = args[1];
        let value = args.splice(2).join(" ");   
        //if it inclueddes ping things return bla bla
        if(message.content.includes("@everyone") || message.content.includes("@here")) return message.channel.send("Please don't try to ping everyone");
        //if the second arg is welcome chang etje welcome configuration its pretty much the same with of them so im only documneting this
        if(args[1] === "welcome") {
            //check if the configuration is false
            if(client.database.get(message.guild.id, "welcome") === "false") {
                //if value entered isn't true return
                if(value != "true") return message.channel.send("Please use ``true`` to turn on join messages");
                //change the value of entered property in the database for the guild
                client.database.set(message.guild.id, value, prop);
                //send message in the channel
                message.channel.send(`The property \`\`${prop}\`\` has been changed to \`\`${value}\`\``);
                return;
            } else
            //if the configuration is not false but true do the same thing but pretty much reversed
            if(client.database.get(message.guild.id, "welcome") === "true") {
                if(value != "false") return message.channel.send("Please use ``false`` to turn off join messages");
                
                client.database.set(message.guild.id, value, prop);
                message.channel.send(`The property \`\`${prop}\`\` has been changed to \`\`${value}\`\``);
                return;
            }
        } else
        if(args[1] === "farewell") {
            if(client.database.get(message.guild.id, "farewell") === "false") {
                if(value != "true") return message.channel.send("Please use ``true`` to turn on farewell messages");
                
                client.database.set(message.guild.id, value, prop);
                message.channel.send(`The property \`\`${prop}\`\` has been changed to \`\`${value}\`\``);
                return;
            } else
            if(client.database.get(message.guild.id, "farewell") === "true") {
                if(value != "false") return message.channel.send("Please use ``false`` to turn off farewell messages");
                
                client.database.set(message.guild.id, value, prop);
                message.channel.send(`The property \`\`${prop}\`\` has been changed to \`\`${value}\`\``);
                return;
            }
          } else
          if(args[1] === "roleOnJoin") {
              if(client.database.get(message.guild.id, "roleOnJoin") === "false") {
                  if(value != "true") return message.channel.send("Please use ``true`` to turn on role on join");
                  
                  client.database.set(message.guild.id, value, prop);
                  message.channel.send(`The property \`\`${prop}\`\` has been changed to \`\`${value}\`\``);
                  return;
              } else
              if(client.database.get(message.guild.id, "roleOnJoin") === "true") {
                  if(value != "false") return message.channel.send("Please use ``false`` to turn off role on join");
                  
                  client.database.set(message.guild.id, value, prop);
                  message.channel.send(`The property \`\`${prop}\`\` has been changed to \`\`${value}\`\``);
                  return;
              }
        } else
        if(args[1] === "welcomeChannel") {
          if(!message.guild.channels.find(channel => channel.name === value)) return message.channel.send("I couldn't find the channel you entered");
  
          client.database.set(message.guild.id, value, prop);
          message.channel.send(`The property \`\`${prop}\`\` has been changed to \`\`${value}\`\``);
          return;
        }
        if(args[1] === "farewellChannel") {
          if(!message.guild.channels.find(channel => channel.name === value)) return message.channel.send("I couldn't find the channel you entered");
  
          client.database.set(message.guild.id, value, prop);
          message.channel.send(`The property \`\`${prop}\`\` has been changed to \`\`${value}\`\``);
          return;
        }
        if(args[1] === "joinRole") {
          if(!message.guild.roles.find(role => role.name === value)) return message.channel.send("I couldn't find the role you entered");
  
          client.database.set(message.guild.id, value, prop);
          message.channel.send(`The property \`\`${prop}\`\` has been changed to \`\`${value}\`\``);
          return;
        } else
        //if the property isn't in the database return
        if(!client.database.has(message.guild.id, prop)) return message.channel.send("This key is not in the configuration.");

        /*if the property is in the database but it's
        not something that the bot has to check like the welcomeMessage then just set it here*/
        client.database.set(message.guild.id, value, prop);
        message.channel.send(`The property \`\`${prop}\`\` has been changed to \`\`${value}\`\``);
        return;
    }
    //config message kinda boring I know
    message.channel.send({ "embed": {
        "title": "Config of the server:",
        "description": `You can change the configurations with \`${p}config set <property> <value>\`\n\n\`\`\`coffeescript
welcome =-> ${client.database.get(message.guild.id, 'welcome')}\n
welcomeChannel =-> ${client.database.get(message.guild.id, 'welcomeChannel')}\n
welcomeMessage =-> ${client.database.get(message.guild.id, 'welcomeMessage')}\n
farewell =-> ${client.database.get(message.guild.id, 'farewell')}\n
farewellChannel =-> ${client.database.get(message.guild.id, 'farewellChannel')}\n
farewellMessage =-> ${client.database.get(message.guild.id, 'farewellMessage')}\n
roleOnJoin =-> ${client.database.get(message.guild.id, 'roleOnJoin')}\n
joinRole =-> ${client.database.get(message.guild.id, 'joinRole')}\n
prefix =-> ${client.database.get(message.guild.id, 'prefix')}\`\`\``,
        "color": 10443476
    }});
}