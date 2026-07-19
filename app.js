require('dotenv').config();
const express = require('express');
const app = express();

// connectDB
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

// routers
const viewRouter = require('./routes/view');
const listsRouter = require('./routes/lists');
const authRouter = require('./routes/auth');

// ejs view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());

// routes
app.use(express.static('./public'));
app.use('/',viewRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/lists', authenticateUser, listsRouter);

// server initialization
const port = process.env.PORT || 3001;

const start = async () => {
      try {
            connectDB(process.env.MONGO_URI);
            app.listen(port, () => {
                  console.log(`Server is listening to port ${port}`);
            });
      } catch(error) {
            console.log(error);
            
      }
};

start();

/*
missing features:
signup user function
proper bug report
delete list
create new list
add bug output on frontend: editing list, new list, can't load lists
give it a proper UI design
 */