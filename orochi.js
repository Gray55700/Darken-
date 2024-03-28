 const axios = require('axios');

const Prefixes = [
  'pharouk',
  '.chi',
  'chi',
  'orochi',
  '/chi',
];

module.exports = {
  config: {
    name: 'orochi',
    aliases: [`chi`],
    version: '2.0',
    author: 'Aryan Chauhan',
    role: 0,
    category: 'ai',
    shortDescription: {
      en: 'Asks an Orochi for an answer.',
    },
    longDescription: {
      en: 'Asks an Orochi for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p)); 

      if (!prefix) {
        return;
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (prompt === '') {
        await message.reply(
          "🧛 𝘿𝙍𝘼𝘾𝙐𝙇𝘼 \n\n𝙃𝙚𝙡𝙡𝙤! 𝙃𝙤𝙬 𝙘𝙖𝙣 𝙄 𝙖𝙨𝙨𝙞𝙨𝙩 𝙮𝙤𝙪 𝙩𝙤𝙙𝙖𝙮?."
        );
        return;
      }
      const response = await axios.get(`http://ai-technology.onrender.com/api/orochiai?prompt=${encodeURIComponent(prompt)}&key=sk-aryan-op`);


      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.fullResponse

      await message.reply(messageText);

      console.log('Sent answer as a reply to user');
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `🧛 𝘿𝙍𝘼𝘾𝙐𝙇𝘼\n\n${error.message}.\n\nYou 𝙘𝙖𝙣 𝙩𝙧𝙮 𝙩𝙮𝙥𝙞𝙣𝙜 𝙮𝙤𝙪𝙧 𝙦𝙪𝙚𝙨𝙩𝙞𝙤𝙣 𝙖𝙜𝙖𝙞𝙣 𝙤𝙧 𝙧𝙚𝙨𝙚𝙣𝙙𝙞𝙣𝙜 𝙞𝙩, 𝙖𝙨 𝙩𝙝𝙚𝙧𝙚 𝙢𝙞𝙜𝙝𝙩 𝙗𝙚 𝙖 𝙗𝙪𝙜 𝙛𝙧𝙤𝙢 𝙩𝙝𝙚 𝙨𝙚𝙧𝙫𝙚𝙧 𝙩𝙝𝙖𝙩'𝙨 𝙘𝙖𝙪𝙨𝙞𝙣𝙜 𝙩𝙝𝙚 𝙥𝙧𝙤𝙗𝙡𝙚𝙢. 𝙄𝙩 𝙢𝙞𝙜𝙝𝙩 𝙧𝙚𝙨𝙤𝙡𝙫𝙚 𝙩𝙝𝙚 𝙞𝙨𝙨𝙪𝙚.`,
        event.threadID
      );
    }
  },
};
