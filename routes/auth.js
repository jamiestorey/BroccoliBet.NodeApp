const express = require('express');
const router = express.Router();
const passport = require('passport');

//@desc     Auth with Google
//@route    GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}));

//@desc     Google Auth Callback
//@route    GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) =>{
    res.redirect('/dashboard');
} );

// //@desc     Logout User
// //@route    GET /auth/logout
// router.get('/logout', (req, res) => {
//     req.logOut();
//     res.redirect('/');
// });

// TODO: Use post instead of get as suggested from "https://www.passportjs.org/concepts/authentication/logout/"
router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

module.exports = router