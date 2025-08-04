const express = require('express');
const app = express();
const path = require('path');
const {engine} = require('express-handlebars')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const flashMessage = require('connect-flash');
const {mongoDbUrl} = require('./config/database');
const passport = require('passport');
;



mongoose.connect(mongoDbUrl).then((db)=>{
    console.log('Conneceted');
}).catch(error=>console.log(error));
mongoose.Promise = global.Promise;



const {select, generateDate} = require('./helpers/handlebar-helpers');

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', engine({ 
    extname: '.handlebars', // Specify the file extension for Handlebars templates
    defaultLayout: 'home', //  (Optional) Specify a default layout file
    helpers: {select: select,generateDate:generateDate}
}));

// app.engine('handlebars', exphbs({defaultLayout:'home'}));
app.set('view engine', 'handlebars')

app.use(fileUpload());

//body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(methodOverride('_method'));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(flashMessage());
// PASSPORT

app.use(passport.initialize());
app.use(passport.session());

//local var suing middleware
app.use((req, res, next)=>{
    res.locals.user = req.user || null;
    res.locals.success_message = req.flashMessage('success_message');
    res.locals.error_message = req.flashMessage('error_message');
    res.locals.form_errors = req.flashMessage('form_errors');
    res.locals.error = req.flashMessage('error');
    next();
});

//routes
const homeRoutes = require('./routes/home/home-routes');
const adminRoutes = require('./routes/admin/admin-routes');
const postsRoutes = require('./routes/admin/posts');
const categoriesRoutes = require('./routes/admin/categories');

app.use('/',homeRoutes);
app.use('/admin',adminRoutes);
app.use('/admin/posts',postsRoutes);
app.use('/admin/categories',categoriesRoutes);


app.listen(4100,()=>{
    console.log(`app running on 4100`)
})