const mongoose = require('mongoose');
// TODO: Consider changing status to betStatus?

const BetFixtureSchema = new mongoose.Schema({
    fixtureID: {
        type: String,
        required: true,
        trim: true
    },
    guessHomeScore: {
        type: Number,
        required: true,
        // default: -2
    },
    guessAwayScore: {
        type: Number,
        required: true,
        // default: -4
    },
    pointsEarned: {
        type: Number,
        required: false,
        default: 0
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'won', 'lost', 'draw']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BetFixture', BetFixtureSchema);