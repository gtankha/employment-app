const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
//const helpers = require('./utils/helpers');


const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'secret secret schmecret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};



const app = express();
const PORT = process.env.PORT || 3001;


//const hbs = exphbs.create({helpers});
const hbs = exphbs.create({});



app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/image', (req, res) => {

  //sends upload.html to the image route
  console.log('here');
  res.sendFile(path.join(__dirname, './public/upload.html'));
});


// turn on routes
app.use(routes);



// turn on connection to db and server
// force associations aka foreign keys, table will be dropped and recreated if new foreign keys are estabilished
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});