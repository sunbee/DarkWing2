// JavaScript File
var express = require("express");
var status = require("http-status");
var bodyParser = require("body-parser");

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
 
    return api;
}