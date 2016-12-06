// JavaScript File
var assert = require("assert");
var wagner = require("wagner-core")
var superagent = require("superagent");
var express = require("express");

var URL_ROOT = 'http://alterego-sunbee.c9users.io'
// CRUD operations (Test) using 'Alert' model
describe("CRUD Operations", function() {
    
    var server;
    var Alert;
    
    before(function() {
    // Bootstrap server    
        var app = express();
        
        var models = require("./models.js")(wagner);
        app.use(require("./api.js")(wagner));
        
        server = app.listen(process.env.PORT);
        
        Alert = models.Alert;
    });
    
    beforeEach(function() {
    // Clean copy of database
        Alert.remove(function(err) {
            assert.ifError(err);
        }); // End remove()
    }); 
    
    after(function(done) {
        Alert.remove({}, function(error) {
            assert.ifError(error);
            done();
        }); // End remove()
    }); // End after()

    after(function() {
    // Close server
        server.close();
    })

    

    it("Inserts a record", function(done) {
        var endpoint_create = URL_ROOT + '/setAlert';
        console.log(endpoint_create);
        superagent.post(endpoint_create)
            .send({
                '_id'       : 7,
                'Note'      : "I am DEA not CIA.",
                'Email'     : ["sanjay.bhatikar@gmail.com", "zarthustra7@gmail.com"],
                'Trigger'   : new Date(2017, 02, 01),
            })
            .set('Accept', 'application/json')
            .end(function(err, res) {
                assert.ifError(err);
                assert.equal(res.body.Alert._id, 7);
                assert.equal(res.body.Alert.Email[0], 'sanjay.bhatikar@gmail.com');
                assert.equal(res.body.Alert.Email[1], 'zarthustra7@gmail.com');
                Alert.findOne({_id: 7}, function(err, res) {
                    assert.ifError(err);
                    console.log("Created: " + res);
                    assert.equal(res.Email[0], "sanjay.bhatikar@gmail.com");
                    assert.equal(res.Email[1], 'zarthustra7@gmail.com');
                    done();
                }); // End findOne()
        }); // End post()
    }); // End it()
    
    it("Finds and updates a record", function(done) {
        var myAlert = {
            '_id'       : 7,
            'Note'      : "I am DEA not CIA.",
            'Email'     : ["sanjay.bhatikar@gmail.com", "zarthustra7@gmail.com"],
            'Trigger'   : new Date(2017, 02, 01),
        };
        var endpoint_put = URL_ROOT + '/deactivate/id/7';
        console.log(endpoint_put);
        
        Alert.create(myAlert, function(err, doc) {
            assert.ifError(err);
            superagent.put(endpoint_put)
                .set('Content-Type', 'application/json')
                .send({})
                .end(function(err, res) {
                    assert.ifError(err);
                    Alert.findOne({_id: 7}, function(err, res) {
                        assert.ifError(err);
                        console.log('Updated: ' + res);
                        assert.equal(res.Email[0], "sanjay.bhatikar@gmail.com");
                        assert.equal(res.Email[1], "zarthustra7@gmail.com");
                        assert.equal(res.Active, false);
                        done();
                    }); // End findOne()
            }); // End put()
        }); // End create()
    }); // End it()

    it('Says "Howdy!"', function(done) {
        var endpoint_get = URL_ROOT + '/';
        console.log(endpoint_get);
        
        superagent.get(endpoint_get, function(err, res) {
            assert.ifError(err);
            assert.equal(res.body.Greet, "Howdy!");
            done();
        }); // End get()
    }); // End it()

    it('Retrieves a record by ID', function(done) {
        var myAlert = {
            '_id'       : 7,
            'Note'      : "I am DEA not CIA.",
            'Email'     : ["sanjay.bhatikar@gmail.com", "zarthustra7@gmail.com"],
            'Trigger'   : new Date(2017, 02, 01),
        };
        var endpoint_get = URL_ROOT + '/showAlert/id/7';
        console.log(endpoint_get);

        Alert.create(myAlert, function(err, doc) {
            assert.ifError(err);
            superagent.get(endpoint_get, function(err, res) {
                assert.ifError(err);
                assert.equal(res.body.Alert._id, 7);
                assert.equal(res.body.Alert.Email[0], 'sanjay.bhatikar@gmail.com');
                assert.equal(res.body.Alert.Email[1], 'zarthustra7@gmail.com');
                done();
            }); // End get()
        }); // End create()
    }); // End it()
    
}); // End describe()

// After: