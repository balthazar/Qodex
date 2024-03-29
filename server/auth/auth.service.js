'use strict';

var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({ secret: config.secrets.session });

var auth = module.exports = {

  /**
   * Attach the user object to the request if authenticated
   * Otherwise returns 403
   */
  isAuthenticated: function () {
    return compose()
      .use(function (req, res, next) {
        validateJwt(req, res, next);
      })
      .use(function (req, res, next) {
        User.findById(req.user._id, function (err, user) {
          if (err) { return next(err); }
          if (!user) { return res.status(401).end(); }
          req.user = user;
          next();
        });
      });
  },

  /**
   * Returns a jwt token, signed by the app secret
   */
  signToken: function (id) {
    return jwt.sign(
      { _id: id },
      config.secrets.session,
      { expiresInMinutes: 60 * 5 }
    );
  },

  setTokenCookie: function (req, res) {
    if (!req.user) {
      return res.status(404).json({
        message: 'Something went wrong, please try again.'
      });
    }
    var token = auth.signToken(req.user._id, req.user.role);
    res.cookie('token', JSON.stringify(token));
    res.redirect('/hello');
  }

};
