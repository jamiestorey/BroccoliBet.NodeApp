const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Fixture = require('../models/Fixture');
const BetFixture = require('../models/BetFixture');


//@desc     Show all bets
//@route    GET /bets/
router.get('/',ensureAuth, async (req, res) => {
    try {
        const bets = await BetFixture.find({ status: 'pending' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();

    res.render('bets/index', {
      bets,
    });
    } catch (err) {
        console.log(err);
        res.render('error/500');
    }
});


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