module.exports = (message, code) => {
    //this is if the bot disconnects from the websocket
    if (code === 0) return console.error(message);
    client.connect();
}