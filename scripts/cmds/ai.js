 const axios = require('axios');
const key = 'sk-aryan-op'; // Added quotes around the API key
const url = 'https://ai-technology.onrender.com'; // Added 'https://' protocol

const Prefixes = [
  '.ai', 'gpt', 'ai' , 'pharouk' , 'dracula'
];

// Cooldown configuration (in milliseconds)
const Cooldown = {
  time: 5000, // 5 seconds
  users: new Set(),
};

module.exports = {
  config: {
    name: 'gpt',
    aliases: ['ai'], // Changed backticks to regular quotes
    version: '2.0',
    author: 'Aryan Chauhan',
    role: 0,
    category: 'ai',
    shortDescription: {
      en: 'Asks an AI for an answer.',
    },
    longDescription: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return;
      }

      // Check cooldown
      if (Cooldown.users.has(event.senderID)) {
        throw new Error('Please wait before using the command again.');
      }

      const prompt = args.join(" ");

      // Log command execution
      console.log(`Received command from ${event.senderName || 'user'}: ${prompt}`);

      const response = await axios.get(`${url}/api/chatgpt?prompt=${encodeURIComponent(prompt)}&key=${key}`);

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const answer = response.data.fullResponse;
      const userName = event.senderName || 'User';

      await message.reply({ body: ` 🧛𝘿𝙍𝘼𝘾𝙐𝙇𝘼🧛\n___________________\n${answer} 𝘿𝙍𝘼𝘾𝙐𝙇𝘼💢 ` });

      console.log('Sent answer as a reply to user');

      // Add user to cooldown
      Cooldown.users.add(event.senderID);
      setTimeout(() => {
        Cooldown.users.delete(event.senderID);
      }, Cooldown.time);
    } catch (error) {
      console.error(`${error.message}\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`);
      api.sendMessage(
        `Error: ${error.message}`,
        event.threadID
      );
    }
  },
  onReply: async function ({ message, event, Reply, args }) {
    let { author, commandName } = Reply;
    if (event.senderID !== author) return;
    const prompt = args.join(" ");

    try {
      const response = await axios.get(
        `${url}/api/chatgpt?prompt=${encodeURIComponent(prompt)}&key=${key}`
      );

      if (response.data && response.data.result) {
        const answer = response.data.fullResponse;
        const userName = event.senderName || 'User';

        message.reply(
          {
            body: ` ${answer}`
          },
          (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID
            });
          }
        );
      } else {
        console.error("API Error:", response.data);
        sendErrorMessage(`${error.message}\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`);
      }
    } catch (error) {
      console.error("Request Error:", error.message);
      sendErrorMessage(`${error.message}\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`);
    }
  },
	
