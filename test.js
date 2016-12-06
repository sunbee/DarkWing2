// JavaScript File
var assert = require("assert");
var wagner = require("wagner-core")

// CRUD operations (Test) using 'Alert' model
describe("CRUD Operations", function() {

    var Alert;
    var myAlert;
    
    var models = require('./models.js')(wagner);
    Alert = models.Alert;
    
    before(function(done) {
        myAlert = new Alert({
            _id         : 1,
            Note        : "I went to meet Roger Pena at Cafe Pearl on 9th Main",
            Email       : ['sanjay.bhatikar@gmail.com', 'zarthustra7@gmail.com'],
            Trigger     : new Date(2017, 02, 01),
            Active      : true,
        }); // End myAlert
        done();
    }); // End before()


    after(function(done) {
        Alert.remove({}, function(error) {
            assert.ifError(error);
            done();
        }); // End remove()
    }); // End after()
    

    it("Inserts a record", function(done) {
        myAlert.save(function(err, doc) {
            assert.ifError(err);
            Alert.findOne({}, function(err, res) {
                assert.ifError(err);
                console.log("Found: " + res);
                assert.equal(res.Email[0], "sanjay.bhatikar@gmail.com");
                done();
            }) // End findOne()
        }); // End save()
    }); // End it()
    
    it("Finds and updates a record", function(done) {
        myAlert.save(function(err, doc) {
            assert.ifError(err);
            Alert.findOneAndUpdate({_id: 1}, {$set: {Active: false}}, function(err, doc) {
                assert.ifError(err);
                Alert.findOne({}, function(err, doc) {
                    assert.ifError(err);
                    console.log("Found updated: ", doc);
                    assert.equal(doc.Email[0], "sanjay.bhatikar@gmail.com");
                    assert.equal(doc.Email[1], "zarthustra7@gmail.com");
                    assert.equal(doc.Active, false);
                    done();   
                }); // End findOne()
            }); // End findOneAndUpdate()
        }); // End save()
        
    }); // End it()
}); // End describe()

// After: