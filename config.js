module.exports = {
    /*
    Discord Token from:
    https://discordapp.com/developers/applications/YOUR-APP-ID/bots
    */
    token : "",
    /*
    osu! Token from:
    https://old.ppy.sh/p/api
    */
    banchoProfileApi : "https://osu.ppy.sh/api/get_user?k=&u=",
    banchoTopApi : "https://osu.ppy.sh/api/get_user_best?k=&u=",
    banchoRecentApi : "https://osu.ppy.sh/api/get_user_recent?k=&limit=1&u=",
    banchoMapApi : "https://osu.ppy.sh/api/get_beatmaps?k=&b=",
    banchoSetApi : "https://osu.ppy.sh/api/get_beatmaps?k=&s=",
    banchoUserMapApi : "https://osu.ppy.sh/api/get_beatmaps?k=&u=",
    banchoUserScoresApi : "https://osu.ppy.sh/api/get_scores?k=&b=",
    //Beatconnect Token (You have to apply for it on their discord server)
    beatconnectToken : "",
    //these are the docs for their api i usually cut it out cause i dont know if its private or not
    beatconnectDocs : "",    
	/*
    Your Google token from:
    https://console.developers.google.com/apis/credentials?project=_
    */
    googleToken : "",




    //the client's prefix
    prefix : "$",
    //the version
    version : "3.2.0",
    //my id
    ownerID : "292700741435654155",
    //the id's of some of my friends
    aaronID : "254373477878857729",
    badgraphicsID : "170288836067196928",
    x4dID : "183815137126383617",  
    //invite for the bot (change the numbers to your client id)
    botInvite : "https://discordapp.com/api/oauth2/authorize?client_id=533659989202436096&scope=bot",
    //invite for my server
    serverInvite : "https://discord.gg/pgvyKek",
  
    //banchos avatar url
    banchoAviUrl : "https://a.ppy.sh/",
    //url for bancho profiles
    banchoPUrl : "https://osu.ppy.sh/users/",
    //bloodcat api link
    bloodcatApi : "https://bloodcat.com/osu/?mod=json&q=",
    //beatconnect api link
    beatconnectSearchApi : "https://beatconnect.io/api/search/?token=",
    //old profile because the normal profile api doesn't show everything that the old api shows
    gatariOldProfileApi : "https://osu.gatari.pw/api/v1/users/stats?u=",
    gatariProfileApi : "https://api.gatari.pw/user/stats?id=",
    gatariTopApi : "https://api.gatari.pw/user/scores/best?id=",
    gatariRecentApi : "https://api.gatari.pw/user/scores/recent?id=",
    gatariAviUrl : "https://a.gatari.pw/",
    gatariPUrl : "http://osu.gatari.pw/u/",

    akatsukiProfileApi : "https://akatsuki.pw/api/get_user?u=",
    akatsukiTopApi : "https://akatsuki.pw/api/get_user_best?u=",
    akatsukiRecentApi : "https://akatsuki.pw/api/get_user_recent?u=",
    akatsukiAviUrl : "https://a.akatsuki.pw/",
    akatsukiPUrl : "https://akatsuki.pw/u/",

    rippleProfileApi : "https://ripple.moe/api/get_user?u=",
    rippleTopApi : "https://ripple.moe/api/get_user_best?u=",
    rippleRecentApi : "https://ripple.moe/api/get_user_recent?u=",
    rippleAviUrl : "https://a.ripple.moe/",
    ripplePUrl : "https://ripple.moe/u/",

    kurikkuProfileApi : "https://kurikku.pw/api/get_user?u=",
    kurikkuTopApi : "https://kurikku.pw/api/get_user_best?u=",
    kurikkuRecentApi : "https://kurikku.pw/api/get_user_recent?u=",
    kurikkuAviUrl : "https://a.kurikku.pw/",
    kurikkuPUrl : "https://kurikku.pw/u/",

    enshiProfileApi : "https://enshi.pl/api/get_user?u=",
    enshiTopApi : "https://enshi.pl/api/get_user_best?u=",
    enshiRecentApi : "https://enshi.pl/api/get_user_recent?u=",
    enshiAviUrl : "https://a.enshi.pl/",
    enshiPUrl : "https://enshi.pl/u/",

    enjuuProfileApi : "https://enjuu.click/api/get_user?u=",
    enjuuTopApi : "https://enjuu.click/api/get_user_best?u=",
    enjuuRecentApi : "https://enjuu.click/api/get_user_recent?u=",
    enjuuAviUrl : "https://a.enjuu.click/",
    enjuuPUrl : "https://enjuu.click/u/",

    kawataProfileApi : "https://kawata.pw/api/get_user?u=",
    kawataTopApi : "https://kawata.pw/api/get_user_best?u=",
    kawataRecentApi : "https://kawata.pw/api/get_user_recent?u=",
    kawataAviUrl : "https://a.kawata.pw",
    kawataPUrl : "https://kawata.pw/u/",

    //yandere, danbooru and gelbooru api links (for gelbooru im not using the official one cause the official one is xml)
    yandere : "https://yande.re/post.json?tags=order%3Arandom+",
    danbooru : "https://danbooru.donmai.us/posts.json?tags=order%3Arandom+",
    gelbooru : "https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=",
    //youtube's search api
    youtubeSearchApi : "https://www.googleapis.com/youtube/v3/search?part=snippet&q=",

    //no mod if i ever want to change it
    noMod : "",
    //rank emojis
    osuF : "<:osuF:556219352228036608>",
    osuC : "<:osuC:556219351997480973>",
    osuB : "<:osuB:556219352295276547>",
    osuA : "<:osuA:556218790136905746>",
    osuS : "<:osuS:556219134174560306>",
    osuX : "<:osuX:556218909825695746>",
    osuSH : "<:osuSH:556218696406794260>",
    osuXH : "<:osuXH:556218696432091136>",

    //help for osu commands
    osuCmd : "Get a list of osu related commands",
    profileCmd : "Get profile of entered user",
    topCmd : "Get top plays of entered user",
    lastCmd : "Get last plays of entered user",
    compareCmd : "Compare your scores on the maps your friends recently got scores on",
    beatconnectCmd : "Search for maps on beatconnect",
    akatsukiCmd : "Get akatsuki related commands",
    rippleCmd : "Get ripple related commands",
    gatariCmd : "Get gatari related commands",
    kurikkuCmd : "Get kurikku related commands",
    enshiCmd : "Get enshi related commands",
    enjuuCmd : "Get enjuu related commands",
    kawataCmd : "Get kawata related commands",

    //help for nsfw commands
    gelbooruCmd : "Get random image from gelbooru.com with entered tag",
    yandereCmd : "Get random image from yande.re with entered tag",
    danbooruCmd : "Get random image from danbooru.donmai.us with entered tag",

    //help for fun commands
    edateCmd : "Edate or break up with someone",
    esexCmd : "Just don't even ask okay (low chance to get pregnant XD)",
    epregnancyCmd : "Check your pregananant status",
    ebirthCmd : "Give birth lol",
    eabortCmd : "Abort your kid xd",
    familyCmd : "get your / an entered user's family",
    kidCmd : "get information about your kid",
    youtubeCmd : "search for videos on youtube (temporary command)",
    stanCmd : "stan loona",

    //help for util commands
    helpCmd : "Get a list of all commands",
    pingCmd : "Get the bot's ping",
    creditsCmd : "List of helpful people in the making of this bot",
    configCmd : "Change the server's configurations",

    //help for owner commands
    uptimeCmd : "Get the uptime of the bot",
    statusCmd : "Temporarily update the activity of the bot",
    inviteMeCmd : "Invite you to the guild entered",
    leaveMeCmd : "Make the bot leave the entered guild",
    leaveCmd : "Leave the server where the command is executed",
    nsfwPlusCmd : "Toggles nsfw+ mode",
    setAvatarCmd : "Change the bot's avatar",
    setNameCmd : "Change the bot's name",
    stopCmd : "Stop the bot",
    evalCmd : "Run code",

    //error code
    notSuperiorException : "You can't use this command :no_entry_sign:",
    illegalException : "Don't get me banned! :no_entry_sign:",
    notNSFWChannelException : "You can't use this command here! :no_entry_sign:",
    noResultException : "Couldn't find anything! :mag_right:",
    noNameException : "Please enter a name!"
}