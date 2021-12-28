const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const flash = require('connect-flash')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 5000

require('dotenv').config()

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(expressLayouts)
app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret: 'CookingBlogSecretSession',
    saveUninitialized: true,
    resave: true
  }));
app.use(flash());
app.use(fileUpload());
app.use(methodOverride('_method'));

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes =  require('./routes/indexRoute.js');
app.use('/', routes);

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})
