const path = require('path');
const express = require('express');
const dotnev = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');

// Load Config
dotnev.config({ path: './config/config.env'});

// Connect to MongoDB
connectDB();

const app = express();

// LOGGING
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// HANDLEBARS
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// STATIC CONTENT FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV}
 mode on port ${PORT}`));