module.exports = (client, oldMessage, newMessage) => {
    //if a message is updated run the message event again with the updated message
    client.emit("message", newMessage);
}