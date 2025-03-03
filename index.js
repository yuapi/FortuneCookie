const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, EmbedBuilder } = require('discord.js');
const fortune = require('./fortune');
require('dotenv').config();

const token = process.env.DISCORD_TOKEN;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const commands = [
    new SlashCommandBuilder()
        .setName('today')
        .setNameLocalization('ko', '운세')
        .setDescription('Get your fortune for today.')
        .setDescriptionLocalization('ko', '오늘의 운세를 확인합니다.')
]

const rest = new REST({ version: '10' }).setToken(token);

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'today') {
        await interaction.deferReply();

        const content = await fortune.get(interaction.user.id);

        const fortuneEmbed = new EmbedBuilder()
            .setTitle('오늘의 운세')
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
            .setDescription(content)
            .setColor(0xEDD482)
            .setTimestamp();

        await interaction.editReply({ embeds: [fortuneEmbed] });
    }
})

client.login(token);