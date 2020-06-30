// required npm libs
require('dotenv').config();
const Express = require('express');
const ejsLayouts = require('express-ejs-layouts');
// passport, add custom middleware, sequelize sessions
const helmet = require('helmet');
const session = require('express-session');
const flash = require('flash');

// app setup and middlewares
const app = Express();
app.use(Express.urlencoded({ extended: false }));
app.use(Express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());

// ROUTES
app.get('/', (req, res) => {
  //check is user is logged in
  res.render('index');
});

// include auth controller
app.use('/auth', require('./controllers/auth'));

// initialize app on port
let port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`listening on port ${port}`) });