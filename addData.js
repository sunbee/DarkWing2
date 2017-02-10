// // JavaScript File
var assert = require("assert");
var wagner = require("wagner-core");
var moment = require("moment");
var today = moment().startOf('day');
var _ = require("underscore");

// CRUD operations (Test) using 'Alert' model
describe("CRUD Operations", function() {

    var Alert;
    var myAlert;
    
    var models = require('./models.js')(wagner);
    Alert = models.Alert;
    
    before(function(done) {
        myAlert = new Alert({
            _id         : 17,
            Note        : "I went to meet Roger Pena at Cafe Pearl on 9th Main",
            Email       : ['sanjay.bhatikar@gmail.com', 'zarthustra7@gmail.com'],
            Trigger     : today.toDate(),
            Active      : true,
        }); // End myAlert
        done();
    }); // End before()


    // after(function(done) {
    //     Alert.remove({}, function(error) {
    //         assert.ifError(error);
    //         done();
    //     }); // End remove()
    // }); // End after()
    

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
    

    it("Sets off trigger with DB CRUD", function(done) {
        // Create a bunch of data, one with today's date
        var today = moment().startOf('day');
        var nextMonth = moment(today).add(1, 'months');
        var lastMonth = moment(today).add(-1, 'months');
        var myAlerts = [
            {
                '_id'       : 7,
                'Note'      : "I am DEA not CIA.",
                'Email'     : ["sanjay.bhatikar@gmail.com", "zarthustra7@gmail.com"],
                'Trigger'   : lastMonth.toDate(),
            },
            {
                '_id'       : 8,
                'Note'      : "Harleen is my new Tinder date.",
                'Email'     : ["zarthustra7@gmail.com", "sanjay.bhatikar@gmail.com"],
                'Trigger'   : today.toDate(),
                
            },
            {
                '_id'       : 9,
                'Note'      : "Pollo Hermanos: Chicken that tastes like shrimp.",
                'Email'     : ["sanjay.bhatikar@gmail.com"],
                'Trigger'   : nextMonth.toDate(),
            },
            {
                '_id'       : 10,
                'Note'      : "Marcellus asked me to take care of his wife, Mia, show her a good time.",
                'Email'     : ["sanjay.bhatikar@gmail.com"],
                'Trigger'   : nextMonth.toDate(),
            },
            {
                '_id'       : 11,
                'Note'      : "Salut. I am off to Pyongyang.",
                'Email'     : ["sanjay.bhatikar@gmail.com"],
                'Trigger'   : nextMonth.toDate(),
            },
            
            ];

            var today = moment().startOf('day');
            var tomorrow = moment(today).add(1, 'days');
            Alert.insertMany(myAlerts, function(err, docs) {
                assert.ifError(err);
                assert.equal(docs.length, 5);
                Alert.find({Trigger: {$gte: today.toDate(), $lte: tomorrow.toDate()}}, function(err, docs) {
                    assert.ifError(err);
                    console.log("FOUND: " + docs.length);
                   _.each(docs, function(doc) {
                        console.log("FOUND: " + doc);
                        done();
                    }); // End each() 
                }); // End find()
            }); // End insertMany() 
            // Search for trigger
            // Send emails
   }); // End it()

}); // End describe()


// After: