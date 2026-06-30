const express = require('express');
const app = express();

// routers
const viewRouter = require('./routes/view');
const listsRouter = require('./routes/lists');

// ejs view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// routes
app.use(express.static('./public'));
app.use('/',viewRouter);
app.use('/api/v1/lists',listsRouter);

// server initialization
const port = process.env.PORT || 3001;

const start = async () => {
      try {
            app.listen(port, () => {
                  console.log(`Server is listening to port ${port}`);
            });
      } catch(error) {
            console.log(error);
            
      }
};

start();