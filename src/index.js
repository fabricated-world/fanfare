// imports
const fs = require('fs')
const path = require('path');

const env = require('dotenv').config({path: fs.existsSync('.env.dev') ? '.env.dev' : '.env'});
process.env = require("dotenv-parse-variables")(process.env);  // init dotenv to use .env.dev instead of .env if it exists
process.env.GUILD = env.GUILD

const { Client, Collection, GatewayIntentBits} = require('discord.js');

const db = require('./db/db.js');

async function main() {
  let intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ];

  // init discord.js
  const client = new Client({intents});
  console.log(`[STARTUP] Starting bot...`)

  // init the database and add it to the client
  await db.init();
  client.db = db;

  // init commands
  client.commands = new Collection();

  const commandsPath = path.join(__dirname, 'bot', 'interactions','commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      if (!process.env.ENABLE_REPLICAS && command.data.name === "replicas") continue; // replicas don't need to be loaded if the ENABLE_REPLICAS env variable is false
      client.commands.set(command.data.name, command);
      if ('init' in command) command.init(client);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
  console.info(`[STARTUP] ${client.commands.size} commands found.`);

  //init events
  client.events = new Collection();

  const eventsPath = path.join(__dirname, 'bot', 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('name' in event && 'execute' in event) {
      client.on(event.name, event.execute)
      if ('init' in event) event.init(client);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
  console.info(`[STARTUP] ${eventFiles.length} events found.`);

  // run bot
  await client.login(process.env.TOKEN);
}

main();
