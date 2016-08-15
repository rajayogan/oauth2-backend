var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../model/user');
var Client = require('../model/client');
var config = require('../config/database');
var Token = require('../model/token');
var JwtBearerStrategy = require('passport-http-jwt-bearer');
var BasicStrategy = require('passport-http').BasicStrategy;


     var opts = {};
    opts.secretOrKey =  config.secret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    
    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        User.find({id: jwt_payload.id}, function(err, user){
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }));
    
    passport.use('basic-strategy', new BasicStrategy(
  function(username, password, callback) {
    
    Client.findOne({ id: username }, function (err, client) {
      if (err) { return callback(err); }

      // No client found with that id or bad password
      if (!client || client.secret !== password) { return callback(null, false); }
      // Success
      return callback(null, client);
    });
  }
));
    
    passport.use(new JwtBearerStrategy(
   config.secret,
   function(token, done) {
     Token.findById(token._id, function (err, user) {
       
       if (err) { return done(err); }
       if (!user) { return done(null, false); }
     //  console.log(user);
       return done(null, user, token);
     });
   }
 ));
 
exports.isBearerAuthenticated = passport.authenticate('jwt-bearer', {session: false});

exports.isAuthenticated = passport.authenticate(['jwt'], {session: false});

exports.isClientAuthenticated = passport.authenticate('basic-strategy', { session : false });

