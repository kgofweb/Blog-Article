const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Create app
const app = express();

// Parser
app.use(bodyParser.urlencoded({ extended: false }));
// Override
app.use(methodOverride('_method'));

// DB Connect
const db = require('./config/key').MongoURI;
mongoose.connect(db, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})
.then(() => console.log('MongoDB connected...'))
.catch(() => console.log('MongoDB connect failed...'));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Route
const indexRout = require('./routes/index');
const articlesRout = require('./routes/articles');

// Route middlware
app.use('/', indexRout);
app.use('/articles', articlesRout);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server runing on PORT ${PORT}`) });