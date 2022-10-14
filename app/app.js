const mysql=require('mysql');
const express= require('express');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

const userprofile=require('../app/api/userprofile');
const signup=require('c:/Users/jayad/Desktop/BLIL/app/api/signup');
//const validation=require('./validation');
const router=require('c:/Users/jayad/Desktop/BLIL/app/api/router');
const indexRouter = require('c:/Users/jayad/Desktop/BLIL/app/api/router');

/*app.use((req,res,next)=>{
    
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header','*');
    if(req.method =='OPTIONS'){
        res.header('Access-Control-Allow-Origin','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})*/

app.use(flash());
app.use(bodyParser.json());
app.use(session({ 
    secret: '123456catr',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));


app.use('/userprofile',userprofile);
app.use('/signup',signup);
//app.use('/validation',validation);
app.use('/router',router);
app.use('/api', indexRouter);


module.exports = app
