![assets/icon.png](assets/icon.png)
# fa:nfare - Open source discord voice channel stacker
fa:nfare is a powerful discord bot to "stack" voice channels (create unlimited, on-demand, voice channels.)

## Features
Still under development ;)

## Installation
⚠️ To setup the bot, you'll need a discord bot token. If you don't know how to create one, you can find a quick tutorial [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).
### Using Docker (recommended)
#### Docker compose (recommended)
Edit the [docker-compose.yml](./docker-compose.yml) file present in this repo and set the environment variables (check the [Environment variables](#environment-variables) section for more information)

then start the bot (tip: you can use the `-d` flag to run it in the background)
```bash
docker-compose up
```
to invite the bot, use the link printed in the console
(use `docker-compose logs` to get the link if you started the bot in the background)

#### Docker cli
```bash
docker volume create fanfare
docker run -d \
    --name fanfare \
    -e TOKEN=[your token here] \
    -e GUILD= \
    -e SKIP_COMMAND_VALIDATION=false \
    -e DATABASE_PATH=database.sqlite \
    -e DATABASE_DRIVER=sqlite \
    -v fanfare:/app/database.sqlite \
    ghcr.io/fabricated-world/fanfare:latest
```
to invite the bot, use the link printed in the console

#### Using kubernetes (experienced users only)
⚠ the bot has not been designed to be scaled up, as such, if you set more than one replica, the bot may behave unexpectedly.

[Direct deploy](./fanfare.yml) (you'll still need to setup some environment variables for it to work)
```bash
kubectl apply -f https://raw.githubusercontent.com/fabricated-world/fanfare/main/fanfare.yml
kubectl edit deployment.apps fanfare-deployment
```

Using the [kubernetes deployment file](./fanfare.yml) provided in this repository
```bash
kubectl apply -f fanfare.yml
```

### Using nodejs
grab the latest release on [github](https://github.com/fabricated-world/fanfare/releases/latest) then uzip it

install the dependencies
```bash
npm install --production
```

edit the .env file to your needs, be sure to set the `DISCORD_TOKEN` variable
check the [Environment variables](#environment-variables) section for more information

then start the bot
```bash
npm start
```
to invite the bot, use the link printed in the console

### Environment variables
| Variable                  | Description                                                                                                                                                                            | Default value       |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `TOKEN`                   | The discord bot token                                                                                                                                                                  | `none`              |
| `GUILD`                   | IF defined, the bot will be restricted to this specific guild id                                                                                                                       | `none`              |
| `SKIP_COMMAND_VALIDATION` | If set to true, the bot will not check if the commands are up to date                                                                                                                  | `false`             |
| `STATUS`                  | Set the bot's status                                                                                                                                                                   | `none`              |
| `DATABASE_DRIVER`         | The database driver to use ([check supported drivers](#database-api-drivers))                                                                                                          | `sqlite`            |
| `SQLITE_PATH`             | The path to the sqlite database file, only needed if you use the [sqlite database driver](#database-api-drivers)                                                                       | `./database.sqlite` |

### Database API drivers
| Driver name | Description                                                                                                                      |
|-------------|----------------------------------------------------------------------------------------------------------------------------------|
| `sqlite`    | The sqlite database driver, you need to set the `SQLITE_PATH` environment variable to enable persistence but it is not mandatory |

## Development 

### Localizations
As of today, the bot is only localized in the following languages:
If you want to join the translation effort in order to make open-discord-translator available to a broader audience of people [you're welcome to help](https://crowdin.com/project/open-discord-translator/invite?h=1bff0f20415b6c77c234e5c0acd677771811165)!

### Setup
⚠️ To setup the bot, you'll need a discord bot token. If you don't know how to create one, you can find a quick tutorial [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).

clone the repository and install the dependencies
```bash
git clone https://github.com/fabricated-world/fanfare.git
cd fanfare
npm install
```

create a .env.dev file and set the `TOKEN` variable (check the [Environment variables](#environment-variables) section for more information)
```bash
cp .env .env.dev
```
**⚠️ warning:** it is <u>HIGHLY RECOMMENDED</u> to set a GUILD_ID if you're planning on starting the bot for development purposes. It'll tell the bot to register its commands on your guild which is instantaneous instead of registering global commands which take a while to get registered. 

then start the bot
```bash
npm run dev
```
to invite the bot, use the link printed in the console

### Discord api
the bot is initialized in the `./src/index.js` file,
everything in the `./src/discord/` directory is related to the discord api
the `./discord/events/` discord directory contains the discord events listeners, the file name must be [one of those](https://old.discordjs.dev/#/docs/discord.js/main/typedef/Events)
the `./discord/interactions/commands/` discord directory contains the discord commands, the file name does not matter

### Add a new database driver
create a new file in the `./src/database/drivers/` directory
```bash
touch ./src/database/drivers/mydriver.js
```

make sure to export the following functions
```js
module.exports = {
    async init() {
        // if you need to initialize the driver, do it here
        // feel free to add more environment variables if needed (don't forget to update the readme)
    },
}
```

then you set the `DATABASE_DRIVER` environment variable to your driver name and start the bot
