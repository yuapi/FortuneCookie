const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const token = process.env.DISCORD_TOKEN;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const FORTUNE_PATH = path.join(__dirname, 'fortune.json');