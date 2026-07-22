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

// error handler
const errorHandlerMiddleware = require('./middleware/error-handler');

// ejs view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());

// routes
app.use(express.static('./public'));
app.use('/',viewRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/lists', authenticateUser, listsRouter);

app.use(errorHandlerMiddleware);

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
upcoming features:
signup user function
add bug output on frontend: editing list, new list, can't load lists, etc
give it a proper UI design
 */