exports.run = (client, message, args, p) => {
    //variables
    let cfg = client.config;
    let pApi = cfg.akatsukiProfileApi;
    let tApi = cfg.akatsukiTopApi;
    let rApi = cfg.akatsukiRecentApi;
    let pUrl = cfg.akatsukiPUrl;
    let aviUrl = cfg.akatsukiAviUrl;
    let nameIndex = 1;
    let argIndex = 0;
    let server = "akatsuki";
    //require the osuFunctions.js
    const osu = require("./functions/osuFunctions.js");
    //if there are firstargs (i named it secondargs out of laziness gotta fix someday)
    if(args[argIndex]) {
        let secondArgs = args[argIndex];
        //if the first args are profile or p
        if(secondArgs === "profile" || secondArgs === "p") {
            //get the profile from the profile function (look in osu for documentation (if i already did documentation for that))
            osu.get.profile(pApi, aviUrl, pUrl, args, message, client, nameIndex, server);
            //afterwards return so that the akatsuki help command wont show
            return;
        } else
        //if the first args are top or t
        if(secondArgs === "top" || secondArgs === "t") {
            //get the top from the top function (same thing like with profile for doc look osu.js)
            osu.get.top(pApi, tApi, pUrl, client, message, args, nameIndex, server);
            //return
            return;
        } else
        //if its last, l, recent or r
        if(secondArgs === "last" || secondArgs === "l" || secondArgs === "r" || secondArgs === "recent") {
            //get last fucntin
            osu.get.last(client, message, args, nameIndex, rApi, pApi, server, aviUrl);
            //return
            return;
        }
    }
    //send help message
    osu.send.help(message, "Akatsuki", p);
    //i dont know why there is a return here but i put it here for some reason lol
    return;
}