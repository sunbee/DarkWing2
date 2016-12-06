// JavaScript File
module.exports = function(wagner){
    
    var api_key = "key-e914a644a339c5ca4e64ba7439fb433b";
    var domain = "sandbox026824008ac34d809d25cedbfefc3021.mailgun.org";
    var mailgun = require("mailgun-js")({apiKey: api_key, domain: domain});

    wagner.factory('mailgun', function() {
        return mailgun;
    })

    return {
        mailgun: mailgun,
    }
}