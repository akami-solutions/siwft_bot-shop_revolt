module.exports = {
    name: 'ready',
    execute(client) {
        console.info(`Logged in as ${client.user.username}`);
    }
}