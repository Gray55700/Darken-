const fs = require("fs-extra");

module.exports = {
	config: {
		name: "restart",
		version: "1.1",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "Khởi động lại bot",
			en: "Restart bot"
		},
		category: "Owner",
		guide: {
			vi: "   {pn}: Khởi động lại bot",
			en: "   {pn}: Restart bot"
		}
	},

	langs: {
		vi: {
			restartting: "🔄 | Đang khởi động lại bot..."
		},
		en: {
			restartting: "⛔ | 𝘿𝙊𝙉𝙉𝙀 𝙈𝙊𝙄 𝙌𝙐𝙀𝙇𝙌𝙐𝙀 𝙈𝙄𝙉𝙐𝙏𝙀 𝘼𝙁𝙄𝙉 𝙌𝙐𝙀 𝙅𝙀 𝙈𝙀 𝙍𝙀𝘾𝙃𝘼𝙍𝙂𝙀 𝘽𝙊𝙎𝙎 ......(ಠ⌣ಠ)"
		}
	},

	onLoad: function ({ api }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		if (fs.existsSync(pathFile)) {
			const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
			api.sendMessage(`📝 | 𝘽𝙊𝙏 𝘼𝙎 𝘽𝙀𝙀𝙉 𝙍𝙀𝙎𝙏𝘼𝙍𝙏 \n⏰ | 𝙏𝙄𝙈𝙀: ${(Date.now() - time) / 1000}s`, tid);
			fs.unlinkSync(pathFile);
		}
	},

	onStart: async function ({ message, event, getLang }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
		await message.reply(getLang("restartting"));
		process.exit(2);
	}
};
