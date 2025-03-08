const express = require('express');
const router = express.Router();
const z = require("zod");
const { Users, Account } = require('../db');
const { JWT_Secret } = require('../config');
const jwt = require("jsonwebtoken");
const { authMiddleware } = require('../middleware');

const zodsignup = z.object({
   username: z.string(),
   password: z.string().min(6),
   lastname: z.string().min(3).max(50), 
   firstname: z.string().min(3).max(50),
});

const zodsignin = z.object({
   username: z.string(),
   password: z.string().min(6)
});

const zodupdate = z.object({
   password: z.string().optional(),
   firstname: z.string().optional(),
   lastname: z.string().optional()
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = zodsignup.safeParse(req.body);
  if(!success){
   return res.json({
      msg: "wrong input validation"
   })
  }
  const user = await Users.findOne({
   username: body.username
  })
  if(user){
   return res.status(411).json({
      msg: "User already exists"
   })
  }
  const dbuser = await Users.create({
   username: body.username,
   password: body.password,
   firstname: body.firstname,
   lastname: body.lastname
  });
  
  await Account.create({
   userId: dbuser._id,
   balance: 1 + Math.random() * 10000
  })

  const token = jwt.sign({
   userId: dbuser._id
  }, JWT_Secret)

  
  res.json({
   msg: "User created successfully",
   token: token
  })
});

router.post("/signin", async (req, res) => {
   const body = req.body;
   const {success} = zodsignin.safeParse(body);
   if(!success){
     return res.status(411).json({
         msg: "Wrong input validation"
      })
   }
   const user = await Users.findOne({
      username: body.username,
      password: body.password
   });

   if(user){
 const token = jwt.sign({
   userId: user._id
 }, JWT_Secret)
         res.json({
          token: token
         })
         return;
      }
      else{
         return res.status(411).json({
            msg: "Authentication verification are wrong"
         })
      }
   });
   
   router.put("/signin/update", authMiddleware, async (req, res) => {
         const { success } = zodupdate.safeParse(req.body);
         if(!success) {
           return res.status(411).json({
               msg: "Error while updating information put correct type of data and check again"
            })
         }

    await Users.updateOne(
      { _id: req.userId }, // Ensure correct user is being updated
      { $set: req.body }
  );
    res.json({
      msg: "Updated"
    })
   })

   router.get("/bulk", async (req, res) => {
      const filter = req.query.filter || "";
      const users = await Users.find({
         $or: [{
            firstname: {
               "$regex": filter
         }
    },        {
               lastname: {
                  "$regex" : filter
               }
            }]
         })

         res.json({
            user: users.map(user => ({
               username: user.username,
               firstname: user.firstname,
               lastname: user.lastname,
               _id: user._id
            }))
         })
       })

module.exports = router;