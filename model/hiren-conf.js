/**
 * Created by prism on 5/9/14.
 */
var auth = require('../auth.js');
var mongoose = require( 'mongoose' );

mongoose.connect(auth['mongodb']);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + auth['mongodb']);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});
/*
Main authentication info schema
 */
var authSchema = new mongoose.Schema({
    tag: String,
    email: String,
    username: String,
    createdOn: Date,
    updatedOn: { type: Date, default: Date.now },
    url: String,
    password: String,
    icon: String
});

var masterPass = new mongoose.Schema({
    hash : String,
    tag : String,
    state: { type: String, default: false}
});

exports.auth = mongoose.model('Auth', authSchema);
exports.master = mongoose.model('Master', masterPass);