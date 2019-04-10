module.exports.aliases = (command, args) => {
    let s;
    if(command === "l" || command === "last" || command === "recent" || command === "r") { 
        s = ["osu", "last"]; 
        return s;
    }
    if(command === "t" || command === "top") {
        s = ["osu", "top"]; 
        return s;
    }
    if(command === "p" || command === "profile") { 
        s = ["osu", "profile"]; 
        return s;
    }
    if(command === "a" || command === "akatsuki") {
        s = ["osu", "akatsuki"]; 
        return s;
    }
    if(command === "ri" || command === "ripple") { 
        s = ["osu", "ripple"]; 
        return s;
    }
    if(command === "g" || command === "gatari") { 
        s = ["osu", "gatari"]; 
        return s;
    }
    if(command === "ku" || command === "kurikku") { 
        s = ["osu", "kurikku"]; 
        return s;
    }
    if(command === "es" || command === "enshi") {
        s = ["osu", "enshi"]; 
        return s;
    }
    if(command === "ej" || command === "enjuu") {
        s = ["osu", "enjuu"]; 
        return s;
    }
    if(command === "ka" || command === "kawata") {
        s = ["osu", "kawata"]; 
        return s;
    }
    if(command === "c" || command === "compare") { 
        s = ["osu", "compare"]; 
        return s;
    }
    if(command === "beatconnect") {
        s = ["osu", "beatconnect"]; 
        return s;
    }
}