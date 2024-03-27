module.exports = {
  config: {
    name: "uptime3",
    aliases: ["up3", "upt3"],
    version: "1.0",
    author: "XyryllPanget",
    role: 0,
    shortDescription: {
      en: "Displays the uptime of the bot."
    },
    longDescription: {
      en: "Displays the amount of time that the bot has been running for."
    },
    category: "System",
    guide: {
      en: "Use {p}uptime to display the uptime of the bot."
    }
  },
  onStart: async function ({ api, event, args }) {
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${hours} hours ${minutes} minutes ${seconds} second`;
    api.sendMessage(`🧑‍🏫|𝙃𝙄 𝙈𝘼𝙎𝙏𝙀𝙍📑 \n___________________\n, 🎀 𝙎𝘼𝙆𝙐𝙍𝘼 𝘼𝙎 𝘽𝙀𝙀𝙉 𝙍𝙐𝙉𝙄𝙉𝘿 𝙁𝙊𝙍 \n____________________\n⏰${uptimeString}\n\n______________________🧛𝘿𝙍𝘼𝘾𝙐𝙇𝘼🧛.`, event.threadID);
  }
};
