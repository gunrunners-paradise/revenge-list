const index = (req,res) => {
      res.render('index', {
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

module.exports = {index, lists, create};