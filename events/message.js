module.exports = (client, message) => {
    //make sure the settings for the specified key are there and if not set them to the default
    client.database.ensure(message.guild.id, client.defaultSettings);
    client.specialNSFW.ensure(message.author.id, {nsfw: false});
    client.osuNames.ensure(message.author.id, client.osuConfig);
    client.edaters.ensure(message.author.id, {partner: "-"});
    client.edateRequest.ensure(message.author.id, {request: "false", requester: "-"});
    client.sex.ensure(message.author.id, {virginity: true, pregnancy: false, consent: false});
    client.sexRequest.ensure(message.author.id, {eSexRequest: false, eSexRequester: "-"});
    
    //if the author of the message has a edate request open
    if(client.edateRequest.get(message.author.id, "request") === "true") {
      //if they say yes
      if(message.content.toLowerCase() === "yes") {
        let requester = client.edateRequest.get(message.author.id, "requester");
        //if they aren't dating someone and the requester isn't dating anyone either just in case
        if(client.edaters.get(message.author.id, "partner") === "-" &&
        client.edaters.get(requester, "partner") === "-") {
          message.channel.send(`Congrats you're now dating <@${requester}>`);
          //set each other as partner
          client.edaters.set(message.author.id, requester, "partner");
          client.edaters.set(requester, message.author.id, "partner");
          //reset the request
          client.edateRequest.set(message.author.id, "false", "request");
          client.edateRequest.set(message.author.id, "-", "requester");
        } else {
          //reset the request
          client.edateRequest.set(message.author.id, "false", "request");
          client.edateRequest.set(message.author.id, "-", "requester");
          //send message XD
          message.channel.send(`You're already dating <@${client.edaters.get(message.author.id, "partner")}>`);
        }
        return;
      } else
      //if they say no
      if(message.content.toLowerCase() === "no") {
        let requester = client.edateRequest.get(message.author.id, "requester");
        //send sad message in channel (nina :sob:)
        message.channel.send(`<@${requester}> you got rejected by <@${message.author.id}>`);
        //reset the data
        client.edateRequest.set(message.author.id, "false", "request");
        client.edateRequest.set(message.author.id, "-", "requester");
        return;
      }
    }
    //if the message author has a esex request open
    if(client.sexRequest.get(message.author.id, "eSexRequest") === true) {
      //if they say yes
      if(message.content.toLowerCase() === "yes") {
        eSex(client, message);
      } else
      //if they say no
      if(message.content.toLowerCase() === "no") {
        let userID = message.author.id;
        message.channel.send(`<@${message.author.id}> didn't give you consent <@${client.sexRequest.get(message.author.id, "eSexRequester")}>`);
        //reset the requests
        client.sexRequest.set(userID, false, "eSexRequest");
        client.sexRequest.set(userID, "-", "eSexRequester");
      }
    }

    //ignore bots
    if (message.author.bot) return;
    //if message doesn't start with the prefix ignore it
    const p = client.database.get(message.guild.id, "prefix");
    if (message.content.indexOf(p) !== 0) return;

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
    if(command === "ka") { command = "kawata"; }
    
    //check if is superior
    client.isSuperior = message.author.id != client.config.ownerID &&
    message.author.id != client.config.aaronID &&
    message.author.id != client.config.badgraphicsID;
    
    //get the command
    const cmd = client.commands.get(command);
    //if command doesn't exist return
    if (!cmd) return;

    //logs commands in console (format: LOG: [time] (guild name) COMMAND FROM username#0000: command)
    console.log(`LOG: [${time()}] (${message.guild.name}) COMMAND FROM ${message.member.user.tag}: ${message.content}`);

    //run the command
    cmd.run(client, message, args, p);
};

//esex function
function eSex(client, message) {
  let partner = client.sexRequest.get(message.author.id, "eSexRequester");
  let userID = message.author.id;
  //reset the requests and set consent to true
  client.sexRequest.set(userID, false, "eSexRequest");
  client.sexRequest.set(userID, "-", "eSexRequester");
  client.sex.set(userID, true, "consent");
  //virgin message XD
  let virgin = "";
  if(client.sex.get(partner, "virginity") && client.sex.get(message.author.id, "virginity")) {
    virgin = "This was the first time for both of you";
    client.sex.set(partner, false, "virginity");
    client.sex.set(userID, false, "virginity");
  } else
  if(client.sex.get(partner, "virginity") && !client.sex.get(message.author.id, "virginity")) {
    virgin = `This was <@${partner}>'s first time`;
    client.sex.set(partner, false, "virginity");
  } else
  if(!client.sex.get(partner, "virginity") && client.sex.get(message.author.id, "virginity")) {
    virgin = `This was <@${message.author.id}>'s first time`;
    client.sex.set(userID, false, "virginity");
  }
  //esex message :flushed:
  message.channel.send(`You're now having esex with <@${partner}>`)
  .then(setTimeout(function(){
    //get a random number from 0-99
    let i = getRandomInt(100);
    //if the number is 69 then you get pregnant wtf is wrong with me i want to die
    //otherwise if i ever wanted to increase the chance there is the second thing
    if(i === 69 /*i > 40 && i < 50*/) {
      //get a random number (0 - 1)
      let pregnant = getRandomInt(2);
      if(pregnant === 1) {
        client.sex.set(userID, true, "pregnancy");
        message.channel.send(`<@${partner}> you have made <@${userID}> pregnant :pregnant_woman: ${virgin}`);
        client.sex.set(userID, true, "consent");
      } else if(pregnant === 0) {
        client.sex.set(partner, true, "pregnancy");
        message.channel.send(`<@${userID}> you have made <@${partner}> pregnant :pregnant_woman: ${virgin}`);
        client.sex.set(userID, true, "consent");
      }
    //if no one gets pregnant then just that you better not get yourself pregnant lOl
    } else {
      message.channel.send(`You had esex with <@${partner}>. ${virgin}`);
      client.sex.set(userID, false, "consent");
    }
  }, 1000));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

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