const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require('../models/Story');
const Fixture = require('../models/Fixture');
const BetFixture = require('../models/BetFixture');

//@desc     Login/Landing page
//@route    GET /
router.get('/',ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    });
});

//@desc     Dashboard
//@route    GET /dashboard
// !-- todo change this to bets --
router.get('/dashboard',ensureAuth, async (req, res) => {
    
    try {
        
        // const stories = await Story.find({user: req.user.id}).lean();
        // res.render('dashboard', {
        //     name: req.user.firstName, 
        //     stories
        // });
        const bets = await BetFixture.find({user: req.user.id}).lean();
        const fixtures = await Fixture.find({fixture_date: "25/09/2021"}).lean();
        const rounds = await  Fixture.distinct("fixtures_round").lean();
        console.log(rounds);
        res.render('dashboard', {
            name: req.user.firstName, 
            bets,
            fixtures,
            rounds
        });
    } catch (error) {
        console.log(error);
        console.log(rounds);
        console.log("check index.js line 41");
        res.render('error/500');
    }
    
    
});

module.exports = router