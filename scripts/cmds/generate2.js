const axios = require("axios");

 module.exports = {
  config: {
    name: "generate2",
aliases: ['genv2'],
    version: "1.1",
    author: "your dad", //pharouk
    countDown: 0,
    role: 2,
    shortDescription: {
      en: 'Text to Image'
    },
    longDescription: {
      en: "Text to image"
    },
    category: "image",
    guide: {
      en: '{pn} your prompt'
    }
  },
  onStart: async function ({ message, api, args, event }) {
    const text = args.join(' ');

    if (!text) {
      return message.reply("𝙋𝙡𝙚𝙖𝙨𝙚 𝙥𝙧𝙤𝙫𝙞𝙙𝙚 𝙖 𝙥𝙧𝙤𝙢𝙥𝙩");
    }

    const [prompt, model] = text.split('|').map((text) => text.trim());
    const puti = model || "3";
    const baseURL = `https://sandipapi.onrender.com/gen?prompt=${prompt}&model=${puti}`;

    api.setMessageReaction("🟡", event.messageID, () => {}, true);

    message.reply("🔵| 𝙒𝘼𝙄𝙏 ........", async (err, info) => {
      message.reply({
        attachment: await global.utils.getStreamFromURL(baseURL)
      });
      let ui = info.messageID;
      message.unsend(ui);
      api.setMessageReaction("🟠", event.messageID, () => {}, true);
    });
  }
};
