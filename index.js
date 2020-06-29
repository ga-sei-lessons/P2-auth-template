// required npm libs
require('dotenv').config();
const Express = require('express');
const ejsLayouts = require('express-ejs-layouts');

// app setup and middlewares
const app = Express();
app.use(Express.urlencoded({ extended: false }));
app.use(Express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);

// ROUTES
app.get('/', (req, res) => {
  //check is user is logged in
  res.render('index');
});

// initialize app on port
let port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`listening on port ${port}`) });