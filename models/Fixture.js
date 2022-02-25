const mongoose = require('mongoose');

const FixtureSchema = new mongoose.Schema({
    fixture_id: {
        type: String,
        required: true
    },
    fixture_date: {
        type: String,
        required: true,
    },
    fixture_time: {
        type: String
    },
    fixture_status: {
        type: String
    },
    fixture_league_id: {
        type: Number
    },
    fixture_round: {
        type: String
    },
    fixture_team_home_id: {
        type: String
    },
    fixture_team_away_id: {
        type: String
    },
    fixture_team_home_name: {
        type: String
    },
    fixture_team_away_name: {
        type: String
    },
    fixture_team_home_is_winner: {
        type: String
    },
    fixture_team_away_is_winner: {
        type: String
    },
    fixture_goals_home: {
        type: String
    },
    fixture_goals_away: {
        type: String
    },
});

module.exports = mongoose.model('Fixture', FixtureSchema);