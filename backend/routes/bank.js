const express = require("express");
const  {authMiddleware} = require("../middleware");
const { Users, Account } = require('../db');
const { default: mongoose } = require("mongoose");
const router = express.Router();
const z = require("zod");

const zodtransfer = z.object({
    amount: z.string(),
    to: z.string()
});

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId
  });
  const user = await Users.findOne({
    _id: req.userId
  });
  res.json({
    balance: account.balance,
    firstname: user.firstname
  })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const body = req.body;
    const { success } = zodtransfer.safeParse(body);
    if(!success){
      return res.status(403).json({
         msg: "wrong input validation"
      })
     }

    const { amount, to } = body;
    const account = await Account.findOne({
    userId: req.userId
   }).session(session);

   if(!account || account.balance < amount){
    await session.abortTransaction();
    return res.status(400).json({
        msg: "InSufficient balance"
    });
   }

   const toAccount = await Account.findOne({
    userId: to
   }).session(session);

   if(!toAccount){
    await session.abortTransaction();
    return res.status(400).json({
        msg: "Account not found"
    });
   }

   //perform the transaction
   await Account.updateOne({ 
    userId: req.userId
   }, {
    $inc: {balance: -amount }
   }).session(session);
  
   await Account.updateOne({
    userId: to
   }, {
    $inc: {balance: amount }
   }).session(session);

   //commit the transaction
   await session.commitTransaction();
   res.json({
    msg: "money transfered successfully"
   })
});

router

module.exports = router;