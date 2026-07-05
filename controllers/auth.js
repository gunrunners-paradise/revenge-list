const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const asyncHandler = require('express-async-handler');

const register = asyncHandler( async (req,res) => {
      const user = await User.create({...req.body});
      const token = user.createJWT();
      res.status(StatusCodes.CREATED)
      .json({user: {name: user.name}, token});
});

const login = asyncHandler( async (req,res) => {
      const {email, password} = req.body;
      if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST)
            .json({msg: 'please provide email and password'});
      }

      const user = await User.findOne({email});
      if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED)
            .json({msg: 'Invalid credentials'});
      }

      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
            return res.status(StatusCodes.UNAUTHORIZED)
            .json({msg: 'Invalid credentials'});
      }

      const token = user.createJWT();

      res.status(StatusCodes.OK).json({user: user.name, token});
      //res.send('logged in');
});

module.exports = {register,login};