// JavaScript File
var express = require("express");
var wagner = require("wagner-core");

require("./models.js")(wagner);
require('./mails.js')(wagner);
 
var app = express();

app.use('/api/v1/', require("./api.js")(wagner));

app.listen(process.env.PORT);
console.log("Listening on port: " + process.env.PORT);

// var wagner = require("wagner-core")
// var Alert;
// var myAlert;

// var models = require('./models.js')(wagner);
// Alert = models.Alert;

// var myAlert = new Alert({
//     _id         : 997,
//     Note        : "I went to meet Roger Pena at Cafe Santa Maria on 9th Main",
//     Email       : ['sanjay.bhatikar@gmail.com', 'zarthustra7@gmail.com'],
//     Trigger     : new Date(2016, 12, 01),
//     Active      : true,
// })

// myAlert.save(function(err, doc) {
//     if (err) throw err;
//     console.log("Saved: " + doc);
// });

var mails = require("./mails.js")(wagner);
var mailgun = mails.mailgun;

var data = {
    from:       'Mail Gun <postmaster@sandbox026824008ac34d809d25cedbfefc3021.mailgun.org>',
    to:         'sanjay.bhatikar@gmail.com',
    subject:    'Two Magnums too many ',
    text:       'One, I keep in my desk drawer. Other, I keep close to my chest.',
};

mailgun.messages().send(data, function(err, doc) {
    if (err) throw err;
    console.log(doc);
});

