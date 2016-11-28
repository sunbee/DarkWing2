// JavaScript File
var wagner = require("wagner-core")
var Alert;
var myAlert;

var models = require('./models.js')(wagner);
Alert = models.Alert;

var myAlert = new Alert({
    Note: "I went to meet Roger Pena at Cafe Santa Maria on 9th Main",
    Email: ['sanjay.bhatikar@gmail.com', 'zarthustra7@gmail.com'],
    Trigger: new Date(2016, 12, 01),
    Active: true,
})

myAlert.save(function(err, doc) {
    if (err) throw err;
    console.log("Saved: " + doc);
});

var api_key = "key-e914a644a339c5ca4e64ba7439fb433b";
var domain = "sandbox026824008ac34d809d25cedbfefc3021.mailgun.org";
var mailgun = require("mailgun-js")({apiKey: api_key, domain: domain});

var data = {
    from:       'Mail Gun <postmaster@sandbox026824008ac34d809d25cedbfefc3021.mailgun.org>',
    to:         'sanjay.bhatikar@gmail.com',
    subject:    'Two Magnums',
    text:       'One, I keep in my desk drawer. Other, I keep close to my chest.',
};

mailgun.messages().send(data, function(err, doc) {
    if (err) throw err;
    console.log(doc);
});

