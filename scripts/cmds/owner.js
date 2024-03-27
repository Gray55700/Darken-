const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    aliases: ["info","pharouk"],
    author: " pharouk ", 
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "get bot owner info"
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
      try {
        const loadingMessage = "𝙒𝘼𝙄𝙏 𝙈𝘼𝙎𝙏𝙀𝙍🔹🔸🔹🔸";
        await api.sendMessage(loadingMessage, event.threadID);

        const ownerInfo = {
          name: '🔖𝙎𝙄𝘿𝙄𝘽𝙀 oumar El 𝙋𝙃𝘼𝙍𝙊𝙐𝙆🏷',
          gender: 'Boy',
          hobby: '𝙋𝙇𝘼𝙔 🏀𝘽𝘼𝙎𝙆𝙀𝙏𝘽𝘼𝙇𝙇🏀 with my best friends🇺🇸 ',
          relationship: '𝙈𝘼𝙍𝙍𝙄𝙀𝘿 with 𝙈𝙔 𝘽𝘼𝘽𝙔 𝙋𝙍É𝙎𝘾𝙄𝙇𝙄𝘼 i love this girl 🥺',
          facebookLink: 'https://www.facebook.com/more.sidibe.1?mibextid=JRoKGi/pharouk ',
          bio: '𝙋𝙇𝘼𝙔 𝘽𝘼𝙎𝙆𝙀𝙏𝘽𝘼𝙇𝙇 is 𝙈𝙔 𝘿𝙍𝙀𝘼𝙈 🔖'
        };

        const videoUrl = 
["https://i.imgur.com/ZpgBKGA.mp4",
"https://i.imgur.com/h6J9tkb.mp4",
"https://i.imgur.com/RmMI3dC.mp4",
"https://i.imgur.com/jeyjWuk.mp4",
"https://i.imgur.com/HIWaV6d.mp4",
"https://i.imgur.com/BXmgByZ.mp4",
"https://i.imgur.com/wuo18rR.mp4",
"https://i.imgur.com/C4neV9i.mp4",
"https://i.imgur.com/pdr6e4T.mp4",
"https://i.imgur.com/OAmV2Wr.mp4",
"https://i.imgur.com/gPl8sV2.mp4",
"https://i.imgur.com/nU8Gsyn.mp4",];
        const tmpFolderPath = path.join(__dirname, 'tmp');

        if (!fs.existsSync(tmpFolderPath)) {
          fs.mkdirSync(tmpFolderPath);
        }

        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

        fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

        const response = `
          𝗼𝘄𝗻𝗲𝗿 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻📑:
⊰🔖_________
(◍•ᴗ•◍)𝗡𝗔𝗠𝗘 : ${ownerInfo.name}
⊰🔖__________
♀𝗚𝗘𝗡𝗥𝗘♂: ${ownerInfo.gender}
⊰🔖__________
🏓𝗛𝗢𝗕𝗕𝗬⛹‍♂: ${ownerInfo.hobby}
⊰🔖__________
𝗥𝗘𝗟𝗔𝗧𝗢𝗡𝗦𝗛𝗜💞: ${ownerInfo.relationship}
⊰🔖__________
➤🔖 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞🔗: ${ownerInfo.facebookLink}
⊰🔖__________
      ◈ 𝗦𝗧𝗔𝗧𝗨𝗦 ◈: ${ownerInfo.bio} 🇨🇮
        `;

        await api.sendMessage({
          body: response,
          attachment: fs.createReadStream(videoPath)
        }, event.threadID);
      } catch (error) {
        console.error('Error in owner command:', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
      }
    },
    onChat: async function({ api, event }) {
      try {
        const lowerCaseBody = event.body.toLowerCase();
        
        if (lowerCaseBody === "owner" || lowerCaseBody.startsWith("{p}owner")) {
          await this.onStart({ api, event });
        }
      } catch (error) {
        console.error('Error in onChat function:', error);
      }
    }
  };
