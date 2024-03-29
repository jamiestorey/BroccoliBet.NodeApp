const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotnev = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
//const MongoStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongodb-session')(session);

const connectDB = require('./config/db');

// Load Config
dotnev.config({ path: './config/config.env' });

// PASSPORT CONFIG
require('./config/passport')(passport)

// Connect to MongoDB
connectDB();

const app = express();

// BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );

// LOGGING
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// HANDLEBARSHELPERS
const { formatDate,
    stripTags,
    truncate,
    editIcon,
    select, } = require('./helpers/hbs');

// HANDLEBARS
app.engine('.hbs', exphbs.engine({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select,
    },
    defaultLayout: 'main', extname: '.hbs'
}));
app.set('view engine', '.hbs');

const store = new MongoStore({
    uri: process.env.MONGO_URI,
    databaseName: 'testbbet',
    collection: 'sessions',
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

// SESSIONS
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    // cookie: {secure: true}
}));

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// Set global var
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
  });

// STATIC CONTENT FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));
app.use('/fixtures', require('./routes/fixtures'));
app.use('/bets', require('./routes/bets'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV}
 mode on port ${PORT}`));