module.exports = {
    username : (client, message, args, nameIndex, server) => {
        let username;
        //if there is a username entered in the nameIndex position
        if(message.mentions.users.first()) {
            client.osuNames.ensure(message.mentions.users.first().id, client.osuConfig);
            username = client.osuNames.get(message.mentions.users.first().id, server);
            if(username === "-") {
                username = `<@${message.mentions.users.first().id}> hasn't set their username yet! (\`${client.p}osu set <server> <name>\`)`
            }
        } else
        if(args[nameIndex]) {
            //slice everything before the name and join the args with a space
            username = args.slice(nameIndex).join(" ");
        } else {
            //get the default username from the database
            username = client.osuNames.get(message.author.id, server);
        }
        return username;
    },
    /*get the nearest number with the power of 2 next to the mods number
    example:
    if the number is 72 the next bitwise number would be 64 left would be 8
    that means
    64 (dt)
    8 (hd)
    */
    nearestPow2 : (mods) => {
        let modlist = [];
        let i = 1;
        //while the mods arent 0 and i have added something to only do it while i is less than 50 just in case
        while(mods!=0 && i < 50) {
            mod = 1 << 31 - Math.clz32(mods);
            modlist.push(mod);
            mods = mods - mod;
            i++;
        }
        //replace the numbers with mod emojis
        replaceIntWithMod(modlist);
        //idk why i checked for the length probably just in case idk
        if(modlist.length != 0) return "Mods: " + modlist.join(' ') + " |  ";
    },
    getTime : () => {
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
    },
    getRandomInt : (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    },
    ensureDatabases : (client, message) => {
        client.database.ensure(message.guild.id, client.defaultSettings);
        client.lastMap.ensure(message.guild.id, {lastMap: "-"});
        client.osuNames.ensure(message.author.id, client.osuConfig);
        client.specialNSFW.ensure(message.author.id, {nsfw: false});
        client.edaters.ensure(message.author.id, {partner: "-", edateDate: "-", partners: 0});
        client.edateRequest.ensure(message.author.id, {request: "false", requester: "-"});
        client.sex.ensure(message.author.id, {virginity: true, pregnancy: false, consent: false, counter: 0});
        client.sexRequest.ensure(message.author.id, {eSexRequest: false, eSexRequester: "-"});
        client.kids.ensure(message.author.id, {pregnancy: false, parent1: message.author.id, parent2: "-", kids: []});
        client.birthRequest.ensure(message.author.id, {test: false, birthRequest: false, gender: "-"});
    },
    getPrivilege : (message, client) => {
        if(client.privileged.includes(message.author.id)) return true;
    },
    arrayRemove : (array, value) => {
        return array.filter(function(ele){
            return ele != value;
        });
    }
}

