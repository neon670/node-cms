const express = require('express');
const app = express();
const path = require('path');
const {engine} = require('express-handlebars')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const flashMessage = require("connect-flash");



mongoose.connect('mongodb://localhost:27017/node-cms').then((db)=>{
    console.log('Conneceted');
}).catch(error=>console.log(error));


const {select, generateDate} = require('./helpers/handlebar-helpers');

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', engine({ 
    extname: '.handlebars', // Specify the file extension for Handlebars templates
    defaultLayout: 'home', //  (Optional) Specify a default layout file
    helpers: {select: select}
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

//local var suing middleware
app.use((req, res, next)=>{
    res.locals.success_message = req.flash('success_message');
    next();
});

//routes
const homeRoutes = require('./routes/home/home-routes');
const adminRoutes = require('./routes/admin/admin-routes');
const postsRoutes = require('./routes/admin/posts');

app.use('/',homeRoutes);
app.use('/admin',adminRoutes);
app.use('/admin/posts',postsRoutes);


app.listen(4100,()=>{
    console.log(`app running on 4100`)
})