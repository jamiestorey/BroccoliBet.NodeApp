const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require('../models/Story');
const Fixture = require('../models/Fixture');
const BetFixture = require('../models/BetFixture');

//@desc     Login/Landing page
//@route    GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    });
});

//@desc     Dashboard
//@route    GET /dashboard
// !-- TODO: change this to bets --
router.get('/dashboard', ensureAuth, async (req, res) => {

    try {

        // const stories = await Story.find({user: req.user.id}).lean();
        // res.render('dashboard', {
        //     name: req.user.firstName, 
        //     stories
        // });
        // const bets = await BetFixture.find({user: req.user.id}).lean();

        const bets = await BetFixture.find({ user: req.user.id, status: 'pending' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .populate('fixture')
            .lean();

        const fixtures = await Fixture.find({
            $or: [
                { $and: [{ fixture_team_home_name: "Sunderland" }, { fixture_status: "Not Started" }] },
                { $and: [{ fixture_team_away_name: "Sunderland" }, { fixture_status: "Not Started" }] }
            ]
        }).lean();
        const rounds = await Fixture.distinct("fixture_round").lean();
        rounds.sort();
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