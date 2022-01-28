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
        console.error(err);
        res.render('error/404');
    }
});


module.exports = router