// JavaScript File
var mongoose = require("mongoose");
var _ = require("underscore");

module.exports = function(wagner) {
    // Connect to the database
    mongoose.connect('mongodb://localhost:27017/test');
    
    // Make a model from each schema
    var Alert = mongoose.model('Alert', require('./alert.js'), 'alerts');
    
    // Register named factories that return models
    var Models = {
        Alert: Alert,
    };
    _.each(Models, function(value, key) {
        wagner.factory(key, function() {
            return value;
        });
    });
    
    return Models;
};