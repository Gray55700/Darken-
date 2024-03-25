const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "bank",
    version: "1.2",
    description: "Deposit or withdraw money from the bank and earn interest",
    guide: {
      vi: "",
      en: "{pn}Bank:\nInterest - Balance\n - Withdraw \n- Deposit \n- Transfer \n- Richest"
    },
    category: "💰 Economy",
    countDown: 15,
    role: 0,
    author: "Loufi | SiAM | Samuel\n\nModified: Shikaki|pharouk"
  },
  onStart: async function ({ args, message, event, api, usersData }) {
    const { getPrefix } = global.utils;
    const p = getPrefix(event.threadID);

    const userMoney = await usersData.get(event.senderID, "money");
    const user = parseInt(event.senderID);
    const info = await api.getUserInfo(user);
    const username = info[user].name;

 const bankDataPath = 'scripts/cmds/bankData.json';

if (!fs.existsSync(bankDataPath)) {
  const initialBankData = {};
  fs.writeFileSync(bankDataPath, JSON.stringify(initialBankData), "utf8");
}

const bankData = JSON.parse(fs.readFileSync(bankDataPath, "utf8"));

if (!bankData[user]) {
  bankData[user] = { bank: 0, lastInterestClaimed: Date.now() };
  fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");
}


  bankBalance = bankData[user].bank || 0;

  const command = args[0]?.toLowerCase();
  const amount = parseInt(args[1]);
  const recipientUID = parseInt(args[2]);

    switch (command) {
case "deposit":
  if (isNaN(amount) || amount <= 0) {
    return message.reply("--------------------\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🟢𝙋𝙡𝙚𝙖𝙨𝙚 𝙚𝙣𝙩𝙚𝙧 𝙖 𝙫𝙖𝙡𝙞𝙙 𝙖𝙢𝙤𝙪𝙣𝙩 𝙩𝙤 𝙙𝙚𝙥𝙤𝙨𝙞𝙩 🔴•\n\n---------------------");
  }


  if (bankBalance >= 1e104) {
    return message.reply("-------------------------\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🔵𝙔𝙤𝙪 𝙘𝙖𝙣𝙣𝙤𝙩 𝙙𝙚𝙥𝙤𝙨𝙞𝙩 𝙢𝙤𝙣𝙚𝙮 𝙬𝙝𝙚𝙣 𝙮𝙤𝙪𝙧 𝙗𝙖𝙣𝙠 𝙗𝙖𝙡𝙖𝙣𝙘𝙚 𝙞𝙨 𝙖𝙡𝙧𝙚𝙖𝙙𝙮 𝙖𝙩 $1e104 💢•\n\n--------------------");
  }

  if (userMoney < amount) {
    return message.reply("----------------------\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n⚫𝙔𝙤𝙪 𝙙𝙤𝙣'𝙩 𝙝𝙖𝙫𝙚 𝙩𝙝𝙚 𝙧𝙚𝙦𝙪𝙞𝙧𝙚𝙙 𝙖𝙢𝙤𝙪𝙣𝙩 𝙩𝙤 𝙙𝙚𝙥𝙤𝙨𝙞𝙩 ⛔•\n\n--------------------");
  }

  bankData[user].bank += amount;
  await usersData.set(event.senderID, {
    money: userMoney - amount
  });
fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");

  return message.reply(`-------------------\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🟣𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮 𝙙𝙚𝙥𝙤𝙨𝙞𝙩𝙚𝙙 $${amount} 𝙞𝙣𝙩𝙤 𝙮𝙤𝙪𝙧 𝙗𝙖𝙣𝙠 𝙖𝙘𝙘𝙤𝙪𝙣𝙩 ✅•\n\n----------------------`);
break;


case "withdraw":
  const balance = bankData[user].bank || 0;

  if (isNaN(amount) || amount <= 0) {
    return message.reply("-------------------╗\n\n[🏦 Bank 🏦]\n\n🟤𝙋𝙡𝙚𝙖𝙨𝙚 𝙚𝙣𝙩𝙚𝙧 𝙩𝙝𝙚 𝙘𝙤𝙧𝙧𝙚𝙘𝙩 𝙖𝙢𝙤𝙪𝙣𝙩 𝙩𝙤 𝙬𝙞𝙩𝙝𝙙𝙧𝙖𝙬 🙄•\n\n----------------------╝");
  }

  if (userMoney >= 1e104) {
    return message.reply("╔------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🚫𝙔𝙤𝙪 𝙘𝙖𝙣𝙣𝙤𝙩 𝙬𝙞𝙩𝙝𝙙𝙧𝙖𝙬 𝙢𝙤𝙣𝙚𝙮 𝙬𝙝𝙚𝙣 𝙮𝙤𝙪𝙧 𝙗𝙖𝙡𝙖𝙣𝙘𝙚 𝙞𝙨 𝙖𝙡𝙧𝙚𝙖𝙙𝙮 𝙖𝙩 1e104 ✔•\n\n╚--------------------╝");
  }

  if (amount > balance) {
    return message.reply("╔--------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n💵𝙏𝙝𝙚 𝙧𝙚𝙦𝙪𝙚𝙨𝙩𝙚𝙙 𝙖𝙢𝙤𝙪𝙣𝙩 𝙞𝙨 𝙜𝙧𝙚𝙖𝙩𝙚𝙧 𝙩𝙝𝙖𝙣 𝙩𝙝𝙚 𝙖𝙫𝙖𝙞𝙡𝙖𝙗𝙡𝙚 𝙗𝙖𝙡𝙖𝙣𝙘𝙚 𝙞𝙣 𝙮𝙤𝙪𝙧 𝙗𝙖𝙣𝙠 𝙖𝙘𝙘𝙤𝙪𝙣𝙩 🗿•\n\n╚-----------------------╝");
  }

  // Continue with the withdrawal if the userMoney is not at 1e104
  bankData[user].bank = balance - amount;
  await usersData.set(event.senderID, {
    money: userMoney + amount
  });
fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");
  return message.reply(`╔-------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n💲𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮 𝙬𝙞𝙩𝙝𝙙𝙧𝙚𝙬 $${amount} 𝙛𝙧𝙤𝙢 𝙮𝙤𝙪𝙧 𝙗𝙖𝙣𝙠 𝙖𝙘𝙘𝙤𝙪𝙣𝙩 🏷•\n\n╚--------------------╝`);
  break;


case "balance":
  const formattedBankBalance = parseFloat(bankBalance);
  if (!isNaN(formattedBankBalance)) {
    return message.reply(`---------------------\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🟡𝙔𝙤𝙪𝙧 𝙗𝙖𝙣𝙠 𝙗𝙖𝙡𝙖𝙣𝙘𝙚 𝙞𝙨: $${formatNumberWithFullForm(formattedBankBalance)}\n\n----------------------`);
  } else {
    return message.reply("----------------------\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🟠𝙀𝙧𝙧𝙤𝙧: 𝙔𝙤𝙪𝙧 𝙗𝙖𝙣𝙠 𝙗𝙖𝙡𝙖𝙣𝙘𝙚 𝙞𝙨 𝙣𝙤𝙩 𝙖 𝙫𝙖𝙡𝙞𝙙 𝙣𝙪𝙢𝙗𝙚𝙧 🛐•\n\n-----------------------");
  }
  break;



case "interest":
  const interestRate = 0.001; // 0.1% daily interest rate
  const lastInterestClaimed = bankData[user].lastInterestClaimed || 0;

  const currentTime = Date.now();
  const timeDiffInSeconds = (currentTime - lastInterestClaimed) / 1000;

  if (timeDiffInSeconds < 86400) {
    // If it's been less than 24 hours since the last interest claim
    const remainingTime = Math.ceil(86400 - timeDiffInSeconds);
    const remainingHours = Math.floor(remainingTime / 3600);
    const remainingMinutes = Math.floor((remainingTime % 3600) / 60);

    return message.reply(`╔-----------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🟤𝙔𝙤𝙪 𝙘𝙖𝙣 𝙘𝙡𝙖𝙞𝙢 𝙞𝙣𝙩𝙚𝙧𝙚𝙨𝙩 𝙖𝙜𝙖𝙞𝙣 𝙞𝙣 ${remainingHours} 𝙝𝙤𝙪𝙧𝙨 𝙖𝙣𝙙 ${remainingMinutes} 𝙢𝙞𝙣𝙪𝙩𝙚𝙨 🚼•\n\n╚---------------------╝`);
  }

  const interestEarned = bankData[user].bank * (interestRate / 970) * timeDiffInSeconds;

  if (bankData[user].bank <= 0) {
        return message.reply("╔---------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🚫𝙔𝙤𝙪 𝙙𝙤𝙣'𝙩 𝙝𝙖𝙫𝙚 𝙖𝙣𝙮 𝙢𝙤𝙣𝙚𝙮 𝙞𝙣 𝙮𝙤𝙪𝙧 𝙗𝙖𝙣𝙠 𝙖𝙘𝙘𝙤𝙪𝙣𝙩 𝙩𝙤 𝙚𝙖𝙧𝙣 𝙞𝙣𝙩𝙚𝙧𝙚𝙨𝙩 💸🥱•\n\n╚----------------------╝");
  }

  bankData[user].lastInterestClaimed = currentTime;
  bankData[user].bank += interestEarned;

fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");


return message.reply(`╔--------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🔵𝙔𝙤𝙪 𝙝𝙖𝙫𝙚 𝙚𝙖𝙧𝙣𝙚𝙙 𝙞𝙣𝙩𝙚𝙧𝙚𝙨𝙩 𝙤𝙛 $${formatNumberWithFullForm(interestEarned)}\n\nIt 𝙝𝙖𝙨 𝙗𝙚𝙚𝙣 𝙨𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮 𝙖𝙙𝙙𝙚𝙙 𝙩𝙤 𝙮𝙤𝙪𝙧 𝙖𝙘𝙘𝙤𝙪𝙣𝙩 𝙗𝙖𝙡𝙖𝙣𝙘𝙚 ⚪•\n\n------------------------`);
break;


case "transfer":
  if (isNaN(amount) || amount <= 0) {
    return message.reply("╔---------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🟢𝙋𝙡𝙚𝙖𝙨𝙚 𝙚𝙣𝙩𝙚𝙧 𝙖 𝙫𝙖𝙡𝙞𝙙 𝙖𝙢𝙤𝙪𝙣𝙩 𝙩𝙤 𝙩𝙧𝙖𝙣𝙨𝙛𝙚𝙧 💯•\n\n╚--------------------╝");
  }

  if (!recipientUID || !bankData[recipientUID]) {
    return message.reply("╔----------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🔵𝙍𝙚𝙘𝙞𝙥𝙞𝙚𝙣𝙩 𝙣𝙤𝙩 𝙛𝙤𝙪𝙣𝙙 𝙞𝙣 𝙩𝙝𝙚 𝙗𝙖𝙣𝙠 𝙙𝙖𝙩𝙖𝙗𝙖𝙨𝙚. 𝙋𝙡𝙚𝙖𝙨𝙚 𝙘𝙝𝙚𝙘𝙠 𝙩𝙝𝙚 𝙧𝙚𝙘𝙞𝙥𝙞𝙚𝙣𝙩'𝙨 𝙄𝘿 🔴•\n\n╚----------------------╝");
  }

  if (recipientUID === user) {
    return message.reply("╔---------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🟣𝙔𝙤𝙪 𝙘𝙖𝙣𝙣𝙤𝙩 𝙩𝙧𝙖𝙣𝙨𝙛𝙚𝙧 𝙢𝙤𝙣𝙚𝙮 𝙩𝙤 𝙮𝙤𝙪𝙧𝙨𝙚𝙡𝙛 🥲•\n\n╚---------------------╝");
  }

  const senderBankBalance = parseFloat(bankData[user].bank) || 0;
  const recipientBankBalance = parseFloat(bankData[recipientUID].bank) || 0;

  if (recipientBankBalance >= 1e104) {
    return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n💅𝙏𝙝𝙚 𝙧𝙚𝙘𝙞𝙥𝙞𝙚𝙣𝙩'𝙨 𝙗𝙖𝙣𝙠 𝙗𝙖𝙡𝙖𝙣𝙘𝙚 𝙞𝙨 𝙖𝙡𝙧𝙚𝙖𝙙𝙮 $1e104. 𝙔𝙤𝙪 𝙘𝙖𝙣𝙣𝙤𝙩 𝙩𝙧𝙖𝙣𝙨𝙛𝙚𝙧 𝙢𝙤𝙣𝙚𝙮 𝙩𝙤 𝙩𝙝𝙚𝙢 🗿•\n\n╚════ஜ۩۞۩ஜ═══╝");
  }

  if (amount > senderBankBalance) {
    return message.reply("╔______________________╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🍑𝙔𝙤𝙪 𝙙𝙤𝙣'𝙩 𝙝𝙖𝙫𝙚 𝙚𝙣𝙤𝙪𝙜𝙝 𝙢𝙤𝙣𝙚𝙮 𝙞𝙣 𝙮𝙤𝙪𝙧 𝙗𝙖𝙣𝙠 𝙖𝙘𝙘𝙤𝙪𝙣𝙩 𝙛𝙤𝙧 𝙩𝙝𝙞𝙨 𝙩𝙧𝙖𝙣𝙨𝙛𝙚𝙧 🙈•\n\n╚------------------╝");
  }

  bankData[user].bank -= amount;
  bankData[recipientUID].bank += amount;
fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");


  return message.reply(`╔------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🥒𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮 𝙩𝙧𝙖𝙣𝙨𝙛𝙚𝙧𝙧𝙚𝙙 $${amount} 𝙩𝙤 𝙩𝙝𝙚 𝙧𝙚𝙘𝙞𝙥𝙞𝙚𝙣𝙩 𝙬𝙞𝙩𝙝 𝙐𝙄𝘿: ${recipientUID} 🍫•\n\n╚---------------------╝`);
break;


case "richest":
  const bankDataCp = JSON.parse(fs.readFileSync('scripts/cmds/bankData.json', 'utf8'));

  const topUsers = Object.entries(bankDataCp)
    .sort(([, a], [, b]) => b.bank - a.bank)
    .slice(0, 10);

  const output = (await Promise.all(topUsers.map(async ([userID, userData], index) => {
    const userName = await usersData.getName(userID);
    const formattedBalance = formatNumberWithFullForm(userData.bank); // Format the bank balance
    return `[${index + 1}. ${userName} - $${formattedBalance}]`;
  }))).join('\n');

  return message.reply("╔----------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🔘𝙏𝙤𝙥 10 𝙧𝙞𝙘𝙝𝙚𝙨𝙩 𝙥𝙚𝙤𝙥𝙡𝙚 𝙖𝙘𝙘𝙤𝙧𝙙𝙞𝙣𝙜 𝙩𝙤 𝙩𝙝𝙚𝙞𝙧 𝙗𝙖𝙣𝙠 𝙗𝙖𝙡𝙖𝙣𝙘𝙚 👑🤴:\n" + output + "\n\n╚-------------------╝");

break;


case "loan":
  const maxLoanAmount = 100000000; //increase of decrease this
  const userLoan = bankData[user].loan || 0;
  const loanPayed = bankData[user].loanPayed !== undefined ? bankData[user].loanPayed : true;

  if (!amount) {
    return message.reply("╔---------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🌊𝙋𝙡𝙚𝙖𝙨𝙚 𝙚𝙣𝙩𝙚𝙧 𝙖 𝙫𝙖𝙡𝙞𝙙 𝙡𝙤𝙖𝙣 𝙖𝙢𝙤𝙪𝙣𝙩 🟥•\n\n╚------------------╝");
  }

  if (amount > maxLoanAmount) {
    return message.reply("╔-------------------╗\n\n[🏦 Bank 🏦]\n\n🏷𝙏𝙝𝙚 𝙢𝙖𝙭𝙞𝙢𝙪𝙢 𝙡𝙤𝙖𝙣 𝙖𝙢𝙤𝙪𝙣𝙩 𝙞𝙨 $100000000 ❗•\n\n╚---------------------╝");
  }

  if (!loanPayed && userLoan > 0) {
    return message.reply(`╔---------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\🔴𝙔𝙤𝙪 𝙘𝙖𝙣𝙣𝙤𝙩 𝙩𝙖𝙠𝙚 𝙖 𝙣𝙚𝙬 𝙡𝙤𝙖𝙣 𝙪𝙣𝙩𝙞𝙡 𝙮𝙤𝙪 𝙥𝙖𝙮 𝙤𝙛𝙛 𝙮𝙤𝙪𝙧 𝙘𝙪𝙧𝙧𝙚𝙣𝙩 𝙡𝙤𝙖𝙣.\n\nYour 𝙘𝙪𝙧𝙧𝙚𝙣𝙩 𝙡𝙤𝙖𝙣 𝙩𝙤 𝙥𝙖𝙮: $${userLoan} 🙄•\n\n╚-------------------╝`);
  }

  bankData[user].loan = userLoan + amount;
  bankData[user].loanPayed = false;
  bankData[user].bank += amount;

fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");


  return message.reply(`╔----------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🟢𝙔𝙤𝙪 have 𝙨𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮 𝙩𝙖𝙠𝙚𝙣 𝙖 𝙡𝙤𝙖𝙣 𝙤𝙛 $${amount}. 𝙋𝙡𝙚𝙖𝙨𝙚 𝙣𝙤𝙩𝙚 𝙩𝙝𝙖𝙩 𝙡𝙤𝙖𝙣𝙨 𝙢𝙪𝙨𝙩 𝙗𝙚 𝙧𝙚𝙥𝙖𝙞𝙙 𝙬𝙞𝙩𝙝𝙞𝙣 a 𝙘𝙚𝙧𝙩𝙖𝙞𝙣 𝙥𝙚𝙧𝙞𝙤𝙙 🥲•\n\n╚--------------------╝`);

break;

case "payloan":
  const loanBalance = bankData[user].loan || 0;

  if (isNaN(amount) || amount <= 0) {
    return message.reply("╔--------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🔴𝙋𝙡𝙚𝙖𝙨𝙚 𝙚𝙣𝙩𝙚𝙧 𝙖 𝙫𝙖𝙡𝙞𝙙 𝙖𝙢𝙤𝙪𝙣𝙩 𝙩𝙤 𝙧𝙚𝙥𝙖𝙮 𝙮𝙤𝙪𝙧 𝙡𝙤𝙖𝙣 🤡•\n\n╚-------------------╝");
  }

  if (loanBalance <= 0) {
    return message.reply("--------------------\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n 𝙮𝙤𝙪 𝙙𝙤𝙣'𝙩 𝙝𝙖𝙫𝙚 𝙖𝙣𝙮 𝙥𝙚𝙣𝙙𝙞𝙣𝙜 𝙡𝙤𝙖𝙣 𝙥𝙖𝙮𝙢𝙚𝙣𝙩𝙨•\n\n✧⁺⸜(●˙▾˙●)⸝⁺✧ʸᵃʸ\n\n╚════ஜ------------------╝");
  }

  if (amount > loanBalance) {
    return message.reply(`╔-------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n🔵𝙏𝙝𝙚 𝙖𝙢𝙤𝙪𝙣𝙩 𝙧𝙚𝙦𝙪𝙞𝙧𝙚𝙙 𝙩𝙤 𝙥𝙖𝙮 𝙤𝙛𝙛 𝙩𝙝𝙚 𝙡𝙤𝙖𝙣 𝙞𝙨 𝙜𝙧𝙚𝙖𝙩𝙚𝙧 𝙩𝙝𝙖𝙣 𝙮𝙤𝙪𝙧 𝙙𝙪𝙚 𝙖𝙢𝙤𝙪𝙣𝙩. 𝙋𝙡𝙚𝙖𝙨𝙚 𝙥𝙖𝙮 𝙩𝙝𝙚 𝙚𝙭𝙖𝙘𝙩 𝙖𝙢𝙤𝙪𝙣𝙩 😊•\nYour 𝙩𝙤𝙩𝙖𝙡 𝙡𝙤𝙖𝙣: $${loanBalance}\n\n╚--------------------╝`);
  }

  if (amount > userMoney) {
    return message.reply(`╔----------------------╗\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n⛔𝙔𝙤𝙪 𝙙𝙤 𝙣𝙤𝙩 𝙝𝙖𝙫𝙚 $${amount} 𝙞𝙣 𝙮𝙤𝙪𝙧 𝙗𝙖𝙡𝙖𝙣𝙘𝙚 𝙩𝙤 𝙧𝙚𝙥𝙖𝙮 𝙩𝙝𝙚 𝙡𝙤𝙖𝙣 😢•\n\n╚𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡𝙡╝`);
  }

  bankData[user].loan = loanBalance - amount;

  if (loanBalance - amount === 0) {
    bankData[user].loanPayed = true;
  }

  await usersData.set(event.senderID, {
    money: userMoney - amount
  });

fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");


  return message.reply(`______________________\n\n[🏦 𝘽𝘼𝙉𝙆 🏦]\n\n❏𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮 📜 𝙧𝙚𝙥𝙖𝙞𝙙 $${amount} 𝙩𝙤𝙬𝙖𝙧𝙙𝙨 𝙮𝙤𝙪𝙧 𝙡𝙤𝙖𝙣. 𝙔𝙤𝙪𝙧 𝙘𝙪𝙧𝙧𝙚𝙣𝙩 𝙡𝙤𝙖𝙣 𝙩𝙤 𝙥𝙖𝙮 🏷: $${bankData[user].𝙡𝙤𝙖𝙣} ✔•\n\n________________________`);

break;

default:
  return message.reply("____________________\n\n[🏦 𝘽𝙖𝙣𝙠 🏦]\n\n⚪𝙋𝙡𝙚𝙖𝙨𝙚 𝙪𝙨𝙚 𝙤𝙣𝙚 𝙤𝙛 𝙩𝙝𝙚 𝙛𝙤𝙡𝙡𝙤𝙬𝙞𝙣𝙜 𝙫𝙖𝙡𝙞𝙙 𝙘𝙤𝙢𝙢𝙖𝙣𝙙𝙨: 📜𝘿𝙚𝙥𝙤𝙨𝙞𝙩📜\n____________________\n 📜𝙒𝙞𝙩𝙝𝙙𝙧𝙖𝙬📜\n_______________________\n 📜𝘽𝙖𝙡𝙖𝙣𝙘𝙚📜\n______________________\𝙣📜 𝙄𝙣𝙩𝙚𝙧𝙚𝙨𝙩📜 \n______________________\n 📜𝙏𝙧𝙖𝙣𝙨𝙛𝙚𝙧 📜\n_____________________ \n 📜𝘾𝙡𝙞𝙘𝙝é𝙨📜 \n________________________\𝙣📜 𝙇𝙤𝙖𝙣 📜\n______________________\n 📜𝙋𝙖𝙮𝙇𝙤𝙖𝙣📜\n\n____________________\n 🏦𝘽𝘼𝙉𝙆🏦");
}
  }
};

