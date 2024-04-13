const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const config = require("../teleBotAPI/config");
const routes = require("../teleBotAPI/routes");
const token = config.token;
const bot = new TelegramBot(token, { polling: true });
const uri = config.uri;
mongoose
  .connect(uri)
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.error(e);
  });

bot.onText(/\/start/, async (msg, match) => {
  const userName = msg
  console.log(userName.chat);
  const res = await routes.start(msg, match);
  bot.sendMessage(res.chatId, res.message);
});
bot.onText(/\/addAmount/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userName = msg
  console.log(userName.chat);
  setTimeout(() => {
    bot.sendMessage(chatId, "Enter Amount to be added 👇");
    bot.once("text", async (msg, response) => {
      const chatId = msg.chat.id;
      const Amount = Number(msg.text);
      const res = await routes.addAmount(chatId, Amount, match);
      bot.sendMessage(chatId, res.message);
    });
  }, 0);
});

bot.onText(/\/expenses/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userName = msg
  console.log(userName.chat);
  setTimeout(() => {
    bot.sendMessage(chatId, "Enter your expense here 👇");
    bot.once("text", async (msg, response) => {
      const chatId = msg.chat.id;
      const expense = Number(msg.text);
      const res = await routes.expenses(chatId, expense, match);
      bot.sendMessage(chatId, res.message);
    });
  }, 0);
});

bot.onText(/\/balance/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userName = msg
  console.log(userName.chat);
  const res = await routes.balance(chatId, match);
  bot.sendMessage(chatId, res.message);
});

// bot.on("text", (msg, res) => {
//   if (msg.entities) {
//   } else {
//     const chatId = msg.chat.id;
//     const message = msg.text;
//     bot.sendMessage(chatId, message);
//     setTimeout(() => {
//       bot.sendMessage(
//         chatId,
//         `start here 👇
//     /start`
//       );
//     }, 0);
//   }
// });
// bot.onReplyToMessage("", (msg, res) => {
//   const chatId = msg.chat.id;
//   const message = msg.chat.message;
//   bot.sendMessage(chatId, message);
// });
