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

module.exports = {index, lists};