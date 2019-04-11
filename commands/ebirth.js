exports.run = (client, message, args, p) => {
    client.birthRequest.ensure(message.author.id, {birthRequest: false});
    let parent1 = message.author.id;
    //if you're not pregnancy
    if(client.kids.get(parent1, "pregnancy") === false) {
        message.channel.send("You're not pregnant");
        return;
    } else 
    if(client.kids.get(parent1, "pregnancy") === true) {
        //send out birthRequest
        client.birthRequest.set(parent1, true, "birthRequest");
        //the different genders
        let gender = ["Male", "Female", "Guacamole", "Apache War Helicopter", "6 digit", "DT Farmer", "cookiezi", "not osu player but homosexual", "always tired", "Male", "the same gender as Nina", "Black"];
        //get a random gender from the array
        let randomGender = gender[client.functions.getRandomInt(gender.length)];
        //set the gender in birthrequest cuase im too lazy to make osmething else this is fine
        client.birthRequest.set(parent1, randomGender, "gender");
        //sen mesga
        message.channel.send(`Your kid is a ${randomGender}. What do you want to name your kid <@${parent1}> (You can cancel the birth with \`cancel\`. That will reset the gender)`);
        return;
    }
}