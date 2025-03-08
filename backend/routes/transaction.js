const mongoose = require("mongoose");
const Account = require("../db")

const transferfunds = async (fromAccountid, toAccountId, amount) => {
    // Decrement the balance of the from account 
    await Account.findBIdAndUpadate(fromAccountid, { $inc: {balance: -amount } });

    //Increament the balance of the toAccount 
    await Account.findByIdANdUpdate(toAccountId, { $inc: {balance: amount } });
}

//Emaple usage
transferfunds("fromAccountid", 'toAccountId', 100);