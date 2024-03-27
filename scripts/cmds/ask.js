const axios = require('axios');

const Prefixes = [
  '/ai',
  'gear',
  'préscilia ',
  '+ai',
  'shinmon',
  'ai',
  'ask',
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("🧛𝘿𝙍𝘼𝘾𝙐𝙇𝘼🧛 \n____________________\n 𝘾𝘼𝙉 𝙔𝙊𝙐 𝘼𝙎𝙆 𝙔𝙊𝙐𝙍 𝙌𝙐𝙀𝙎𝙏𝙄𝙊𝙉............?  ");
        return;
      }


      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 
    await message.reply({ body: `🧛𝘿𝙍𝘼𝘾𝙐𝙇𝘼🧛
_______________________
${answer}
𝘿𝙍𝘼𝘾𝙐𝙇𝘼 💢`,
});

   } catch (error) {
      console.error("Error:", error.message);
    }
  }
}
