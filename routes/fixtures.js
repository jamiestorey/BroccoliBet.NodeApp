const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Fixture = require('../models/Fixture');

//@desc     Show all fixtures from round 1
//@route    GET /fixtures/
router.get('/',ensureAuth, async (req, res) => {
    try {
        const fixtures = await Fixture.find({fixtures_round: "Regular Season - 1"}).lean();

    res.render('fixtures/index', {
        fixtures,
    });
    } catch (err) {
        console.err(err);
        res.render('error/500');
    }
});



// @desc    Show single fixture
// @route   GET /fixtures/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        let fixture = await Fixture.findOne({fixture_id:req.params.id}).lean();
        // let fixture = await Fixture.findById(req.params.id).lean();

        if (!fixture) {
            return res.render('error/404');
        }


        res.render('fixtures/show', {
            fixture,
        });

    } catch (err) {
        console.log(err);
        res.render('error/404');
    }
});

// @desc    Show single fixture
// @route   GET /fixtures/round/:id

// TODO: render using javascript component
// TODO: add routes with league_id parameter
router.get('/round/:fixtures_rounds', ensureAuth, async (req, res) => {
    try {
        // let fixtures = await Fixture.find({fixtures_round:req.params.fixtures_round},{fixture_id: 39}).lean();
        console.log(req.params.fixtures_rounds);
        let theRound = req.params.fixtures_rounds;
        let fixtures = await Fixture.find({fixture_round: theRound, fixture_league_id: 39}).lean();
        // console.log(fixtures);
        // let fixture = await Fixture.findById(req.params.id).lean();

        if (!fixtures) {
            return res.render('error/404');
        }


        res.render('fixtures/index', {
            fixtures,
        });

    } catch (err) {
        console.log(err);
        res.render('error/404');
    }
});


module.exports = router