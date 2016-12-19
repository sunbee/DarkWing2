// JavaScript File
var express = require("express");
var status = require("http-status");
var bodyParser = require("body-parser");
var moment = require('moment');
var _ = require("underscore");

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
            subject:    'Alert from ',
            text:       'Insert the note here.',
        };
        var send = {
            number: 0,
            emails: [],
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
                    send.number = docs.length;
                    _.each(docs, function(doc2trigger) {
                        data.to = doc2trigger.Email.join(", ");
                        data.subject += 'a friend in need';
                        data.text = doc2trigger.Note;
                        send.emails = send.emails.concat(doc2trigger.Email);
                        mailgun.messages().send(data, function(err, doc) {
                            if (err) {
                                return res
                                    .status(status.INTERNAL_SERVER_ERROR)
                                    .json({error: err.toString()});
                            } else {
                            }; // End if-else
                        }); // End send()
                    }); // End each()
                    return res
                        .status(status.OK)
                        .json({Trigger: send});
                } // End else
            }); // End find()
        }; // End function (req, res)
    })); // End api.get()
    
    return api;
}