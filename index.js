// JavaScript File
var wagner = require("wagner-core")
var Alert;
var myAlert;

var models = require('./models.js')(wagner);
Alert = models.Alert;

var myAlert = new Alert({
    Note: "I went to meet Roger Pena at Cafe Santa Maria on 9th Main",
    Email: 'sanjay.bhatikar@gmail.com',
    Trigger: new Date(2016, 12, 01),
    Active: true,
})

myAlert.save(function(err, doc) {
    if (err) throw err;
    console.log("Saved: " + doc);
});