exports.run = (client, message, args, p) => {
    if(!args[0]) return message.channel.send(client.config.noNameException + ` (if you want to kill a kid use \`${p}kid kill <name>\`)`);
    let db = client.kidID;
    if(args[0] === "kill") {
        let kidName = args.splice(1).join(" ");
        let parent1 = message.author.id;
        let nameID1 = kidName + parent1;
        //if the kid doesn't exist in the db
        if(!db.get(nameID1)) return message.channel.send(client.config.noResultException + " (Don't forget to capitalize the name of your kid if it starts with a capitalized letter)");
        let parent2 = db.get(nameID1, "parent2");
        let nameID2 = kidName + parent2;
        //remove the kid from the kids array
        client.kids.remove(parent1, kidName, "kids");
        client.kids.remove(parent2, kidName, "kids");
        //remove the key from the kidID db
        client.kidID.delete(nameID1);
        client.kidID.delete(nameID2);
        //send the message
        message.channel.send(`You killed ${kidName}! The second parent was <@${parent2}>.`);
        return;
    }
    let kidName = args.join(" ");
    let nameID = kidName + message.author.id;
    if(!db.get(nameID) && !client.kids.get(message.author.id, "kids").includes(kidName)) return message.channel.send(client.config.noResultException + " (Don't forget to capitalize the name of your kid if it starts with a capitalized letter)");
    //just make sure that everything exists in case I add properties I don't want to change the old kids lol
    db.ensure(nameID, {name: kidName, parent2: "292700741435654155", birthdate: "When jesus was born", gender: "Something in between", race: "Alien"})
    //get the name of the kid
    let name = db.get(nameID, "name");
    //get the parent's id
    let parent2 = db.get(nameID, "parent2");
    //get the birthdate of the kid format: hours:minutes:seconds:PM/AM days-months-year (timezone)
    let birthdate = db.get(nameID, "birthdate");
    //get the gender of the kid
    let gender = db.get(nameID, "gender");
    //get the race of the kid
    let race = db.get(nameID, "race"); // lol race car XDDDDDD
    let parent2Collection = client.users.get(parent2);
    message.channel.send({
        "embed": {
        "color": 9584614,
        "fields": [
            {
                "name": name,
                "value": `
Birthdate: \`${birthdate}\`
Parents: \`${message.author.tag}\` & \`${parent2Collection.tag}\`
Gender: \`${gender}\`
Race: \`${race}\``
            }
    ]}});
}