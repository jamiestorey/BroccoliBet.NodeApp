const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Fixture = require('../models/Fixture');
const BetFixture = require('../models/BetFixture');

//@desc     Show add page
//@route    GET /bets/add
router.get('/add',ensureAuth, (req, res) => {
    res.render('fixtures/add');
});

//@desc     Process add form
//@route    POST /bets/test
router.post('/test',ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await BetFixture.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.render('error/500');
    }
});



module.exports = router