const express = require('express');
const app = express();

// routers
const viewRoutes = require('./routes/view');

// ejs view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// routes
app.use(express.static('./public'));
app.use('/',viewRoutes);

// server initialization
const port = 3001;

app.listen(port, () => {
      console.log(`Server is listening to port ${port}`);
});