// Function to format a number with full forms (e.g., 1 Thousand, 133 Million, 76.2 Billion)
function formatNumberWithFullForm(number) {
  const fullForms = [
    "",
    "Thousand",
    "Million",
    "Billion",
    "Trillion",
    "Quadrillion",
    "Quintillion",
    "Sextillion",
    "Septillion",
    "Octillion",
    "Nonillion",
    "Decillion",
    "Undecillion",
    "Duodecillion",
    "Tredecillion",
    "Quattuordecillion",
    "Quindecillion",
    "Sexdecillion",
    "Septendecillion",
    "Octodecillion",
    "Novemdecillion",
    "Vigintillion",
    "Unvigintillion",
    "Duovigintillion",
    "Tresvigintillion",
    "Quattuorvigintillion",
    "Quinvigintillion",
    "Sesvigintillion",
    "Septemvigintillion",
    "Octovigintillion",
    "Novemvigintillion",
    "Trigintillion",
    "Untrigintillion",
    "Duotrigintillion",
    "Googol",
  ];

  // Calculate the full form of the number (e.g., Thousand, Million, Billion)
  let fullFormIndex = 0;
  while (number >= 1000 && fullFormIndex < fullForms.length - 1) {
    number /= 1000;
    fullFormIndex++;
  }

  // Format the number with two digits after the decimal point
  const formattedNumber = number.toFixed(2);

  // Add the full form to the formatted number
  return `${formattedNumber} ${fullForms[fullFormIndex]}`;
}
