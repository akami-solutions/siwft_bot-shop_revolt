/**
 * @returns {void}
 * @constructor
 * @type {{name: string, execute(*, *): void}}
 */
module.exports = {
    name: 'message',
    /**
     * @param message
     */
    execute(message) {
        const commands = require('../bot.js');
        if(message.author.bot) return;
        if(!message.content.startsWith(process.env.PREFIX)) return;
        for (const command of commands[1]) {
            if(message.content.startsWith(`${process.env.PREFIX}${command.name}`)) {
                command.execute(message);
            }
        }
    }
}