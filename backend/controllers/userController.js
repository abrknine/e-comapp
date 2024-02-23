const User=require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const registerUser = asyncHandler(async (req, res) => {
   try {
       const { name, email, password, pic } = req.body;

    

       const userExists = await User.findOne({ email});
        if(userExists){
            res.status(400);
            throw new Error('User already exists');
        }
        const user = await User.create({name,email,password,pic});

        if(user){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                pic:user.pic,
                token:generateToken(user._id) ,
            });}
            else{
                res.status(400);
                throw new Error('Invalid user data');   
            }

   
  
   } 
   catch (error) {
       console.error('Error during registration:', error.message);

       res.status(500).json({ error: 'Internal Server Error' });
   }
}
)



const authuser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    console.log(req.body);
    const userExist = await User.findOne({ email });
  
    if (userExist && (await userExist.matchPassword(password))) {
      res.json({
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        isAdmin: userExist.isAdmin,
        pic: userExist.pic,
        token:generateToken(userExist._id) ,
      });
    } else {
      res.status(400);
      throw new Error('Email or password incorrect');
    }
  });
  
module.exports = { registerUser ,authuser };
