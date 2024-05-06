require('dotenv').config();
const {Client} = require('revolt.js')
const Collection = require("revolt.js/dist/maps/Collection");
const {join} = require('node:path');
const {readdirSync} = require('node:fs')
let client = new Client();

// Command Handler
const commands = [];
const folderPath = readdirSync(join(__dirname, 'commands'));
for(const folder of folderPath) {
    let command = require(join(__dirname, `commands/${folder}`));
    // commands Schema: {name: 'ping', command: 'path/to/command.js'} {name: 'help', command: 'path/to/command.js'}
    commands.push({...command})
}

// Event Handler

const eventsPath = join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    const event = require(filePath);
    client.on(event.name, async (...args) => event.execute(...args, client,commands));
}

const start = client.loginBot(process.env.BOT_TOKEN).then(() => {
    console.info(`The bot is starting up...`);
}).catch((error) => {
    console.error(`An error occurred while starting the bot: ${error}`);
    setTimeout(() => {
        start;
    }, 5000)
})

start;

module.exports = [
    client,
    commands
];