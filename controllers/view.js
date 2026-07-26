const index = (req,res) => {
      res.render('login', {
            title: 'Revenge App'
      });
};

const register = (req,res) => {
      res.render('register', {
            title: 'Revenge App'
      });
};

const lists = (req,res) => {
      res.render('lists', {
            title: 'Revenge App'
      });
};

const create = (req,res) => {
      res.render('create', {
            title: 'Revenge App'
      });
};

module.exports = {index, register, lists, create};