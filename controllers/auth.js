const User = require('../models/User');

const register = (req,res) => {
      res.send('registered');
};

const login = (req,res) => {
      res.send('logged in');
};

module.exports = {register,login};