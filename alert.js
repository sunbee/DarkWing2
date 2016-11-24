// JavaScript File
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var alertSchema = new Schema({
   Note: {
       type: String,
       required: true,
   },
   Email: {
       type: String,
       required: true,
       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
   },
   Trigger: {
       type: Date,
       required: true,
   },
   Active: {
       type: Boolean,
       default: true,
   }
});


module.exports = alertSchema;