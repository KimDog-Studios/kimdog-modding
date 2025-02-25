const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');

const DISCORD_BOT_TOKEN = 'MTI5NDA0Mjc0NzA2NTU5ODAzNw.G2Ruor.YP76VKj9Nc8daEbN43y4KNv_KuYhTUBzsbNK1M';
const CHANNEL_ID = '1342731220433244171';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', async () => {
  console.log('Discord bot is ready!');

  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    let messages = [];
    let lastMessageId;

    while (true) {
      const fetchedMessages = await channel.messages.fetch({ limit: 100, before: lastMessageId });
      if (fetchedMessages.size === 0) break;
      messages = messages.concat(Array.from(fetchedMessages.values()));
      lastMessageId = fetchedMessages.last().id;
    }

    const screenshots = messages
      .flatMap(message => Array.from(message.attachments.values()).map(attachment => ({
        url: attachment.url,
        author: message.author.username,
        id: message.author.id,
        avatar: message.author.avatar
      })));

    const tsxContent = `const screenshots: { url: string, author: string, id: string, avatar: string }[] = [\n  ${screenshots.map(screenshot => `{ url: "${screenshot.url}", author: "${screenshot.author}", id: "${screenshot.id}", avatar: "${screenshot.avatar}" }`).join(',\n  ')}\n];\n\nexport default screenshots;\n`;

    const tsxFilePath = path.join(__dirname, '../config/Screenshots.tsx');
    fs.writeFile(tsxFilePath, tsxContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to Screenshots.tsx:', err);
        return;
      }
      console.log('Screenshots.tsx updated successfully.');
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
  } finally {
    client.destroy();
  }
});

client.login(DISCORD_BOT_TOKEN);