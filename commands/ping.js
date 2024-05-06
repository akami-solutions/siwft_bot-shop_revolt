module.exports = {
    name: 'ping',
    /**
     * @param message
     */
    execute(message) {
        message.channel.sendMessage('Pong!');
    }
}