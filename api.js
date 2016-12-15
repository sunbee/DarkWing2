// JavaScript File
var express = require("express");
var status = require("http-status");
var bodyParser = require("body-parser");
var moment = require('moment');

module.exports = function(wagner){
    var api = express.Router();
    api.use(bodyParser.json());
    
    api.get('/', wagner.invoke(function() {
        return function(req, res) {
            res.send({Greet: "Howdy!"});
        };
    }));

    api.get('/showAlert/id/:id', wagner.invoke(function(Alert) {
        return function(req, res) {
            Alert.findOne({_id: req.params.id}, function(err, doc) {
                if (err) {
                    return res
                        .status(status.INTERNAL_SERVER_ERROR)
                        .json({error: err.toString()});
                } else {
                    return res
                        .status(status.OK)
                        .json({Alert: doc})
                    
                }
                
            }); // End findOne()
        } // End function(req, res)
    })); // End api.get
    
    api.post('/setAlert', wagner.invoke(function(Alert) {
        return function(req, res) {
            Alert.create(req.body, function(err, doc) {
                if (err) {
                    return res
                        .status(status.INTERNAL_SERVER_ERROR)
                        .json({error: err.toString()});
                } else {
                    return res
                        .status(status.OK)
                        .json({Alert: doc});
                }
            })
        } // End function(req, res)
    })); // End api.post()
    
    api.put('/deactivate/id/:id', wagner.invoke(function(Alert) {
        return function(req, res) {
            Alert.findOneAndUpdate({_id: req.params.id}, {$set: {Active: false}}, {new: true}, function(err, doc) {
                if (err) {
                    return res
                        .status(status.INTERNAL_SERVER_ERROR)
                        .json({error: err.toString()});
                } else {
                    return res
                        .status(status.OK)
                        .json({Alert: doc});
                }
            })
        } // End function (req, res)
    })); // End api.get()
 
    api.get('/trigger', wagner.invoke(function(Alert, mailgun) {
        var data = {
            from:       'Mail Gun <postmaster@sandbox026824008ac34d809d25cedbfefc3021.mailgun.org>',
            to:         'sanjay.bhatikar@gmail.com',
            subject:    'Two Magnums too many',
            text:       'One, I keep in my desk drawer. Other, I keep close to my chest.',
        };
        return function(req, res) {
            var toDay = moment().startOf('day');
            var toMor = moment(toDay).add(1, 'days');
            Alert.find({Trigger: {$gte: toDay, $lte: toMor}}, function(err, docs) {
                if (err) {
                    return res
                        .status(status.INTERNAL_SERVER_ERROR)
                        .json({error: err.toString()});
                } else {
                    mailgun.messages().send(data, function(err, doc) {
                        if (err) {
                            return res
                            .status(status.INTERNAL_SERVER_ERROR)
                            .json({error: err.toString()});
                        } else {
                            return res
                                .status(status.OK)
                                .json({Trigger: doc});
                        }; // End if-else
                    }); // End send()
                } // End else
            }); // End find()
        }; // End function (req, res)
    })); // End api.get()
    
    return api;
}