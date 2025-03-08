const mongoose = require("mongoose");
const express = require("express");
const { string } = require("zod");
const app = express();

mongoose.connect("mongodb+srv://Pkriya:Verma%4010@cluster0.donpi.mongodb.net/User_Data_new");

const Usershema = mongoose.Schema( 
 {  username: {
  type: String,
  required: true,
  unique: true,
  trim: true,
  lowercase: true,
  minLength: 3,
  maxLength: 30
 },
 password: {
  type: String,
  required: true,
  minLength: 6
 },
firstname: {
  type: String,
  required: true,
  triim: true,
  maxLength: 50
},
lastname: {
  type: String,
  required: true,
  trim: true,
  maxLength: 50
}
    });

    const accountSchema = mongoose.Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
      },
      balance: {
        type: Number,
        required: true
      }
    });

const Account = mongoose.model("Account", accountSchema);
const Users = mongoose.model("Users", Usershema);

module.exports = {
  Users,
  Account
}