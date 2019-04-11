const functions = require("./otherFunctions.js");

module.exports = {
    eDateStuff : (client, message) => {
        if(client.birthRequest.get(message.author.id, "birthRequest")) {
            birth(client, message);
            return;
        }
        //if the author of the message has a edate request open
        if(client.edateRequest.get(message.author.id, "request") === "true") {
            //if they say yes
            if(message.content.toLowerCase() === "yes") {
                edate(client, message);
                return;
            } else
            //if they say no
            if(message.content.toLowerCase() === "no") {
                reject(client, message);
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
                noESex(client, message);
            }
        }
    }
};

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
        let i = functions.getRandomInt(100);
        //if the number is 69 then you get pregnant wtf is wrong with me i want to die
        //otherwise if i ever wanted to increase the chance there is the second thing
        if(i >= 69 && i <= 79) {
            //get a random number (0 - 1)
            let pregnant = functions.getRandomInt(2);
            if(pregnant === 1) {
                client.kids.set(userID, true, "pregnancy");
                client.kids.set(userID, partner, "parent2");
                message.channel.send(`<@${partner}> you have made <@${userID}> pregnant :pregnant_woman: ${virgin}`);
                client.sex.set(userID, false, "consent");
            } else if(pregnant === 0) {
                client.kids.set(partner, true, "pregnancy");
                client.kids.set(partner, userID, "parent2");
                message.channel.send(`<@${userID}> you have made <@${partner}> pregnant :pregnant_woman: ${virgin}`);
                client.sex.set(userID, false, "consent");
            }
            //if no one gets pregnant then just that you better not get yourself pregnant lOl
        } else {
            message.channel.send(`You had esex with <@${partner}>. ${virgin} (you rolled a ${i})`);
            client.sex.set(userID, false, "consent");
        }
    }, 1000));
}

function edate(client, message) {
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
        //set the edate date
        client.edaters.set(message.author.id, exactDate()[0], "edateDate");
        client.edaters.set(requester, exactDate()[0], "edateDate");
        //increase the number of partners
        client.edaters.inc(message.author.id, "partners");
        client.edaters.inc(requester, "partners");
    } else {
        //reset the request
        client.edateRequest.set(message.author.id, "false", "request");
        client.edateRequest.set(message.author.id, "-", "requester");
        //send message XD
        message.channel.send(`You're already dating <@${client.edaters.get(message.author.id, "partner")}>`);
    }
}

function reject(client, message) {
    let requester = client.edateRequest.get(message.author.id, "requester");
    //send sad message in channel (nina :sob:)
    message.channel.send(`<@${requester}> you got rejected by <@${message.author.id}>`);
    //reset the data
    client.edateRequest.set(message.author.id, "false", "request");
    client.edateRequest.set(message.author.id, "-", "requester");
}

function noESex(client, message) {
    let userID = message.author.id;
    message.channel.send(`<@${message.author.id}> didn't give you consent <@${client.sexRequest.get(message.author.id, "eSexRequester")}>`);
    //reset the requests
    client.sexRequest.set(userID, false, "eSexRequest");
    client.sexRequest.set(userID, "-", "eSexRequester");
}

function birth(client, message) {
    let kidName = message.content;
    if(kidName.toLowerCase() === "cancel") {
        client.birthRequest.set(message.author.id, "-", "gender");
        client.birthRequest.set(message.author.id, false, "birthRequest");
        return message.channel.send("Cancelled birth (Yes, you can just cancel birth)");
    }
    if(kidName.includes("@everyone") || kidName.includes("@here")) return message.channel.send("The name of your kid can't include that");
    if(kidName.includes("/")) return message.channel.send("You can't use / in your kids name");
    if(kidName === "kill") return message.channel.send("You can't name your kid that");
    if(client.kids.get(message.author.id, "parent2") === "-") return;
    let parent2 = client.kids.get(message.author.id, "parent2");
    //if you or your partner alredady have that name
    if(client.kids.get(message.author.id, "kids").includes(kidName)) return message.channel.send("You already have a kid with that name");
    if(client.kids.get(parent2, "kids").includes(kidName)) return message.channel.send("Your partner already has a kid with that name");
    //add the kid to the kids array
    client.kids.push(message.author.id, kidName, "kids");
    client.kids.push(parent2, kidName, "kids");
    //set parent2 to -
    client.kids.set(message.author.id, "-", "parent2");
    //set pregnancy to false
    client.kids.set(message.author.id, false, "pregnancy");
    
    let nameAuthorID = kidName + message.author.id;
    let nameParentID = kidName + parent2;
    //save the kids name
    client.kidID.set(nameAuthorID, kidName, "name");
    client.kidID.set(nameParentID, kidName, "name");
    //save the other parents
    client.kidID.set(nameAuthorID, parent2, "parent2");
    client.kidID.set(nameParentID, message.author.id, "parent2");
    //save the birthdate
    let birthdate = exactDate();
    client.kidID.set(nameAuthorID, birthdate[0], "birthdate");
    client.kidID.set(nameParentID, birthdate[0], "birthdate");
    //get the gender from here cause asdf
    let gender = client.birthRequest.get(message.author.id, "gender");
    //set a random gender
    client.kidID.set(nameAuthorID, gender, "gender");
    client.kidID.set(nameParentID, gender, "gender");
    //the different races
    let race = ["African American", "Ginger White", "Mexican Black", "Not black but black enough to say the n-word", "Really Black", "White", "Pale White", "Polish White", "Asian", "osu player", "cookiezi", "Ninja", "Kinda white but actually asian like a boss", "sad & depressed"];
    //get a random race from the array
    let randomRace = race[client.functions.getRandomInt(race.length)];
    //set the random race
    client.kidID.set(nameAuthorID, randomRace, "race");
    client.kidID.set(nameParentID, randomRace, "race");
    //holy shit i have to shorten this code lol
    
    //set the birth request to false
    client.birthRequest.set(message.author.id, "-", "gender");
    client.birthRequest.set(message.author.id, false, "birthRequest");
    message.channel.send(`You gave birth to ${kidName} and the other parent is <@${parent2}>`); 
}

function exactDate() {
    let str = "";
    let currentTime = new Date();
    let year = currentTime.getFullYear()
    let months = currentTime.getMonth();
    let days = currentTime.getDate();
    let hours = currentTime.getHours();
    let utcHours = currentTime.getUTCHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    
    let timezone = hours - utcHours;
    if(timezone >= 0) {
      timezone = "UTC+" + timezone;
    } else {
      timezone = "UTC-" + timezone;
    }
     
    if(months < 10) {
        months = "0" + months;
    } 
    if(days < 10) {
        days = "0" + days;
    }
    if(hours < 10) {
        hours = "0" + hours;
    }
    if(minutes < 10) {
        minutes = "0" + minutes;
    }
    if(seconds < 10) {
      seconds = "0" + seconds;
    }
    let pmAm;
    if(hours > 11){
        pmAm = "PM";
    } else {
        pmAm = "AM";
    }
    str += `${hours}:${minutes}:${seconds}${pmAm} ${days}-${months}-${year} (${timezone})`;
    return [str, year];
}