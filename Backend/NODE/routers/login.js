const express = require('express')
const router = new express.Router()
const Login = require('../models/login')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')

router.post('/signup',async (req, res) => {
  try {
      const login = new Login({
       
        password: req.body.password       
        
      });

      const result = await login.save();
      res.status(200).json(result);
  } catch (err) {
      res.status(500).json({
          error: err.message
      });
  }
});

router.post('/login', (req, res) => {
  const { password } = req.body;

  Login.find({ password })
    .exec()
    .then((login) => {
      if (login.length < 1) {
        return res.status(401).json({
          msg: 'User does not exist',
        });
      }

      res.status(200).json({
        msg: 'Login successful',
        password: login[0].password
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
});


router.get('/login',(req,res)=>{
  Login.find()
  .then(result=>{
   res.status(200).json(
  result
  )
}).catch(err=>{
  console.log(err)
  res.status(500).json({
  error:err
  })
 })
})

// router.post('/login', async (req, res) => {
//   try {
//       const login = new Login({
//         boothId: req.body.boothId
    
//       });

//       const result = await login.save();
//       res.status(200).json(result);
//   } catch (err) {
//       res.status(500).json({
//           error: err.message
//       });
//   }
// });

// Login endpoint
// router.post('/login', async (req, res) => {
//   const { boothId } = req.body;

//   try {
//     const db = client.db();
//     const loginCollection = db.collection('logins');

//     const login = await loginCollection.findOne({ boothId });

//     if (login) {
//       // Booth ID exists, successful login
//       res.json({ success: true, message: 'Login successful' });
//     } else {
//       // Booth ID is incorrect or doesn't exist, login failed
//       res.json({ success: false, message: 'Invalid booth ID' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });


  

module.exports = router