const user = require("../teleBotAPI/mongoDb");

async function start(msg, match) {
  const chatId = msg.chat.id;
  const resp = `List of chats are here
                      /addAmount
                      /expenses
                      /balance`;
  return { chatId: chatId, message: resp };
}

async function addAmount(chatId, Amount, match) {
  try {
    if (typeof Amount !== 'number' || isNaN(Amount)) {
      return { Amount: Amount, message: `🤨! Please Enter a number` };
    }

    let existingUser = await user.findOne({ user: chatId });

    if (!existingUser) {
      existingUser = new user({
        user: chatId,
        addAmount: Number(Amount),
        expenses: Number(0),
        balance: Number(Amount)
      });
    } else {
      existingUser.addAmount = Number(existingUser.addAmount) + Amount;
      existingUser.balance = Number(existingUser.balance) + Amount;
    }
    await existingUser.save();

    return { Amount: Amount, message: `Your Amount rupees ${Amount} is added to your wallet` };
  } catch (error) {
    console.log(error);
    return { Amount: Amount, message: `An error occurred while updating amount` };
  }
}

async function expenses(chatId, expense, match) {
  try {
    if (typeof expense !== 'number' || isNaN(expense)) {
      return { Amount: expense, message: `🤨! Please Enter a number` };
    }

    let existingUser = await user.findOne({ user: chatId });

    if (!existingUser) {
      existingUser = new user({
        user: chatId,
        addAmount: Number(0),
        expenses: Number(`-${expense}`),
        balance: Number(`-${expense}`)
      });
    } else {
      existingUser.expenses = Number(existingUser.expenses) + expense;
      existingUser.balance = Number(existingUser.balance) - expense;
    }
    await existingUser.save();

    return { Amount: expense, message: `${expense} rupees debited from your wallet` };
  } catch (error) {
    console.log(error);
    return { Amount: expense, message: `An error occurred while updating amount` };
  }
}

async function balance(chatId, match) {
  try {
    let balance
    let existingUser = await user.findOne({ user: chatId });
    if (existingUser) {
      balance = existingUser.balance
      return { Amount: balance, message: `Rupees ${balance} left in your account` };
    } else {
      return { Amount: balance, message: `please add amount to update the balance` };
    }

  } catch (error) {
    console.log(error);
    return { Amount: balance, message: `An error occurred while retriving balance` };
  }
}
module.exports = {
  start,
  addAmount,
  expenses,
  balance,
};
