// JavaScript File
var express = require("express");
var wagner = require("wagner-core");

require("./models.js")(wagner);
require('./mails.js')(wagner);
 
var app = express();

app.use('/api/v1/', require("./api.js")(wagner));

app.listen(process.env.PORT);
console.log("Listening on port: " + process.env.PORT);

// var mails = require("./mails.js")(wagner);
// var mailgun = mails.mailgun;

// var data = {
//     from:       'Mail Gun <postmaster@sandbox026824008ac34d809d25cedbfefc3021.mailgun.org>',
//     to:         'sanjay.bhatikar@gmail.com',
//     subject:    'Two Magnums too many ',
//     text:       'One, I keep in my desk drawer. Other, I keep close to my chest.',
// };

// mailgun.messages().send(data, function(err, doc) {
//     if (err) throw err;
//     console.log(doc);
// });