//replace the mod numbers with discord emojis
function replaceIntWithMod(a) {
    num = 0;
    //while the number is less or equal to a.length i could just do != but whatever XD
    while(num <= a.length) {
        //if the array includes no mod then that idk why i did this cause that will never happens but yeehaw
        if(a.includes(Mods.None)) {
            let i = a.indexOf(Mods.None);
            a[i] = "NoMod";
        //if the mods include sudden death
        } else if(a.includes(Mods.SuddenDeath)) {
            /*first we make sure that perfect isn't there too otherwise we
            have to remove sudden death or else it would be SDPF
            */
            if(!a.includes(Mods.Perfect)) {
                let i = a.indexOf(Mods.SuddenDeath);
                a[i] = "<:SD:553697395045564427>";
            } else {
                let i = a.indexOf(Mods.SuddenDeath);
                a[i] = "";
            }
        //same thing with dt if nightcore is there remove dt or else it would be NCDT
        } else if(a.includes(Mods.DoubleTime)) {
            if(!a.includes(Mods.Nightcore)) {
                let i = a.indexOf(Mods.DoubleTime);
                a[i] = "<:DT:553697396677279764> ";
            } else {
                let i = a.indexOf(Mods.DoubleTime);
                a[i] = "";
            }
        //the rest are all nearly the same
        } else if(a.includes(Mods.Easy)) {
            let i = a.indexOf(Mods.Easy);
            a[i] = "<:EZ:553697395465125901>";
        } else if(a.includes(Mods.NoFail)) {
            let i = a.indexOf(Mods.NoFail);
            a[i] = "<:NF:553697395691487324>";
        } else if(a.includes(Mods.TouchDevice)) {
            let i = a.indexOf(Mods.TouchDevice);
            a[i] = "Touch Device";
        } else if(a.includes(Mods.Hidden)) {
            let i = a.indexOf(Mods.Hidden);
            a[i] = "<:HD:553697396274757642>";
        } else if(a.includes(Mods.HardRock)) {
            let i = a.indexOf(Mods.HardRock);
            a[i] = "<:HR:553697395322650636>";
        } else if(a.includes(Mods.Relax)) {
            let i = a.indexOf(Mods.Relax);
            a[i] = "<:RX:553697395116867587>";
        } else if(a.includes(Mods.HalfTime)) {
            let i = a.indexOf(Mods.HalfTime);
            a[i] = "<:HT:553697395846938624> ";
        } else if(a.includes(Mods.SpunOut)) {
            let i = a.indexOf(Mods.SpunOut);
            a[i] = "<:SO:553697395490422795>";
        } else if(a.includes(Mods.Nightcore)) {
            let i1 = a.indexOf(Mods.Nightcore);
            a[i1] = "<:NC:553697395796344853>";
        } else if(a.includes(Mods.Flashlight)) {
            let i = a.indexOf(Mods.Flashlight);
            a[i] = "<:FL:553697395498549250>";
        } else if(a.includes(Mods.Autoplay)) {
            let i = a.indexOf(Mods.Autoplay);
            a[i] = "<:Auto:553697397444706308>";
        } else if(a.includes(Mods.Relax2)) {
            let i = a.indexOf(Mods.Relax2);
            a[i] = "<:AP:553697395578372126>";
        } else if(a.includes(Mods.Perfect)) {
            let i1 = a.indexOf(Mods.Perfect);
            a[i1] = "<:PF:553697395494617118>";
        } 
        //add one to num
        num++;
    }
}

var Mods =
{
	None           : 0,
	NoFail         : 1,
	Easy           : 2,
	TouchDevice    : 4,
	Hidden         : 8,
	HardRock       : 16,
	SuddenDeath    : 32,
	DoubleTime     : 64,
	Relax          : 128,
	HalfTime       : 256,
	Nightcore      : 512, // Nightcore in theory always comes with DT
	Flashlight     : 1024,
	Autoplay       : 2048,
	SpunOut        : 4096,
	Relax2         : 8192,	// Autopilot
	Perfect        : 16384, // Only set along with SuddenDeath. i.e: PF only gives 16416  
	Key4           : 32768,
	Key5           : 65536,
	Key6           : 131072,
	Key7           : 262144,
	Key8           : 524288,
	FadeIn         : 1048576,
	Random         : 2097152,
	Cinema         : 4194304,
	Target         : 8388608,
	Key9           : 16777216,
	KeyCoop        : 33554432,
	Key1           : 67108864,
	Key3           : 134217728,
	Key2           : 268435456,
	ScoreV2        : 536870912,
	LastMod        : 1073741824,
        KeyMod : 67108864 | 268435456 | 134217728 | 32768 | 65536 | 131072 | 262144 | 524288 | 16777216 | 33554432,
        FreeModAllowed : 1 | 2 | 8 | 16 | 32 | 1024 | 1048576 | 128 | 8192 | 4096 | 67108864 | 268435456 | 134217728 | 32768 | 65536 | 131072 | 262144 | 524288 | 16777216 | 33554432,
        ScoreIncreaseMods : 8 | 16 | 64 | 1024 | 1048576
}