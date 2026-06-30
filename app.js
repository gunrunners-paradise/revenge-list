const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));

app.get('/', (req,res) => {
      res.render('index', {
            title: 'Revenge App'
      });
});

const port = 3001;

app.listen(port, () => {
      console.log(`Server is listening to port ${port}`);
});