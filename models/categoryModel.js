const mongoose = require('mongoose');

const Schema = mongoose.Schema

const generalSchema = new Schema({
    category : [String],
    totalBudget : {
        type : Number
    }
});

var General = mongoose.model('General',generalSchema);

module.exports = General