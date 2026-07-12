const index = (req,res) => {
      res.render('index', {
            title: 'Revenge App'
      });
};    

module.exports = {index};