var mongoose = require('mongoose');
    express = require('express');
    cors = require('cors');
    morgan = require('morgan');
    config = require('./config/database');
    passport = require('passport');
    routes = require('./routes/routes');
    bodyParser = require('body-parser');
    auth = require('./methods/auth.js');
    session = require('express-session');
    ejs = require('ejs');
    

mongoose.connect(config.database);

mongoose.connection.on('open', function(){
    console.log('Mongo is connected');
    var app = express();
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(session({
        secret: 'Super Secret Session Key',
        saveUninitialized: true,
        resave: true
    }));
    app.set('view engine', 'ejs');
    app.use(routes);
    app.use(passport.initialize());
    


    
    
    app.listen(3333, function(){
        console.log('server is running');
    })
})

